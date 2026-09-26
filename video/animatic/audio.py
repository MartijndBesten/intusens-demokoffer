"""Placeholder-audio v0.7 voor de animatic — gesynthetiseerd, geen samples, geen stemmen.

Drie lagen, allemaal uit timeline.js (zelfde bron als het beeld):
1. Karakterstem-klanken zonder woorden: per regel 2–4 vloeiende klankbewegingen (glides) die de
   intonatie van de tekst volgen (vraag loopt omhoog, droge opmerking eindigt kort en vlak).
   Warm/rond (sinus + zachte lage harmonischen, lichte vibrato, zacht laagdoorlaat-ruisje voor
   'technische' textuur). Switch hoger/sneller/ritmischer, Broadcast lager/rustiger/ronder,
   Rail korter/helderder. Geen piep per lettergreep, geen hoge frequenties.
2. Soundbed: warme lage synth-pad met heel trage ademhaling, bijna onbewust.
3. Fysieke cues: koffer open/dicht, kunststof-klik bij eerste reactie, echte drukknop-klik,
   zachte display-clicks, subtiele Rail-klik, telefoon-swipe, droge tellerklikken, zachte
   low thumps bij grote overgangen, slot-klik.

Alles blijft placeholder: bij echte voice-over vervalt laag 1 en wordt laag 2/3 opnieuw gemixt.
Gebruik:  python3 audio.py ../out/animatic-audio.wav
"""
import json, math, re, sys, wave
import numpy as np

SR = 48000
rng = np.random.default_rng(7)

def load_timeline():
    src = open(__file__.replace('audio.py', 'timeline.js'), encoding='utf-8').read()
    body = src[src.index('var T = {') + len('var T = '):src.index('root.TIMELINE')]
    body = body.rstrip().rstrip(';')
    body = re.sub(r"//[^\n]*", "", body)
    body = re.sub(r"([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:", r'\1"\2":', body)
    body = body.replace("'", '"')
    body = re.sub(r",(\s*[}\]])", r"\1", body)
    return json.loads(body)

# ---------------------------------------------------------------- basis
def seg(t0, dur):
    n = int(dur * SR); s0 = int(t0 * SR); return s0, n

def add(buf, s0, x):
    n = min(len(x), len(buf) - s0)
    if n > 0 and s0 >= 0: buf[s0:s0 + n] += x[:n]

def env_ar(n, a, r, curve=1.0):
    t = np.arange(n) / SR; d = n / SR
    e = np.minimum(1.0, np.minimum(t / max(a, 1e-4), np.maximum(0.0, (d - t) / max(r, 1e-4))))
    return e ** curve

def lowpass(x, fc, passes=2):
    # 1-pole low-pass, vectorized via lfilter-achtige recursie (scipy niet beschikbaar → eigen implementatie)
    a = math.exp(-2 * math.pi * fc / SR); b = 1 - a
    y = x.astype(float)
    for _ in range(passes):
        out = np.empty_like(y); acc = 0.0
        # chunked python-loop is te traag voor lange buffers; gebruik geometrische serie via cumulative trick
        # y[n] = a*y[n-1] + b*x[n]  →  y = b * sum_k a^k x[n-k]; implementeer met blokken van 4096
        n = len(y); acc = 0.0
        for s in range(0, n, 4096):
            blk = y[s:s + 4096]; m = len(blk)
            k = np.arange(m)
            pw = a ** k
            # y_blk = acc*a^(k+1) + b * conv(blk, pw)  (conv via FFT voor snelheid)
            conv = np.fft.irfft(np.fft.rfft(blk, 2 * m) * np.fft.rfft(pw, 2 * m))[:m]
            yb = acc * pw * a + b * conv
            out[s:s + m] = yb; acc = yb[-1]
        y = out
    return y

def noise(n): return rng.standard_normal(n)

# ---------------------------------------------------------------- 1. karakterstem
VOICE = {
    # base Hz, ratio 2e/3e harmonische, vibrato Hz/diepte, glide-snelheid (1 = normaal), ritme-AM, groepen min/max
    'SW': dict(f=305, h2=.28, h3=.10, vib=(5.8, .012), speed=1.25, am=(6.0, .18), lo=2, hi=4, tone=.7, lp=2400),
    'BC': dict(f=196, h2=.40, h3=.10, vib=(4.6, .010), speed=0.85, am=(0.0, 0.0), lo=2, hi=3, tone=.9, lp=1900),
    'RL': dict(f=415, h2=.35, h3=.12, vib=(6.2, .014), speed=1.35, am=(7.0, .12), lo=2, hi=2, tone=.6, lp=2600),
}

