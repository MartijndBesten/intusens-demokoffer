# IntuSens promofilm — "pratende sensoren"

Korte film (± 30 s) waarin de **IntuSens Switch** en de **IntuSens DALI-2 Broadcast** vanuit de
demokoffer met elkaar praten. Toon: intern grapje dat toevallig ook echte productuitleg geeft.
Stijl: premium TRILUX corporate animation, donkerblauw / zwart / wit / koelblauw, 2.5D/3D, droog.

Status: **animatic v0.6 — laatste animatic-iteratie** (low-res). Volgende fase is polish: scherpe Broadcast-still,
stemmen, sound design, typografie, eventueel twee Higgsfield-videoshots. Nog géén high-res of externe video-generaties.

Vaste besluiten (niet meer wijzigen):
- **IntuSens Switch = wit, IntuSens DALI-2 Broadcast = zwart** (koffer, `src/data.js`, echte foto's zijn leidend;
  de bestandsnamen in het Higgsfield-pakket zijn verwisseld en worden genegeerd).
- Higgsfield-karakters zijn de vaste visuele identiteit: geen redesign, geen mensen/armen/benen, gezichtjes subtiel.
- Bediening, telefoon, website, teksten en tellers blijven gecontroleerde montage. Alleen twee karaktershots zijn
  later eventueel door hoogwaardige Higgsfield-video te vervangen: **S1 opening in de koffer (0,0–6,5 s)** en
  **S5 face-off vlak vóór de race (25,9–32,4 s)**. Beide zijn in `index.html` losse scènes met één achtergrondplaat
  (`assets/koffer-plate-ext.png`, `assets/race-plate.png`) plus de gezichts-rig eroverheen.

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

## Script en timing (v0.6, 45,3 s tot zwart)

| t (s) | Scène | Beeld | Dialoog |
|---|---|---|---|
| 0,0–6,5 | S1 Koffer | Koffer-styleframe, rustige push-in; blikken, beat vóór "Veel te lang", tilt + mini-bounce | SW *Hé collega?* · BC *We zitten hier al best lang.* · SW *Veel te lang.* · BC *Neem ons eens mee naar een installateur.* |
| 6,5–8,1 | S2a | Broadcast (zwart) komt naar voren, Switch (wit) gluurt links | BC *Kijk. Zo moeilijk ben ik niet.* |
| 8,1–13,9 | S2b Bediening | Echte foto (drukknop ingedrukt) met gereconstrueerd 7-segment-display: leeg (0,9 s, label *Drukknop 3 s vasthouden*) → 3 → 2 → 1 (1,8 s, alleen display) → ULC (1,2 s, label pas bij ULC) → 080 + LED licht (1,9 s, label pas bij 080) | — |
| 13,9–22,6 | S3 Website | Match-cut: zelfde display met 080 links; echte site op telefoon rechts (16,0), verbindingslijn 080 → 080 (17,1); camera-push naar de telefoon (20,1) en 2,5 s hold op de site | SW *080?* · BC *Even checken? Pak de site erbij.* · BC *Code op het display, uitleg op je telefoon. Klaar.* |
| 22,6–25,9 | S4 Rail-cameo | Bij "En ik dan?" kantelt de camera omhoog naar de echte witte Rail (K03) in het deksel: lichtaccent, gezichtje, bounce, label INTUSENS RAIL (1,1 s); camera zakt iets terug, Switch kijkt omhoog en antwoordt; Rail reageert droog tevreden (3,3 s) | RL *En ik dan?* · SW *Jij staat ook op de site.* |
| 25,9–32,4 | S5 Face-off | Race-styleframe; 0,6 s reactietijd tussen "Ik." en "Succes."; tellers 00/00 → 12/18 → 27/31 → 43/46 (31,2 / 31,6 / 32,0) | SW *Maar goed. Belangrijkere vraag…* · BC *Wie van ons is als eerste vijftig keer verkocht?* · SW *Ik.* · BC *Succes.* |
| 32,4–34,7 | Eindkaart A | **Switch vs Broadcast — RACE NAAR 50 — Welk product is als eerste vijftig keer verkocht?** | — |
| 34,7–43,1 | Eindkaart B | **En voor jou — VERKOOP MINIMAAL 50 LOSSE SENSOREN** · *in één keer voor de grijpvoorraad* (kleiner) · **Dan ligt er voor jou ook iets te grijpen.** · kader **PROJECTORDERS TELLEN NIET MEE** · onderaan klein `intusens-demokoffer.nl` en *Concept & realisatie · Martijn den Besten*; volledig opgebouwd vanaf ± 36,1 s → 7,0 s stil leesbaar | — |
| 43,1–45,3 | Slot | Face-off; Broadcast kijkt naar de kijker en geeft nog één droge blik naar Switch | SW *Dus… pak die koffer.* · BC *Alsjeblieft.* |
| 45,3 | | Cut naar zwart | |

