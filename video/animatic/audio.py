"""Audio-mix v0.8 voor de animatic.

Lagen (alles uit timeline.js, zelfde bron als het beeld):
1. Voice-over: per regel wordt video/vo/<vo>.wav (of .mp3/.flac/.ogg via ffmpeg) op t0 geplaatst als het
   bestaat; anders blijft het slot stil. Optioneel lichte robot-kleur (`--robot`): subtiele korte
   chorus/comb + klein elektronisch randje; verstaanbaarheid gaat voor. Geen pseudo-spraak meer.
2. Soundbed: lichte, moderne tech-pulse (104 bpm): zachte gefilterde pulse op de achtsten, ronde korte
   bas op de tel, majeur-akkoordtonen in het middenregister (A → D → E → A), heel zachte tik op de
   off-beat. Laag in de mix; duckt onder voice-over en wordt rustiger tijdens de saleskaart.
3. Fysieke cues: koffer open/dicht, kunststof-klik bij eerste reactie, drukknop-klik, zachte
   display-clicks (+ subtiele bevestiging bij 080), telefoon-swipe, Rail-klik, tellerklikken, zachte
   low thumps bij grote overgangen, slot-klik. Nooit boven de voice-over.

Gebruik:  python3 audio.py ../out/animatic-audio.wav [--robot] [--vo ../vo]
"""
import json, math, os, re, subprocess, sys, wave
import numpy as np

SR = 48000
rng = np.random.default_rng(11)

def load_timeline():
    src = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'timeline.js'), encoding='utf-8').read()
    body = src[src.index('var T = {') + len('var T = '):src.index('root.TIMELINE')]
    body = body.rstrip().rstrip(';')
    body = re.sub(r"//[^\n]*", "", body)
    body = re.sub(r"([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:", r'\1"\2":', body)
    body = body.replace("'", '"')
    body = re.sub(r",(\s*[}\]])", r"\1", body)
    return json.loads(body)

# ---------------------------------------------------------------- basis
def seg(t0, dur): return int(t0 * SR), int(dur * SR)
def add(buf, s0, x):
    n = min(len(x), len(buf) - s0)
    if n > 0 and s0 >= 0: buf[s0:s0 + n] += x[:n]
def env_ar(n, a, r, curve=1.0):
    t = np.arange(n) / SR; d = n / SR
    return np.minimum(1.0, np.minimum(t / max(a, 1e-4), np.maximum(0.0, (d - t) / max(r, 1e-4)))) ** curve
def lowpass(x, fc, passes=2):
    a = math.exp(-2 * math.pi * fc / SR); b = 1 - a; y = x.astype(float)
    for _ in range(passes):
        out = np.empty_like(y); acc = 0.0; n = len(y)
        for s in range(0, n, 4096):
            blk = y[s:s + 4096]; m = len(blk); pw = a ** np.arange(m)
            conv = np.fft.irfft(np.fft.rfft(blk, 2 * m) * np.fft.rfft(pw, 2 * m))[:m]
            yb = acc * pw * a + b * conv; out[s:s + m] = yb; acc = yb[-1]
        y = out
    return y
def highpass(x, fc): return x - lowpass(x, fc, 1)
def noise(n): return rng.standard_normal(n)

# ---------------------------------------------------------------- 1. voice-over
def ffmpeg_exe():
    try:
        import imageio_ffmpeg; return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception: return 'ffmpeg'

