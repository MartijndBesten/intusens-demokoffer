# Voice-over — definitieve TTS-masters (higgsfield-v1)

Stemmen (definitief): **Switch = Skye**, **DALI-2 Broadcast = Orion**, **Rail = Chloe**.
Bron: `higgsfield-v1-manifest.json` (16 droge TTS-masters + een snellere variant van regel 08).

## Status in deze sessie
De WAV-bestanden konden **niet** gedownload worden: de netwerkpolicy van de Claude-omgeving weigert de host
`d8j0ntlcm91z4.cloudfront.net` (403 op de proxy). De bestanden moeten dus op een andere manier in deze map komen.

## Bestanden die in deze map moeten staan
Bestandsnamen exact als in het manifest (`filename`), plus de snellere variant van regel 08 als
`08-BC-code-op-display-fast.wav`.

| # | Bestand | Karakter | Tekst |
|---|---|---|---|
| 1 | `01-SW-he-collega.wav` | Switch (Skye) | Hé collega? |
| 2 | `02-BC-al-best-lang.wav` | Broadcast (Orion) | We zitten hier al best lang. |
| 3 | `03-SW-veel-te-lang.wav` | Switch (Skye) | Veel te lang. |
| 4 | `04-BC-neem-ons-mee.wav` | Broadcast (Orion) | Neem ons eens mee naar een installateur. |
| 5 | `05-BC-zo-moeilijk.wav` | Broadcast (Orion) | Kijk. Zo moeilijk ben ik niet. |
| 6 | `06-SW-080.wav` | Switch (Skye) | 080? (uitgesproken: "Nul tachtig?") |
| 7 | `07-BC-even-checken.wav` | Broadcast (Orion) | Even checken? Pak de site erbij. |
| 8 | `08-BC-code-op-display.wav` + `08-BC-code-op-display-fast.wav` | Broadcast (Orion) | Code op het display, uitleg op je telefoon. Klaar. |
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
python3 vo_prepare.py            # trim stilte, meet actieve duur, kiest 08 normaal/snel, max. 12 % tempo, lipsync-envelope
python3 build_timeline.py        # legt de hele tijdlijn om de echte stemmen heen (doel ≤ 50 s, alleen pauzes compacter)
python3 audio.py ../out/animatic-audio.wav --robot
node render.js --out ../out/frames --scale 0.5 && ./encode.sh ../out/frames ../out/animatic-audio.wav ../out/intusens-preview-v0.9.mp4
```
`vo_prepare.py` schrijft `proc/*.wav` en `durations.json` (actieve duur, tempo, variant, lipsync). `--08=normaal` of
`--08=snel` forceert de variant van regel 08.