### Rail-cameo (S4) — bron en opbouw
- In het echte deksel zitten twee Rail-toonmodellen: **K03 IntuSens Rail wit** (bovenste balk) en **K04 IntuSens Rail
  zwart** (balk eronder), zie `src/data.js` → `koffer.stages[deksel].hotspots` en `assets/processed/koffer-deksel-tray.jpg`.
- De sprekende Rail is de witte K03: uitsnede (met het zwarte schuim eromheen) uit `koffer-deksel-tray.jpg`, licht
  gegradeerd naar de filmwereld en in een 300 px dekselverlenging van het koffer-styleframe geplaatst
  (`animatic/assets/koffer-plate-ext.png`). De getekende donkere balk uit het styleframe ligt eronder, op de plek van K04.
- Gezichtje in dezelfde rig (blauwe ogen, mond, tilt/bounce), geen armen/benen; label INTUSENS RAIL 1,1 s.

### Display-animatie (S2b) — hoe en waarom
- Basis is de echte foto `assets/processed/bediening-broadcast-03.jpg` (vinger op de drukknop, display nog leeg), als
  `video/animatic/assets/display-base.jpg` met uitsluitend de specular reflectiestreep in het displaygebied
  weggeretoucheerd. De sensor zelf is niet opnieuw gegenereerd of ontworpen.
- Alleen het displaygebied (boven de lens, over het TRILUX-logo) krijgt een grafisch 7-segment-display in SVG:
  segmentvorm, wit-blauwe kern en zachte blauwe gloed naar de referentiefoto's 01 (2), 04 (ULC) en 05 (080).
- Reeks en teksten volgen letterlijk `src/data.js` → `bediening.sales.broadcast.flow`: 3 → 2 → 1 → ULC, daarna 080
  met de LED "licht" aan (fabrieksinstelling 80 %). Geen extra codes of stappen.
- De echte foto's 01, 04 en 05 blijven technische referentie (`assets/processed/`) en staan niet meer als harde
  beeldwissels in de film.

## Productkleur (definitief)

In het Higgsfield-pakket heet de **witte** sensor "broadcast-character" en de **zwarte** "switch-character".
De repo (en de koffer zelf) zegt het omgekeerde: **K01 Switch = wit, opbouw; K02 DALI-2 Broadcast = zwart, inbouw**
(zie `src/data.js`, `assets/processed/k01-switch.jpg`, `k02-broadcast.jpg`, `bediening-broadcast-*.jpg`).
Styleframe 04 van het pakket zelf toont de Broadcast ook als donkere sensor met display.

De animatic volgt de technische waarheid: **Switch = witte karakter-render, Broadcast = zwarte
karakter-render.** Persoonlijkheden blijven bij de naam (Switch bijdehand, Broadcast droog).
Het race-styleframe is daarvoor horizontaal gespiegeld zodat Switch links staat, net als in de koffer.
Door Martijn bevestigd als definitief (v0.3).

## Lokaal draaien

```bash
# in de repo-root
python3 -m http.server 8765 --bind 127.0.0.1
# browser: http://127.0.0.1:8765/video/animatic/index.html?hud=1   (scrubber onderin)

cd video/animatic
node render.js --stills 1.0,7.6,12.4 --out ../out/stills     # compositiecheck
node render.js --out ../out/frames --scale 0.5                # 960x540, 24 fps
python3 audio.py ../out/animatic-audio.wav
./encode.sh ../out/frames ../out/animatic-audio.wav ../out/intusens-animatic-v0.6.mp4
```

Vereist: Playwright (Chromium), Python 3 met Pillow/numpy (alleen voor assets), ffmpeg
(`pip install imageio-ffmpeg` volstaat).

## Volgende stappen (pas na akkoord op dialoog en timing)

1. Echte stemmen (of TTS-proef) op de regels uit `timeline.js`; blips vervangen.
2. Premium belichting: schone Higgsfield-renders zonder ingebakken ogen (nu weggeretoucheerd), diepte-lagen voor
   parallax, reflecties; nieuwe scherpe Broadcast-characterstill (zie HANDOFF).
3. Meer motion: ademen, ring-"draai" bij Broadcast op de bedieningsfoto's, lichtsweeps.
4. Sound design: kofferklik, display-piep, ring-ratel, tellertikken, roomtone.
5. Definitieve typografie (TRILUX-huisstijlfont) en eindkaart.
6. High-res export 1920×1080 (`--scale 1`), evt. 9:16-variant.
