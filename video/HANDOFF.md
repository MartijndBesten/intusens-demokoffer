# HANDOFF — IntuSens promofilm

**Status:** animatic v0.4 gereed (low-res polish-preview, 39,8 s tot zwart, placeholder-audio).
**Bijgewerkt:** 2026-09-26.
**Volgende actor:** Martijn — beoordeel v0.4 (tempo, display-animatie, leesbaarheid eindkaart B op mobiel) en beslis over de punten onder "Nog niet goed genoeg voor high-res".

## Vaste besluiten (door Martijn bevestigd)
- Switch = wit, DALI-2 Broadcast = zwart; koffer, `src/data.js` en echte foto's zijn leidend. Niet meer wijzigen.
- Higgsfield-karakters zijn de vaste visuele identiteit; geen redesign, geen mensen/armen/benen; gezichtjes subtiel.
- Lengte: circa 37–40 s is acceptabel (v0.4: 39,8 s); niet inkorten ten koste van bediening, 080 en website-uitleg.
- Geen betaalde externe video-generaties; geen definitieve high-res export voordat v0.3 beoordeeld is.

## Gewijzigd in v0.4 t.o.v. v0.3
1. **Tempo vertraagd.** Ademruimte van 0,3–0,4 s tussen dialoogregels; langere holds op display, telefoon en
   eindkaarten. Eindkaart B staat vanaf ± 33,2 s volledig opgebouwd en 4,4 s stil in beeld (31,8–37,6).
   Totale lengte 33,9 → 39,8 s tot zwart.
