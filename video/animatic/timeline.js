/* IntuSens promofilm — animatic timeline (v0.5)
 * Alle tijden in seconden. Dit bestand is de enige bron voor dialoog en timing;
 * index.html (beeld) en audio.py (placeholder-geluid) lezen hieruit.
 *
 * v0.5: nog iets rustiger tempo, eindkaart B ≈ 6 s volledig opgebouwd stil in beeld,
 *       Rail-cameo (echte witte Rail K03 in het deksel) i.p.v. MiniR, technische labels
 *       pas ná het bereiken van ULC / 080.
 * Later in te spreken: elke regel hieronder is één voice-over-cue (who + t0/t1).
 */
(function (root) {
  var T = {
    fps: 24,
    duration: 43.2,
    who: {
      SW: { label: 'IntuSens Switch', color: '#eaf6ff' },
      BC: { label: 'IntuSens DALI-2 Broadcast', color: '#7fc8ff' },
      RL: { label: 'IntuSens Rail', color: '#a9b4c6' }
    },
    scenes: [
      { id: 'S1', t0: 0.0, t1: 6.5, naam: 'Ze willen uit de koffer' },
      { id: 'S2', t0: 6.5, t1: 13.9, naam: 'Hoe werkt Broadcast?' },
      { id: 'S3', t0: 13.9, t1: 21.9, naam: 'Code op display → uitleg op telefoon' },
      { id: 'S4', t0: 21.9, t1: 24.8, naam: 'Rail-cameo' },
      { id: 'S5', t0: 24.8, t1: 43.2, naam: 'Switch vs Broadcast' }
    ],
    // scènegrenzen die index.html gebruikt
    cuts: { s2a: 6.5, s2b: 8.1, s3: 13.9, s4: 21.9, s5: 24.8 },
    lines: [
      { t0: 0.6, t1: 1.4, who: 'SW', text: 'Hé collega?' },
      { t0: 1.8, t1: 3.1, who: 'BC', text: 'We zitten hier al best lang.' },
      { t0: 3.5, t1: 4.2, who: 'SW', text: 'Veel te lang.' },
      { t0: 4.6, t1: 6.3, who: 'BC', text: 'Neem ons eens mee naar een installateur.' },
      { t0: 6.8, t1: 8.1, who: 'BC', text: 'Kijk. Zo moeilijk ben ik niet.' },
      { t0: 14.1, t1: 14.9, who: 'SW', text: '080?' },
      { t0: 15.3, t1: 16.8, who: 'BC', text: 'Even checken? Pak de site erbij.' },
      { t0: 17.8, t1: 20.2, who: 'BC', text: 'Code op het display, uitleg op je telefoon. Klaar.' },
      { t0: 22.2, t1: 23.0, who: 'RL', text: 'En ik dan?' },
      { t0: 23.4, t1: 24.4, who: 'SW', text: 'Jij staat ook op de site.' },
      { t0: 25.1, t1: 26.4, who: 'SW', text: 'Maar goed. Belangrijkere vraag…' },
      { t0: 26.7, t1: 28.5, who: 'BC', text: 'Wie van ons is als eerste vijftig keer verkocht?' },
      { t0: 28.8, t1: 29.2, who: 'SW', text: 'Ik.' },
      { t0: 29.5, t1: 30.1, who: 'BC', text: 'Succes.' },
      { t0: 40.9, t1: 41.8, who: 'SW', text: 'Dus… pak die koffer.' },
      { t0: 42.0, t1: 42.5, who: 'BC', text: 'Alsjeblieft.' }
    ],
    // Bedieningsreeks (S2b): display-animatie op de echte foto (display-base.jpg = bediening-broadcast-03.jpg met
    // alleen de reflectiestreep in het displaygebied geretoucheerd). Stappen/teksten uit src/data.js →
    // bediening.sales.broadcast.flow. Referentiefoto's voor segmentvorm/gloed: bediening-broadcast-01 (2), -04 (ULC), -05 (080 + LED).
    // v0.5: labels pas ná het bereiken van de stap; tijdens 3 → 2 → 1 alleen het display.
    display: {
      base: 'assets/display-base.jpg',
      steps: [[9.0, '3'], [9.6, '2'], [10.2, '1'], [10.8, 'ULC'], [12.0, '080']],
      ledOn: 12.0,                                   // LED "licht" gaat aan bij 080 (data.js: leds.zon = on)
      chips: [[8.1, 8.95, 'Drukknop 3 s vasthouden'], [11.0, 12.0, 'ULC · ontgrendeld'], [12.25, 13.9, '080 · lichtdrempel (fabrieksinstelling 80 %)']]
    },
    phoneIn: 16.0,
    linkOn: 17.1,
    phoneZoom: { t0: 20.1, t1: 21.9, scale: 1.6 },   // camera duwt naar de telefoon; site blijft leesbaar
    // Rail-cameo (S4): camera kantelt omhoog naar de echte witte Rail (K03) in het deksel
    rail: { tiltT0: 22.1, tiltT1: 22.8, label: [22.4, 23.5], bounce: 22.3, react: 24.3 },
    // Race-tellers: stappen (stopt vóór 50)
    counter: { show: 29.1, steps: [[29.8, 12, 18], [30.2, 27, 31], [30.6, 43, 46]] },
    cardA: { t0: 31.0, t1: 33.3 },       // grapwedstrijd: welk product is als eerste 50x verkocht
    cardB: { t0: 33.3, t1: 40.7 },       // saleschallenge; volledig opgebouwd vanaf ± 34,7 → ≈ 6,0 s stil leesbaar
    endLook: 42.6,                       // Broadcast: nog één droge blik naar Switch
    blackout: 42.9
  };
  root.TIMELINE = T;
  if (typeof module !== 'undefined') module.exports = T;
})(typeof window !== 'undefined' ? window : globalThis);
