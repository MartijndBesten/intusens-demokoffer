"""Bereidt de Nederlandse TTS-masters voor (v0.9, Skye/Orion/Chloe). Leest video/vo/<naam>.wav, schrijft video/vo/proc/<naam>.wav
en video/vo/durations.json. Daarna: python3 build_timeline.py (tijdlijn om de echte stemmen heen).

Per bestand:
1. Trim alleen echte stilte aan begin/eind (10 ms-frames; drempel = max(-50 dBFS, piek-rms - 40 dB); 40 ms voorloop en
   90 ms uitloop). Losse klikjes aan de randen (< 150 ms, > 0,45 s van de spraak) worden niet als spraak gezien.
   Interne pauzes > 0,75 s worden ingekort tot 0,75 s (knip in stilte, geen timestretch).
2. Meet de actieve spreekduur.
3. 08-BC-code-op-display: standaard de FAST-variant (08-BC-code-op-display-FAST.wav); normaal alleen met --08=normaal.
4. Tempo: alleen als een regel na trimmen duidelijk traag is (> 0,45 s/woord + 0,6 s) wordt hij versneld met ffmpeg
   atempo (toonhoogte gelijk), nooit meer dan 10 %. Anders ongewijzigd.
5. Mond-envelope per regel op 24 fps (0..1) voor lipsync in de animatie.
"""
import json, math, os, re, subprocess, sys
import numpy as np

SR = 48000; FPS = 24
HERE = os.path.dirname(os.path.abspath(__file__)); VO = os.environ.get('IS_VO_DIR') or os.path.normpath(os.path.join(HERE, '..', 'vo')); PROC = os.path.join(VO, 'proc')
MAX_TEMPO = 1.10

def ff():
    try:
        import imageio_ffmpeg; return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception: return 'ffmpeg'

def read(path, tempo=1.0):
    af = ['-af', f'atempo={tempo:.4f}'] if abs(tempo - 1) > 1e-3 else []
    r = subprocess.run([ff(), '-v', 'error', '-i', path, *af, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True)
    if r.returncode: raise RuntimeError(r.stderr.decode()[-300:])
    return np.frombuffer(r.stdout, dtype='<f4').astype(float)

def segments(x):
    """Klanksegmenten (10 ms-frames boven drempel), gaten < 80 ms samengevoegd."""
    n = int(0.010 * SR); fr = len(x) // n
    db = np.array([20 * math.log10(math.sqrt(float(np.mean(x[i * n:(i + 1) * n] ** 2))) + 1e-12) for i in range(fr)])
    thr = max(-50.0, db.max() - 40.0); act = db > thr; segs = []; i = 0
    while i < fr:
        if act[i]:
            j = i
            while j < fr and act[j]: j += 1
            if segs and i - segs[-1][1] < 8: segs[-1][1] = j
            else: segs.append([i, j])
            i = j
        else: i += 1
    return [(a * n, b * n) for a, b in segs]

def trim(x, max_pause=0.75):
    """Trimt stilte aan begin/eind. Korte losse klikjes aan de randen (< 150 ms, > 0,45 s van de spraak) tellen niet
    als spraak. Interne pauzes langer dan max_pause worden ingekort tot max_pause (geen timestretch van de stem)."""
    segs = segments(x)
    if not segs: return x, 0, len(x)
    short = lambda s: (s[1] - s[0]) < 0.15 * SR
    pk = lambda s: 20 * math.log10(float(np.max(np.abs(x[s[0]:s[1]]))) + 1e-12)
    top = max(pk(s) for s in segs)
    quiet = lambda s: pk(s) < top - 25                               # zacht klikje (bv. start van het bestand)
    while len(segs) > 1 and short(segs[0]) and (segs[1][0] - segs[0][1] > 0.45 * SR or quiet(segs[0])): segs.pop(0)
    while len(segs) > 1 and short(segs[-1]) and (segs[-1][0] - segs[-2][1] > 0.45 * SR or quiet(segs[-1])): segs.pop()
    a = max(0, segs[0][0] - int(0.040 * SR)); b = min(len(x), segs[-1][1] + int(0.090 * SR))
    out = []; cur = a; fade = int(0.015 * SR)
    for k in range(1, len(segs)):
        gap0, gap1 = segs[k - 1][1], segs[k][0]
        if gap1 - gap0 > max_pause * SR:
            keep = int(max_pause * SR); cut0 = gap0 + keep // 2; cut1 = gap1 - keep // 2
            out.append(x[cur:cut0]); cur = cut1
    out.append(x[cur:b])
    y = out[0]
    for part in out[1:]:                                      # korte crossfade op de knip (in stilte)
        r = np.linspace(0, 1, fade); y = np.concatenate([y[:-fade], y[-fade:] * (1 - r) + part[:fade] * r, part[fade:]])
    return y, a, b

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
        full = read(src); raw_len = len(full) / SR
        x, _, _ = trim(full)
        fast = next((p for p in (os.path.join(VO, name + '-FAST.wav'), os.path.join(VO, name + '-fast.wav')) if os.path.exists(p)), None)
        if name.startswith('08-') and fast and force08 != 'normaal':
            # Martijn: eerst de FAST-versie; normaal alleen als die natuurlijker past (--08=normaal)
            x, _, _ = trim(read(fast)); src, variant = fast, 'snel'
        words = len(re.findall(r"[\wÀ-ÿ]+", f.get('spoken_text', f['text'])))
        # alleen versnellen als een regel na trimmen duidelijk traag is (> 0,45 s/woord + 0,6 s); anders ongemoeid
        slow = 0.45 * words + 0.6; active = len(x) / SR; tempo = 1.0
        if active > slow: tempo = min(MAX_TEMPO, active / slow)
        if tempo > 1.0: x, _, _ = trim(read(src, tempo))
        # randcontrole: begint/eindigt het BRONbestand midden in klank? (dan is er waarschijnlijk iets afgekapt)
        src_full = read(src); dbr = lambda s_: 20 * math.log10(math.sqrt(float(np.mean(s_ ** 2))) + 1e-12)
        pk = max(dbr(src_full[i:i + 480]) for i in range(0, len(src_full) - 480, 480))
        edge = ('BEGIN-AFGEKAPT? ' if dbr(src_full[:int(.02 * SR)]) > pk - 30 else '') + ('EIND-AFGEKAPT?' if dbr(src_full[-int(.02 * SR):]) > pk - 30 else '')
        # declick: 5 ms fade-in, 15 ms fade-out (herstelt geen afgekapt geluid, voorkomt alleen een tik)
        fi, fo = int(.005 * SR), int(.015 * SR); x = x.copy(); x[:fi] *= np.linspace(0, 1, fi); x[-fo:] *= np.linspace(1, 0, fo)
        rms = math.sqrt(float(np.mean(x ** 2)) + 1e-12)
        write(os.path.join(PROC, name + '.wav'), x)
        res[name] = {'actief_s': round(len(x) / SR, 3), 'ruw_s': round(raw_len, 3), 'rand': edge, 'tempo': round(tempo, 3), 'variant': variant,
                     'woorden': words, 'rms_dbfs': round(20 * math.log10(rms), 1), 'env': envelope(x)}
        print(f"{name:32s} ruw {raw_len:5.2f}s → actief {len(x)/SR:5.2f}s  tempo {tempo:4.2f}  {variant:7s} {edge}")
    json.dump(res, open(os.path.join(VO, 'durations.json'), 'w'), indent=1)
    if missing: print('ONTBREEKT:', ', '.join(missing))
    print(f'{len(res)} verwerkt → {PROC}; durations.json geschreven')

if __name__ == '__main__':
    main(sys.argv)
