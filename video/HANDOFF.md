# HANDOFF — IntuSens promofilm

**Status:** v0.9d — **audio freeze** + laatste visuele polish-pass. Low-res eindpreview `video/out/intusens-eindpreview-lowres.mp4`
(50,6 s tot zwart), zonder preview-/debug-overlaytekst.
**Bijgewerkt:** 2026-09-26.
**Audio freeze (Martijn):** geen stemmen, pitch, tempo of timing meer wijzigen. Broadcast = Andre (definitief). Switch en Rail
blijven exact zoals ze zijn, tenzij Martijn meldt dat regel 06 of 10 hoorbaar afgekapt is. `video/vo/`, `timeline.js` en de mix
zijn in v0.9d niet aangeraakt (checksum gecontroleerd).
**Volgende actor:** Martijn — eindpreview beoordelen. Daarna eventueel high-res final (zie "Open voor high-res").

## Vaste besluiten (door Martijn bevestigd)
- Switch = wit, DALI-2 Broadcast = zwart; koffer, `src/data.js` en echte foto's zijn leidend. Niet meer wijzigen.
- Higgsfield-karakters zijn de vaste visuele identiteit; geen redesign, geen mensen/armen/benen; gezichtjes subtiel.
- Lengte: doel 45–50 s met echte stemmen; mag iets langer als de stemmen daardoor natuurlijker klinken.
- Stemmen definitief: Switch = Skye (ElevenLabs), DALI-2 Broadcast = **Andre (ElevenLabs, +1 semitoon, +7 % tempo)**, Rail = Chloe.
- **Audio freeze** (v0.9d): stemmen, pitch, tempo, timing en mix liggen vast.
- Rail-cameo, displayanimatie, echte website, productrace en slot zijn definitief voor de animatic (v0.6).
- Geen betaalde externe video-generaties; geen definitieve high-res export voordat v0.3 beoordeeld is.

## v0.9d — visuele polish-pass (update)
- Alleen `animatic/index.html` (beweging) en `animatic/render.js` (geen overlay) gewijzigd. Verkoopkaart inhoudelijk ongewijzigd.
- **Opening (0–6,8 s):** camera herkadreert zacht naar wie spreekt (±8–14 px), lichte handheld-ademing (≈ 1–2 px, ±0,12°), bij
  de laatste regel 1,2 % verder in. Sensoren: eigen idle-ademing (≤ 1 px, ≤ 0,3 %), kleine aanloop vóór hun regel, oog-saccades
  tijdens luisteren, instemmend knikje van Switch tijdens "We zitten hier al best lang.", droge zijblik van Broadcast na
  "Veel te lang.", twee ongeduldige mini-hupjes van Switch tijdens "Neem ons eens mee…".
- **Race:** camera herkadreert naar de spreker (±8–12 px), korte punch-in van 1,8 % bij "Ik.", trage push van 1,2 % tijdens de
  droge blik na "Succes.", tikje van 0,6 % per tellerstap, lichte ademing. Switch: twee ongeduldige hupjes aan het eind van de
  vraag en een hupje (5 px) per tellerstap; Broadcast: minimale kanteling (0,5°) per stap. Idle-ademing op beide lagen.
- **Grenzen:** rotaties ≤ 3,5°, schaal ≤ +5 % per laag: productvormen blijven technisch herkenbaar, geen vervorming.
- **Overlay:** de debug-tijdcode/scènenaam wordt nooit meer gerenderd (alleen nog bij handmatig scrubben met `?hud=1`).
- **Audio:** de mix van v0.9c is ongewijzigd hergebruikt; synchronisatie opnieuw gemeten in de eindpreview.

## v0.9c — definitieve Broadcast-stem (update)
- Alleen de 8 BC-bestanden in `video/vo/` vervangen door Broadcast V3 (Andre / ElevenLabs / +1 semitoon / +7 % tempo; README uit de
  ZIP als `README-v3-broadcast.txt`). Switch- en Rail-bestanden gecontroleerd onaangetast (checksum).
- Randcontrole: geen afgekapte woorden. Regel 12 en 16 hebben een los klikje in de laatste 10–20 ms na volledige stilte; de trim
  verwijdert dat (verwerkte bestanden eindigen op stilte). Regel 14 begint direct met de S-klank.
