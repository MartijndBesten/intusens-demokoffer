# IntuSens promofilm — "pratende sensoren"

Korte film (± 30 s) waarin de **IntuSens Switch** en de **IntuSens DALI-2 Broadcast** vanuit de
demokoffer met elkaar praten. Toon: intern grapje dat toevallig ook echte productuitleg geeft.
Stijl: premium TRILUX corporate animation, donkerblauw / zwart / wit / koelblauw, 2.5D/3D, droog.

Status: **animatic v0.1** (low-res preview, dialoog en timing). Nog géén polish.

## Mappen

| Pad | Inhoud |
|---|---|
| `animatic/index.html` | De film als deterministische HTML-tijdlijn (`window.seek(t)`), 1920×1080-stage. Open lokaal via een http-server op de repo-root om te scrubben/afspelen. |
| `animatic/timeline.js` | **Enige bron** voor scènes, dialoogregels, tijden, fotovolgorde, tellerstappen. Beeld én audio lezen hieruit. |
| `animatic/render.js` | Rendert frames (Playwright/Chromium). `--stills` voor compositiechecks. |
| `animatic/audio.py` | Placeholder-audio (spraak-blips per regel, thump per cut, tik per tellerstap). Alleen voor timing. |
| `animatic/encode.sh` | Frames + wav → mp4 (H.264). |
| `animatic/assets/` | Afgeleide werkbestanden: cut-outs met alpha, "gezichtsplaten" (ogen/mond geneutraliseerd), website-screenshots, display-crop. |
| `reference/higgsfield/` | Het aangeleverde visuele pakket (karakters + styleframes). Vaste visuele identiteit; niet redesignen. |
| `out/` | Renders (niet in git). |

Technische waarheid komt uit de repo zelf: `assets/processed/*` (echte foto's) en `src/data.js`
(bedieningsteksten). De website op de telefoon is een screenshot van deze repo op mobiel formaat
(`#/bediening/broadcast`, stap 2 Lichtdrempel) — dezelfde code die op
[intusens-demokoffer.nl](https://intusens-demokoffer.nl) draait.

## Script en timing (v0.1)

| t (s) | Scène | Beeld | Dialoog |
|---|---|---|---|
| 0,0–6,7 | S1 Koffer | Higgsfield-koffer-styleframe, langzame push-in, live gezichten | SW *Hé collega?* · BC *We zitten hier al best lang.* · SW *Veel te lang.* · BC *Neem ons eens mee naar een installateur.* |
| 6,7–8,5 | S2a | Broadcast komt naar voren, Switch gluurt links | BC *Kijk. Zo moeilijk ben ik niet.* |
| 8,5–12,0 | S2b | Echte bedieningsfoto's 03 → 01 → 04 → 05 (vasthouden · 3→2→1 · ULC · 080) | — |
| 12,0–17,6 | S3 Website | Display-crop "080" links, telefoon met echte site rechts, verbindingslijn | SW *080?* · BC *Even checken? Pak de site erbij.* · BC *Code op het display, uitleg op je telefoon. Klaar.* |
| 17,6–20,5 | S4 | Terug in de koffer, koffer trilt, twee oogparen in het dekselvak | REST *Hallo? Wij zitten er óók nog in.* · SW *Jullie komen ook op de site.* |
| 20,5–26,2 | S5 Face-off | Race-styleframe, tellers 00/00 → 12/18 → 27/31 → 43/46 | SW *Maar goed. Belangrijkere vraag…* · BC *Wie haalt als eerste de vijftig?* · SW *Ik.* · BC *Succes.* |
| 26,2–28,4 | Titelkaart | RACE NAAR 50 · Los verkocht voor de grijpvoorraad van installateurs · Projectorders tellen niet mee | — |
| 28,4–30,6 | Slot | Face-off | SW *Dus… pak die koffer.* · BC *Alsjeblieft.* |
| 30,6 | | Cut naar zwart | |

Bedieningsteksten in beeld (chips) zijn letterlijk uit `src/data.js` (`bediening.sales.broadcast.flow`):
3 s vasthouden · 3 → 2 → 1 → ULC · ULC = ontgrendeld · 080 = lichtdrempel, fabrieksinstelling 80 %.
Er is geen bedieningsstap toegevoegd die niet op de foto's of in de site staat.

## Belangrijke keuze: productkleur

In het Higgsfield-pakket heet de **witte** sensor "broadcast-character" en de **zwarte** "switch-character".
De repo (en de koffer zelf) zegt het omgekeerde: **K01 Switch = wit, opbouw; K02 DALI-2 Broadcast = zwart, inbouw**
(zie `src/data.js`, `assets/processed/k01-switch.jpg`, `k02-broadcast.jpg`, `bediening-broadcast-*.jpg`).
Styleframe 04 van het pakket zelf toont de Broadcast ook als donkere sensor met display.

De animatic volgt de technische waarheid: **Switch = witte karakter-render, Broadcast = zwarte
karakter-render.** Persoonlijkheden blijven bij de naam (Switch bijdehand, Broadcast droog).
Het race-styleframe is daarvoor horizontaal gespiegeld zodat Switch links staat, net als in de koffer.
Zie VRAGEN in `HANDOFF.md` als dit anders moet.

## Lokaal draaien

```bash
# in de repo-root
python3 -m http.server 8765 --bind 127.0.0.1
# browser: http://127.0.0.1:8765/video/animatic/index.html?hud=1   (scrubber onderin)

cd video/animatic
node render.js --stills 1.0,7.6,12.4 --out ../out/stills     # compositiecheck
node render.js --out ../out/frames --scale 0.5                # 960x540, 24 fps
python3 audio.py ../out/animatic-audio.wav
./encode.sh                                                    # → ../out/intusens-animatic-v0.1.mp4
```

Vereist: Playwright (Chromium), Python 3 met Pillow/numpy (alleen voor assets), ffmpeg
(`pip install imageio-ffmpeg` volstaat).

## Volgende stappen (pas na akkoord op dialoog en timing)

1. Echte stemmen (of TTS-proef) op de regels uit `timeline.js`; blips vervangen.
2. Premium belichting: karakter-cut-outs vervangen door schone renders zonder ingebakken ogen
   (nu weggeretoucheerd), diepte-lagen voor parallax, reflecties.
3. Meer motion: ademen, ring-"draai" bij Broadcast op de bedieningsfoto's, lichtsweeps.
4. Sound design: kofferklik, display-piep, ring-ratel, tellertikken, roomtone.
5. Definitieve typografie (TRILUX-huisstijlfont) en eindkaart.
6. High-res export 1920×1080 (`--scale 1`), evt. 9:16-variant.
