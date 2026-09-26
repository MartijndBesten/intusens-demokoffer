# Voice-over — benodigde bestanden

Eén bestand per regel, mono, 48 kHz, WAV (mp3/flac/ogg mag ook), bestandsnaam exact als hieronder, in deze map.
Spreek de tekst letterlijk; geen extra woorden. Laat de regel binnen de maximale duur blijven (het slot in de film);
korter mag altijd. Lever bij voorkeur droge, onbewerkte stemmen: `audio.py --robot` voegt zelf een lichte robot-kleur toe
(korte chorus/comb + klein elektronisch randje). Al bewerkte stemmen: mix zonder `--robot`.

| # | Bestand | Karakter | Start (s) | Max. duur (s) | Tekst |
|---|---|---|---|---|---|
| 1 | `01-SW-he-collega.wav` | IntuSens Switch | 0.50 | 0.80 | Hé collega? |
| 2 | `02-BC-al-best-lang.wav` | IntuSens DALI-2 Broadcast | 1.60 | 1.30 | We zitten hier al best lang. |
| 3 | `03-SW-veel-te-lang.wav` | IntuSens Switch | 3.20 | 0.70 | Veel te lang. |
| 4 | `04-BC-neem-ons-mee.wav` | IntuSens DALI-2 Broadcast | 4.20 | 1.70 | Neem ons eens mee naar een installateur. |
| 5 | `05-BC-zo-moeilijk.wav` | IntuSens DALI-2 Broadcast | 6.60 | 1.30 | Kijk. Zo moeilijk ben ik niet. |
| 6 | `06-SW-080.wav` | IntuSens Switch | 13.90 | 0.80 | 080? |
| 7 | `07-BC-even-checken.wav` | IntuSens DALI-2 Broadcast | 15.00 | 1.50 | Even checken? Pak de site erbij. |
| 8 | `08-BC-code-op-display.wav` | IntuSens DALI-2 Broadcast | 17.30 | 2.40 | Code op het display, uitleg op je telefoon. Klaar. |
| 9 | `09-RL-en-ik-dan.wav` | IntuSens Rail | 22.40 | 0.80 | En ik dan? |
| 10 | `10-SW-jij-ook-op-site.wav` | IntuSens Switch | 23.50 | 1.00 | Jij staat ook op de site. |
| 11 | `11-SW-belangrijkere-vraag.wav` | IntuSens Switch | 25.50 | 1.30 | Maar goed. Belangrijkere vraag… |
| 12 | `12-BC-wie-eerste-vijftig.wav` | IntuSens DALI-2 Broadcast | 27.10 | 1.80 | Wie van ons is als eerste vijftig keer verkocht? |
| 13 | `13-SW-ik.wav` | IntuSens Switch | 29.15 | 0.40 | Ik. |
| 14 | `14-BC-succes.wav` | IntuSens DALI-2 Broadcast | 30.15 | 0.50 | Succes. |
| 15 | `15-SW-pak-die-koffer.wav` | IntuSens Switch | 43.50 | 0.90 | Dus… pak die koffer. |
| 16 | `16-BC-alsjeblieft.wav` | IntuSens DALI-2 Broadcast | 44.60 | 0.50 | Alsjeblieft. |

## Stemrichting per karakter

- **IntuSens Switch** — iets hoger, sneller, licht brutaal, energiek; subtiele elektronische/robotische verwerking; niet kinderachtig
- **IntuSens DALI-2 Broadcast** — wat lager, droog, rustig maar niet sloom, zelfverzekerd; subtiele robotische verwerking
- **IntuSens Rail** — kort, iets helderder; mengt zich onverwacht van boven in het gesprek

## Verwerking daarna

```bash
cd video/animatic
python3 audio.py ../out/animatic-audio.wav --robot     # plaatst elk bestand op zijn starttijd, meldt te lange regels
node render.js --out ../out/frames --scale 0.5 && ./encode.sh ../out/frames ../out/animatic-audio.wav ../out/intusens-preview-v0.8-vo.mp4
```

Regels die langer blijken dan het slot: pas `t1` (en de regels erna) aan in `animatic/timeline.js`; beeld en audio volgen automatisch.
