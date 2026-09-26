/* IntuSens promofilm — timeline (v0.9). GEGENEREERD door build_timeline.py — niet met de hand bewerken.
 * Tekst/volgorde: LINES in build_timeline.py. Duur per regel: video/vo/durations.json (vo_prepare.py).
 */
(function (root) {
  var T = {
 "fps": 24,
 "duration": 45.07,
 "who": {
  "SW": {
   "label": "IntuSens Switch",
   "color": "#eaf6ff",
   "voice": "Skye — iets hoger, sneller, licht brutaal; lichte robot-kleur"
  },
  "BC": {
   "label": "IntuSens DALI-2 Broadcast",
   "color": "#7fc8ff",
   "voice": "Orion — lager, droog, zelfverzekerd; lichte robot-kleur"
  },
  "RL": {
   "label": "IntuSens Rail",
   "color": "#a9b4c6",
   "voice": "Chloe — kort, helder; onderbreekt van boven"
  }
 },
 "scenes": [
  {
   "id": "S1",
   "t0": 0.0,
   "t1": 6.07,
   "naam": "Ze willen uit de koffer"
  },
  {
   "id": "S2",
   "t0": 6.07,
   "t1": 13.57,
   "naam": "Hoe werkt Broadcast?"
  },
  {
   "id": "S3",
   "t0": 13.57,
   "t1": 21.62,
   "naam": "Code op display → uitleg op telefoon"
  },
  {
   "id": "S4",
   "t0": 21.62,
   "t1": 24.57,
   "naam": "Rail-cameo"
  },
  {
   "id": "S5",
   "t0": 24.57,
   "t1": 45.07,
   "naam": "Switch vs Broadcast"
  }
 ],
 "cuts": {
  "s2a": 6.07,
  "s2b": 7.77,
  "s3": 13.57,
  "s4": 21.62,
  "s5": 24.57
 },
 "lines": [
  {
   "vo": "01-SW-he-collega",
   "t0": 0.45,
   "t1": 1.25,
   "who": "SW",
   "text": "Hé collega?",
   "geschat": true
  },
  {
   "vo": "02-BC-al-best-lang",
   "t0": 1.55,
   "t1": 2.85,
   "who": "BC",
   "text": "We zitten hier al best lang.",
   "geschat": true
  },
  {
   "vo": "03-SW-veel-te-lang",
   "t0": 3.07,
   "t1": 3.77,
   "who": "SW",
   "text": "Veel te lang.",
   "geschat": true
  },
  {
   "vo": "04-BC-neem-ons-mee",
   "t0": 4.07,
   "t1": 5.77,
   "who": "BC",
   "text": "Neem ons eens mee naar een installateur.",
   "geschat": true
  },
  {
   "vo": "05-BC-zo-moeilijk",
   "t0": 6.32,
   "t1": 7.62,
   "who": "BC",
   "text": "Kijk. Zo moeilijk ben ik niet.",
   "geschat": true
  },
  {
   "vo": "06-SW-080",
   "t0": 13.77,
   "t1": 14.57,
   "who": "SW",
   "text": "080?",
   "geschat": true
  },
  {
   "vo": "07-BC-even-checken",
   "t0": 14.87,
   "t1": 16.37,
   "who": "BC",
   "text": "Even checken? Pak de site erbij.",
   "geschat": true
  },
  {
   "vo": "08-BC-code-op-display",
   "t0": 16.82,
   "t1": 19.22,
   "who": "BC",
   "text": "Code op het display, uitleg op je telefoon. Klaar.",
   "geschat": true
  },
  {
   "vo": "09-RL-en-ik-dan",
   "t0": 21.92,
   "t1": 22.72,
   "who": "RL",
   "text": "En ik dan?",
   "geschat": true
  },
  {
   "vo": "10-SW-jij-ook-op-site",
   "t0": 23.02,
   "t1": 24.02,
   "who": "SW",
   "text": "Jij staat ook op de site.",
   "geschat": true
  },
  {
   "vo": "11-SW-belangrijkere-vraag",
   "t0": 24.87,
   "t1": 26.17,
   "who": "SW",
   "text": "Maar goed. Belangrijkere vraag…",
   "geschat": true
  },
  {
   "vo": "12-BC-wie-eerste-vijftig",
   "t0": 26.52,
   "t1": 28.32,
   "who": "BC",
   "text": "Wie van ons is als eerste vijftig keer verkocht?",
   "geschat": true
  },
  {
   "vo": "13-SW-ik",
   "t0": 28.62,
   "t1": 29.02,
   "who": "SW",
   "text": "Ik.",
   "geschat": true
  },
  {
   "vo": "14-BC-succes",
   "t0": 29.67,
   "t1": 30.17,
   "who": "BC",
   "text": "Succes.",
   "geschat": true
  },
  {
   "vo": "15-SW-pak-die-koffer",
   "t0": 42.77,
   "t1": 43.67,
   "who": "SW",
   "text": "Dus… pak die koffer.",
   "geschat": true
  },
  {
   "vo": "16-BC-alsjeblieft",
   "t0": 43.87,
   "t1": 44.37,
   "who": "BC",
   "text": "Alsjeblieft.",
   "geschat": true
  }
 ],
 "display": {
  "base": "assets/display-base.jpg",
  "pressAt": 7.87,
  "steps": [
   [
    8.67,
    "3"
   ],
   [
    9.27,
    "2"
   ],
   [
    9.87,
    "1"
   ],
   [
    10.47,
    "ULC"
   ],
   [
    11.67,
    "080"
   ]
  ],
  "ledOn": 11.67,
  "chips": [
   [
    7.77,
    8.62,
    "Drukknop 3 s vasthouden"
   ],
   [
    10.67,
    11.67,
    "ULC · ontgrendeld"
   ],
   [
    11.92,
    13.57,
    "080 · lichtdrempel (fabrieksinstelling 80 %)"
   ]
  ]
 },
 "phoneIn": 15.7,
 "linkOn": 16.8,
 "phoneZoom": {
  "t0": 19.12,
  "t1": 21.62,
  "scale": 1.6
 },
 "rail": {
  "tiltT0": 21.82,
  "tiltT1": 22.52,
  "label": [
   22.12,
   23.22
  ],
  "bounce": 21.97,
  "back": [
   22.87,
   23.37
  ],
  "react": 24.07
 },
 "race": {
  "restAfterSucces": [
   30.17,
   30.62
  ]
 },
 "counter": {
  "show": 30.62,
  "steps": [
   [
    31.07,
    12,
    18
   ],
   [
    31.42,
    27,
    31
   ],
   [
    31.77,
    43,
    46
   ]
  ]
 },
 "cardA": {
  "t0": 32.17,
  "t1": 34.17
 },
 "cardB": {
  "t0": 34.17,
  "t1": 42.57
 },
 "endLook": 44.47,
 "blackout": 44.77,
 "sfx": {
  "kofferOpen": 0.15,
  "kofferClose": 44.77,
  "sensorClick": [
   0.4,
   1.5
  ],
  "railClick": 21.87,
  "phoneSwipe": 15.7,
  "thumps": [
   7.77,
   13.57,
   24.57,
   32.17,
   34.17
  ],
  "endClick": 44.62
 },
 "bed": {
  "bpm": 104,
  "duckCard": [
   34.17,
   42.57
  ]
 },
 "stemmen": "geschat (v0.8-slots; stemmen nog niet geplaatst)",
 "pauzefactor": 1.0
};
  root.TIMELINE = T;
  if (typeof module !== 'undefined') module.exports = T;
})(typeof window !== 'undefined' ? window : globalThis);
