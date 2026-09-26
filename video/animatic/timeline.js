/* IntuSens promofilm — animatic timeline (v0.7: timing- en audio-polish op v0.6)
 * Alle tijden in seconden. Dit bestand is de enige bron voor dialoog en timing;
 * index.html (beeld) en audio.py (placeholder-audio) lezen hieruit.
 *
 * v0.7: inhoud, tekst en opbouw identiek aan v0.6. Alleen timing natuurlijker:
 *   - opening: korte reactiebeats tussen de regels;
 *   - race: 0,35 s na "Belangrijkere vraag…", 0,3 s na de vraag, 0,75 s na "Ik.",
 *     "Succes." kort, daarna 0,6 s visuele rust; pas dan de tellers;
 *   - website, Rail-cameo en eindkaart B (≈ 7 s leesrust) zoals v0.6.
 * Later in te spreken: elke regel hieronder is één voice-over-cue (who + t0/t1).
 * De 'contour'-velden sturen alleen de placeholder-karakterklank (audio.py).
 */
(function (root) {
  var T = {
    fps: 24,
    duration: 47.8,
    who: {
      SW: { label: 'IntuSens Switch', color: '#eaf6ff' },
      BC: { label: 'IntuSens DALI-2 Broadcast', color: '#7fc8ff' },
      RL: { label: 'IntuSens Rail', color: '#a9b4c6' }
    },
    scenes: [
      { id: 'S1', t0: 0.0, t1: 6.9, naam: 'Ze willen uit de koffer' },
      { id: 'S2', t0: 6.9, t1: 14.3, naam: 'Hoe werkt Broadcast?' },
      { id: 'S3', t0: 14.3, t1: 23.0, naam: 'Code op display → uitleg op telefoon' },
      { id: 'S4', t0: 23.0, t1: 26.3, naam: 'Rail-cameo' },
      { id: 'S5', t0: 26.3, t1: 47.8, naam: 'Switch vs Broadcast' }
    ],
    // scènegrenzen die index.html gebruikt
    cuts: { s2a: 6.9, s2b: 8.5, s3: 14.3, s4: 23.0, s5: 26.3 },
    // contour: 'vraag' (loopt omhoog), 'droog' (kort en vlak), 'stelling' (licht dalend), 'roep' (kort, helder)
    lines: [
      { t0: 0.6, t1: 1.4, who: 'SW', text: 'Hé collega?', contour: 'vraag' },
      { t0: 1.9, t1: 3.2, who: 'BC', text: 'We zitten hier al best lang.', contour: 'stelling' },
      { t0: 3.7, t1: 4.4, who: 'SW', text: 'Veel te lang.', contour: 'droog' },
      { t0: 4.9, t1: 6.6, who: 'BC', text: 'Neem ons eens mee naar een installateur.', contour: 'stelling' },
      { t0: 7.2, t1: 8.5, who: 'BC', text: 'Kijk. Zo moeilijk ben ik niet.', contour: 'droog' },
      { t0: 14.5, t1: 15.3, who: 'SW', text: '080?', contour: 'vraag' },
      { t0: 15.7, t1: 17.2, who: 'BC', text: 'Even checken? Pak de site erbij.', contour: 'vraag' },
      { t0: 18.2, t1: 20.6, who: 'BC', text: 'Code op het display, uitleg op je telefoon. Klaar.', contour: 'droog' },
      { t0: 23.3, t1: 24.1, who: 'RL', text: 'En ik dan?', contour: 'roep' },
      { t0: 24.5, t1: 25.5, who: 'SW', text: 'Jij staat ook op de site.', contour: 'droog' },
      { t0: 26.6, t1: 27.9, who: 'SW', text: 'Maar goed. Belangrijkere vraag…', contour: 'stelling' },
      { t0: 28.25, t1: 30.05, who: 'BC', text: 'Wie van ons is als eerste vijftig keer verkocht?', contour: 'vraag' },
      { t0: 30.35, t1: 30.75, who: 'SW', text: 'Ik.', contour: 'droog' },
      { t0: 31.5, t1: 32.0, who: 'BC', text: 'Succes.', contour: 'droog' },
      { t0: 45.4, t1: 46.3, who: 'SW', text: 'Dus… pak die koffer.', contour: 'stelling' },
      { t0: 46.5, t1: 47.0, who: 'BC', text: 'Alsjeblieft.', contour: 'droog' }
    ],
    // Bedieningsreeks (S2b): display-animatie op de echte foto (display-base.jpg = bediening-broadcast-03.jpg met
    // alleen de reflectiestreep in het displaygebied geretoucheerd). Stappen/teksten uit src/data.js →
    // bediening.sales.broadcast.flow. Referentiefoto's voor segmentvorm/gloed: bediening-broadcast-01 (2), -04 (ULC), -05 (080 + LED).
    display: {
      base: 'assets/display-base.jpg',
      pressAt: 8.6,                                  // echte drukknop-klik (begin vasthouden)
      steps: [[9.4, '3'], [10.0, '2'], [10.6, '1'], [11.2, 'ULC'], [12.4, '080']],
      ledOn: 12.4,                                   // LED "licht" gaat aan bij 080 (data.js: leds.zon = on)
      chips: [[8.5, 9.35, 'Drukknop 3 s vasthouden'], [11.4, 12.4, 'ULC · ontgrendeld'], [12.65, 14.3, '080 · lichtdrempel (fabrieksinstelling 80 %)']]
    },
    phoneIn: 16.4,
    linkOn: 17.5,
    phoneZoom: { t0: 20.5, t1: 23.0, scale: 1.6 },   // camera duwt naar de telefoon; site blijft 2,5 s leesbaar
    // Rail-cameo (S4): camera kantelt omhoog naar de echte witte Rail (K03) in het deksel
    rail: { tiltT0: 23.2, tiltT1: 23.9, label: [23.5, 24.6], bounce: 23.4, back: [24.3, 24.8], react: 25.4 },
    // Race: pas ná "Succes." + 0,6 s visuele rust verschijnen de tellers (stopt vóór 50)
    race: { restAfterSucces: [32.0, 32.6] },
    counter: { show: 32.6, steps: [[33.3, 12, 18], [33.7, 27, 31], [34.1, 43, 46]] },
    cardA: { t0: 34.5, t1: 36.8 },       // grapwedstrijd: welk product is als eerste 50x verkocht
    cardB: { t0: 36.8, t1: 45.2 },       // saleschallenge; volledig opgebouwd vanaf ± 38,2 → ≈ 7,0 s stil leesbaar
    endLook: 47.1,                       // Broadcast: nog één droge blik naar Switch
    blackout: 47.5,
    // audio-cues (placeholder, gesynthetiseerd) — zie audio.py
    sfx: {
      kofferOpen: 0.15, kofferClose: 47.5,
      sensorClick: [0.6, 1.9],           // kunststof-klik bij eerste reactie van Switch resp. Broadcast
      railClick: 23.3,
      phoneSwipe: 16.4,
      thumps: [8.5, 14.3, 26.3, 34.5, 36.8],
      endClick: 47.25
    }
  };
  root.TIMELINE = T;
  if (typeof module !== 'undefined') module.exports = T;
})(typeof window !== 'undefined' ? window : globalThis);