- Robotbewerking Broadcast: geen chorus meer, alleen een zeer subtiel elektronisch randje (ring 0,015 boven 1,8 kHz). Switch/Rail
  ongewijzigd (lichte v0.9b-instelling).
- Tijdlijn opnieuw gesynchroniseerd: 50.63 s tot zwart, pauzefactor 0.90; tempo nergens aangepast.

| Broadcast-regel | Ruw (s) | Actief (s) |
|---|---|---|
| 02-BC-al-best-lang | 1.56 | 1.43 |
| 04-BC-neem-ons-mee | 1.87 | 1.86 |
| 05-BC-zo-moeilijk | 1.65 | 1.65 |
| 07-BC-even-checken | 1.94 | 1.84 |
| 08-BC-code-op-display | 3.21 | 3.04 |
| 12-BC-wie-eerste-vijftig | 2.99 | 2.93 |
| 14-BC-succes | 0.98 | 0.86 |
| 16-BC-alsjeblieft | 1.71 | 0.75 |

## v0.9 V2 — ElevenLabs-stemmen verwerkt (update)
- Alle oude WAV's in `video/vo/` vervangen door de V2-set (16 bestanden, mono 48 kHz; README uit de ZIP als `README-v2.txt`).
  Geen FAST-variant meer voor regel 08; de V2-regel 08 is 3,28 s.
- Alleen echte begin/eindstilte getrimd; geen interne pauze > 0,75 s, dus niets ingekort; tempo nergens aangepast.
- Tijdlijn opnieuw gesynchroniseerd op de echte spreekduur: 50.63 s tot zwart, pauzefactor 0.90.
  Race-beats, display, website-hold en saleskaart ongewijzigd.
- Robot-kleur: lichte v0.9b-instelling (verstaanbaarheid voor effect).
- Randcontrole (`vo_prepare.py`, kolom *rand*): meldt bestanden die midden in klank beginnen of eindigen.

| Regel | Ruw (s) | Actief (s) | Tempo | Rand |
|---|---|---|---|---|
| 01-SW-he-collega | 1.36 | 1.15 | 1.00 | ok |
| 02-BC-al-best-lang | 1.28 | 1.24 | 1.00 | EIND-AFGEKAPT? |
| 03-SW-veel-te-lang | 1.28 | 0.92 | 1.00 | ok |
| 04-BC-neem-ons-mee | 1.92 | 1.89 | 1.00 | EIND-AFGEKAPT? |
| 05-BC-zo-moeilijk | 2.00 | 2.00 | 1.00 | EIND-AFGEKAPT? |
| 06-SW-080 | 0.96 | 0.96 | 1.00 | BEGIN-AFGEKAPT?  |
| 07-BC-even-checken | 2.08 | 2.08 | 1.00 | EIND-AFGEKAPT? |
| 08-BC-code-op-display | 3.28 | 3.27 | 1.00 | ok |
| 09-RL-en-ik-dan | 2.35 | 0.73 | 1.00 | ok |
| 10-SW-jij-ook-op-site | 1.28 | 1.28 | 1.00 | EIND-AFGEKAPT? |
| 11-SW-belangrijkere-vraag | 2.24 | 2.24 | 1.00 | ok |
| 12-BC-wie-eerste-vijftig | 2.24 | 2.24 | 1.00 | EIND-AFGEKAPT? |
| 13-SW-ik | 0.64 | 0.45 | 1.00 | ok |
| 14-BC-succes | 0.96 | 0.89 | 1.00 | ok |
| 15-SW-pak-die-koffer | 2.00 | 1.85 | 1.00 | ok |
| 16-BC-alsjeblieft | 0.96 | 0.75 | 1.00 | ok |

## v0.9b — voorbereiding V2 (update)
- Robot-kleur verlaagd op verzoek (verstaanbaarheid gaat voor effect): chorus-mix 0,20–0,24 → 0,10–0,11, elektronisch randje
  0,05–0,08 → 0,02–0,03, klankkleur-accenten gehalveerd. Correlatie droog ↔ bewerkt nu 0,94 (Broadcast), 0,97 (Switch),
  0,99 (Rail). Geldt automatisch voor de V2-stemmen.
- V2 niet verwerkt: aangeleverde ZIP is identiek aan V1 (zie Blokkade).