2. **Bedieningsreeks als display-animatie.** De vier harde fotowissels zijn vervangen door één echte, onbewerkte
   sensorfoto (`bediening-broadcast-03.jpg`) met een grafisch gereconstrueerd 7-segment-display in het displaygebied:
   leeg → 3 → 2 → 1 (1,7 s) → ULC (1,2 s) → 080 + LED licht (1,9 s). Segmentvorm, helderheid en gloed naar de
   referentiefoto's 01/04/05. Reeks en teksten uit `src/data.js`; geen nieuwe codes. Camera duwt rustig naar
   display + LED. Zachte klik per displaystap in de placeholder-audio.
   Basisfoto is `animatic/assets/display-base.jpg`: foto 03 waarin alleen de specular reflectiestreep in het
   displaygebied is weggeretoucheerd (rij-voor-rij interpolatie, x 470–522 / y 238–374), omdat die streep bij een
   leeg display als een "1" leest. Bijeffect: het midden van het TRILUX-logo onder het display is 0,8 s lang
   weggevallen; daarna ligt het display eroverheen (zoals op de echte foto's 04/05).
3. **Match-cut 080 → 080.** S3 opent met dezelfde display-uitsnede (080 + LED) in plaats van de fotocrop; de
   verbindingslijn loopt van dat 080 naar het 080 op de echte site op de telefoon.
4. Overig ongewijzigd: Switch wit, Broadcast zwart, MiniR-cameo, expliciete wedstrijdzin, gescheiden productrace en
   saleschallenge, URL op eindkaart B, Higgsfield-karakters onaangetast.

## Zelfcontrole v0.4 (stills + contactvel uit de mp4)
- Displayreeks leesbaar en in de juiste volgorde; "ULC" volledig in beeld; 080 groot en scherp; LED licht aan bij 080.
- Eindkaart B: ≥ 4,4 s volledig opgebouwd stil in beeld; "Projectorders tellen niet mee" in kader; URL leesbaar.
- Ondertitels 78 px, 110 px boven de onderrand; op een 6-inch-scherm (video 960 px breed → ± 150 mm) is de
  dialoog ± 6 mm hoog, de kaarttekst ± 4,5 mm: leesbaar.
- Geen AI-gegenereerde displays of codes; sensor is de echte foto (alleen de reflectiestreep geretoucheerd).

## Gewijzigd in v0.3 t.o.v. v0.2
1. Zwarte Broadcast scherper: nieuwe cut-out uit de originele 1344×752-render (`reference/higgsfield/02-…png`)
   met strakker masker (feather 1 px i.p.v. 2), milde unsharp (r 1,6 / 65 % / drempel 3, geen halo's), +10 %
   contrast, ruimere neutralisatie van de ingebakken ogen; in S2a 780 px breed i.p.v. 900 px (minder upscaling).
   Niet opnieuw getekend.
2. Opening: gezichts-rig kan nu kantelen en bouncen; Switch kijkt bij "Hé collega?" naar Broadcast, Broadcast
   reageert vertraagd; beat van 0,4 s vóór "Veel te lang" met tilt + mini-bounce; bij de vraag draaien beide blikken
   naar de kijker; camera alleen rustige push-in. Intro 5,8 → 6,1 s.
3. Bediening ongewijzigd in lengte (4,8 s, echte foto's 03→01→04→05).
4. Telefoon-push schaal 1,42 → 1,6 (± 13 % groter), doelpunt op display + stap "2 Lichtdrempel".
5. MiniR-cameo i.p.v. anoniem: label "IntuSens MiniR", regel *En ik dan?*, Switch: *Jij staat ook op de site.*
   Visueel: één klein gezichtje dat uit het dekselvak gluurt (er is geen MiniR-render in het pakket).
6. Racezin explicieter (Martijn): *Wie van ons is als eerste vijftig keer verkocht?* (+0,7 s); eindkaart A-subregel
   *Welk product is als eerste vijftig keer verkocht?*. Tellers sneller: stappen op 26,2 / 26,5 / 26,8 (0,3 s interval).
7. Eindkaart B: "VERKOOP 50 LOSSE SENSOREN · voor de grijpvoorraad van installateurs · Verdeeld over meerdere
   installateurs telt ook · Dan ligt er voor jou ook iets te grijpen" + kader PROJECTORDERS TELLEN NIET MEE + URL.
8. Slot: Broadcast kijkt bij "Alsjeblieft" naar de kijker en geeft vanaf 33,6 s nog één droge blik naar Switch; cut 33,9.
9. Ondertitels 110 px van de onderrand (was 56), sprekersnaam kleiner en 75 % opaciteit; fotochips 34 px.
10. `timeline.js` is geschikt als voice-over-cuelijst (who + t0/t1 per regel).

## Zelfcontrole v0.3 (op stills en contactvel uit de mp4)
- Switch wit, Broadcast zwart: ja, in alle scènes; zwarte Broadcast gaat over in zwarte bedieningsfoto's.
- Zwarte Broadcast scherper dan v0.2: ja (ribbels, contour); bron heeft scherptediepte, achterkant blijft zachter.
- Bediening: alleen echte foto's; chips letterlijk uit `src/data.js`; geen verzonnen codes.
- 080 leesbaar: ja (foto 05 groot, display-crop in S3, "080" op de site).
- Website: screenshot van `#/bediening/broadcast`, stap 2 Lichtdrempel, uit deze repo (zelfde code als live).
- MiniR-cameo, Race naar 50 vs. persoonlijke challenge, "Projectorders tellen niet mee", URL: aanwezig en leesbaar.
- Ondertitels: 78 px, hoog contrast, boven de onderrand.
- Geen redesign: alleen originele renders + weggeretoucheerde ogen + subtiele SVG-gezichtjes.

## Nog niet goed genoeg voor high-res
1. **Zwarte Broadcast in S2a** is beter, maar de bronrender heeft scherptediepte en een zachte blauwe rand; bij
   1920×1080 blijft dat zichtbaar. Echt scherp vraagt een nieuwe Higgsfield-render van de zwarte Broadcast
   (frontaal, scherp, zonder ogen) of een Higgsfield-videoshot voor S2a.
2. **MiniR-cameo** is nu alleen een gezichtje in het dekselvak. Voor high-res is een MiniR-karakterrender nodig
   (zelfde stijl), anders blijft het een suggestie.
3. **Stemmen** ontbreken; placeholder-blips. Timing staat vast in `timeline.js`.
4. **Sound design** ontbreekt (koffer, knop, UI-clicks, kleine bewegingen).
5. **Typografie** is systeemfont (Liberation Sans/DejaVu Mono); TRILUX-huisstijlfont nog toepassen.
6. **Display-animatie** is een SVG-benadering van het echte segment-display; voor high-res eventueel de segmentgeometrie
   nog exact op een macro-foto van het display leggen.
7. **Website-screenshot** is statisch; bij een sitewijziging opnieuw schieten (`render`-stappen in README).
8. **Koffer- en race-shot** zijn vlakke platen met gezichts-rig; parallax/diepte komt pas met lagen of video.

## Bestanden
`video/README.md`, `video/HANDOFF.md`, `video/animatic/{index.html,timeline.js,render.js,audio.py,encode.sh}`,
`video/animatic/assets/*` (o.a. nieuwe `black-plate.png`), `video/reference/higgsfield/*`.
Renders in `video/out/` (niet in git): `intusens-animatic-v0.4.mp4`.

## Open vragen
Geen blokkerende. Vraag 1 (kleur), 2 (MiniR) en 3 (URL) uit v0.1/v0.2 zijn beantwoord en verwerkt.
