"""Bereidt de Nederlandse TTS-masters voor (v0.9). Leest video/vo/<naam>.wav, schrijft video/vo/proc/<naam>.wav
en video/vo/durations.json. Daarna: python3 build_timeline.py (tijdlijn om de echte stemmen heen).

Per bestand:
1. Trim alleen echte stilte aan begin/eind (10 ms-frames; drempel = max(-50 dBFS, piek-rms - 40 dB);
   40 ms voorloop en 90 ms uitloop blijven staan, zodat er geen woord wordt afgekapt).
2. Meet de actieve spreekduur.
3. 08-BC-code-op-display: kies de snellere variant (08-BC-code-op-display-fast.wav) als de normale actieve duur
   langer is dan 3,4 s en de snelle variant bestaat. Forceren kan met --08=normaal of --08=snel.
4. Tempo: alleen als een regel duidelijk langer is dan een natuurlijk leestempo (0,34 s/woord + 0,35 s) wordt hij
   versneld met ffmpeg atempo (toonhoogte blijft gelijk), nooit meer dan 12 %. Anders ongewijzigd.
5. Mond-envelope per regel op 24 fps (0..1) voor lipsync in de animatie.
"""
import json, math, os, re, subprocess, sys
import numpy as np

SR = 48000; FPS = 24
HERE = os.path.dirname(os.path.abspath(__file__)); VO = os.environ.get('IS_VO_DIR') or os.path.normpath(os.path.join(HERE, '..', 'vo')); PROC = os.path.join(VO, 'proc')
MAX_TEMPO = 1.12

def ff():
    try:
        import imageio_ffmpeg; return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception: return 'ffmpeg'

def read(path, tempo=1.0):
    af = ['-af', f'atempo={tempo:.4f}'] if abs(tempo - 1) > 1e-3 else []
    r = subprocess.run([ff(), '-v', 'error', '-i', path, *af, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True)
    if r.returncode: raise RuntimeError(r.stderr.decode()[-300:])
    return np.frombuffer(r.stdout, dtype='<f4').astype(float)

def trim(x):
    n = int(0.010 * SR); frames = len(x) // n
    rms = np.array([math.sqrt(float(np.mean(x[i * n:(i + 1) * n] ** 2)) + 1e-12) for i in range(frames)])
    db = 20 * np.log10(rms); thr = max(-50.0, db.max() - 40.0)
    on = np.where(db > thr)[0]
    if len(on) == 0: return x, 0, len(x)
    a = max(0, on[0] * n - int(0.040 * SR)); b = min(len(x), (on[-1] + 1) * n + int(0.090 * SR))
    return x[a:b], a, b

def envelope(x):
    n = SR // FPS; out = []
    for i in range(0, len(x), n):
        seg = x[i:i + n]; out.append(math.sqrt(float(np.mean(seg ** 2)) + 1e-12))
    e = np.array(out); e = e / max(e.max(), 1e-9); e = np.clip((e - 0.08) / 0.92, 0, 1) ** 0.7
    return [round(float(v), 3) for v in e]

def write(path, x):
    import wave
    with wave.open(path, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((np.clip(x, -1, 1) * 32767).astype('<i2').tobytes())

def main(argv):
    force08 = next((a.split('=')[1] for a in argv if a.startswith('--08=')), None)
    man = json.load(open(os.path.join(VO, 'higgsfield-v1-manifest.json')))
    os.makedirs(PROC, exist_ok=True); res = {}; missing = []
    for f in man['files']:
        name = f['filename'][:-4]; src = os.path.join(VO, f['filename'])
        if not os.path.exists(src): missing.append(f['filename']); continue
        variant = 'normaal'
        x, _, _ = trim(read(src))
        fast = os.path.join(VO, name + '-fast.wav')
        if name.startswith('08-') and os.path.exists(fast):
            xf, _, _ = trim(read(fast))
            use_fast = force08 == 'snel' or (force08 is None and len(x) / SR > 3.4)
            if use_fast: x, src, variant = xf, fast, 'snel'
        words = len(re.findall(r"[\wÀ-ÿ]+", f.get('spoken_text', f['text'])))
        natural = 0.34 * words + 0.35; active = len(x) / SR; tempo = 1.0
        if active > natural * 1.05: tempo = min(MAX_TEMPO, active / natural)
        if tempo > 1.0: x, _, _ = trim(read(src, tempo))
        rms = math.sqrt(float(np.mean(x ** 2)) + 1e-12)
        write(os.path.join(PROC, name + '.wav'), x)
        res[name] = {'actief_s': round(len(x) / SR, 3), 'ruw_s': round(f['duration'], 3), 'tempo': round(tempo, 3), 'variant': variant,
                     'woorden': words, 'rms_dbfs': round(20 * math.log10(rms), 1), 'env': envelope(x)}
        print(f"{name:32s} ruw {f['duration']:5.2f}s → actief {len(x)/SR:5.2f}s  tempo {tempo:4.2f}  {variant}")
    json.dump(res, open(os.path.join(VO, 'durations.json'), 'w'), indent=1)
    if missing: print('ONTBREEKT:', ', '.join(missing))
    print(f'{len(res)} verwerkt → {PROC}; durations.json geschreven')

if __name__ == '__main__':
    main(sys.argv)