def contour_plan(text, contour, lo, hi):
    """Verdeel de zin in 2–4 klankbewegingen; per groep (rel. duur, start-semitoon, eind-semitoon)."""
    words = [w for w in re.split(r"\s+", text.strip()) if w]
    n = max(lo, min(hi, max(2, round(len(words) / 2.2))))
    if len(words) <= 1: n = 1 if contour == 'droog' else lo
    plan = []
    for i in range(n):
        u = i / max(1, n - 1)
        st0 = 2.0 - 3.0 * u; st1 = st0 - 1.2; dur = 1.0
        if contour == 'vraag' and i == n - 1: st0, st1, dur = -1.0, 4.5, 1.15
        if contour == 'droog' and i == n - 1: st0, st1, dur = -0.5, -1.5, 0.6
        if contour == 'droog' and n == 1: st0, st1, dur = 0.5, -1.0, 1.0
        if contour == 'roep': st0, st1, dur = (1.0, 5.0, 0.9) if i == n - 1 else (3.0, 2.0, 0.8)
        plan.append((dur, st0, st1))
    return plan

def voice_line(buf, line):
    v = VOICE[line['who']]; t0, t1 = line['t0'], line['t1']
    plan = contour_plan(line['text'], line.get('contour', 'stelling'), v['lo'], v['hi'])
    total = sum(p[0] for p in plan); gap = 0.07 / v['speed']
    avail = (t1 - t0) - gap * (len(plan) - 1)
    t = t0
    for k, (dur, st0, st1) in enumerate(plan):
        d = max(0.12, avail * dur / total)
        s0, n = seg(t, d)
        tt = np.arange(n) / SR; u = tt / max(d, 1e-3)
        st = st0 + (st1 - st0) * (3 * u ** 2 - 2 * u ** 3) + 0.25 * math.sin(k * 2.1)
        f = v['f'] * 2 ** (st / 12.0)
        vibf, vibd = v['vib']; f = f * (1 + vibd * np.sin(2 * math.pi * vibf * tt + k))
        ph = 2 * math.pi * np.cumsum(f) / SR
        x = np.sin(ph) + v['h2'] * np.sin(2 * ph + .4) + v['h3'] * np.sin(3 * ph + .9)
        x += 0.06 * lowpass(noise(n), 900) * v['tone']          # zachte 'technische' textuur
        amf, amd = v['am']
        if amf > 0: x *= 1 - amd * (0.5 + 0.5 * np.sin(2 * math.pi * amf * tt))
        e = env_ar(n, 0.045 / v['speed'], 0.09 / v['speed'], 1.4)
        add(buf, s0, lowpass(x * e, v['lp']) * 0.26)
        t += d + gap

# ---------------------------------------------------------------- 2. soundbed
def soundbed(buf, dur, fade_out_at):
    n = len(buf); t = np.arange(n) / SR
    pad = (np.sin(2 * math.pi * 55.0 * t) * .55 + np.sin(2 * math.pi * 82.41 * t + .3) * .35
           + np.sin(2 * math.pi * 110.0 * t + .7) * .22 + np.sin(2 * math.pi * 164.8 * t + 1.1) * .08)
    breath = 0.75 + 0.25 * np.sin(2 * math.pi * 0.045 * t)
    air = lowpass(noise(n), 420) * 0.35
    x = (pad * breath + air) * 0.9
    fade_in = np.minimum(1.0, t / 1.8)
    fade_out = np.clip((fade_out_at + 0.4 - t) / 0.6, 0, 1)
    buf += x * fade_in * fade_out * 0.055

# ---------------------------------------------------------------- 3. fysieke cues
def click_plastic(buf, t0, gain=0.18, body=260.0, bright=2600.0, dur=0.05):
    s0, n = seg(t0, dur); tt = np.arange(n) / SR
    x = lowpass(noise(n), bright) * np.exp(-tt / 0.006) * 1.6 + np.sin(2 * math.pi * body * tt) * np.exp(-tt / 0.012) * 0.6
    add(buf, s0, x * gain)

