# HANDOFF — IntuSens promofilm

**Status:** animatic v0.3 gereed (low-res polish-preview, 33,2 s tot zwart, placeholder-audio).
**Bijgewerkt:** 2026-09-26.
**Volgende actor:** Martijn — beoordeel v0.3 en beslis over de punten onder "Nog niet goed genoeg voor high-res".

## Vaste besluiten (door Martijn bevestigd)
- Switch = wit, DALI-2 Broadcast = zwart; koffer, `src/data.js` en echte foto's zijn leidend. Niet meer wijzigen.
- Higgsfield-karakters zijn de vaste visuele identiteit; geen redesign, geen mensen/armen/benen; gezichtjes subtiel.
- Lengte ± 33 s is voorlopig akkoord; niet inkorten ten koste van bediening, 080 en website-uitleg.
- Geen betaalde externe video-generaties; geen definitieve high-res export voordat v0.3 beoordeeld is.

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
6. Tellers sneller: stappen op 25,5 / 25,8 / 26,1 (was 0,4 s interval); eindkaart A 0,2 s korter.
7. Eindkaart B: "VERKOOP 50 SENSOREN LOS · voor de grijpvoorraad van installateurs · Verdeeld over meerdere
   installateurs telt ook · Dan ligt er voor jou ook iets te grijpen" + kader PROJECTORDERS TELLEN NIET MEE + URL.
8. Slot: Broadcast kijkt bij "Alsjeblieft" naar de kijker en geeft vanaf 32,9 s nog één droge blik naar Switch; cut 33,2.
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
6. **Website-screenshot** is statisch; bij een sitewijziging opnieuw schieten (`render`-stappen in README).
7. **Koffer- en race-shot** zijn vlakke platen met gezichts-rig; parallax/diepte komt pas met lagen of video.

## Bestanden
`video/README.md`, `video/HANDOFF.md`, `video/animatic/{index.html,timeline.js,render.js,audio.py,encode.sh}`,
`video/animatic/assets/*` (o.a. nieuwe `black-plate.png`), `video/reference/higgsfield/*`.
Renders in `video/out/` (niet in git): `intusens-animatic-v0.3.mp4`.

## Open vragen
Geen blokkerende. Vraag 1 (kleur), 2 (MiniR) en 3 (URL) uit v0.1/v0.2 zijn beantwoord en verwerkt.