def read_audio(path):
    """Leest wav/mp3/flac/ogg als mono float @ SR (via ffmpeg)."""
    out = subprocess.run([ffmpeg_exe(), '-v', 'error', '-i', path, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True)
    if out.returncode != 0: raise RuntimeError(out.stderr.decode()[-300:])
    return np.frombuffer(out.stdout, dtype='<f4').astype(float)

def robotize(x, who):
    """Lichte robot-kleur: stem blijft stem. Korte chorus/comb (elektronisch randje) + subtiele band-nadruk."""
    n = len(x); tt = np.arange(n) / SR
    d_ms = {'SW': 6.5, 'BC': 9.0, 'RL': 5.0}[who]
    d = int(d_ms * SR / 1000); mod = (0.6 * SR / 1000 * np.sin(2 * math.pi * 0.7 * tt)).astype(int)
    idx = np.clip(np.arange(n) - d - mod, 0, n - 1)
    comb = x[idx]
    y = 0.78 * x + 0.32 * comb
    # klein elektronisch randje: heel zachte ringmodulatie in de presence-band
    ring = highpass(x, 1800) * np.sin(2 * math.pi * {'SW': 95, 'BC': 60, 'RL': 120}[who] * tt)
    y += 0.10 * ring
    return y

def place_vo(buf, lines, vo_dir, robot):
    placed, missing = [], []
    for ln in lines:
        base = os.path.join(vo_dir, ln['vo']); path = None
        for ext in ('.wav', '.mp3', '.flac', '.ogg', '.m4a'):
            if os.path.exists(base + ext): path = base + ext; break
        if not path: missing.append(ln['vo']); continue
        x = read_audio(path)
        # normaliseer per regel op -16 dBFS rms (spraak), robot-kleur optioneel, korte fades
        rms = math.sqrt(float(np.mean(x ** 2)) + 1e-12); x = x * (10 ** (-16 / 20) / max(rms, 1e-6))
        if robot: x = robotize(x, ln['who'])
        x *= env_ar(len(x), 0.008, 0.02)
        add(buf, int(ln['t0'] * SR), x)
        placed.append((ln['vo'], len(x) / SR, ln['t1'] - ln['t0']))
    return placed, missing

# ---------------------------------------------------------------- 2. soundbed (lichte tech-pulse)
CHORDS = [  # A-majeur → D-majeur → E-majeur → A-majeur (optimistisch, geen mineur)
    [220.0, 277.18, 329.63], [220.0, 293.66, 369.99], [246.94, 329.63, 415.30], [220.0, 277.18, 329.63]]

def tone(f, n, a, r, h2=0.0):
    tt = np.arange(n) / SR
    return (np.sin(2 * math.pi * f * tt) + h2 * np.sin(4 * math.pi * f * tt)) * env_ar(n, a, r, 1.3)

def soundbed(buf, T):
    total = len(buf); bpm = T['bed']['bpm']; beat = 60.0 / bpm; bar = beat * 4
    dur = T['duration']; t = 0.0; barno = 0
    while t < dur:
        chord = CHORDS[(barno // 2) % 4]
        # zachte akkoord-pad per maat (middenregister, kort aangezwollen, geen lange donkere pad)
        s0, n = seg(t, bar * 1.05)
        pad = sum(tone(f, n, 0.35, 0.6) for f in chord) / 3.0
        add(buf, s0, lowpass(pad, 1400) * 0.16)
        for k in range(8):                       # achtsten
            tb = t + k * beat / 2
            s0, n = seg(tb, 0.11)
            f = chord[k % 3] * 2                 # pulse een octaaf hoger, kort en zacht
            add(buf, s0, lowpass(tone(f, n, 0.004, 0.08, 0.35), 2600) * (0.17 if k % 2 == 0 else 0.11))
            if k % 4 == 2:                       # off-beat tik (heel zacht, gefilterde ruis)
                s0, n = seg(tb, 0.03)
                add(buf, s0, (lowpass(noise(n), 5000) - lowpass(noise(n), 1500)) * env_ar(n, .001, .02) * 0.07)
        for k in (0, 2):                         # ronde korte bas op tel 1 en 3
            s0, n = seg(t + k * beat, 0.32)
            add(buf, s0, tone(chord[0] / 2, n, 0.008, 0.22, 0.15) * 0.16)
        t += bar; barno += 1
    # niveau-automatisering: fade-in, duck onder voice-over, rustiger tijdens saleskaart, uit bij zwart
    tt = np.arange(total) / SR
    g = np.minimum(1.0, tt / 1.2)
    for ln in T['lines']:
        g *= 1 - 0.45 * np.clip(np.minimum((tt - (ln['t0'] - 0.15)) / 0.12, ((ln['t1'] + 0.25) - tt) / 0.25), 0, 1)
    c0, c1 = T['bed']['duckCard']
    g *= 1 - 0.5 * np.clip(np.minimum((tt - c0) / 0.6, (c1 - tt) / 0.6), 0, 1)
    g *= np.clip((T['blackout'] + 0.3 - tt) / 0.5, 0, 1)
    buf *= g

# ---------------------------------------------------------------- 3. fysieke cues
def click_plastic(buf, t0, gain=0.18, body=260.0, bright=2600.0, dur=0.05):
    s0, n = seg(t0, dur); tt = np.arange(n) / SR
    x = lowpass(noise(n), bright) * np.exp(-tt / 0.006) * 1.6 + np.sin(2 * math.pi * body * tt) * np.exp(-tt / 0.012) * 0.6
    add(buf, s0, x * gain)
def click_button(buf, t0, gain=0.24):
    click_plastic(buf, t0, gain, body=210, bright=3200, dur=0.06); click_plastic(buf, t0 + 0.012, gain * .5, body=170, bright=1800, dur=0.05)
def click_ui(buf, t0, gain=0.10):
    s0, n = seg(t0, 0.03); tt = np.arange(n) / SR
    add(buf, s0, (np.sin(2 * math.pi * 1150 * tt) * np.exp(-tt / 0.004) + lowpass(noise(n), 1500) * np.exp(-tt / 0.003) * .5) * gain)
def confirm_080(buf, t0, gain=0.09):
    for i, f in enumerate((330.0, 440.0)):
        s0, n = seg(t0 + i * 0.09, 0.14); add(buf, s0, tone(f, n, .01, .09) * gain)
def click_counter(buf, t0, gain=0.14): click_plastic(buf, t0, gain, body=700, bright=2200, dur=0.03)
def click_rail(buf, t0, gain=0.16):
    click_plastic(buf, t0, gain, body=330, bright=3000, dur=0.05)
    s0, n = seg(t0 + 0.01, 0.09); tt = np.arange(n) / SR
    add(buf, s0, np.sin(2 * math.pi * 1850 * tt) * np.exp(-tt / 0.02) * gain * .25)
def swipe(buf, t0, gain=0.10):
    s0, n = seg(t0, 0.28); add(buf, s0, (lowpass(noise(n), 1400) - lowpass(noise(n), 300)) * env_ar(n, .10, .12) * gain)
def thump(buf, t0, gain=0.14):
    s0, n = seg(t0, 0.22); tt = np.arange(n) / SR; f = 78 * (1 - 0.35 * tt / 0.22)
    add(buf, s0, np.sin(2 * math.pi * np.cumsum(f) / SR) * np.exp(-tt / 0.07) * gain)
def koffer(buf, t0, closing=False, gain=0.22):
    thump(buf, t0, gain * .6); click_plastic(buf, t0 + 0.02, gain * .8, body=190, bright=2200, dur=0.07)
    if closing: click_plastic(buf, t0 + 0.09, gain * .6, body=240, bright=2600, dur=0.05)
    else: click_plastic(buf, t0 + 0.14, gain * .35, body=300, bright=1900, dur=0.05)

# ---------------------------------------------------------------- mix
def main(argv):
    out = argv[1] if len(argv) > 1 and not argv[1].startswith('--') else 'animatic-audio.wav'
    robot = '--robot' in argv
    vo_root = os.environ.get('IS_VO_DIR') or os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'vo')
    vo_dir = argv[argv.index('--vo') + 1] if '--vo' in argv else (os.path.join(vo_root, 'proc') if os.path.isdir(os.path.join(vo_root, 'proc')) else vo_root)
    T = load_timeline(); total = int(T['duration'] * SR)
    vo = np.zeros(total); bed = np.zeros(total); fx = np.zeros(total)
    placed, missing = place_vo(vo, T['lines'], vo_dir, robot)
    soundbed(bed, T)
    S = T['sfx']; D = T['display']
    koffer(fx, S['kofferOpen'])
    for t in S['sensorClick']: click_plastic(fx, t, 0.12)
    click_button(fx, D['pressAt'])
    for st in D['steps']: click_ui(fx, st[0], 0.10 if st[1] != '080' else 0.12)
    confirm_080(fx, D['ledOn'] + 0.06)
    swipe(fx, S['phoneSwipe']); click_rail(fx, S['railClick'])
    for t in S['thumps']: thump(fx, t, 0.12)
    click_counter(fx, T['counter']['show'], 0.10)
    for s in T['counter']['steps']: click_counter(fx, s[0])
    click_plastic(fx, S['endClick'], 0.12, body=280, bright=2300); koffer(fx, S['kofferClose'], closing=True)
    mix = vo * 1.0 + bed * 0.55 + fx * 1.0
    mix = np.tanh(mix * 1.1) / np.tanh(1.1)
    peak = max(1e-6, float(np.max(np.abs(mix)))); mix *= min(1.0, 0.89 / peak)
    with wave.open(out, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((np.clip(mix, -1, 1) * 32767).astype('<i2').tobytes())
    print(f"wrote {out} {T['duration']}s | VO geplaatst: {len(placed)} | VO ontbreekt: {len(missing)}")
    for p in placed:
        flag = '  (LANGER dan slot!)' if p[1] > p[2] + 0.05 else ''
        print(f"  {p[0]}: {p[1]:.2f}s in slot van {p[2]:.2f}s{flag}")
    if missing: print('  ontbrekend:', ', '.join(missing))

if __name__ == '__main__':
    main(sys.argv)
