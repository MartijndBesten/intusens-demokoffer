"""Maakt de voice-over-cuesheets uit timeline.js: video/vo/README.md, cues.csv en per karakter een script.

Gebruik:  python3 vo_cues.py
Daarna:   spreek/genereer per regel één bestand  video/vo/<vo>.wav  (naam = kolom 'bestand'),
          python3 audio.py ../out/animatic-audio.wav --robot   (of zonder --robot als de stemmen al verwerkt zijn)
"""
import csv, os
from audio import load_timeline

HERE = os.path.dirname(os.path.abspath(__file__)); VO = os.path.join(HERE, '..', 'vo')
T = load_timeline(); os.makedirs(VO, exist_ok=True)
rows = []
for ln in T['lines']:
    rows.append({'bestand': ln['vo'] + '.wav', 'karakter': ln['who'], 'naam': T['who'][ln['who']]['label'],
                 'start_s': f"{ln['t0']:.2f}", 'max_duur_s': f"{ln['t1'] - ln['t0']:.2f}", 'tekst': ln['text']})
with open(os.path.join(VO, 'cues.csv'), 'w', newline='', encoding='utf-8') as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0].keys()), delimiter=';'); w.writeheader(); w.writerows(rows)
for who, meta in T['who'].items():
    with open(os.path.join(VO, f'script-{who}.txt'), 'w', encoding='utf-8') as f:
        f.write(f"{meta['label']} — stemrichting: {meta['voice']}\n\n")
        for r in rows:
            if r['karakter'] == who: f.write(f"{r['bestand']}  (max {r['max_duur_s']} s)\n{r['tekst']}\n\n")
md = ["# Voice-over — benodigde bestanden", "",
      "Eén bestand per regel, mono, 48 kHz, WAV (mp3/flac/ogg mag ook), bestandsnaam exact als hieronder, in deze map.",
      "Spreek de tekst letterlijk; geen extra woorden. Laat de regel binnen de maximale duur blijven (het slot in de film);",
      "korter mag altijd. Lever bij voorkeur droge, onbewerkte stemmen: `audio.py --robot` voegt zelf een lichte robot-kleur toe",
      "(korte chorus/comb + klein elektronisch randje). Al bewerkte stemmen: mix zonder `--robot`.", "",
      "| # | Bestand | Karakter | Start (s) | Max. duur (s) | Tekst |", "|---|---|---|---|---|---|"]
for i, r in enumerate(rows, 1):
    md.append(f"| {i} | `{r['bestand']}` | {r['naam']} | {r['start_s']} | {r['max_duur_s']} | {r['tekst']} |")
md += ["", "## Stemrichting per karakter", ""]
for who, meta in T['who'].items(): md.append(f"- **{meta['label']}** — {meta['voice']}")
md += ["", "## Verwerking daarna", "", "```bash", "cd video/animatic", "python3 audio.py ../out/animatic-audio.wav --robot     # plaatst elk bestand op zijn starttijd, meldt te lange regels",
       "node render.js --out ../out/frames --scale 0.5 && ./encode.sh ../out/frames ../out/animatic-audio.wav ../out/intusens-preview-v0.8-vo.mp4", "```", "",
       "Regels die langer blijken dan het slot: pas `t1` (en de regels erna) aan in `animatic/timeline.js`; beeld en audio volgen automatisch."]
open(os.path.join(VO, 'README.md'), 'w', encoding='utf-8').write('\n'.join(md) + '\n')
print('cues:', len(rows), '→', VO)
