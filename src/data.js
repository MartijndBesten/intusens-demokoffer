/* GEGENEREERD door tools/build_data.py — niet handmatig bewerken; pas data/*.json aan. */
window.INTUSENS_DATA = {
 "producten": {
  "_meta": {
   "titel": "IntuSens demokoffer — productdata",
   "versie": "0.2",
   "datum": "2026-09-25",
   "regels": [
    "TOC en TK zijn verschillende nummers en worden nooit gelijkgesteld.",
    "Elk veld met een technische waarde heeft een bronstatus: bevestigd (officiële TRILUX-bron ingezien of in de eerdere bronaudit van de presentatie-repo als CONFIRMED geregistreerd), onzeker (alleen niet-officiële of niet-ingeziene bron) of te-verifieren (opgave zonder bron).",
    "Waarden met status 'te-verifieren' of 'onzeker' worden in de app nooit als feit getoond; ze staan in OPEN-PUNTEN.md.",
    "Bron-ID's verwijzen naar SOURCES.md.",
    "Bron P01 = aangeleverde kofferfoto's en typeplaatjes (25-09-2026), zie ASSETS.md; een leesbaar typeplaatje geldt als bevestiging van typecode, TOC en TK."
   ],
   "status_legenda": {
    "bevestigd": "officieel bevestigd",
    "onzeker": "bron niet officieel of niet ingezien",
    "te-verifieren": "opgave; nog geen bron"
   }
  },
  "familie": {
   "naam": "IntuSens",
   "claim": "Zelf door TRILUX ontwikkelde PIR-sensoren met gepatenteerd bedienconcept, in vijf series voor iedere installatiesituatie.",
   "claim_bron": [
    "A08"
   ],
   "claim_status": "bevestigd",
   "kern": [
    {
     "tekst": "Detectie van beweging en beschikbaar daglicht met PIR-technologie.",
     "bron": [
      "A08"
     ],
     "status": "bevestigd"
    },
    {
     "tekst": "Instellen zonder gereedschap, zonder app en zonder afstandsbediening: helderheidsdrempel en nalooptijd aan de voorzijde met het draaiwiel; het display toont de ingestelde waarde.",
     "bron": [
      "A08"
     ],
     "status": "bevestigd",
     "geldt_voor": "de varianten met bediening op de sensor (Switch en DALI-2 Broadcast bevestigd; overige bouwvormen: zie OP-12)"
    },
    {
     "tekst": "Vier aansluitvarianten: schakelend (Switch), DALI-2 Broadcast, DALI-2 Input Device en Bluetooth NLC.",
     "bron": [
      "A08",
      "B03"
     ],
     "status": "bevestigd"
    },
    {
     "tekst": "Geschikt voor montagehoogtes tot 18 m.",
     "bron": [
      "A08"
     ],
     "status": "bevestigd"
    },
    {
     "tekst": "Als Input Device compatibel met het TRILUX LiveLink-lichtmanagementsysteem.",
     "bron": [
      "A08"
     ],
     "status": "bevestigd"
    },
    {
     "tekst": "Switch- en Broadcast-oplossingen: robuuste en voordelige lichtregeling zonder individuele adressering.",
     "bron": [
      "A08"
     ],
     "status": "bevestigd"
    },
    {
     "tekst": "Daglichtafhankelijke regeling houdt het lichtniveau constant en normconform.",
     "bron": [
      "A08"
     ],
     "status": "bevestigd"
    }
   ],
   "toepassingen": {
    "lijst": [
     "kantoor",
     "onderwijs (klaslokalen)",
     "industrie, sporthallen en magazijnen",
     "verkeersruimten"
    ],
    "bron": [
     "A08"
    ],
    "status": "bevestigd"
   }
  },
  "regelvarianten": [
   {
    "id": "switch",
    "naam": "Switch",
    "kop": "Sensor schakelt rechtstreeks een 230 V-belasting.",
    "uitleg": [
     "Aanwezigheid en lichtdrempel bepalen of de verlichting aan of uit gaat.",
     "Geen lichtmanagementsysteem en geen DALI-adressering nodig.",
     "Instellingen direct op de sensor."
    ],
    "verkoper_zegt": "Dit is de eenvoudigste vorm: de sensor is de schakelaar. Hij ziet beweging en meet het daglicht, en schakelt de verlichting direct.",
    "bron": [
     "A08",
     "B03"
    ],
    "status": "bevestigd",
    "noot": "Schakelvermogen: B03 p. 10 noemt 2000 W; tegen de datasheet te controleren (OP-13). Wordt niet als feit getoond.",
    "beeld": "assets/processed/is-switch.jpg"
   },
   {
    "id": "broadcast",
    "naam": "DALI-2 Broadcast",
    "kop": "Sensor stuurt DALI-armaturen rechtstreeks als één broadcastgroep.",
    "uitleg": [
     "Alle armaturen op de DALI-lijn reageren tegelijk als één groep.",
     "Geen individuele DALI-adressering en geen centrale controller nodig.",
     "Schakelen en dimmen, inclusief constantlichtregeling en basislicht (B03).",
     "Instellingen direct op de sensor."
    ],
    "verkoper_zegt": "Hier regelt de sensor zelf de DALI-armaturen. Alles op de lijn doet hetzelfde: aan, uit, dimmen. Geen adressen, geen software.",
    "bron": [
     "A08",
     "B03"
    ],
    "status": "bevestigd",
    "beeld": "assets/processed/is-broadcast.jpg"
   },
   {
    "id": "ipd",
    "naam": "DALI-2 Input Device",
    "kop": "Sensor is invoerapparaat binnen een DALI-2-systeem, bijvoorbeeld LiveLink.",
    "uitleg": [
     "De sensor levert aanwezigheid en lichtwaarde als signaal aan de DALI-2-controller.",
     "Groepen, scènes en functies worden in het lichtmanagementsysteem bepaald, niet in de sensor.",
     "De sensor bestuurt de armaturen dus niet zelfstandig zoals bij Broadcast."
    ],
    "verkoper_zegt": "Dezelfde sensor, andere rol: hij meldt aanwezigheid en licht aan LiveLink. LiveLink bepaalt wat de armaturen doen. Zo krijg je groepen, scènes en koppelingen met het gebouw.",
    "bron": [
     "A08",
     "B03"
    ],
    "status": "bevestigd",
    "beeld": "assets/processed/is-ipd.jpg"
   },
   {
    "id": "nlc",
    "naam": "Bluetooth NLC",
    "kop": "Draadloze uitvoering voor een Bluetooth NLC-veldlaag.",
    "uitleg": [
     "Wordt in de TRILUX-familiepresentatie (18-05-2026) als vierde variant getoond.",
     "Actuele leverstatus per artikel is niet bevestigd; niet presenteren als algemeen leverbaar.",
     "Inzet in LiveLink Premium Hybrid per project bevestigen."
    ],
    "verkoper_zegt": "Er is ook een draadloze uitvoering in de familie. Of die voor dit project beschikbaar en passend is, check ik na het gesprek.",
    "bron": [
     "A08",
     "B03"
    ],
    "status": "onzeker",
    "noot": "Productstatus: OP-02 en OP-03. Niet in de demokoffer.",
    "beeld": "assets/processed/is-nlc.jpg"
   }
  ],
  "bouwvormen": [
   {
    "id": "plafond",
    "naam": "IntuSens plafond",
    "sub": "opbouw of inbouw",
    "kop": "De zichtbare standaardsensor voor ruimtes.",
    "beelden": [
     "assets/processed/is-opbouw-zwart.jpg",
     "assets/processed/is-inbouw-wit.jpg"
    ],
    "beeld_bron": "B03 p. 6–7 (familiebeeld; niet artikelspecifiek)",
    "montage": {
     "waarde": "opbouw of inbouw op het plafond",
     "bron": [
      "B03"
     ],
     "status": "bevestigd"
    },
    "optiek": {
     "waarde": "Low Bay, High Bay, High Bay Corridor",
     "bron": [
      "B03"
     ],
     "status": "bevestigd"
    },
    "detectie": {
     "waarde": "PIR (beweging) en lichtsensor (daglicht)",
     "bron": [
      "A08",
      "B03"
     ],
     "status": "bevestigd"
    },
    "kleuren": {
     "waarde": "wit (RAL 9016) of zwart (RAL 9005)",
     "bron": [
      "B03"
     ],
     "status": "bevestigd",
     "noot": "B03 p. 6, plafondsensoren"
    },
    "interfaces": {
     "waarde": "Switch, DALI-2 Broadcast, DALI-2 Input Device, Bluetooth NLC",
     "bron": [
      "B03"
     ],
     "status": "bevestigd",
     "noot": "B03 p. 9 toont de vier varianten als plafondsensor; NLC-status zie OP-02"
    },
    "ip": {
     "waarde": null,
     "status": "te-verifieren",
     "open": "OP-07"
    },
    "detectiegebied": {
     "waarde": null,
     "status": "te-verifieren",
     "open": "OP-01"
    },
    "montagehoogte": {
     "waarde": "Low Bay 2–5 m · High Bay 5–18 m · High Bay Corridor 5–18 m",
     "bron": [
      "B03"
     ],
     "status": "bevestigd"
    },
    "toepassing": {
     "waarde": "kantoor, klaslokaal, vergaderruimte, hal, magazijn, gang",
     "bron": [
      "A08"
     ],
     "status": "bevestigd"
    },
    "in_koffer": [
     "K01",
     "K02"
    ]
   },
   {
    "id": "zhaga",
    "naam": "IntuSens Zhaga Book 18",
    "sub": "sensor op het armatuur",
    "kop": "Voor armaturen met Zhaga Book 18-socket, industrie en buiten.",
    "beelden": [
     "assets/processed/k11-zhaga-a.jpg"
    ],
    "beeld_bron": "kofferfoto 25-09-2026 (Zhaga-sensor in het deksel); geen officieel TRILUX-beeld beschikbaar",
    "montage": {
     "waarde": "op een Zhaga Book 18-socket van het armatuur",
     "bron": [
      "A08"
     ],
     "status": "bevestigd"
    },
    "optiek": {
     "waarde": "High Bay en High Bay Corridor",
     "bron": [
      "opgave"
     ],
     "status": "te-verifieren",
     "open": "OP-05",
     "noot": "in de koffer: HB en HB Corr"
    },
    "detectie": {
     "waarde": "PIR (beweging) en lichtsensor (daglicht)",
     "bron": [
      "A08"
     ],
     "status": "bevestigd"
    },
    "kleuren": {
     "waarde": null,
     "status": "te-verifieren",
     "open": "OP-05"
    },
    "interfaces": {
     "waarde": "DALI-2 Input Device (in de koffer)",
     "bron": [
      "opgave"
     ],
     "status": "te-verifieren",
     "open": "OP-05",
     "noot": "andere interfaces per artikel controleren (OP-04 in presentatie-repo: Casambi/BLE-nomenclatuur)"
    },
    "ip": {
     "waarde": "IP66",
     "bron": [
      "A08"
     ],
     "status": "bevestigd"
    },
    "detectiegebied": {
     "waarde": null,
     "status": "te-verifieren",
     "open": "OP-01"
    },
    "montagehoogte": {
     "waarde": "5–18 m",
     "bron": [
      "A08"
     ],
     "status": "bevestigd",
     "noot": "zoekfragment trilux.com: Zhaga-varianten voor montagehoogtes 5–18 m"
    },
    "toepassing": {
     "waarde": "industrie, logistiek, buiten",
     "bron": [
      "A08"
     ],
     "status": "bevestigd"
    },
    "in_koffer": [
     "K11",
     "K12"
    ]
   },
   {
    "id": "minir",
    "naam": "IntuSens MiniR",
    "sub": "in het armatuur",
    "kop": "Compacte armatuurmodule voor hoge ruimtes.",
    "beelden": [
     "assets/processed/is-minir.jpg"
    ],
    "beeld_bron": "B03 p. 22 (familiebeeld, wit en zwart; niet artikelspecifiek)",
    "montage": {
     "waarde": "geïntegreerd in het armatuur (LI)",
     "bron": [
      "B03"
     ],
     "status": "bevestigd"
    },
    "optiek": {
     "waarde": "High Bay",
     "bron": [
      "B03"
     ],
     "status": "bevestigd"
    },
    "detectie": {
     "waarde": "PIR (beweging) en lichtsensor (daglicht)",
     "bron": [
      "A08"
     ],
     "status": "bevestigd"
    },
    "kleuren": {
     "waarde": "wit en zwart (B03); in de koffer drie uitvoeringen",
     "bron": [
      "B03"
     ],
     "status": "onzeker",
     "open": "OP-04",
     "noot": "welke kleur bij welke typecode hoort is niet bevestigd"
    },
    "interfaces": {
     "waarde": "DALI-2 Input Device",
     "bron": [
      "B03"
     ],
     "status": "bevestigd"
    },
    "ip": {
     "waarde": "IP66 (\"indoor and outdoor\")",
     "bron": [
      "B03"
     ],
     "status": "onzeker",
     "noot": "B03 p. 22 via bronaudit; datasheet niet ingezien"
    },
    "detectiegebied": {
     "waarde": null,
     "status": "te-verifieren",
     "open": "OP-01"
    },
    "montagehoogte": {
     "waarde": "High Bay 5–18 m",
     "bron": [
      "B03"
     ],
     "status": "bevestigd"
    },
    "toepassing": {
     "waarde": "hallen, magazijnen, stellinggangen, sporthallen",
     "bron": [
      "A08"
     ],
     "status": "bevestigd"
    },
    "in_koffer": [
     "K08",
     "K09",
     "K10"
    ]
   },
   {
    "id": "minis",
    "naam": "IntuSens MiniS",
    "sub": "in het armatuur",
    "kop": "Compacte armatuurmodule voor lage ruimtes.",
    "beelden": [
     "assets/processed/is-minis.jpg"
    ],
    "beeld_bron": "B03 p. 22 (familiebeeld, lichte uitvoering, laag bronformaat)",
    "montage": {
     "waarde": "geïntegreerd in het armatuur (LI)",
     "bron": [
      "B03"
     ],
     "status": "bevestigd"
    },
    "optiek": {
     "waarde": "Low Bay",
     "bron": [
      "B03"
     ],
     "status": "bevestigd"
    },
    "detectie": {
     "waarde": "PIR (beweging) en lichtsensor (daglicht)",
     "bron": [
      "A08"
     ],
     "status": "bevestigd"
    },
    "kleuren": {
     "waarde": "drie uitvoeringen in de koffer: wit, grijs, zwart",
     "bron": [
      "opgave"
     ],
     "status": "te-verifieren",
     "open": "OP-03"
    },
    "interfaces": {
     "waarde": "DALI-2 Input Device; Bluetooth NLC in B03 genoemd",
     "bron": [
      "B03"
     ],
     "status": "bevestigd",
     "noot": "NLC-status OP-02"
    },
    "ip": {
     "waarde": null,
     "status": "te-verifieren",
     "open": "OP-07"
    },
    "detectiegebied": {
     "waarde": null,
     "status": "te-verifieren",
     "open": "OP-01"
    },
    "montagehoogte": {
     "waarde": "Low Bay 2–5 m",
     "bron": [
      "B03"
     ],
     "status": "bevestigd"
    },
    "toepassing": {
     "waarde": "kantoor, onderwijs, ruimtes tot 5 m",
     "bron": [
      "A08",
      "B03"
     ],
     "status": "bevestigd"
    },
    "in_koffer": [
     "K05",
     "K06",
     "K07"
    ]
   },
   {
    "id": "rail",
    "naam": "IntuSens Rail",
    "sub": "in de lichtlijn",
    "kop": "De nauwelijks zichtbare sensor in de lichtlijn.",
    "beelden": [
     "assets/processed/is-rail.jpg"
    ],
    "beeld_bron": "B03 p. 23 (familiebeeld; niet artikelspecifiek)",
    "montage": {
     "waarde": "geïntegreerd in de lichtlijn (rail/track)",
     "bron": [
      "B03"
     ],
     "status": "bevestigd"
    },
    "optiek": {
     "waarde": "Low Bay",
     "bron": [
      "B03"
     ],
     "status": "bevestigd"
    },
    "detectie": {
     "waarde": "PIR (beweging) en lichtsensor (daglicht)",
     "bron": [
      "A08"
     ],
     "status": "bevestigd"
    },
    "kleuren": {
     "waarde": "wit en zwart in de koffer",
     "bron": [
      "opgave"
     ],
     "status": "te-verifieren",
     "open": "OP-06"
    },
    "interfaces": {
     "waarde": "DALI-2 Input Device",
     "bron": [
      "B03"
     ],
     "status": "bevestigd"
    },
    "ip": {
     "waarde": "IP20 (B03 p. 23)",
     "bron": [
      "B03"
     ],
     "status": "onzeker",
     "open": "OP-08",
     "noot": "briefing E01 noemt IP20/IP66 afhankelijk van uitvoering"
    },
    "detectiegebied": {
     "waarde": null,
     "status": "te-verifieren",
     "open": "OP-01"
    },
    "montagehoogte": {
     "waarde": "Low Bay 2–5 m",
     "bron": [
      "B03"
     ],
     "status": "bevestigd"
    },
    "toepassing": {
     "waarde": "kantoor, retail, lichtlijnen in ruimtes tot 5 m",
     "bron": [
      "B03"
     ],
     "status": "onzeker"
    },
    "in_koffer": [
     "K03",
     "K04"
    ]
   }
  ],
  "producten": [
   {
    "id": "K01",
    "family": "plafond",
    "kofferrol": "actief",
    "kort": "IntuSens Switch",
    "sub": "wit · opbouw · Low Bay",
    "designation": "INS D SWA LB 01",
    "designation_status": "te-verifieren",
    "toc": "6001070700",
    "toc_status": "te-verifieren",
    "tk": null,
    "tk_status": "te-verifieren",
    "colour": "wit",
    "colour_status": "bevestigd (kofferfoto)",
    "optic": "Low Bay",
    "optic_status": "te-verifieren",
    "interface": "Switch (230 V)",
    "interface_status": "opgave + B03-variant",
    "mounting": "opbouw",
    "mounting_status": "opgave (foto)",
    "verkoopzin": "De sensor is de schakelaar: aanwezigheid en daglicht schakelen de 230 V-verlichting direct.",
    "waarvoor": [
     "Ruimtes waar één schakelgroep volstaat en geen lichtmanagement nodig is.",
     "Snelle vervanging van een klassieke bewegingsmelder met daglichtdrempel.",
     "Instelbaar op de sensor zelf, zonder app of afstandsbediening."
    ],
    "waar": [
     "berging en technische ruimte",
     "gang en trappenhuis",
     "kleine kantoorruimte",
     "sanitaire ruimte",
     "garage of werkplaats"
    ],
    "techniek": [
     {
      "label": "Detectie",
      "waarde": "PIR + lichtsensor",
      "status": "bevestigd",
      "bron": [
       "A08",
       "B03"
      ]
     },
     {
      "label": "Regeling",
      "waarde": "schakelen, lichtdrempel, nalooptijd",
      "status": "bevestigd",
      "bron": [
       "A08",
       "B03"
      ]
     },
     {
      "label": "Voeding",
      "waarde": "230 V (netspanning)",
      "status": "onzeker",
      "bron": [
       "opgave",
       "E01"
      ],
      "noot": "\"230 V\" niet letterlijk in B03 gezien; datasheet controleren"
     },
     {
      "label": "Schakelvermogen",
      "waarde": null,
      "status": "te-verifieren",
      "open": "OP-13"
     },
     {
      "label": "Montagehoogte",
      "waarde": "Low Bay 2–5 m",
      "status": "bevestigd",
      "bron": [
       "B03"
      ]
     },
     {
      "label": "Detectiegebied",
      "waarde": null,
      "status": "te-verifieren",
      "open": "OP-01"
     },
     {
      "label": "IP-klasse",
      "waarde": null,
      "status": "te-verifieren",
      "open": "OP-07"
     }
    ],
    "beeld": "assets/processed/k01-switch.jpg",
    "beeld_noot": "kofferfoto 25-09-2026 (uitsnede uit koffer-open-onderzijde-werkende-sensoren.jpeg)",
    "source": [
     {
      "type": "opgave projectbrief",
      "ref": "brief 25-09-2026",
      "verified": false,
      "noot": "designation en TOC 'vermoedelijk'; TK niet opgegeven"
     },
     {
      "type": "TRILUX klantpresentatie",
      "ref": "B03 p. 9–10",
      "verified": true,
      "noot": "variant Switch als zodanig; niet dit artikel"
     },
     {
      "type": "TRILUX product page",
      "url": null,
      "verified": false
     },
     {
      "type": "photo",
      "filename": "koffer-open-onderzijde-werkende-sensoren.jpeg",
      "verified": true,
      "noot": "witte sensor in wit paneel links, opschrift \"INTUSENS Switch\"; zon- en kloksymbool onder de lens zichtbaar; geen typeplaatje gefotografeerd"
     }
    ],
    "label_foto": null
   },
   {
    "id": "K02",
    "family": "plafond",
    "kofferrol": "actief",
    "kort": "IntuSens DALI-2 Broadcast",
    "sub": "zwart · inbouw · Low Bay",
    "designation": "INS C DA2 Bcast LB 05",
    "designation_status": "te-verifieren",
    "toc": "6001070400",
    "toc_status": "te-verifieren",
    "tk": null,
    "tk_status": "te-verifieren",
    "colour": "zwart",
    "colour_status": "bevestigd (kofferfoto)",
    "optic": "Low Bay",
    "optic_status": "te-verifieren",
    "interface": "DALI-2 Broadcast",
    "interface_status": "opgave + B03-variant",
    "mounting": "inbouw",
    "mounting_status": "opgave (foto)",
    "verkoopzin": "De sensor regelt de DALI-armaturen zelf: één lijn, één groep, geen adressering.",
    "waarvoor": [
     "Ruimtes waar alle armaturen op één DALI-lijn als één groep mogen reageren.",
     "Aanwezigheid en constantlichtregeling zonder centrale controller.",
     "Instelbaar op de sensor zelf."
    ],
    "waar": [
     "klaslokaal",
     "kantoorruimte met één lichtgroep",
     "vergaderruimte",
     "magazijnzone met eigen lijn",
     "gang met dimbare armaturen"
    ],
    "techniek": [
     {
      "label": "Detectie",
      "waarde": "PIR + lichtsensor",
      "status": "bevestigd",
      "bron": [
       "A08",
       "B03"
      ]
     },
     {
      "label": "Regeling",
      "waarde": "schakelen en dimmen via DALI-broadcast, constantlichtregeling, basislicht",
      "status": "bevestigd",
      "bron": [
       "B03"
      ]
     },
     {
      "label": "DALI-busvoeding / uitgangsstroom",
      "waarde": null,
      "status": "te-verifieren",
      "open": "OP-14",
      "noot": "B03 p. 11 noemt '60 mA'; betekenis en maximale busstroom tegen de datasheet controleren"
     },
     {
      "label": "Maximaal aantal armaturen",
      "waarde": null,
      "status": "te-verifieren",
      "open": "OP-14"
     },
     {
      "label": "Montagehoogte",
      "waarde": "Low Bay 2–5 m",
      "status": "bevestigd",
      "bron": [
       "B03"
      ]
     },
     {
      "label": "Detectiegebied",
      "waarde": null,
      "status": "te-verifieren",
      "open": "OP-01"
     },
     {
      "label": "IP-klasse",
      "waarde": null,
      "status": "te-verifieren",
      "open": "OP-07"
     }
    ],
    "beeld": "assets/processed/k02-broadcast.jpg",
    "beeld_noot": "kofferfoto 25-09-2026 (uitsnede uit koffer-open-onderzijde-werkende-sensoren.jpeg)",
    "source": [
     {
      "type": "opgave projectbrief",
      "ref": "brief 25-09-2026",
      "verified": false,
      "noot": "designation en TOC 'vermoedelijk'; TK niet opgegeven"
     },
     {
      "type": "TRILUX klantpresentatie",
      "ref": "B03 p. 9, 11",
      "verified": true,
      "noot": "variant Broadcast als zodanig; niet dit artikel"
     },
     {
      "type": "TRILUX product page",
      "url": null,
      "verified": false
     },
     {
      "type": "photo",
      "filename": "koffer-open-onderzijde-werkende-sensoren.jpeg",
      "verified": true,
      "noot": "zwarte sensor met gekartelde draairing rechts, opschrift \"INTUSENS DALI-2 Broadcast\"; display boven de lens, zon- en kloksymbool onder de lens; geen typeplaatje gefotografeerd"
     }
    ],
    "label_foto": null
   },
   {
    "id": "K03",
    "family": "rail",
    "kofferrol": "toonmodel",
    "kort": "IntuSens Rail",
    "sub": "wit · lichtlijn · Low Bay",
    "designation": "Sensor INS Rail DA2 IPD 3PID-ST LB 01",
    "designation_status": "te-verifieren",
    "toc": "6001073100",
    "toc_status": "te-verifieren",
    "tk": null,
    "tk_status": "te-verifieren",
    "colour": "wit",
    "colour_status": "bevestigd (kofferfoto)",
    "optic": "Low Bay",
    "optic_status": "opgave; B03 Rail = Low Bay",
    "interface": "DALI-2 Input Device",
    "interface_status": "opgave + B03",
    "mounting": "in de lichtlijn",
    "mounting_status": "bevestigd (B03)",
    "verkoopzin": "De onzichtbare sensor in de lichtlijn.",
    "waarvoor": [
     "Lichtlijnen waar de sensor niet mag opvallen.",
     "Sensorfunctie als Input Device voor LiveLink of een ander DALI-2-systeem.",
     "Ruimtes tot 5 m hoog."
    ],
    "waar": [
     "kantoor met lichtlijnen",
     "retail",
     "onderwijs",
     "verkeersruimten"
    ],
    "techniek": [
     {
      "label": "Detectie",
      "waarde": "PIR + lichtsensor",
      "status": "bevestigd",
      "bron": [
       "A08",
       "B03"
      ]
     },
     {
      "label": "Interface",
      "waarde": "DALI-2 Input Device",
      "status": "bevestigd",
      "bron": [
       "B03"
      ]
     },
     {
      "label": "Montagehoogte",
      "waarde": "Low Bay 2–5 m",
      "status": "bevestigd",
      "bron": [
       "B03"
      ]
     },
     {
      "label": "IP-klasse",
      "waarde": "IP20 volgens B03 p. 23",
      "status": "onzeker",
      "open": "OP-08"
     },
     {
      "label": "Betekenis '3PID-ST'",
      "waarde": null,
      "status": "te-verifieren",
      "open": "OP-06"
     },
     {
      "label": "Voeding",
      "waarde": null,
      "status": "te-verifieren",
      "open": "OP-06"
     },
     {
      "label": "Detectiegebied",
      "waarde": null,
      "status": "te-verifieren",
      "open": "OP-01"
     }
    ],
    "beeld": "assets/processed/k03-rail-wit.jpg",
    "beeld_noot": "kofferfoto 25-09-2026 (uitsnede uit koffer-open-deksel-toonmodellen.jpeg)",
    "source": [
     {
      "type": "opgave projectbrief",
      "ref": "brief 25-09-2026",
      "verified": false
     },
     {
      "type": "TRILUX klantpresentatie",
      "ref": "B03 p. 23",
      "verified": true,
      "noot": "Rail als bouwvorm; niet dit artikel"
     },
     {
      "type": "TRILUX product page",
      "url": null,
      "verified": false
     },
     {
      "type": "photo",
      "filename": "koffer-open-deksel-toonmodellen.jpeg",
      "verified": true,
      "noot": "rail-sensor in het deksel; typeplaatje niet gefotografeerd"
     }
    ],
    "label_foto": null
   },
   {
    "id": "K04",
    "family": "rail",
    "kofferrol": "toonmodel",
    "kort": "IntuSens Rail",
    "sub": "zwart · lichtlijn · Low Bay",
    "designation": "Sensor INS Rail DA2 IPD 3PID-ST LB 05",
    "designation_status": "te-verifieren",
    "toc": "6001073200",
    "toc_status": "te-verifieren",
    "tk": null,
    "tk_status": "te-verifieren",
    "colour": "zwart",
    "colour_status": "bevestigd (kofferfoto)",
    "optic": "Low Bay",
    "optic_status": "opgave; B03 Rail = Low Bay",
    "interface": "DALI-2 Input Device",
    "interface_status": "opgave + B03",
    "mounting": "in de lichtlijn",
    "mounting_status": "bevestigd (B03)",
    "verkoopzin": "De onzichtbare sensor in de lichtlijn, zwarte uitvoering.",
    "waarvoor": [
     "Zwarte lichtlijnen waar de sensor niet mag opvallen.",
     "Sensorfunctie als Input Device voor LiveLink of een ander DALI-2-systeem.",
     "Ruimtes tot 5 m hoog."
    ],
    "waar": [
     "kantoor met zwarte lichtlijnen",
     "retail",
     "horeca",
     "verkeersruimten"
    ],
    "techniek": [
     {
      "label": "Detectie",
      "waarde": "PIR + lichtsensor",
      "status": "bevestigd",
      "bron": [
       "A08",
       "B03"
      ]
     },
     {
      "label": "Interface",
      "waarde": "DALI-2 Input Device",
      "status": "bevestigd",
      "bron": [
       "B03"
      ]
     },
     {
      "label": "Montagehoogte",
      "waarde": "Low Bay 2–5 m",
      "status": "bevestigd",
      "bron": [
       "B03"
      ]
     },
     {
      "label": "IP-klasse",
      "waarde": "IP20 volgens B03 p. 23",
      "status": "onzeker",
      "open": "OP-08"
     },
     {
      "label": "Betekenis '3PID-ST'",
      "waarde": null,
      "status": "te-verifieren",
      "open": "OP-06"
     },
     {
      "label": "Detectiegebied",
      "waarde": null,
      "status": "te-verifieren",
      "open": "OP-01"
     }
    ],
    "beeld": "assets/processed/k04-rail-zwart.jpg",
    "beeld_noot": "kofferfoto 25-09-2026 (uitsnede uit koffer-open-deksel-toonmodellen.jpeg)",
    "source": [
     {
      "type": "opgave projectbrief",
      "ref": "brief 25-09-2026",
      "verified": false
     },
     {
      "type": "TRILUX klantpresentatie",
      "ref": "B03 p. 23",
      "verified": true,
      "noot": "Rail als bouwvorm; niet dit artikel"
     },
     {
      "type": "TRILUX product page",
      "url": null,
      "verified": false
     },
     {
      "type": "photo",
      "filename": "koffer-open-deksel-toonmodellen.jpeg",
      "verified": true,
      "noot": "rail-sensor in het deksel; typeplaatje niet gefotografeerd"
     }
    ],
    "label_foto": null
   },
   {
    "id": "K05",
    "family": "minis",
    "kofferrol": "toonmodel",
    "kort": "IntuSens MiniS",
    "sub": "wit · in het armatuur · Low Bay",
    "designation": "INS MiniS LI DA2 IPD LB 01",
    "designation_status": "bevestigd",
    "toc": null,
    "toc_status": "te-verifieren",
    "tk": null,
    "tk_status": "onzeker",
    "colour": "wit",
    "colour_status": "bevestigd (kofferfoto + typeplaatje LB 01 op de witte module)",
    "optic": "Low Bay",
    "optic_status": "bevestigd (B03 MiniS = Low Bay)",
    "interface": "DALI-2 Input Device",
    "interface_status": "bevestigd (B03)",
    "mounting": "in het armatuur (LI)",
    "mounting_status": "bevestigd (B03)",
    "verkoopzin": "Kleine module, volwaardige sensor, in het armatuur.",
    "waarvoor": [
     "Armaturen waarin de sensor onopvallend geïntegreerd moet zijn.",
     "Ruimtes tot 5 m hoog.",
     "Input Device voor LiveLink of een ander DALI-2-systeem."
    ],
    "waar": [
     "kantoor",
     "klaslokaal",
     "vergaderruimte",
     "verkeersruimten"
    ],
    "techniek": [
     {
      "label": "Detectie",
      "waarde": "PIR + lichtsensor",
      "status": "bevestigd",
      "bron": [
       "A08",
       "B03"
      ]
     },
     {
      "label": "Interface",
      "waarde": "DALI-2 Input Device",
      "status": "bevestigd",
      "bron": [
       "P01"
      ],
      "noot": "typeplaatje: DALI-2-logo, \"IPD\""
     },
     {
      "label": "Montagehoogte",
      "waarde": "Low Bay 2–5 m",
      "status": "bevestigd",
      "bron": [
       "B03"
      ]
     },
     {
      "label": "IP-klasse",
      "waarde": null,
      "status": "te-verifieren",
      "open": "OP-07"
     },
     {
      "label": "Afmetingen",
      "waarde": null,
      "status": "te-verifieren",
      "open": "OP-03"
     },
     {
      "label": "Voeding",
      "waarde": null,
      "status": "te-verifieren",
      "open": "OP-03"
     },
     {
      "label": "Detectiegebied",
      "waarde": null,
      "status": "te-verifieren",
      "open": "OP-01"
     },
     {
      "label": "Hardware",
      "waarde": "HW1.0 (typeplaatje)",
      "status": "bevestigd",
      "bron": [
       "P01"
      ]
     }
    ],
    "beeld": "assets/processed/k05-minis-wit.jpg",
    "beeld_noot": "kofferfoto 25-09-2026",
    "source": [
     {
      "type": "TRILUX klantpresentatie",
      "ref": "B03 p. 22",
      "verified": true,
      "noot": "MiniS LI DALI-2 Input Device als bouwvorm"
     },
     {
      "type": "TRILUX product page",
      "url": null,
      "verified": false
     },
     {
      "type": "photo label",
      "filename": "label-minis-lb-01.jpeg",
      "verified": true,
      "noot": "leesbaar: \"INS MiniS LI DA2 IPD LB 01\", \"10414766 HW1.0\", \"80200208 SN:006618\", DALI-2, CE"
     }
    ],
    "label_foto": "assets/processed/label-k05-minis-lb-01.jpg",
    "artikelnummer_label": "10414766",
    "artikelnummer_label_noot": "nummer op het typeplaatje zonder TOC-/TK-aanduiding; vermoedelijk TRILUX-artikelnummer (TK) — in SAP bevestigen (OP-03)"
   },
   {
    "id": "K06",
    "family": "minis",
    "kofferrol": "toonmodel",
    "kort": "IntuSens MiniS",
    "sub": "grijs · in het armatuur · Low Bay",
    "designation": "INS MiniS LI DA2 IPD LB 03",
    "designation_status": "bevestigd",
    "toc": null,
    "toc_status": "te-verifieren",
    "tk": null,
    "tk_status": "onzeker",
    "colour": "grijs",
    "colour_status": "bevestigd (kofferfoto + typeplaatje LB 03 op de grijze module)",
    "optic": "Low Bay",
    "optic_status": "bevestigd (B03 MiniS = Low Bay)",
    "interface": "DALI-2 Input Device",
    "interface_status": "bevestigd (B03)",
    "mounting": "in het armatuur (LI)",
    "mounting_status": "bevestigd (B03)",
    "verkoopzin": "Kleine module, volwaardige sensor, in het armatuur — grijze uitvoering.",
    "waarvoor": [
     "Armaturen met grijze of aluminiumkleurige afwerking.",
     "Ruimtes tot 5 m hoog.",
     "Input Device voor LiveLink of een ander DALI-2-systeem."
    ],
    "waar": [
     "kantoor",
     "onderwijs",
     "retail",
     "verkeersruimten"
    ],
    "techniek": [
     {
      "label": "Detectie",
      "waarde": "PIR + lichtsensor",
      "status": "bevestigd",
      "bron": [
       "A08",
       "B03"
      ]
     },
     {
      "label": "Interface",
      "waarde": "DALI-2 Input Device",
      "status": "bevestigd",
      "bron": [
       "P01"
      ],
      "noot": "typeplaatje: DALI-2-logo, \"IPD\""
     },
     {
      "label": "Montagehoogte",
      "waarde": "Low Bay 2–5 m",
      "status": "bevestigd",
      "bron": [
       "B03"
      ]
     },
     {
      "label": "IP-klasse",
      "waarde": null,
      "status": "te-verifieren",
      "open": "OP-07"
     },
     {
      "label": "Detectiegebied",
      "waarde": null,
      "status": "te-verifieren",
      "open": "OP-01"
     },
     {
      "label": "Hardware",
      "waarde": "HW1.0 (typeplaatje)",
      "status": "bevestigd",
      "bron": [
       "P01"
      ]
     }
    ],
    "beeld": "assets/processed/k06-minis-grijs.jpg",
    "beeld_noot": "kofferfoto 25-09-2026",
    "source": [
     {
      "type": "TRILUX klantpresentatie",
      "ref": "B03 p. 22",
      "verified": true
     },
     {
      "type": "TRILUX product page",
      "url": null,
      "verified": false
     },
     {
      "type": "photo label",
      "filename": "label-minis-lb-03.jpeg",
      "verified": true,
      "noot": "leesbaar: \"INS MiniS LI DA2 IPD LB 03\", \"10429521 HW1.0\", \"80200222 SN:000501\", DALI-2, CE"
     }
    ],
    "label_foto": "assets/processed/label-k06-minis-lb-03.jpg",
    "artikelnummer_label": "10429521",
    "artikelnummer_label_noot": "nummer op het typeplaatje zonder TOC-/TK-aanduiding; vermoedelijk TRILUX-artikelnummer (TK) — in SAP bevestigen (OP-03)"
   },
   {
    "id": "K07",
    "family": "minis",
    "kofferrol": "toonmodel",
    "kort": "IntuSens MiniS",
    "sub": "zwart · in het armatuur · Low Bay",
    "designation": null,
    "designation_status": "te-verifieren",
    "toc": null,
    "toc_status": "te-verifieren",
    "tk": null,
    "tk_status": "te-verifieren",
    "colour": "zwart",
    "colour_status": "bevestigd (kofferfoto)",
    "optic": "Low Bay",
    "optic_status": "bevestigd (B03 MiniS = Low Bay)",
    "interface": "DALI-2 Input Device",
    "interface_status": "aanname op basis van de familie; te verifiëren",
    "mounting": "in het armatuur (LI)",
    "mounting_status": "bevestigd (B03)",
    "verkoopzin": "Kleine module, volwaardige sensor, in het armatuur — zwarte uitvoering.",
    "waarvoor": [
     "Zwarte armaturen waarin de sensor onopvallend moet zijn.",
     "Ruimtes tot 5 m hoog.",
     "Input Device voor LiveLink of een ander DALI-2-systeem."
    ],
    "waar": [
     "kantoor",
     "horeca",
     "retail",
     "verkeersruimten"
    ],
    "techniek": [
     {
      "label": "Detectie",
      "waarde": "PIR + lichtsensor",
      "status": "bevestigd",
      "bron": [
       "A08",
       "B03"
      ]
     },
     {
      "label": "Interface",
      "waarde": null,
      "status": "te-verifieren",
      "open": "OP-03"
     },
     {
      "label": "Montagehoogte",
      "waarde": "Low Bay 2–5 m",
      "status": "bevestigd",
      "bron": [
       "B03"
      ]
     },
     {
      "label": "IP-klasse",
      "waarde": null,
      "status": "te-verifieren",
      "open": "OP-07"
     },
     {
      "label": "Detectiegebied",
      "waarde": null,
      "status": "te-verifieren",
      "open": "OP-01"
     }
    ],
    "beeld": "assets/processed/k07-minis-zwart.jpg",
    "beeld_noot": "kofferfoto 25-09-2026",
    "source": [
     {
      "type": "opgave projectbrief",
      "ref": "brief 25-09-2026",
      "verified": false,
      "noot": "'zoek ook de exacte zwarte variant' — typecode nog onbekend"
     },
     {
      "type": "photo",
      "filename": "koffer-open-deksel-toonmodellen.jpeg",
      "verified": true,
      "noot": "zwarte MiniS-module rechts in de middelste rij; typeplaatje niet gefotografeerd (OP-03)"
     }
    ],
    "label_foto": null
   },
   {
    "id": "K08",
    "family": "minir",
    "kofferrol": "toonmodel",
    "kort": "IntuSens MiniR",
    "sub": "wit · in het armatuur · High Bay",
    "designation": "INS MiniR LI DA2 IPD HB 01",
    "designation_status": "bevestigd",
    "toc": "6001072500",
    "toc_status": "bevestigd",
    "tk": "10443788",
    "tk_status": "bevestigd",
    "colour": "wit",
    "colour_status": "bevestigd (typeplaatje op de witte sensor)",
    "optic": "High Bay",
    "optic_status": "bevestigd (B03 MiniR = High Bay)",
    "interface": "DALI-2 Input Device",
    "interface_status": "bevestigd (B03)",
    "mounting": "in het armatuur (LI)",
    "mounting_status": "bevestigd (B03)",
    "verkoopzin": "De compacte armatuursensor voor hallen tot 18 m.",
    "waarvoor": [
     "Hoge ruimtes waar de sensor in het armatuur hoort.",
     "Input Device voor LiveLink of een ander DALI-2-systeem.",
     "Binnen en buiten volgens B03."
    ],
    "waar": [
     "magazijn",
     "productiehal",
     "sporthal",
     "stellinggangen",
     "overdekte buitenruimte"
    ],
    "techniek": [
     {
      "label": "Detectie",
      "waarde": "PIR + lichtsensor",
      "status": "bevestigd",
      "bron": [
       "A08",
       "B03"
      ]
     },
     {
      "label": "Interface",
      "waarde": "DALI-2 Input Device",
      "status": "bevestigd",
      "bron": [
       "B03"
      ]
     },
     {
      "label": "Montagehoogte",
      "waarde": "High Bay 5–18 m",
      "status": "bevestigd",
      "bron": [
       "B03"
      ]
     },
     {
      "label": "IP-klasse",
      "waarde": "IP66 (\"indoor and outdoor\", B03 p. 22)",
      "status": "onzeker",
      "open": "OP-04",
      "noot": "niet op het typeplaatje; datasheet controleren"
     },
     {
      "label": "Detectiegebied",
      "waarde": null,
      "status": "te-verifieren",
      "open": "OP-01"
     },
     {
      "label": "Voeding",
      "waarde": "DALI bus-powered, 10–20,5 V (typeplaatje)",
      "status": "bevestigd",
      "bron": [
       "P01"
      ]
     },
     {
      "label": "Omgevingstemperatuur",
      "waarde": "ta −25…+50 °C (typeplaatje)",
      "status": "bevestigd",
      "bron": [
       "P01"
      ]
     },
     {
      "label": "Montage",
      "waarde": "schroefdraad M27×1,5, sleutelwijdte SW36 (opdruk behuizing)",
      "status": "bevestigd",
      "bron": [
       "P01"
      ]
     }
    ],
    "beeld": "assets/processed/k08-minir-wit.jpg",
    "beeld_noot": "kofferfoto 25-09-2026",
    "source": [
     {
      "type": "TRILUX klantpresentatie",
      "ref": "B03 p. 22",
      "verified": true
     },
     {
      "type": "TRILUX product page",
      "url": null,
      "verified": false,
      "noot": "zoekfragment 25-09-2026 bevestigt dat een productpagina 'Sensor INS MiniR LI DA2 IPD HB 05' bestaat (trilux.com/products/cf/Sensor-INS-MiniR-LI-DA2-IPD-HB-05); pagina niet geopend"
     },
     {
      "type": "photo label",
      "filename": "label-minir-hb-01.jpeg",
      "verified": true,
      "noot": "leesbaar: \"INS MiniR LI DA2 IPD HB 01\", \"TOC: 6001072500\", \"TK:10443788\", \"10-20,5 DALI bus-powered\", \"ta -25...+50°C\", DALI-2, UKCA, CE, TRILUX GmbH & Co.KG"
     }
    ],
    "label_foto": "assets/processed/label-k08-minir-hb-01.jpg"
   },
   {
    "id": "K09",
    "family": "minir",
    "kofferrol": "toonmodel",
    "kort": "IntuSens MiniR",
    "sub": "zwart · in het armatuur · High Bay · uitvoering \"05 NO L\"",
    "designation": "INS MiniR LI DA2 IPD HB 05 NO L",
    "designation_status": "bevestigd",
    "toc": "6001072600",
    "toc_status": "bevestigd",
    "tk": "10443789",
    "tk_status": "bevestigd",
    "colour": "zwart",
    "colour_status": "bevestigd (typeplaatje op de zwarte sensor)",
    "optic": "High Bay",
    "optic_status": "bevestigd (B03 MiniR = High Bay)",
    "interface": "DALI-2 Input Device",
    "interface_status": "bevestigd (B03)",
    "mounting": "in het armatuur (LI)",
    "mounting_status": "bevestigd (B03)",
    "verkoopzin": "MiniR-uitvoering met toevoeging \"NO L\" — betekenis nog te verifiëren.",
    "waarvoor": [
     "Hoge ruimtes waar de sensor in het armatuur hoort.",
     "Input Device voor LiveLink of een ander DALI-2-systeem.",
     "Wat \"NO L\" precies betekent staat in OP-04; niet raden."
    ],
    "waar": [
     "magazijn",
     "productiehal",
     "sporthal",
     "stellinggangen"
    ],
    "techniek": [
     {
      "label": "Detectie",
      "waarde": "PIR",
      "status": "bevestigd",
      "bron": [
       "A08",
       "B03"
      ]
     },
     {
      "label": "Lichtsensor",
      "waarde": null,
      "status": "te-verifieren",
      "open": "OP-04",
      "noot": "toevoeging 'NO L' niet interpreteren zonder bron"
     },
     {
      "label": "Interface",
      "waarde": "DALI-2 Input Device",
      "status": "bevestigd",
      "bron": [
       "B03"
      ]
     },
     {
      "label": "Montagehoogte",
      "waarde": "High Bay 5–18 m",
      "status": "bevestigd",
      "bron": [
       "B03"
      ]
     },
     {
      "label": "IP-klasse",
      "waarde": null,
      "status": "te-verifieren",
      "open": "OP-04"
     },
     {
      "label": "Detectiegebied",
      "waarde": null,
      "status": "te-verifieren",
      "open": "OP-01"
     },
     {
      "label": "Voeding",
      "waarde": "DALI bus-powered, 10–20,5 V (typeplaatje)",
      "status": "bevestigd",
      "bron": [
       "P01"
      ]
     },
     {
      "label": "Omgevingstemperatuur",
      "waarde": "ta −25…+50 °C (typeplaatje)",
      "status": "bevestigd",
      "bron": [
       "P01"
      ]
     },
     {
      "label": "Montage",
      "waarde": "schroefdraad M27×1,5, sleutelwijdte SW36 (opdruk behuizing)",
      "status": "bevestigd",
      "bron": [
       "P01"
      ]
     }
    ],
    "beeld": "assets/processed/k09-minir-zwart-a.jpg",
    "beeld_noot": "kofferfoto 25-09-2026; toewijzing van de twee zwarte MiniR aan de posities in het deksel is een aanname (V-005)",
    "source": [
     {
      "type": "TRILUX klantpresentatie",
      "ref": "B03 p. 22",
      "verified": true
     },
     {
      "type": "TRILUX product page",
      "url": null,
      "verified": false
     },
     {
      "type": "photo label",
      "filename": "label-minir-hb-05-no-l.jpeg",
      "verified": true,
      "noot": "leesbaar: \"INS MiniR LI DA2 IPD HB 05 NO L\", \"TOC: 6001072600\", \"TK 10443789\", \"10-20,5 DALI bus-powered\", \"ta -25...+50°C\""
     }
    ],
    "label_foto": "assets/processed/label-k09-minir-hb-05-no-l.jpg"
   },
   {
    "id": "K10",
    "family": "minir",
    "kofferrol": "toonmodel",
    "kort": "IntuSens MiniR",
    "sub": "zwart · in het armatuur · High Bay",
    "designation": "INS MiniR LI DA2 IPD HB 05",
    "designation_status": "bevestigd",
    "toc": "6001072700",
    "toc_status": "bevestigd",
    "tk": "10460023",
    "tk_status": "onzeker",
    "colour": "zwart",
    "colour_status": "bevestigd (typeplaatje op de zwarte sensor)",
    "optic": "High Bay",
    "optic_status": "bevestigd (B03 MiniR = High Bay)",
    "interface": "DALI-2 Input Device",
    "interface_status": "bevestigd (B03)",
    "mounting": "in het armatuur (LI)",
    "mounting_status": "bevestigd (B03)",
    "verkoopzin": "De compacte armatuursensor voor hallen tot 18 m, uitvoering 05.",
    "waarvoor": [
     "Hoge ruimtes waar de sensor in het armatuur hoort.",
     "Input Device voor LiveLink of een ander DALI-2-systeem.",
     "Binnen en buiten volgens B03."
    ],
    "waar": [
     "magazijn",
     "productiehal",
     "sporthal",
     "stellinggangen",
     "overdekte buitenruimte"
    ],
    "techniek": [
     {
      "label": "Detectie",
      "waarde": "PIR + lichtsensor",
      "status": "bevestigd",
      "bron": [
       "A08",
       "B03"
      ]
     },
     {
      "label": "Interface",
      "waarde": "DALI-2 Input Device",
      "status": "bevestigd",
      "bron": [
       "B03"
      ]
     },
     {
      "label": "Montagehoogte",
      "waarde": "High Bay 5–18 m",
      "status": "bevestigd",
      "bron": [
       "B03"
      ]
     },
     {
      "label": "IP-klasse",
      "waarde": "IP66 (\"indoor and outdoor\", B03 p. 22)",
      "status": "onzeker",
      "open": "OP-04"
     },
     {
      "label": "Detectiegebied",
      "waarde": null,
      "status": "te-verifieren",
      "open": "OP-01"
     },
     {
      "label": "Voeding",
      "waarde": "DALI bus-powered, 10–20,5 V (typeplaatje)",
      "status": "bevestigd",
      "bron": [
       "P01"
      ]
     },
     {
      "label": "Omgevingstemperatuur",
      "waarde": "ta −25…+50 °C (typeplaatje)",
      "status": "bevestigd",
      "bron": [
       "P01"
      ]
     },
     {
      "label": "Montage",
      "waarde": "schroefdraad M27×1,5 (opdruk behuizing)",
      "status": "bevestigd",
      "bron": [
       "P01"
      ]
     }
    ],
    "beeld": "assets/processed/k10-minir-zwart-b.jpg",
    "beeld_noot": "kofferfoto 25-09-2026; toewijzing van de twee zwarte MiniR aan de posities in het deksel is een aanname (V-005)",
    "source": [
     {
      "type": "TRILUX klantpresentatie",
      "ref": "B03 p. 22",
      "verified": true
     },
     {
      "type": "TRILUX product page",
      "url": "https://www.trilux.com/products/cf/Sensor-INS-MiniR-LI-DA2-IPD-HB-05",
      "verified": false,
      "noot": "alleen als zoekresultaat gezien (25-09-2026); pagina niet geopend, inhoud niet gecontroleerd"
     },
     {
      "type": "photo label",
      "filename": "label-minir-hb-05.jpeg",
      "verified": true,
      "noot": "leesbaar: \"…MiniR LI DA2 IPD HB 05\", \"…C: 6001072700\", \"…10460023\" (linkerrand afgesneden), \"10-20,5 DALI bus-powered\", \"ta -25...+50°C\""
     }
    ],
    "label_foto": "assets/processed/label-k10-minir-hb-05.jpg",
    "tk_noot": "op het typeplaatje deels afgesneden gefotografeerd; leesbaar \"…10460023\" — opnieuw fotograferen of in SAP bevestigen (OP-04)"
   },
   {
    "id": "K11",
    "family": "zhaga",
    "kofferrol": "toonmodel",
    "kort": "IntuSens Zhaga Book 18",
    "sub": "High Bay",
    "designation": "INS ZB18 DA2 HB IPD",
    "designation_status": "bevestigd",
    "toc": "6001072100",
    "toc_status": "bevestigd",
    "tk": null,
    "tk_status": "te-verifieren",
    "colour": "grijs (behuizing), heldere lens",
    "colour_status": "waarneming kofferfoto/typeplaatje",
    "optic": "High Bay",
    "optic_status": "bevestigd (typeplaatje: HB)",
    "interface": "DALI-2 Input Device",
    "interface_status": "bevestigd (typeplaatje: DALI-2, IPD, DA+/DA−)",
    "mounting": "Zhaga Book 18-socket",
    "mounting_status": "bevestigd (A08: Zhaga-uitvoering)",
    "verkoopzin": "Klik-op-sensor voor industriearmaturen met Zhaga Book 18-socket, IP66.",
    "waarvoor": [
     "Armaturen met Zhaga Book 18-socket in hoge, stoffige of natte ruimtes.",
     "Sensor los van het armatuur te kiezen en te vervangen.",
     "Input Device voor LiveLink of een ander DALI-2-systeem."
    ],
    "waar": [
     "magazijn",
     "productiehal",
     "koel- en vriesruimte (IP66; temperatuurbereik controleren)",
     "overdekte buitenruimte",
     "parkeergarage"
    ],
    "techniek": [
     {
      "label": "Detectie",
      "waarde": "PIR + lichtsensor",
      "status": "bevestigd",
      "bron": [
       "A08"
      ]
     },
     {
      "label": "Optiek",
      "waarde": "High Bay",
      "status": "bevestigd",
      "bron": [
       "P01"
      ]
     },
     {
      "label": "Interface",
      "waarde": "DALI-2 Input Device (DA+ / DA−)",
      "status": "bevestigd",
      "bron": [
       "P01"
      ]
     },
     {
      "label": "Montagehoogte",
      "waarde": "5–18 m",
      "status": "bevestigd",
      "bron": [
       "A08"
      ]
     },
     {
      "label": "IP-klasse",
      "waarde": "IP66",
      "status": "bevestigd",
      "bron": [
       "A08"
      ]
     },
     {
      "label": "Detectiegebied",
      "waarde": null,
      "status": "te-verifieren",
      "open": "OP-01"
     },
     {
      "label": "Voeding",
      "waarde": "DALI bus-powered, 10–20,5 V (typeplaatje)",
      "status": "bevestigd",
      "bron": [
       "P01"
      ]
     },
     {
      "label": "Omgevingstemperatuur",
      "waarde": "ta −25…+50 °C (typeplaatje)",
      "status": "bevestigd",
      "bron": [
       "P01"
      ]
     }
    ],
    "beeld": "assets/processed/k11-zhaga-a.jpg",
    "beeld_noot": "kofferfoto 25-09-2026; toewijzing HB/HB Corr aan de twee posities links in het deksel is een aanname (V-005)",
    "source": [
     {
      "type": "opgave projectbrief",
      "ref": "brief 25-09-2026",
      "verified": false,
      "noot": "brief verwijst naar foto's van achteretiketten als bewijs; niet ontvangen"
     },
     {
      "type": "TRILUX product page",
      "url": null,
      "verified": false
     },
     {
      "type": "photo label",
      "filename": "label-zb18-hb.jpeg",
      "verified": true,
      "noot": "leesbaar: \"INS ZB18 DA2 HB IPD\", \"TOC: 6001072100\", \"DA-\", \"DA+\", \"DALI bus-powered 10 - 20,5V\", \"ta -25...+50°C\", DALI-2, UKCA, CE, TRILUX GmbH & Co.KG; geen TK op het plaatje"
     }
    ],
    "label_foto": "assets/processed/label-k11-zb18-hb.jpg",
    "designation_noot": "volgorde op het typeplaatje is \"DA2 HB IPD\"; de brief noemde \"DA2 IPD HB\""
   },
   {
    "id": "K12",
    "family": "zhaga",
    "kofferrol": "toonmodel",
    "kort": "IntuSens Zhaga Book 18",
    "sub": "High Bay Corridor",
    "designation": "INS ZB18 DA2 IPD HB Corr",
    "designation_status": "bevestigd",
    "toc": "6001072200",
    "toc_status": "bevestigd",
    "tk": null,
    "tk_status": "te-verifieren",
    "colour": "grijs (behuizing), heldere lens",
    "colour_status": "waarneming kofferfoto/typeplaatje",
    "optic": "High Bay Corridor",
    "optic_status": "bevestigd (typeplaatje: HB Corr)",
    "interface": "DALI-2 Input Device",
    "interface_status": "bevestigd (typeplaatje: DALI-2, IPD, DA+/DA−)",
    "mounting": "Zhaga Book 18-socket",
    "mounting_status": "bevestigd (A08: Zhaga-uitvoering)",
    "verkoopzin": "Dezelfde Zhaga-sensor, met een langgerekt detectiegebied voor gangen.",
    "waarvoor": [
     "Stellinggangen en lange verkeerszones onder hoge plafonds.",
     "Detectie in de lengterichting in plaats van rondom.",
     "Input Device voor LiveLink of een ander DALI-2-systeem."
    ],
    "waar": [
     "stellinggangen in magazijnen",
     "lange hallen",
     "laad- en losstraten",
     "parkeergarage-rijbanen"
    ],
    "techniek": [
     {
      "label": "Detectie",
      "waarde": "PIR + lichtsensor",
      "status": "bevestigd",
      "bron": [
       "A08"
      ]
     },
     {
      "label": "Optiek",
      "waarde": "High Bay Corridor (langgerekt detectiegebied)",
      "status": "bevestigd",
      "bron": [
       "A08"
      ],
      "noot": "zoekfragment trilux.com: 'oval sensor fields for corridors and walkways'"
     },
     {
      "label": "Interface",
      "waarde": "DALI-2 Input Device (DA+ / DA−)",
      "status": "bevestigd",
      "bron": [
       "P01"
      ]
     },
     {
      "label": "Montagehoogte",
      "waarde": "5–18 m",
      "status": "bevestigd",
      "bron": [
       "A08"
      ]
     },
     {
      "label": "IP-klasse",
      "waarde": "IP66",
      "status": "bevestigd",
      "bron": [
       "A08"
      ]
     },
     {
      "label": "Detectiegebied",
      "waarde": null,
      "status": "te-verifieren",
      "open": "OP-01"
     },
     {
      "label": "Voeding",
      "waarde": "DALI bus-powered, 10–20,5 V (typeplaatje)",
      "status": "bevestigd",
      "bron": [
       "P01"
      ]
     },
     {
      "label": "Omgevingstemperatuur",
      "waarde": "ta −25…+50 °C (typeplaatje)",
      "status": "bevestigd",
      "bron": [
       "P01"
      ]
     }
    ],
    "beeld": "assets/processed/k12-zhaga-b.jpg",
    "beeld_noot": "kofferfoto 25-09-2026; toewijzing HB/HB Corr aan de twee posities links in het deksel is een aanname (V-005)",
    "source": [
     {
      "type": "opgave projectbrief",
      "ref": "brief 25-09-2026",
      "verified": false
     },
     {
      "type": "TRILUX product page",
      "url": null,
      "verified": false
     },
     {
      "type": "photo label",
      "filename": "label-zb18-hb-corr.jpeg",
      "verified": true,
      "noot": "leesbaar: \"INS ZB18 DA2 IPD HB Corr\", \"TOC: 6001072200\", \"DA-\", \"DA+\", \"DALI bus-powered 10 - 20,5V\", \"ta -25...+50°C\"; geen TK op het plaatje"
     }
    ],
    "label_foto": "assets/processed/label-k12-zb18-hb-corr.jpg"
   }
  ],
  "accessoires": [
   {
    "id": "A01",
    "naam": "230 V-netkabel",
    "functie": "Voedt de koffer. Zit in het hoesje in de koffer.",
    "nodig_basisdemo": true
   },
   {
    "id": "A02",
    "naam": "Netaansluiting (IEC) met aan/uit-schakelaar",
    "functie": "Centrale voedingsingang midden achter op de koffer, met netschakelaar.",
    "nodig_basisdemo": true,
    "foto": "assets/processed/koffer-netaansluiting.jpg",
    "waarneming": "IEC-inlet met wipschakelaar midden achter (kofferfoto)"
   },
   {
    "id": "A03",
    "naam": "Twee losse aansluitstekkers",
    "functie": "Voor toekomstige aansluiting van externe demonstratiearmaturen. In de huidige salesdemo niet gebruikt.",
    "nodig_basisdemo": false,
    "foto": "assets/processed/losse-onderdelen.jpg",
    "waarneming": "twee zwarte 5-polige aansluitstekkers (Wieland-type, opdruk), links en rechts in het deksel (kofferfoto)"
   },
   {
    "id": "A04",
    "naam": "Aansluiting achterzijde \"DA2 BCast\"",
    "functie": "Voorbereide uitgang van de DALI-2 Broadcast-sensor voor externe DALI-armaturen. Versie 1: niet nodig.",
    "nodig_basisdemo": false,
    "waarneming": "label op de koffer: \"DA2 BCast — DA- N PE DA+ L\", 5-polige aansluiting links achter (kofferfoto)"
   },
   {
    "id": "A05",
    "naam": "Aansluiting achterzijde \"Switch\"",
    "functie": "Voorbereide geschakelde uitgang van de Switch-sensor voor externe armaturen. Versie 1: niet nodig.",
    "nodig_basisdemo": false,
    "waarneming": "label op de koffer: \"Switch — NC N PE L´ L\", 5-polige aansluiting rechts achter (kofferfoto)"
   }
  ],
  "dali_algemeen": [
   {
    "tekst": "Het toegestane stuurvermogen op een DALI-lijn is begrensd op maximaal 250 mA.",
    "bron": [
     "A12"
    ],
    "status": "bevestigd"
   },
   {
    "tekst": "Het stuurvermogen van aangesloten voorschakelapparaten bedraagt maximaal 2 mA per DALI-adres.",
    "bron": [
     "A12"
    ],
    "status": "bevestigd"
   },
   {
    "tekst": "DALI-voedingen die in gangbare stuurapparaten zijn ingebouwd leveren meestal 128 mA of minder; het aantal deelnemers in broadcast kan daardoor beperkt zijn tot 64 of minder.",
    "bron": [
     "A12"
    ],
    "status": "bevestigd",
    "noot": "algemene TRILUX-lichtpraktijk; zegt niets over de IntuSens Broadcast-sensor zelf (OP-14)"
   }
  ]
 },
 "koffer": {
  "_meta": {
   "toelichting": "Twee klikbare foto's: het deksel (toonmodellen) en de onderzijde (werkende sensoren). Coördinaten in % van de uitsnede; aanpassen met de hotspot-editor (index.html#/koffer?edit=1).",
   "status": "kofferfoto's ontvangen en verwerkt op 25-09-2026 (projecteigenaar TRILUX NL); hotspots op basis van de foto geplaatst",
   "beeldregel": "Familiebeelden uit B03 worden alleen getoond bij onderdelen waarvan kleur en bouwvorm met het beeld overeenkomen; anders placeholder tot de kofferfoto er is."
  },
  "foto_boven": "assets/processed/koffer-deksel-tray.jpg",
  "foto_boven_alt": "Geopend deksel van de IntuSens-demokoffer met de toonmodellen: MiniR, Zhaga Book 18, MiniS, Rail en twee aansluitstekkers",
  "foto_achter": "assets/processed/koffer-achterzijde.jpg",
  "foto_achter_alt": "Achterzijde van de demokoffer: aansluiting DA2 BCast links, netaansluiting met schakelaar in het midden, aansluiting Switch rechts",
  "foto_hero": "assets/processed/koffer-hero.jpg",
  "hotspots": [
   {
    "ref": "K01",
    "x": 27.3,
    "y": 47.8,
    "label": "IntuSens Switch",
    "familie": "plafond · opbouw",
    "functie": "Werkende demosensor: schakelt 230 V direct."
   },
   {
    "ref": "K02",
    "x": 72.3,
    "y": 48.3,
    "label": "IntuSens DALI-2 Broadcast",
    "familie": "plafond · inbouw",
    "functie": "Werkende demosensor: stuurt DALI-armaturen als één groep."
   },
   {
    "ref": "K08",
    "x": 31.6,
    "y": 20.8,
    "label": "IntuSens MiniR (wit, HB 01)",
    "familie": "MiniR",
    "functie": "Armatuurmodule High Bay, DALI-2 Input Device."
   },
   {
    "ref": "K09",
    "x": 52.0,
    "y": 21.1,
    "label": "IntuSens MiniR (zwart, HB 05 NO L)",
    "familie": "MiniR",
    "functie": "Armatuurmodule High Bay, DALI-2 Input Device.",
    "noot": "zwarte MiniR, midden boven — aangenomen: HB 05 NO L (aanname op volgorde van de projectbrief; nog fysiek te controleren)"
   },
   {
    "ref": "K10",
    "x": 71.5,
    "y": 21.9,
    "label": "IntuSens MiniR (zwart, HB 05)",
    "familie": "MiniR",
    "functie": "Armatuurmodule High Bay, DALI-2 Input Device.",
    "noot": "zwarte MiniR, rechts boven — aangenomen: HB 05 (aanname; nog fysiek te controleren)"
   },
   {
    "ref": "K11",
    "x": 22.3,
    "y": 42.9,
    "label": "IntuSens Zhaga Book 18 HB",
    "familie": "Zhaga Book 18",
    "functie": "Klik-op-sensor voor industriearmaturen, rond detectiegebied.",
    "noot": "Zhaga links boven — aangenomen: HB (aanname; nog fysiek te controleren)"
   },
   {
    "ref": "K12",
    "x": 22.3,
    "y": 72.1,
    "label": "IntuSens Zhaga Book 18 HB Corridor",
    "familie": "Zhaga Book 18",
    "functie": "Klik-op-sensor, langgerekt detectiegebied voor gangen.",
    "noot": "Zhaga links onder — aangenomen: HB Corridor (aanname; nog fysiek te controleren)"
   },
   {
    "ref": "K05",
    "x": 38.7,
    "y": 40.7,
    "label": "IntuSens MiniS (wit)",
    "familie": "MiniS",
    "functie": "Armatuurmodule Low Bay, DALI-2 Input Device."
   },
   {
    "ref": "K06",
    "x": 59.0,
    "y": 41.2,
    "label": "IntuSens MiniS (grijs)",
    "familie": "MiniS",
    "functie": "Armatuurmodule Low Bay, DALI-2 Input Device."
   },
   {
    "ref": "K07",
    "x": 79.1,
    "y": 41.8,
    "label": "IntuSens MiniS (zwart)",
    "familie": "MiniS",
    "functie": "Armatuurmodule Low Bay."
   },
   {
    "ref": "K03",
    "x": 59.4,
    "y": 59.1,
    "label": "IntuSens Rail (wit)",
    "familie": "Rail",
    "functie": "Sensor in de lichtlijn, DALI-2 Input Device."
   },
   {
    "ref": "K04",
    "x": 59.4,
    "y": 72.1,
    "label": "IntuSens Rail (zwart)",
    "familie": "Rail",
    "functie": "Sensor in de lichtlijn, DALI-2 Input Device."
   },
   {
    "ref": "A03",
    "x": 10.2,
    "y": 30.3,
    "label": "Losse aansluitstekker (links)",
    "familie": "accessoire",
    "functie": "Niet nodig voor de basisdemo."
   },
   {
    "ref": "A03",
    "x": 93.1,
    "y": 30.9,
    "label": "Losse aansluitstekker (rechts)",
    "familie": "accessoire",
    "functie": "Niet nodig voor de basisdemo."
   },
   {
    "ref": "A01",
    "x": null,
    "y": null,
    "label": "Netkabel (in hoesje)",
    "familie": "accessoire",
    "functie": "Voeding van de koffer.",
    "noot": "in het hoesje; niet op de overzichtsfoto"
   }
  ],
  "achterzijde_labels": [
   {
    "ref": "A04",
    "label": "DA2 BCast — DA- N PE DA+ L",
    "positie": "links achter, 5-polige aansluiting",
    "status": "bevestigd (kofferfoto)"
   },
   {
    "ref": "A02",
    "label": "Netaansluiting (IEC) + aan/uit-schakelaar",
    "positie": "midden achter",
    "status": "bevestigd (kofferfoto)"
   },
   {
    "ref": "A05",
    "label": "Switch — NC N PE L´ L",
    "positie": "rechts achter, 5-polige aansluiting",
    "status": "bevestigd (kofferfoto)"
   }
  ],
  "snelstart": [
   {
    "n": 1,
    "titel": "Open de koffer",
    "tekst": "Leg de koffer plat en open het deksel.",
    "status": "bevestigd",
    "bron": "opgave"
   },
   {
    "n": 2,
    "titel": "Netsnoer uit het hoesje",
    "tekst": "Het 230 V-netsnoer zit in het hoesje in de koffer.",
    "status": "bevestigd",
    "bron": "kofferfoto (hoesje met netkabel)"
   },
   {
    "n": 3,
    "titel": "Sluit centraal achterop aan",
    "tekst": "De netaansluiting zit midden achter op de koffer.",
    "status": "bevestigd",
    "bron": "kofferfoto (IEC-inlet midden achter)"
   },
   {
    "n": 4,
    "titel": "230 V aansluiten",
    "tekst": "Steek de stekker in een geaard stopcontact.",
    "status": "bevestigd",
    "bron": "opgave"
   },
   {
    "n": 5,
    "titel": "Schakelaar aan",
    "tekst": "Zet de netschakelaar naast de netaansluiting aan. Je ziet dan nog niets: geen lamp, display uit. Dat is normaal.",
    "status": "bevestigd",
    "bron": "kofferfoto (wipschakelaar naast de inlet)"
   },
   {
    "n": 6,
    "titel": "Kies Switch of Broadcast",
    "tekst": "Beide werkende sensoren zitten in de onderzijde: links de witte Switch, rechts de zwarte DALI-2 Broadcast. Druk op de sensor: het display licht op.",
    "status": "bevestigd",
    "bron": "opgave"
   },
   {
    "n": 7,
    "titel": "Start de demo",
    "tekst": "Open in deze app 'Start klantdemo' of ga direct naar de bediening van de gekozen sensor.",
    "status": "bevestigd",
    "bron": "app"
   }
  ],
  "snelstart_noten": [
   {
    "tekst": "Na het inschakelen gebeurt er niets zichtbaars: er gaat geen lamp branden en het display blijft uit. Dat is normaal.",
    "status": "bevestigd",
    "bron": "praktijktest demokoffer, 25-09-2026 (\"de koffer doet niks na inschakelen\")"
   },
   {
    "tekst": "Pas als je de bediening op de sensor gebruikt, licht het display op en zie je dat de koffer en de sensor actief zijn.",
    "status": "bevestigd",
    "bron": "praktijktest demokoffer 25-09-2026 + displayfoto's van de Broadcast-sensor"
   }
  ],
  "niet_nodig": [
   {
    "ref": "A04",
    "naam": "DA2 BCast externe aansluiting"
   },
   {
    "ref": "A05",
    "naam": "Switch externe aansluiting"
   },
   {
    "ref": "A03",
    "naam": "Losse aansluitstekkers"
   }
  ],
  "uitbreiding_later": "De aansluitingen DA2 BCast en Switch aan de achterzijde zijn voorbereid om later externe demonstratiearmaturen aan te sluiten. Voor versie 1 van deze demo zijn ze niet nodig.",
  "foto_dicht": "assets/processed/koffer-dicht.jpg",
  "foto_hoesje": "assets/processed/koffer-hoesje-netkabel.jpg",
  "stages": [
   {
    "id": "deksel",
    "titel": "Deksel: de toonmodellen",
    "tekst": "Alle bouwvormen om vast te houden. Twee stekkers voor latere uitbreiding.",
    "foto": "assets/processed/koffer-deksel-tray.jpg",
    "alt": "Geopend deksel van de IntuSens-demokoffer met de toonmodellen: MiniR, Zhaga Book 18, MiniS, Rail en twee aansluitstekkers",
    "hotspots": [
     {
      "ref": "K08",
      "x": 31.6,
      "y": 20.8,
      "label": "IntuSens MiniR (wit, HB 01)",
      "familie": "MiniR",
      "functie": "Armatuurmodule High Bay, DALI-2 Input Device."
     },
     {
      "ref": "K09",
      "x": 52.0,
      "y": 21.1,
      "label": "IntuSens MiniR (zwart, HB 05 NO L)",
      "familie": "MiniR",
      "functie": "Armatuurmodule High Bay, DALI-2 Input Device.",
      "noot": "zwarte MiniR, midden boven — aangenomen: HB 05 NO L (aanname op volgorde van de projectbrief; nog fysiek te controleren)"
     },
     {
      "ref": "K10",
      "x": 71.5,
      "y": 21.9,
      "label": "IntuSens MiniR (zwart, HB 05)",
      "familie": "MiniR",
      "functie": "Armatuurmodule High Bay, DALI-2 Input Device.",
      "noot": "zwarte MiniR, rechts boven — aangenomen: HB 05 (aanname; nog fysiek te controleren)"
     },
     {
      "ref": "K11",
      "x": 22.3,
      "y": 42.9,
      "label": "IntuSens Zhaga Book 18 HB",
      "familie": "Zhaga Book 18",
      "functie": "Klik-op-sensor voor industriearmaturen, rond detectiegebied.",
      "noot": "Zhaga links boven — aangenomen: HB (aanname; nog fysiek te controleren)"
     },
     {
      "ref": "K12",
      "x": 22.3,
      "y": 72.1,
      "label": "IntuSens Zhaga Book 18 HB Corridor",
      "familie": "Zhaga Book 18",
      "functie": "Klik-op-sensor, langgerekt detectiegebied voor gangen.",
      "noot": "Zhaga links onder — aangenomen: HB Corridor (aanname; nog fysiek te controleren)"
     },
     {
      "ref": "K05",
      "x": 38.7,
      "y": 40.7,
      "label": "IntuSens MiniS (wit)",
      "familie": "MiniS",
      "functie": "Armatuurmodule Low Bay, DALI-2 Input Device."
     },
     {
      "ref": "K06",
      "x": 59.0,
      "y": 41.2,
      "label": "IntuSens MiniS (grijs)",
      "familie": "MiniS",
      "functie": "Armatuurmodule Low Bay, DALI-2 Input Device."
     },
     {
      "ref": "K07",
      "x": 79.1,
      "y": 41.8,
      "label": "IntuSens MiniS (zwart)",
      "familie": "MiniS",
      "functie": "Armatuurmodule Low Bay."
     },
     {
      "ref": "K03",
      "x": 59.4,
      "y": 59.1,
      "label": "IntuSens Rail (wit)",
      "familie": "Rail",
      "functie": "Sensor in de lichtlijn, DALI-2 Input Device."
     },
     {
      "ref": "K04",
      "x": 59.4,
      "y": 72.1,
      "label": "IntuSens Rail (zwart)",
      "familie": "Rail",
      "functie": "Sensor in de lichtlijn, DALI-2 Input Device."
     },
     {
      "ref": "A03",
      "x": 10.2,
      "y": 30.3,
      "label": "Losse aansluitstekker (links)",
      "familie": "accessoire",
      "functie": "Niet nodig voor de basisdemo."
     },
     {
      "ref": "A03",
      "x": 93.1,
      "y": 30.9,
      "label": "Losse aansluitstekker (rechts)",
      "familie": "accessoire",
      "functie": "Niet nodig voor de basisdemo."
     }
    ]
   },
   {
    "id": "onderzijde",
    "titel": "Onderzijde: de werkende sensoren",
    "tekst": "Links de Switch (wit), rechts de DALI-2 Broadcast (zwart). Beide met bediening op de sensor.",
    "foto": "assets/processed/koffer-onderzijde.jpg",
    "alt": "Onderzijde van de demokoffer met de witte IntuSens Switch links en de zwarte IntuSens DALI-2 Broadcast rechts",
    "hotspots": [
     {
      "ref": "K01",
      "x": 27.3,
      "y": 47.8,
      "label": "IntuSens Switch",
      "familie": "plafond · opbouw",
      "functie": "Werkende demosensor: schakelt 230 V direct."
     },
     {
      "ref": "K02",
      "x": 72.3,
      "y": 48.3,
      "label": "IntuSens DALI-2 Broadcast",
      "familie": "plafond · inbouw",
      "functie": "Werkende demosensor: stuurt DALI-armaturen als één groep."
     }
    ]
   }
  ]
 },
 "bediening": {
  "_meta": {
   "toelichting": "Bediening van de twee actieve demosensoren. Alleen wat officieel bevestigd is staat op 'bevestigd'. Waarnemingen uit de praktijktest staan op 'waarneming' en worden in de app als 'waargenomen, nog te bevestigen' getoond. Alles wat ontbreekt staat in OPEN-PUNTEN.md (OP-15 t/m OP-17).",
   "bron_bevestigd": "A08 (trilux.com, zoekfragmenten 17-09 en 25-09-2026); B03 p. 6, 10–11 via de bronaudit van de presentatie-repo (CL-180).",
   "fotos": "Displayfoto's van de Broadcast-sensor (25-09-2026): assets/processed/bediening-broadcast-01..06.jpg. Ze zijn onderzoeksmateriaal, geen bron voor betekenis."
  },
  "gemeenschappelijk": {
   "bevestigd": [
    "Instellen zonder gereedschap, zonder app en zonder afstandsbediening.",
    "Helderheidsdrempel en nalooptijd worden aan de voorzijde met het draaiwiel ingesteld.",
    "Het display toont direct de ingestelde waarde.",
    "Instellingen direct op de sensor gelden voor de varianten Switch en DALI-2 Broadcast."
   ],
   "b03_parameters": {
    "tekst": "B03 p. 10–11 noemt voor Switch en Broadcast: nalooptijd, helderheidsdrempel, basislicht en de bedrijfsmodi auto/half-auto.",
    "status": "onzeker",
    "noot": "via bronaudit presentatie-repo; document niet in deze sessie ingezien"
   },
   "waarneming": [
    {
     "tekst": "Onder de PIR-lens staan twee symbolen: een zon en een klok. Op de Broadcast-sensor zit op het zonsymbool het drukpunt (foto's tonen de vinger daarop) en licht het symbool op.",
     "status": "waarneming",
     "open": "OP-15",
     "foto": "assets/processed/bediening-broadcast-05.jpg"
    },
    {
     "tekst": "Het display zit boven de lens en toont cijfers en letters: waargenomen standen \"2\", \"1\", \"UC\", \"080\" (met zonsymbool aan) en \"60\" (met zon- én kloksymbool aan). Betekenis en volgorde niet gedocumenteerd.",
     "status": "waarneming",
     "open": "OP-16",
     "fotos": [
      "assets/processed/bediening-broadcast-01.jpg",
      "assets/processed/bediening-broadcast-02.jpg",
      "assets/processed/bediening-broadcast-04.jpg",
      "assets/processed/bediening-broadcast-05.jpg",
      "assets/processed/bediening-broadcast-06.jpg"
     ]
    },
    {
     "tekst": "De buitenste gekartelde ring van de Broadcast-sensor is de draairing. De witte Switch in de koffer heeft een gladde witte ring en dezelfde twee symbolen onder de lens.",
     "status": "waarneming",
     "open": "OP-17",
     "foto": "assets/processed/k01-switch.jpg"
    },
    {
     "tekst": "Lang indrukken toont een lettercode (waargenomen: ILC, LC, UC of vergelijkbaar; op foto: \"UC\").",
     "status": "waarneming",
     "open": "OP-16",
     "noot": "betekenis onbekend; niet raden"
    }
   ],
   "onbekend": [
    "Wat er gebeurt na inschakelen van 230 V en wat de normale displaystatus is.",
    "Hoe de bediening wordt geactiveerd; verschil kort en lang drukken.",
    "Of er een lock/unlock is en hoe die werkt.",
    "Welke displaycodes bestaan en wat ze betekenen; volgorde van de functies.",
    "Instelbereik van helderheidsdrempel en nalooptijd; eenheden en stappen.",
    "Draairichting, opslaan/bevestigen, automatisch verlaten van de instelmodus.",
    "Testmodus, fabrieksinstelling en reset."
   ],
   "onbekend_open": "OP-15, OP-16, OP-17"
  },
  "stappen": [
   {
    "n": 1,
    "kop": "Druk",
    "tekst": "Activeer de bediening op de sensor.",
    "status": "schematisch"
   },
   {
    "n": 2,
    "kop": "Selecteer functie",
    "tekst": "Kies helderheidsdrempel (zon) of nalooptijd (klok).",
    "status": "schematisch"
   },
   {
    "n": 3,
    "kop": "Draai",
    "tekst": "Draai aan de ring om de waarde te veranderen.",
    "status": "bevestigd"
   },
   {
    "n": 4,
    "kop": "Waarde wordt getoond",
    "tekst": "Het display toont de ingestelde waarde.",
    "status": "bevestigd"
   },
   {
    "n": 5,
    "kop": "Klaar",
    "tekst": "De sensor werkt met de nieuwe instelling.",
    "status": "schematisch"
   }
  ],
  "switch": {
   "kop": "Zo laat je de Switch zien",
   "wat_zie_je": "De Switch schakelt een 230 V-belasting. In de koffer zit daar niets zichtbaars achter: na inschakelen brandt geen lamp en blijft het display uit; pas bij bediening licht het display op (praktijktest demokoffer, 25-09-2026). De geschakelde uitgang is voorbereid op de achterzijde (\"Switch\"); voor versie 1 wordt daar niets op aangesloten.",
   "wat_zie_je_status": "bevestigd",
   "demo_flow": [
    "Laat de sensor zien: PIR-lens, ring en display.",
    "Verander de helderheidsdrempel (zon) en laat het display de waarde tonen.",
    "Verander de nalooptijd (klok) en laat het display de waarde tonen.",
    "Vertel: geen app, geen afstandsbediening, geen adressering."
   ],
   "fotos": [
    "assets/processed/k01-switch.jpg"
   ]
  },
  "broadcast": {
   "kop": "Zo laat je de DALI-2 Broadcast zien",
   "wat_zie_je": "De Broadcast-sensor stuurt alle DALI-armaturen op de lijn tegelijk. In de koffer zijn geen armaturen aangesloten: na inschakelen zie je niets, pas bij bediening licht het display op (praktijktest demokoffer, 25-09-2026). De DALI-uitgang is voorbereid op de achterzijde (\"DA2 BCast\"); voor versie 1 wordt daar niets op aangesloten.",
   "wat_zie_je_status": "bevestigd",
   "keten": [
    "230 V",
    "IntuSens DALI-2 Broadcast",
    "DALI-bus",
    "meerdere DALI-armaturen",
    "alle armaturen reageren als één groep"
   ],
   "demo_flow": [
    "Laat de sensor zien: dezelfde bediening als de Switch.",
    "Leg de keten uit: 230 V in, DALI-bus uit, alle armaturen samen.",
    "Verander helderheidsdrempel en nalooptijd op het display.",
    "Vertel: schakelen én dimmen, constantlichtregeling, geen adressering."
   ],
   "grenzen": "Het maximale aantal armaturen hangt af van de DALI-busvoeding van de sensor en het stroomverbruik per armatuur (2 mA per DALI-adres is het maximum per voorschakelapparaat). De waarde voor deze sensor is nog niet uit een officiële bron bevestigd (OP-14). Noem in het gesprek geen aantal.",
   "fotos": [
    "assets/processed/bediening-broadcast-01.jpg",
    "assets/processed/bediening-broadcast-04.jpg",
    "assets/processed/bediening-broadcast-05.jpg",
    "assets/processed/bediening-broadcast-06.jpg"
   ]
  }
 },
 "demo": {
  "_meta": {
   "toelichting": "Sales-modus: begeleide klantdemo van circa 5 minuten. Per scherm één hoofdboodschap en één spreektekst ('Wat zeg ik?')."
  },
  "schermen": [
   {
    "n": 1,
    "titel": "Wat is IntuSens?",
    "boodschap": "Eén sensorfamilie van TRILUX die beweging en daglicht meet en daarmee de verlichting regelt.",
    "beeld": "assets/processed/is-opbouw-zwart.jpg",
    "punten": [
     "PIR-detectie van beweging",
     "meting van beschikbaar daglicht",
     "instellen op de sensor zelf, zonder app"
    ],
    "zeg": "IntuSens is de sensorfamilie van TRILUX. De sensor ziet of er iemand is en hoeveel daglicht er is, en regelt daarmee het licht. Instellen doe je op de sensor zelf."
   },
   {
    "n": 2,
    "titel": "Eén familie, verschillende toepassingen",
    "boodschap": "Dezelfde techniek in vijf bouwvormen, voor ruimtes van 2 tot 18 meter hoog.",
    "beeld": "assets/processed/is-hb.jpg",
    "punten": [
     "plafond, opbouw of inbouw",
     "Zhaga Book 18 op het armatuur",
     "MiniR en MiniS in het armatuur",
     "Rail in de lichtlijn"
    ],
    "zeg": "Je kiest niet eerst een artikel, maar eerst de plek: op het plafond, op het armatuur, in het armatuur of in de lichtlijn. De techniek is overal hetzelfde."
   },
   {
    "n": 3,
    "titel": "Dit zit in de koffer",
    "boodschap": "Twee werkende sensoren en tien toonmodellen van alle bouwvormen.",
    "beeld": "assets/processed/koffer-deksel-tray.jpg",
    "koffer": true,
    "punten": [
     "werkend: Switch en DALI-2 Broadcast",
     "toonmodellen: Rail, MiniS, MiniR, Zhaga Book 18"
    ],
    "zeg": "In de koffer zitten twee sensoren die echt werken, en de andere bouwvormen om vast te houden. Na inschakelen zie je niets, dat is normaal: pas als ik de sensor bedien, licht het display op."
   },
   {
    "n": 4,
    "titel": "Switch: de sensor is de schakelaar",
    "boodschap": "Aanwezigheid en daglicht schakelen de 230 V-verlichting direct.",
    "beeld": "assets/processed/is-switch.jpg",
    "live": "switch",
    "punten": [
     "geen lichtmanagement nodig",
     "helderheidsdrempel en nalooptijd op de sensor"
    ],
    "zeg": "Dit is de eenvoudigste vorm. De sensor schakelt het licht zelf. Kijk: ik stel hier de daglichtdrempel en de nalooptijd in, en het display laat de waarde zien.",
    "foto": "assets/processed/k01-switch.jpg"
   },
   {
    "n": 5,
    "titel": "Broadcast: één lijn, één groep",
    "boodschap": "De sensor stuurt alle DALI-armaturen op de lijn tegelijk, zonder adressering.",
    "beeld": "assets/processed/is-broadcast.jpg",
    "live": "broadcast",
    "punten": [
     "schakelen én dimmen",
     "constantlichtregeling",
     "geen controller, geen software"
    ],
    "zeg": "Hier regelt de sensor DALI-armaturen. Alles op de lijn doet hetzelfde: aan, uit, dimmen op daglicht. Geen adressen, geen software, dezelfde bediening als de Switch.",
    "foto": "assets/processed/k02-broadcast.jpg"
   },
   {
    "n": 6,
    "titel": "Van standalone naar DALI-2 / LiveLink",
    "boodschap": "Als Input Device levert dezelfde sensor zijn signalen aan LiveLink, dat groepen, scènes en koppelingen bepaalt.",
    "beeld": "assets/processed/is-ipd.jpg",
    "punten": [
     "Switch en Broadcast: lokaal, op de sensor",
     "Input Device: signalen naar het systeem",
     "LiveLink: groepen, scènes, gebouwkoppeling"
    ],
    "zeg": "Wil je meer dan één groep, scènes of een koppeling met het gebouw, dan wordt de sensor een Input Device. Hij meldt aanwezigheid en licht aan LiveLink, en LiveLink bepaalt wat de armaturen doen. Dezelfde sensorfamilie groeit dus mee."
   },
   {
    "n": 7,
    "titel": "Welke sensor waar?",
    "boodschap": "Eerst de rol in het systeem, dan de montagehoogte, dan de bouwvorm, dan pas het artikelnummer.",
    "beeld": "assets/processed/is-lb.jpg",
    "familie": true,
    "punten": [
     "Low Bay 2–5 m: plafond, MiniS, Rail",
     "High Bay 5–18 m: plafond, MiniR, Zhaga Book 18",
     "High Bay Corridor: langgerekt gebied voor gangen"
    ],
    "zeg": "Kantoor of klaslokaal: plafondsensor, MiniS of Rail. Hal of magazijn: High Bay, als MiniR in het armatuur of als Zhaga-sensor erop. Stellinggangen: de Corridor-optiek."
   },
   {
    "n": 8,
    "titel": "Afronding",
    "boodschap": "Eén familie, één bediening, van een enkele ruimte tot een compleet LiveLink-systeem.",
    "beeld": "assets/processed/is-inbouw-wit.jpg",
    "punten": [
     "welke ruimtes en hoogtes spelen bij u?",
     "lokaal regelen of centraal lichtmanagement?",
     "vervolg: sensorplan en artikelkeuze"
    ],
    "zeg": "Samengevat: dezelfde sensor, in de bouwvorm die bij de ruimte past, lokaal of in LiveLink. Als u me vertelt welke ruimtes en hoogtes er spelen, maak ik een voorstel met de juiste uitvoeringen."
   }
  ]
 },
 "_gebouwd": "2026-09-25"
};
