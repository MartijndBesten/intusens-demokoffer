"""Placeholder-audio voor de animatic (alleen timing, geen sound design).

Per dialoogregel: korte 'spraak-blips' in het ritme van lettergrepen, met een
eigen toonhoogte per karakter (Switch hoger/scherper, Broadcast lager/ronder).
Verder: zachte 'thump' bij elke scènewissel, tik bij elke tellerstap.
Leest timeline.js (dezelfde bron als index.html). Schrijft een 48 kHz mono WAV.

Gebruik:  python3 audio.py ../out/animatic-audio.wav
"""
import json, math, re, struct, sys, wave

SR = 48000

def load_timeline():
    src = open(__file__.replace('audio.py', 'timeline.js'), encoding='utf-8').read()
    body = src[src.index('var T = {') + len('var T = '):src.index('root.TIMELINE')]
    body = body.rstrip().rstrip(';')
    # JS-objectliteral → JSON: sleutels quoten, trailing comma's weg, enkele quotes → dubbele
    body = re.sub(r"//[^\n]*", "", body)
    body = re.sub(r"([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:", r'\1"\2":', body)
    body = body.replace("'", '"')
    body = re.sub(r",(\s*[}\]])", r"\1", body)
    return json.loads(body)

def env(i, n, a=0.004, r=0.03):
    t = i / SR; d = n / SR
    return min(1.0, t / a, max(0.0, (d - t) / r))

def blip(buf, t0, dur, freq, gain, shape='sine'):
    n = int(dur * SR); s0 = int(t0 * SR)
    for i in range(n):
        ph = 2 * math.pi * freq * i / SR
        v = math.sin(ph) if shape == 'sine' else (math.sin(ph) + 0.35 * math.sin(2 * ph) + 0.15 * math.sin(3 * ph))
        j = s0 + i
        if 0 <= j < len(buf): buf[j] += v * gain * env(i, n)

def thump(buf, t0, gain=0.5):
    n = int(0.16 * SR); s0 = int(t0 * SR)
    for i in range(n):
        f = 90 * (1 - 0.5 * i / n)
        v = math.sin(2 * math.pi * f * i / SR) * math.exp(-i / (0.05 * SR))
        j = s0 + i
        if 0 <= j < len(buf): buf[j] += v * gain

def tick(buf, t0, gain=0.35):
    blip(buf, t0, 0.035, 1400, gain)

VOICE = {'SW': (560, 'saw', 0.28), 'BC': (270, 'sine', 0.32), 'MR': (430, 'sine', 0.22)}

def main(out):
    T = load_timeline()
    total = int(T['duration'] * SR)
    buf = [0.0] * total
    for ln in T['lines']:
        f, shape, g = VOICE[ln['who']]
        t = ln['t0']; k = 0
        while t < ln['t1'] - 0.05:
            # lettergreepritme ~ 6,5/s met kleine variatie; toonhoogte licht wisselend
            fr = f * (1 + 0.06 * math.sin(k * 1.7)) * (1.12 if ln['text'].endswith('?') and t > ln['t1'] - 0.35 else 1)
            blip(buf, t, 0.075, fr, g, shape)
            t += 0.155 + 0.04 * math.sin(k * 2.3); k += 1
    for sc in T['scenes'][1:]:
        thump(buf, sc['t0'])
    thump(buf, T['cuts']['s2b'], 0.35)  # cut naar bedieningsfoto's
    for s in T['counter']['steps']:
        tick(buf, s[0])
    for st in T.get('display', {}).get('steps', []):   # zachte klik per displaystap
        tick(buf, st[0], 0.18)
    tick(buf, T['counter']['show'], 0.25)
    thump(buf, T['cardA']['t0'], 0.6)
    thump(buf, T['cardB']['t0'], 0.45)
    peak = max(1e-6, max(abs(v) for v in buf))
    norm = 0.5 / peak
    with wave.open(out, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes(b''.join(struct.pack('<h', int(max(-1, min(1, v * norm)) * 32767)) for v in buf))
    print('wrote', out, f'{T["duration"]}s')

if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else 'animatic-audio.wav')
