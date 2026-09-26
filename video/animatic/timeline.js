/* IntuSens promofilm — animatic timeline (v0.4)
 * Alle tijden in seconden. Dit bestand is de enige bron voor dialoog en timing;
 * index.html (beeld) en audio.py (placeholder-geluid) lezen hieruit.
 *
 * v0.4: rustiger tempo (ademruimte tussen regels, langere holds), eindkaart B ≥ 4,4 s
 *       volledig opgebouwd stil in beeld, bedieningsreeks als gecontroleerde
 *       display-animatie (3 → 2 → 1 → ULC → 080) op de echte sensorfoto.
 * Later in te spreken: elke regel hieronder is één voice-over-cue (who + t0/t1).
 */
(function (root) {
  var T = {
    fps: 24,
    duration: 40.1,
    who: {
      SW: { label: 'IntuSens Switch', color: '#eaf6ff' },
      BC: { label: 'IntuSens DALI-2 Broadcast', color: '#7fc8ff' },
      MR: { label: 'IntuSens MiniR', color: '#a9b4c6' }
    },
    scenes: [
      { id: 'S1', t0: 0.0, t1: 6.3, naam: 'Ze willen uit de koffer' },
      { id: 'S2', t0: 6.3, t1: 13.5, naam: 'Hoe werkt Broadcast?' },
      { id: 'S3', t0: 13.5, t1: 21.3, naam: 'Code op display → uitleg op telefoon' },
      { id: 'S4', t0: 21.3, t1: 23.9, naam: 'MiniR-cameo' },
      { id: 'S5', t0: 23.9, t1: 40.1, naam: 'Switch vs Broadcast' }
    ],
    // scènegrenzen die index.html gebruikt
    cuts: { s2a: 6.3, s2b: 7.9, s3: 13.5, s4: 21.3, s5: 23.9 },
    lines: [
      { t0: 0.6, t1: 1.4, who: 'SW', text: 'Hé collega?' },
      { t0: 1.7, t1: 3.0, who: 'BC', text: 'We zitten hier al best lang.' },
      { t0: 3.4, t1: 4.1, who: 'SW', text: 'Veel te lang.' },
      { t0: 4.4, t1: 6.1, who: 'BC', text: 'Neem ons eens mee naar een installateur.' },
      { t0: 6.6, t1: 7.9, who: 'BC', text: 'Kijk. Zo moeilijk ben ik niet.' },
      { t0: 13.7, t1: 14.5, who: 'SW', text: '080?' },
      { t0: 14.9, t1: 16.4, who: 'BC', text: 'Even checken? Pak de site erbij.' },
      { t0: 17.3, t1: 19.7, who: 'BC', text: 'Code op het display, uitleg op je telefoon. Klaar.' },
      { t0: 21.6, t1: 22.4, who: 'MR', text: 'En ik dan?' },
      { t0: 22.7, t1: 23.8, who: 'SW', text: 'Jij staat ook op de site.' },
      { t0: 24.2, t1: 25.5, who: 'SW', text: 'Maar goed. Belangrijkere vraag…' },
      { t0: 25.7, t1: 27.5, who: 'BC', text: 'Wie van ons is als eerste vijftig keer verkocht?' },
      { t0: 27.7, t1: 28.1, who: 'SW', text: 'Ik.' },
      { t0: 28.3, t1: 28.9, who: 'BC', text: 'Succes.' },
      { t0: 37.8, t1: 38.7, who: 'SW', text: 'Dus… pak die koffer.' },
      { t0: 38.9, t1: 39.4, who: 'BC', text: 'Alsjeblieft.' }
    ],
    // Bedieningsreeks (S2b): display-animatie op de echte foto bediening-broadcast-03.jpg (drukknop ingedrukt,
    // display nog leeg). Stappen en teksten volgen src/data.js → bediening.sales.broadcast.flow:
    //   "Houd de drukknop 3 seconden ingedrukt. Het display telt af: 3 → 2 → 1 → ULC."
    //   "Direct na het ontgrendelen brandt de LED voor licht en staat de huidige waarde op het display (fabrieksinstelling 80 %)."
    // Referentiefoto's voor segmentvorm/gloed: bediening-broadcast-01 (2), -04 (ULC), -05 (080 + LED licht).
    display: {
      base: 'assets/display-base.jpg',   // = bediening-broadcast-03.jpg met alleen de specular reflectiestreep in het displaygebied weggeretoucheerd
      steps: [[8.7, '3'], [9.3, '2'], [9.9, '1'], [10.4, 'ULC'], [11.6, '080']],
      ledOn: 11.6,                                   // LED "licht" gaat aan bij 080 (data.js: leds.zon = on)
      chips: [[7.9, 'Drukknop 3 s vasthouden'], [10.4, 'ULC · ontgrendeld'], [11.6, '080 · lichtdrempel (fabrieksinstelling 80 %)']]
    },
    phoneIn: 15.6,
    linkOn: 16.7,
    phoneZoom: { t0: 19.6, t1: 21.3, scale: 1.6 },   // camera duwt naar de telefoon; site blijft leesbaar
    // Race-tellers: stappen (stopt vóór 50)
    counter: { show: 27.9, steps: [[28.6, 12, 18], [29.0, 27, 31], [29.4, 43, 46]] },
    cardA: { t0: 29.7, t1: 31.8 },       // grapwedstrijd: welk product is als eerste 50x verkocht
    cardB: { t0: 31.8, t1: 37.6 },       // saleschallenge; volledig opgebouwd vanaf ± 33,2 → ≥ 4,4 s stil leesbaar
    endLook: 39.5,                       // Broadcast: nog één droge blik naar Switch
    blackout: 39.8
  };
  root.TIMELINE = T;
  if (typeof module !== 'undefined') module.exports = T;
})(typeof window !== 'undefined' ? window : globalThis);
