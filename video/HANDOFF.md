# HANDOFF — IntuSens promofilm

**Status:** animatic v0.2 gereed (low-res bewegende preview met dialoog, timing, mond-/oog-/kantelbewegingen en placeholder-audio). Storyboard en visuele richting zijn door Martijn akkoord bevonden (2026-09-26).
**Bijgewerkt:** 2026-09-26.
**Volgende actor:** Martijn — beoordeel de bewegende animatic v0.2 (timing, dialoog, ondertitels op mobiel) en beantwoord vraag 1–3 voordat er polish komt.

## Gedaan
- v0.2: ondertitels 78 px (mobiel leesbaar), bediening → 080 → website verlengd (S2b 4,8 s, S3 7,3 s incl.
  camera-push naar de echte site op de telefoon), eindkaart gesplitst in A (grapwedstrijd Switch vs Broadcast) en
  B (saleschallenge: verkoop 50 losse sensoren voor de grijpvoorraad; *Projectorders tellen niet mee* groot in kader).
  Totale lengte ± 33,6 s.
- Eerdere video-opzetten losgelaten; nieuwe versie rond pratende sensoren gebouwd in `video/`.
- Higgsfield-pakket als vaste visuele identiteit opgenomen (`video/reference/higgsfield/`), karakters niet
  geredesignd; ogen/mond van de renders geneutraliseerd en vervangen door een live gezichts-rig
  (knipperen, kijkrichting, mondopening op dialoogritme, kantelen).
- Vijf scènes conform script, inclusief echte bedieningsfoto's (03 → 01 → 04 → 05) en de
  echte website (mobiel screenshot van deze repo, `#/bediening/broadcast`, stap Lichtdrempel 080) op een telefoon.
- Tellers 00 → 12/18 → 27/31 → 43/46 (stopt vóór 50), daarna eindkaart A (RACE NAAR 50) en B (saleschallenge).
- Render-pipeline: HTML-tijdlijn → Playwright-frames → ffmpeg, plus placeholder-audio uit dezelfde tijdlijn.

## Bestanden
`video/README.md`, `video/animatic/{index.html,timeline.js,render.js,audio.py,encode.sh}`,
`video/animatic/assets/*`, `video/reference/higgsfield/*`. Renders staan in `video/out/` (niet in git).

## Blokkades / beperkingen
- Geen stemmen beschikbaar in deze omgeving: dialoog staat als caption + blips. Echte stemmen zijn de eerste polish-stap.
- De live site was vanuit deze omgeving niet bereikbaar (proxy); de telefoon toont daarom een screenshot van de
  repo-code op mobiel formaat, wat dezelfde site is.

## Open vragen
1. **Productkleur karakters (beslissing nodig).** Het Higgsfield-pakket noemt de witte render "Broadcast" en de
   zwarte "Switch"; de koffer en `src/data.js` zeggen Switch = wit (K01), Broadcast = zwart (K02). De animatic volgt
   de koffer (Switch wit, Broadcast zwart) en spiegelt daarvoor het race-styleframe. Akkoord, of moet de
   pakket-naamgeving leidend zijn? Antwoord bepaalt of scène 2 (zwarte Broadcast → zwarte bedieningsfoto's) klopt.
2. **Naam van "de rest" in scène 4.** Nu een neutraal label "Uit de koffer" en twee oogparen in het dekselvak.
   Moet dit een concreet product zijn (bv. MiniR/MiniS uit het deksel) of bewust anoniem blijven?
3. **URL op de eindkaart.** Nu klein `intusens-demokoffer.nl` onder de titelkaart. Houden of weglaten?

## Volgende stap
Na akkoord: stemmen inspreken/genereren op `timeline.js`, dan belichting, extra motion, sound design,
typografie en high-res export (zie `video/README.md`, "Volgende stappen").
