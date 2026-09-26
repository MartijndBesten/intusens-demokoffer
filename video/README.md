# IntuSens promofilm — "pratende sensoren"

Korte film (± 30 s) waarin de **IntuSens Switch** en de **IntuSens DALI-2 Broadcast** vanuit de
demokoffer met elkaar praten. Toon: intern grapje dat toevallig ook echte productuitleg geeft.
Stijl: premium TRILUX corporate animation, donkerblauw / zwart / wit / koelblauw, 2.5D/3D, droog.

Status: **v0.9 — polish-preview met echte stemmen** (Skye/Orion/Chloe, subtiele robot-kleur), losse karakterlagen met
micro-acting, lichte tech-groove en fysieke cues. 50.5 s tot zwart. Nog géén high-res final.

Vaste besluiten (niet meer wijzigen):
- **IntuSens Switch = wit, IntuSens DALI-2 Broadcast = zwart** (koffer, `src/data.js`, echte foto's zijn leidend;
  de bestandsnamen in het Higgsfield-pakket zijn verwisseld en worden genegeerd).
- Higgsfield-karakters zijn de vaste visuele identiteit: geen redesign, geen mensen/armen/benen, gezichtjes subtiel.
- Bediening, telefoon, website, teksten en tellers blijven gecontroleerde montage. Alleen twee karaktershots zijn
  later eventueel door hoogwaardige Higgsfield-video te vervangen: **S1 opening in de koffer (0,0–6,3 s)** en
  **S5 face-off vlak vóór de race (25,2–32,9 s)**. Beide zijn in `index.html` losse scènes met één achtergrondplaat
  (`assets/koffer-plate-ext.png`, `assets/race-plate.png`) plus de gezichts-rig eroverheen.

## Mappen

| Pad | Inhoud |
|---|---|
| `animatic/index.html` | De film als deterministische HTML-tijdlijn (`window.seek(t)`), 1920×1080-stage. Open lokaal via een http-server op de repo-root om te scrubben/afspelen. |
| `animatic/timeline.js` | **Gegenereerd** door `build_timeline.py` (v0.9). Beeld én audio lezen hieruit; niet met de hand bewerken. |
| `animatic/render.js` | Rendert frames (Playwright/Chromium). `--stills` voor compositiechecks. |
| `animatic/audio.py` | Mix v0.8: plaatst voice-over-bestanden uit `video/vo/` op hun starttijd (optioneel `--robot` voor lichte robot-kleur), lichte tech-pulse-soundbed (104 bpm, majeur, duckt onder VO en tijdens de saleskaart), gesynthetiseerde fysieke cues. |
| `animatic/make_layers.py` | v0.9: maakt losse karakterlagen (Switch, Broadcast, Rail) + schone achtergrondplaten uit dezelfde Higgsfield-renders (`assets/k-*.png`, `r-*.png`, `koffer-clean-ext.png`, `race-clean.png`, `layers.json/js`). Geen redesign: letterlijke uitsneden. |
| `animatic/vo_prepare.py` | v0.9: trimt stilte, meet actieve spreekduur, kiest variant regel 08, begrensde tempo-correctie (≤ 12 %), lipsync-envelope → `vo/proc/`, `vo/durations.json`. |
| `animatic/build_timeline.py` | v0.9: genereert `timeline.js` om de echte stemmen heen; alle acting is relatief aan regels; vaste blokken blijven even lang. |
| `animatic/vo_cues.py` | (v0.8) cuesheets voor lege slots; vervangen door het manifest. |
| `vo/` | Voice-over-cuesheets en (na aanlevering) de 16 stembestanden. |
| `animatic/encode.sh` | Frames + wav → mp4 (H.264). |
| `animatic/assets/` | Afgeleide werkbestanden: cut-outs met alpha, "gezichtsplaten" (ogen/mond geneutraliseerd), website-screenshots, display-crop. |
| `reference/higgsfield/` | Het aangeleverde visuele pakket (karakters + styleframes). Vaste visuele identiteit; niet redesignen. |
| `out/` | Renders (niet in git). |

Technische waarheid komt uit de repo zelf: `assets/processed/*` (echte foto's) en `src/data.js`
(bedieningsteksten). De website op de telefoon is een screenshot van deze repo op mobiel formaat
(`#/bediening/broadcast`, stap 2 Lichtdrempel) — dezelfde code die op
[intusens-demokoffer.nl](https://intusens-demokoffer.nl) draait.

## Script en timing (v0.8, 45,5 s tot zwart)

| t (s) | Scène | Beeld | Dialoog (voice-over-slot: start–max. einde) |
|---|---|---|---|
| 0,0–6,3 | S1 Koffer | Koffer-styleframe, rustige push-in, blikken, beat vóór "Veel te lang" | SW 0,5–1,3 *Hé collega?* · BC 1,6–2,9 *We zitten hier al best lang.* · SW 3,2–3,9 *Veel te lang.* · BC 4,2–5,9 *Neem ons eens mee naar een installateur.* |
| 6,3–7,9 | S2a | Broadcast (zwart) komt naar voren, Switch (wit) gluurt links | BC 6,6–7,9 *Kijk. Zo moeilijk ben ik niet.* |
| 7,9–13,7 | S2b Bediening | Echte foto met 7-segment-display: leeg → 3 (8,8) → 2 → 1 → ULC (10,6) → 080 + LED (11,8); ongewijzigd in lengte | — |
| 13,7–22,1 | S3 Website | Match-cut 080, site op telefoon (15,7), lijn 080 → 080 (16,8), push (19,6) en 2,5 s hold; ongewijzigd in lengte | SW 13,9–14,7 *080?* · BC 15,0–16,5 *Even checken? Pak de site erbij.* · BC 17,3–19,7 *Code op het display, uitleg op je telefoon. Klaar.* |
| 22,1–25,2 | S4 Rail-cameo | Compact (3,1 s), beeld ongewijzigd | RL 22,4–23,2 *En ik dan?* · SW 23,5–24,5 *Jij staat ook op de site.* |
| 25,2–32,9 | S5 Face-off | SW 25,5–26,8 · 0,3 s · BC 27,1–28,9 · 0,25 s · SW *Ik.* 29,15–29,55 · **0,6 s beat** · BC *Succes.* 30,15–30,65 · **0,45 s droge blik** · tellers 31,1 (31,7 / 32,1 / 32,5) | SW *Maar goed. Belangrijkere vraag…* · BC *Wie van ons is als eerste vijftig keer verkocht?* · SW *Ik.* · BC *Succes.* |
| 32,9–34,9 | Eindkaart A | RACE NAAR 50 (ongewijzigd) | — |
| 34,9–43,3 | Eindkaart B | Challengekaart + handtekening (ongewijzigd), 7,0 s stil leesbaar | — |
| 43,3–45,5 | Slot | Face-off, droge blik 45,2, klik, zwart 45,5 + koffer-dicht | SW 43,5–44,4 *Dus… pak die koffer.* · BC 44,6–45,1 *Alsjeblieft.* |

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
./encode.sh ../out/frames ../out/animatic-audio.wav ../out/intusens-preview-v0.9.mp4
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