## Open voor high-res — wat nodig is
| Punt | Kan nu? | Wat nodig is |
|---|---|---|
| Scherpe zwarte Broadcast-still (scène 2) | Nee | Nieuwe scherpe Broadcast-render in dezelfde Higgsfield-stijl, frontaal, zonder ingebakken ogen, ≥ 1920 px breed. |
| Getekende Rail i.p.v. foto-uitsnede | Nee | Rail-render (wit, K03) in dezelfde stijl, liggend zoals in het deksel, met transparante of effen achtergrond. |
| TRILUX-huisstijlfont | Nee | Fontbestanden (woff2/otf) met gebruikslicentie. Niet in de repo en niet in de TRILUX NL-ontwerpregels; site gebruikt systeemfonts. |
| Diepte in koffer- en raceplaat | Deels (lagen + parallax zitten er al in) | Echte diepte vraagt twee Higgsfield-videoshots (opening, race); betaald, daarom niet gedaan. |
| Stembestanden in publieke repo | Besluit | De repo is publiek; de WAV's staan op de videobranch (niet op de site). Laten staan of verwijderen/verplaatsen? |

## v0.9 — stemmen verwerkt (update)

- Stemmen aangeleverd als ZIP (17 WAV's, stereo 48 kHz) en uitgepakt in `video/vo/`. De eerdere download-blokkade
  (host `d8j0ntlcm91z4.cloudfront.net`) is daarmee omzeild via upload, niet via het netwerk.
- **Trim en meting** (`vo_prepare.py`): alleen stilte aan begin en eind weg (40 ms voorloop, 90 ms uitloop). In de masters
  zaten korte klikjes aan de randen (regel 01, 03, 13 aan het begin; 05, 12, 16 aan het eind, 30–120 ms na tot 2,1 s
  stilte); die tellen niet als spraak en zijn weg. Eén interne pauze is ingekort: de "Dus…"-pauze in regel 15 van 1,19 s
  naar 0,75 s (knip in stilte, geen timestretch).
- **Regel 08:** FAST-variant gebruikt (2,80 s actief, pauzes 0,60 / 0,28 s). De normale versie (4,30 s, pauzes 0,84 /
  0,75 s) is trager zonder winst; hij blijft beschikbaar via `vo_prepare.py --08=normaal`.
- **Tempo:** nergens aangepast (alle regels 1,00). Na trimmen passen de stemmen natuurlijk; de tijdlijn is om de stemmen
  heen gelegd, niet andersom.
- **Tijdlijn:** gewone pauzes op 95 % (compressie tot 60 % zou maar 1,5 s winnen en klinkt gejaagd). Race-beats vast:
  0,35 s na "Belangrijkere vraag…", 0,30 s na de vraag, 0,65 s na "Ik.", 0,45 s droge blik na "Succes.", dan tellers.
- **Robot-kleur** (`audio.py --robot`): korte chorus/doubling + klein elektronisch randje boven 1,8 kHz; Switch iets
  helderder, Broadcast iets voller, Rail helder. Correlatie droog ↔ bewerkt 0,92–0,94: de stem blijft voorop.
- **Controle (objectief):** in de gerenderde mp4 staat elke regel op 0 ms afwijking van zijn geplande positie
  (kruiscorrelatie mp4-audio ↔ stemtrack, alle 16 regels); onsets 0–30 ms na de ondertitelstart (= 40 ms voorloop), spraak 14–18 dB boven de
  achtergrond, geen clipping (piek −1 dBFS). Lipsync volgt de amplitude van de echte stem. Verstaanbaarheid en robot-kleur
  zijn **niet op gehoor** gecontroleerd (geen afspeelmogelijkheid in deze omgeving).

| Regel | Ruw (s) | Actief (s) | Tempo | Variant |
|---|---|---|---|---|
| 01-SW-he-collega | 2.09 | 0.91 | 1.00 | normaal |
| 02-BC-al-best-lang | 2.06 | 1.46 | 1.00 | normaal |
| 03-SW-veel-te-lang | 1.87 | 0.88 | 1.00 | normaal |
| 04-BC-neem-ons-mee | 2.56 | 1.99 | 1.00 | normaal |
| 05-BC-zo-moeilijk | 4.12 | 1.87 | 1.00 | normaal |
| 06-SW-080 | 2.09 | 0.85 | 1.00 | normaal |
| 07-BC-even-checken | 2.70 | 2.23 | 1.00 | normaal |
| 08-BC-code-op-display | 5.01 | 2.80 | 1.00 | snel |
| 09-RL-en-ik-dan | 2.35 | 0.73 | 1.00 | normaal |
| 10-SW-jij-ook-op-site | 1.71 | 1.27 | 1.00 | normaal |
| 11-SW-belangrijkere-vraag | 3.85 | 2.10 | 1.00 | normaal |
| 12-BC-wie-eerste-vijftig | 5.13 | 2.58 | 1.00 | normaal |
| 13-SW-ik | 1.69 | 0.43 | 1.00 | normaal |
| 14-BC-succes | 1.86 | 0.78 | 1.00 | normaal |
| 15-SW-pak-die-koffer | 3.01 | 1.98 | 1.00 | normaal |
| 16-BC-alsjeblieft | 1.88 | 0.78 | 1.00 | normaal |

Tijdlijn v0.9 (scènegrenzen: S2a 6.75, display 9.01, website 14.81, Rail 24.01, race 27.11;
tellers 35.04; kaart A 36.59; kaart B 38.59–46.99; zwart 50.54):

| t (s) | Wie | Regel |
|---|---|---|
| 0.45–1.36 | SW | Hé collega? |
| 1.65–3.10 | BC | We zitten hier al best lang. |
| 3.31–4.19 | SW | Veel te lang. |
| 4.48–6.47 | BC | Neem ons eens mee naar een installateur. |
| 6.99–8.86 | BC | Kijk. Zo moeilijk ben ik niet. |
| 15.01–15.86 | SW | 080? |
| 16.14–18.38 | BC | Even checken? Pak de site erbij. |
| 18.81–21.61 | BC | Code op het display, uitleg op je telefoon. Klaar. |
| 24.30–25.03 | RL | En ik dan? |
| 25.32–26.59 | SW | Jij staat ook op de site. |
| 27.39–29.50 | SW | Maar goed. Belangrijkere vraag… |
| 29.85–32.43 | BC | Wie van ons is als eerste vijftig keer verkocht? |
| 32.73–33.16 | SW | Ik. |
| 33.81–34.59 | BC | Succes. |
| 47.19–49.17 | SW | Dus… pak die koffer. |
| 49.36–50.14 | BC | Alsjeblieft. |

## Gewijzigd in v0.9 t.o.v. v0.8

### Beeld: echte beweging met losse lagen (geen redesign)
- `animatic/make_layers.py` snijdt Switch, Broadcast en Rail letterlijk uit dezelfde Higgsfield-platen (koffer- en raceplaat)
  en vult de plek eronder met een harmonische vulling + korrel. Resultaat: schone achtergrondplaten + lagen met alpha
  (`assets/k-switch.png`, `k-broadcast.png`, `k-rail.png`, `r-switch.png`, `r-broadcast.png`, `koffer-clean-ext.png`,
  `race-clean.png`). Elke laag heeft eigen positie, rotatie, schaal, schaduw en gezichtje; productvormen worden niet vervormd
  (alleen verschuiven, roteren ≤ 3,5°, schalen ≤ 5 %).
- **Opening:** camera langzaam dichterbij (1,035 → 1,09) met horizontale pan; lagen bewegen 22 % extra mee (parallax).
  "Hé collega?": Switch kort naar voren + snelle kanteling, ogen naar kijker. "We zitten hier al best lang.": Broadcast
  rustig een kleine draai naar Switch, dan naar de kijker. "Veel te lang.": droge snelle knik van Switch. "Neem ons eens
  mee…": beide leunen en kijken dezelfde kant op, de koffer uit.
- **Broadcast-uitleg:** display 3 → 2 → 1 → ULC → 080 technisch ongewijzigd. Nieuw: kleine Broadcast in de hoek reageert
  op de knopdruk en kijkt naar het display; bij 080 komt Switch kort nieuwsgierig in beeld.
- **Website:** telefoon komt vloeiender binnen (schaal 0,9 → 1, rotatie −10° → −4°) en de camera volgt een klein stukje mee.
- **Rail:** camera omhoog; Rail komt 3,5 % naar voren, kantelt bij "En ik dan?", droog tevreden na "Jij staat ook op de site."
- **Race:** Switch en Broadcast als losse lagen, 8 % groter. Bij de vraag kijken ze elkaar aan. "Ik.": Switch direct een
  korte zelfverzekerde stap naar voren met kanteling. Beat. "Succes.": Broadcast reageert nauwelijks, draait daarna heel
  langzaam een paar graden naar Switch en kijkt droog in de camera. Pas daarna de tellers: cijfers rollen snel door,
  grotere bump en kleine schok per stap, stopt vóór 50.

### Tijdlijn om de echte stemmen heen
- `animatic/build_timeline.py` genereert `timeline.js`. Alle acting in `index.html` is relatief aan dialoogregels en
  scènegrenzen, dus alles schuift automatisch mee met de werkelijke stemduur.
- Vaste blokken blijven even lang: display (5,8 s), website (≥ 5,8 s vanaf telefoon in beeld, 2,5 s ingezoomd),
  saleskaart (8,4 s, ≈ 7 s volledig opgebouwd). Race-beats vast: 0,35 / 0,30 / 0,65 s en 0,45 s droge blik.
- Doel ≤ 50 s: als de stemmen langer uitvallen, worden alleen de gewone pauzes compacter (tot 60 %).
- Lipsync: mondopening volgt de amplitude van de echte stem (24 fps-envelope uit `vo_prepare.py`).

### Voice-pipeline (klaar, getest met testsignalen)
- `vo_prepare.py`: trimt alleen stilte (drempel max(−50 dBFS, piek − 40 dB), 40 ms voorloop, 90 ms uitloop), meet de
  actieve duur, kiest voor regel 08 de snelle variant als de normale > 3,4 s actief is, versnelt alleen regels die duidelijk
  boven natuurlijk leestempo zitten en nooit meer dan 12 % (ffmpeg atempo, toonhoogte gelijk).
- `audio.py --robot`: lichte robot-kleur per karakter (korte chorus/comb + klein elektronisch randje, geen vocoder).
  Lichte v0.8-techgroove (104 bpm) duckt onder de stemmen; knop-, display-, Rail-, teller- en koffercues blijven.
- Getest met synthetische testbestanden van dezelfde ruwe lengte als het manifest: alle 16 regels geplaatst, timing en mix
  correct. Echte verstaanbaarheid en actieve duur zijn **niet** gecontroleerd, omdat de echte stemmen ontbreken.

### Preview
- `video/out/intusens-preview-v0.9.mp4` (met echte stemmen; zie update hierboven). De eerdere beeld-only-render is vervallen.

## Gewijzigd in v0.8 t.o.v. v0.7

### Voice-over: waarom geen stemmen in deze preview
- Getest: Piper-TTS installeert vanaf PyPI, maar alle Nederlandse stemmodellen (HuggingFace incl. mirrors, GitHub
  releases) zijn door de netwerkproxy geblokkeerd (403/geen verbinding). Google-TTS is geblokkeerd. espeak-ng is via apt
  beschikbaar, maar dat is formant-synthese met onnatuurlijke Nederlandse prosodie: afgewezen als kwaliteitsconcessie.
- Conform de opdracht zijn er dus geen nepstemmen meer. Elke regel is een **voice-over-slot** (t0 = start, t1 = max. einde)
  met een vaste bestandsnaam (`timeline.js` → `lines[].vo`). `audio.py` plaatst `video/vo/<naam>.wav` automatisch op t0,
  normaliseert op -16 dBFS rms, voegt met `--robot` een lichte robot-kleur toe (korte chorus/comb + klein elektronisch
  randje; stem blijft stem) en meldt regels die langer zijn dan hun slot.
- **Benodigde bestanden (16):** zie `video/vo/README.md` (tabel met bestand, karakter, start, max. duur, tekst) en
  `video/vo/script-SW.txt`, `script-BC.txt`, `script-RL.txt` (opnamescripts per karakter incl. stemrichting).
- In deze preview zijn de slots stil; de ondertitels zijn leidend. Mondanimatie loopt wel mee met de slots.

### Timing (vlotter, exact)
- Opening 6,9 → 6,3 s: SW 0,5–1,3 · BC 1,6–2,9 · SW 3,2–3,9 · BC 4,2–5,9 (gaps 0,3 s). Overgangen daarna compacter:
  S2a 6,3–7,9; display 7,9–13,7 (zelfde lengte); S3 13,7–22,1 (zelfde lengte, gaps 0,3/0,8 s); Rail-cameo 22,1–25,2 (3,1 s).
- Race: SW 25,5–26,8 · 0,3 s · BC 27,1–28,9 · 0,25 s · "Ik." 29,15–29,55 · 0,6 s beat · "Succes." 30,15–30,65 · 0,45 s droge blik
  (Broadcast kijkt Switch, dan kijker) · tellers 31,1 / 31,7 / 32,1 / 32,5. Eindkaart A 32,9–34,9; B 34,9–43,3 (7,0 s stil).
  Slot 43,5–45,1, blik 45,2, zwart 45,5. Totaal 47,5 → 45,5 s.

### Audio (exact)
- Pseudo-spraak volledig verwijderd; donkere ambient-pad verwijderd.
- Nieuwe soundbed: lichte tech-pulse op 104 bpm: zachte gefilterde pulse op de achtsten (octaaf boven het akkoord), ronde
  korte bas op tel 1 en 3, majeur-akkoordtonen A → D → E → A in het middenregister, heel zachte off-beat tik. Niveau ≈ -25 dBFS,
  duckt ≈ -5 dB onder elk voice-over-slot en ≈ -6 dB tijdens de saleskaart, fade-in 1,2 s, uit bij zwart.
- Fysieke cues behouden en verschoven naar de nieuwe tijden: koffer 0,15; kunststof-klik 0,5 / 1,6; drukknop 8,0; display-clicks
  8,8 / 9,4 / 10,0 / 10,6 / 11,8 + bevestiging 080; swipe 15,7; Rail-klik 22,4; thumps 7,9 / 13,7 / 25,2 / 32,9 / 34,9;
  tellerklikken 31,1 / 31,7 / 32,1 / 32,5; slot-klik 45,35; koffer-dicht 45,5. Cues ≈ -23 dBFS, altijd onder voice-over-niveau.

### Pas definitief bij echte stemmen
- Slotlengtes (t1) en gaps; `audio.py` meldt te lange regels, daarna `timeline.js` bijstellen (beeld volgt automatisch).
- Robot-kleur per karakter fijnregelen op de echte stem; ducking-diepte van de soundbed.

## Gewijzigd in v0.7 t.o.v. v0.6 (timing + audio, geen inhoud)

### Timing (exact)
- **Opening:** SW 0,6–1,4 · BC 1,9–3,2 (was 1,8) · SW 3,7–4,4 (was 3,5) · BC 4,9–6,6 (was 4,6); reactiebeats van
  0,5 s; blikken/tilts meegeschoven. Cut naar S2a 6,9 (was 6,5). Alles daarna +0,4 s verschoven tot en met de Rail-cameo.
- **Race:** SW 26,6–27,9 → 0,35 s rust → BC 28,25–30,05 → 0,3 s → SW "Ik." 30,35–30,75 → 0,75 s reactietijd →
  BC "Succes." 31,5–32,0 (kort) → 0,6 s volledige visuele rust (Broadcast kijkt eerst Switch, dan droog de kijker aan) →
  tellers verschijnen 32,6, stappen 33,3 / 33,7 / 34,1. Tellers starten dus niet meer tijdens "Succes.".
- **Eindkaarten:** A 34,5–36,8; B 36,8–45,2 (7,0 s volledig opgebouwd). Slot: SW 45,4–46,3, BC 46,5–47,0,
  droge blik 47,1, klik 47,25, zwart 47,5. Totaal 45,3 → 47,5 s.
- Website (2,5 s hold), display-reeks en Rail-cameo: ongewijzigd in lengte.

### Audio (exact, alles gesynthetiseerd in `audio.py`, geen samples)
- **Karakterstem-klanken i.p.v. blips:** per regel 2–4 vloeiende glides (S-curve in semitonen) met lichte vibrato,
  sinus + zachte 2e/3e harmonische, laagdoorlaat (≤ 1,9–2,6 kHz), zacht 'technisch' ruisje. Intonatie per regel via
  `contour` in `timeline.js`: *vraag* loopt omhoog, *droog* kort en vlak/omlaag, *stelling* licht dalend, *roep* kort helder.
  Switch 305 Hz, sneller, lichte ritme-AM; Broadcast 196 Hz, rustiger, ronder; Rail 415 Hz, kort en helder.
  Niveau ≈ -10 dBFS rms per regel (cues ≈ -20, soundbed ≈ -28); energie boven 3 kHz ≈ 0 %.
- **Soundbed:** warme pad (55 / 82 / 110 / 165 Hz) met ademhaling van ~22 s en zachte 'lucht', ≈ -32 dBFS; fade-in 1,8 s,
  fade-out bij zwart. Geen melodie, geen beat.
- **Fysieke cues:** koffer-open 0,15 s; kunststof-klik bij eerste reactie Switch (0,6) en Broadcast (1,9); echte
  drukknop-klik 8,6; zachte UI-click per displaystap (9,4 / 10,0 / 10,6 / 11,2 / 12,4) + zeer subtiele bevestiging bij 080;
  telefoon-swipe 16,4; Rail-klik 23,3; low thumps bij 8,5 / 14,3 / 26,3 / 34,5 / 36,8; droge tellerklikken 32,6 / 33,3 /
  33,7 / 34,1; slot-klik 47,25; koffer-dicht 47,5. Geen geluid tijdens het lezen van eindkaart B.
- Mix: zachte tanh-limiter, piek ≈ -1,4 dBFS.

### Pas definitief te timen bij echte voice-over
- Alle regelduren (t0/t1) en de pauzes ertussen: nu geschat op leestempo; echte stemmen bepalen de werkelijke lengte,
  vooral de lange Broadcast-regels (vraag in de race, "Code op het display …").
- Mondopening/knipperen zijn aan de regelvensters gekoppeld en volgen automatisch mee.
- Reactietijd "Ik." → "Succes." en de rust erna: afhankelijk van de droogheid van de echte Broadcast-stem.
- Rail-interrupt: de kanteling start 0,1 s vóór de stem; bij echte stem evt. iets eerder/later.
- Soundbed- en cue-niveaus opnieuw balanceren onder echte stemmen (ducking).

## Gewijzigd in v0.6 t.o.v. v0.5 (laatste animatic-correctie)
1. **Saleschallenge vereenvoudigd.** "Verdeeld over meerdere installateurs telt ook" volledig verwijderd (onjuist).
   Kaart nu: EN VOOR JOU · **VERKOOP MINIMAAL 50 LOSSE SENSOREN** (MINIMAAL 50 in blauw) · *in één keer voor de
   grijpvoorraad* (kleiner) · Dan ligt er voor jou ook iets te grijpen. · kader PROJECTORDERS TELLEN NIET MEE.
   Geen extra toelichtende regels.
2. **Handtekening** onderaan klein: `intusens-demokoffer.nl` + *Concept & realisatie · Martijn den Besten*.
3. **Timing.** Eindkaart B 34,7–43,1 s: volledig opgebouwd vanaf ± 36,1 s → 7,0 s stil leesbaar. Website-hold +0,7 s
   (2,5 s ingezoomd), Rail-cameo +0,4 s (3,3 s), reactietijd tussen "Ik." en "Succes." 0,3 → 0,6 s. Totaal 42,9 → 45,3 s.
4. Niet gewijzigd: Switch wit, Broadcast zwart, Rail-cameo, displayanimatie, echte website, productrace, slot.

## Zelfcontrole v0.6 (stills + contactvel uit de mp4)
- Eindkaart B: hiërarchie MINIMAAL 50 > "in één keer" > prijszin > kader; 7,0 s stil; credit klein en subtiel.
- Ondertitels 78 px, 110 px boven de onderrand; kaarttekst ≥ 44 px (± 4,5 mm op een 6-inch-scherm); kader 64 px.
- Rail-cameo, displayreeks en websitekoppeling ongewijzigd en leesbaar.

## Polish-fase (volgende stap, na v0.6)
1. Nieuwe scherpe zwarte Broadcast-characterstill in Higgsfield-stijl (frontaal, scherp, zonder ingebakken ogen) voor S2a.
2. Stemmen: twee duidelijk verschillende Nederlandse stemmen (Switch energieker/scherper, Broadcast rustiger/droger),
   Rail kort; cues staan per regel in `animatic/timeline.js` (who, t0, t1).
3. Sound design subtiel: koffer, drukknop, lichte UI-clicks, kleine bewegingen; geen kinderachtige effecten.
4. Typografie: TRILUX-huisstijlfont voor ondertitels, chips, tellers en eindkaarten.
5. Eventueel twee Higgsfield-videoshots ter vervanging van de vlakke platen: S1 opening (0,0–6,5 s) en S5 face-off
   (25,9–32,4 s). Alles daartussen blijft gecontroleerde montage.
6. Daarna pas high-res export (`render.js --scale 1`), evt. 9:16-variant.

## Gewijzigd in v0.5 t.o.v. v0.4
1. **Tempo nog iets rustiger.** +0,1–0,2 s tussen regels; eindkaart B 33,3–40,7 s: volledig opgebouwd vanaf ± 34,7 s
   en daarna 6,0 s stil leesbaar. Totaal 39,8 → 42,9 s tot zwart.
2. **Display-labels rustiger.** *Drukknop 3 s vasthouden* alleen vóór het aftellen; tijdens 3 → 2 → 1 alleen het display;
   *ULC · ontgrendeld* pas bij ULC, *080 · lichtdrempel* pas bij 080 (vensters in `timeline.js` → `display.chips`).
3. **Rail-cameo i.p.v. MiniR.** Gecontroleerd aan de echte koffer: in het deksel zitten K03 Rail wit (boven) en K04 Rail
   zwart (eronder). De witte K03 is de cameo: echte uitsnede uit `koffer-deksel-tray.jpg` in een 300 px dekselverlenging
   van het koffer-styleframe (`assets/koffer-plate-ext.png`), de getekende donkere balk eronder staat op de plek van K04.
   Bij "En ik dan?" kantelt de camera duidelijk omhoog (doel y 540 → 205), blauw lichtaccent, gezichtje in dezelfde rig
   (blauwe ogen, mond, bounce, tilt), label INTUSENS RAIL 1,1 s; daarna zakt de camera iets terug zodat Switch zichtbaar
   omhoog kijkt en antwoordt; Rail reageert droog tevreden. Scène 2,9 s. Geen technische uitleg toegevoegd.
4. **Zwarte Broadcast ongewijzigd** (v0.4-cut-out, geen verdere verscherping).
5. Overig ongewijzigd: website-koppeling 080 → 080, productrace + eindkaart A, gescheiden saleschallenge, slot en cut.

## Zelfcontrole v0.5 (stills + contactvel uit de mp4)
- Switch wit, Broadcast zwart: ja. Rail-cameo: witte balk bovenin het deksel met label, camera kantelt zichtbaar omhoog.
- 3 → 2 → 1 → ULC → 080 volledig leesbaar; labels pas na de stap; LED licht aan bij 080.
- Websitekoppeling: match-cut + lijn 080 → 080, site 1,8 s ingezoomd leesbaar.
- Eindkaart B 6,0 s volledig opgebouwd; kader "Projectorders tellen niet mee" en URL leesbaar; race en challenge gescheiden.
- Ondertitels 78 px, 110 px boven de onderrand (± 6 mm op een 6-inch-scherm). Geen redesign, geen nieuwe claims.

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
1. **Zwarte Broadcast in S2a**: bewust niet verder softwarematig verscherpt (besluit v0.5). Voor de definitieve versie is
   waarschijnlijk een **nieuwe scherpe Broadcast-characterstill** nodig (zelfde Higgsfield-stijl, frontaal, scherp, zonder
   ingebakken ogen) of een Higgsfield-videoshot voor S2a. Geen redesign in code.
2. **Rail-cameo** is een echte foto-uitsnede in een verlengd styleframe. Voor high-res is een getekende Rail in de
   Higgsfield-stijl (of een videoshot van het deksel) netter; de dekselverlenging is nu een vlak doorgetrokken paneel.
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
Renders in `video/out/` (niet in git): `intusens-eindpreview-lowres.mp4` (actueel).

## Open vragen
Geen blokkerende. Vraag 1 (kleur), 2 (MiniR) en 3 (URL) uit v0.1/v0.2 zijn beantwoord en verwerkt.