def click_button(buf, t0, gain=0.24):
    click_plastic(buf, t0, gain, body=210, bright=3200, dur=0.06)
    click_plastic(buf, t0 + 0.012, gain * .5, body=170, bright=1800, dur=0.05)

def click_ui(buf, t0, gain=0.10):
    s0, n = seg(t0, 0.03); tt = np.arange(n) / SR
    x = np.sin(2 * math.pi * 1150 * tt) * np.exp(-tt / 0.004) + lowpass(noise(n), 1500) * np.exp(-tt / 0.003) * .5
    add(buf, s0, x * gain)

def confirm_080(buf, t0, gain=0.09):
    for i, f in enumerate((330.0, 440.0)):
        s0, n = seg(t0 + i * 0.09, 0.14); tt = np.arange(n) / SR
        add(buf, s0, np.sin(2 * math.pi * f * tt) * env_ar(n, .01, .09) * gain)

def click_counter(buf, t0, gain=0.14):
    click_plastic(buf, t0, gain, body=700, bright=2200, dur=0.03)

def click_rail(buf, t0, gain=0.16):
    click_plastic(buf, t0, gain, body=330, bright=3000, dur=0.05)
    s0, n = seg(t0 + 0.01, 0.09); tt = np.arange(n) / SR
    add(buf, s0, np.sin(2 * math.pi * 1850 * tt) * np.exp(-tt / 0.02) * gain * .25)

def swipe(buf, t0, gain=0.10):
    s0, n = seg(t0, 0.28)
    x = lowpass(noise(n), 1400) - lowpass(noise(n), 300)
    add(buf, s0, x * env_ar(n, .10, .12) * gain)

def thump(buf, t0, gain=0.14):
    s0, n = seg(t0, 0.22); tt = np.arange(n) / SR
    f = 78 * (1 - 0.35 * tt / 0.22)
    add(buf, s0, np.sin(2 * math.pi * np.cumsum(f) / SR) * np.exp(-tt / 0.07) * gain)

def koffer(buf, t0, closing=False, gain=0.22):
    thump(buf, t0, gain * .6)
    click_plastic(buf, t0 + 0.02, gain * .8, body=190, bright=2200, dur=0.07)
    if closing: click_plastic(buf, t0 + 0.09, gain * .6, body=240, bright=2600, dur=0.05)
    else: click_plastic(buf, t0 + 0.14, gain * .35, body=300, bright=1900, dur=0.05)

# ---------------------------------------------------------------- mix
def main(out):
    T = load_timeline()
    total = int(T['duration'] * SR)
    voice = np.zeros(total); bed = np.zeros(total); fx = np.zeros(total)
    for ln in T['lines']: voice_line(voice, ln)
    soundbed(bed, T['duration'], T['blackout'])
    S = T['sfx']; D = T['display']
    koffer(fx, S['kofferOpen'])
    for t in S['sensorClick']: click_plastic(fx, t, 0.12)
    click_button(fx, D['pressAt'])
    for st in D['steps']: click_ui(fx, st[0], 0.10 if st[1] != '080' else 0.12)
    confirm_080(fx, D['ledOn'] + 0.06)
    swipe(fx, S['phoneSwipe'])
    click_rail(fx, S['railClick'])
    for t in S['thumps']: thump(fx, t, 0.12)
    click_counter(fx, T['counter']['show'], 0.10)
    for s in T['counter']['steps']: click_counter(fx, s[0])
    click_plastic(fx, S['endClick'], 0.12, body=280, bright=2300)
    koffer(fx, S['kofferClose'], closing=True)
    mix = voice + bed * 1.15 + fx * 1.35
    mix = np.tanh(mix * 1.15) / np.tanh(1.15)
    mix *= 0.85 / max(1e-6, np.max(np.abs(mix)))
    with wave.open(out, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((np.clip(mix, -1, 1) * 32767).astype('<i2').tobytes())
    print('wrote', out, f"{T['duration']}s  voice-peak {np.max(np.abs(voice)):.2f} bed-peak {np.max(np.abs(bed)):.3f} fx-peak {np.max(np.abs(fx)):.2f}")

if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else 'animatic-audio.wav')
