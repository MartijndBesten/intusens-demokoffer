# Voice-over — V2-set

Stemmen: **Switch = Skye via ElevenLabs**, **DALI-2 Broadcast = Andre via ElevenLabs (+1 semitoon, +7 % tempo; V3, definitief)**,
**Rail = Chloe** (goedgekeurde take). Broadcast-bestanden: zie `README-v3-broadcast.txt`.
Bron: V2-ZIP (zie `README-v2.txt`), 16 bestanden mono 48 kHz. `higgsfield-v1-manifest.json` wordt alleen nog gebruikt voor
bestandsnamen en ondertitelteksten (de tekst is ongewijzigd). Regel 08 heeft in V2 geen FAST-variant.

## Status
**Geen audio in de publieke repo.** De stembestanden (`*.wav` e.d.) en `proc/` staan in `.gitignore`. Deze map bevat alleen
documentatie, scripts per karakter, `cues.csv`, `durations.json` (gemeten duren + lipsync-envelopes) en
`higgsfield-v1-manifest.json` (bestandsnamen/teksten, zonder download-URL's). Voor een nieuwe render moeten de 16 WAV's van de
definitieve set lokaal in deze map staan: Switch = Skye (ElevenLabs, V2), Broadcast = Andre (ElevenLabs, V3), Rail = Chloe.

## Bestanden die in deze map moeten staan
Bestandsnamen exact als in het manifest (`filename`), plus de snellere variant van regel 08 als
`08-BC-code-op-display-FAST.wav` (ook `-fast.wav` wordt herkend).

| # | Bestand | Karakter | Tekst |
|---|---|---|---|
| 1 | `01-SW-he-collega.wav` | Switch (Skye) | Hé collega? |
| 2 | `02-BC-al-best-lang.wav` | Broadcast (Orion) | We zitten hier al best lang. |
| 3 | `03-SW-veel-te-lang.wav` | Switch (Skye) | Veel te lang. |
| 4 | `04-BC-neem-ons-mee.wav` | Broadcast (Orion) | Neem ons eens mee naar een installateur. |
| 5 | `05-BC-zo-moeilijk.wav` | Broadcast (Orion) | Kijk. Zo moeilijk ben ik niet. |
| 6 | `06-SW-080.wav` | Switch (Skye) | 080? (uitgesproken: "Nul tachtig?") |
| 7 | `07-BC-even-checken.wav` | Broadcast (Orion) | Even checken? Pak de site erbij. |
| 8 | `08-BC-code-op-display.wav` | Broadcast (Orion) | Code op het display, uitleg op je telefoon. Klaar. |
| 9 | `09-RL-en-ik-dan.wav` | Rail (Chloe) | En ik dan? |
| 10 | `10-SW-jij-ook-op-site.wav` | Switch (Skye) | Jij staat ook op de site. |
| 11 | `11-SW-belangrijkere-vraag.wav` | Switch (Skye) | Maar goed. Belangrijkere vraag… |
| 12 | `12-BC-wie-eerste-vijftig.wav` | Broadcast (Orion) | Wie van ons is als eerste vijftig keer verkocht? |
| 13 | `13-SW-ik.wav` | Switch (Skye) | Ik. |
| 14 | `14-BC-succes.wav` | Broadcast (Orion) | Succes. |
| 15 | `15-SW-pak-die-koffer.wav` | Switch (Skye) | Dus… pak die koffer. |
| 16 | `16-BC-alsjeblieft.wav` | Broadcast (Orion) | Alsjeblieft. |

## Verwerking (volledig automatisch)
```bash
cd video/animatic
python3 vo_prepare.py            # trim stilte + randklikjes, meet actieve duur, regel 08 = FAST, tempo alleen bij duidelijk trage regel (≤ 10 %), lipsync
python3 build_timeline.py        # legt de hele tijdlijn om de echte stemmen heen (doel ≈ 50 s, pauzes min. 85 %)
python3 audio.py ../out/animatic-audio.wav --robot
node render.js --out ../out/frames --scale 0.5 && ./encode.sh ../out/frames ../out/animatic-audio.wav ../out/intusens-preview-v0.9.mp4
```
`vo_prepare.py` schrijft `proc/*.wav` en `durations.json` (actieve duur, tempo, variant, lipsync). `--08=normaal`
forceert de normale versie van regel 08.
