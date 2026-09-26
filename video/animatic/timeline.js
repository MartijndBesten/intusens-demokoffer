/* IntuSens promofilm — animatic timeline (v0.3)
 * Alle tijden in seconden. Dit bestand is de enige bron voor dialoog en timing;
 * index.html (beeld) en audio.py (placeholder-geluid) lezen hieruit.
 *
 * v0.3: intro met beat vóór "Veel te lang", MiniR-cameo, snellere tellers,
 *       kortere pauzes rond de eindkaarten, droge slotblik Broadcast.
 * Later in te spreken: elke regel hieronder is één voice-over-cue (who + t0/t1).
 */
(function (root) {
  var T = {
    fps: 24,
    duration: 33.5,
    who: {
      SW: { label: 'IntuSens Switch', color: '#eaf6ff' },
      BC: { label: 'IntuSens DALI-2 Broadcast', color: '#7fc8ff' },
      MR: { label: 'IntuSens MiniR', color: '#a9b4c6' }
    },
    scenes: [
      { id: 'S1', t0: 0.0, t1: 6.1, naam: 'Ze willen uit de koffer' },
      { id: 'S2', t0: 6.1, t1: 12.4, naam: 'Hoe werkt Broadcast?' },
      { id: 'S3', t0: 12.4, t1: 19.7, naam: 'Code op display → uitleg op telefoon' },
      { id: 'S4', t0: 19.7, t1: 22.0, naam: 'MiniR-cameo' },
      { id: 'S5', t0: 22.0, t1: 33.5, naam: 'Switch vs Broadcast' }
    ],
    // scènegrenzen die index.html gebruikt
    cuts: { s2a: 6.1, s2b: 7.6, s3: 12.4, s4: 19.7, s5: 22.0 },
    lines: [
      { t0: 0.5, t1: 1.3, who: 'SW', text: 'Hé collega?' },
      { t0: 1.6, t1: 2.9, who: 'BC', text: 'We zitten hier al best lang.' },
      { t0: 3.3, t1: 4.0, who: 'SW', text: 'Veel te lang.' },
      { t0: 4.2, t1: 5.9, who: 'BC', text: 'Neem ons eens mee naar een installateur.' },
      { t0: 6.3, t1: 7.6, who: 'BC', text: 'Kijk. Zo moeilijk ben ik niet.' },
      { t0: 12.5, t1: 13.2, who: 'SW', text: '080?' },
      { t0: 13.4, t1: 14.8, who: 'BC', text: 'Even checken? Pak de site erbij.' },
      { t0: 15.6, t1: 17.9, who: 'BC', text: 'Code op het display, uitleg op je telefoon. Klaar.' },
      { t0: 19.9, t1: 20.7, who: 'MR', text: 'En ik dan?' },
      { t0: 20.9, t1: 21.9, who: 'SW', text: 'Jij staat ook op de site.' },
      { t0: 22.2, t1: 23.4, who: 'SW', text: 'Maar goed. Belangrijkere vraag…' },
      { t0: 23.5, t1: 24.6, who: 'BC', text: 'Wie haalt als eerste de vijftig?' },
      { t0: 24.7, t1: 25.1, who: 'SW', text: 'Ik.' },
      { t0: 25.2, t1: 25.7, who: 'BC', text: 'Succes.' },
      { t0: 31.2, t1: 32.1, who: 'SW', text: 'Dus… pak die koffer.' },
      { t0: 32.3, t1: 32.8, who: 'BC', text: 'Alsjeblieft.' }
    ],
    // Echte bedieningsfoto's (assets/processed) + tekst die letterlijk uit src/data.js komt
    photos: [
      { t0: 7.6, t1: 8.7, src: '../../assets/processed/bediening-broadcast-03.jpg', cap: 'Drukknop 3 s vasthouden' },
      { t0: 8.7, t1: 9.7, src: '../../assets/processed/bediening-broadcast-01.jpg', cap: '3 → 2 → 1' },
      { t0: 9.7, t1: 10.9, src: '../../assets/processed/bediening-broadcast-04.jpg', cap: 'ULC · ontgrendeld' },
      { t0: 10.9, t1: 12.4, src: '../../assets/processed/bediening-broadcast-05.jpg', cap: '080 · lichtdrempel (fabrieksinstelling 80 %)' }
    ],
    phoneIn: 14.0,
    linkOn: 15.0,
    phoneZoom: { t0: 17.8, t1: 19.7, scale: 1.6 },   // camera duwt naar de telefoon (v0.3: ~13 % groter dan v0.2)
    // Race-tellers: stappen (stopt vóór 50) — v0.3 sneller
    counter: { show: 24.9, steps: [[25.5, 12, 18], [25.8, 27, 31], [26.1, 43, 46]] },
    cardA: { t0: 26.5, t1: 28.4 },       // grapwedstrijd Switch vs Broadcast
    cardB: { t0: 28.4, t1: 31.1 },       // persoonlijke saleschallenge + "projectorders tellen niet mee"
    endLook: 32.9,                       // Broadcast: nog één droge blik naar Switch
    blackout: 33.2
  };
  root.TIMELINE = T;
  if (typeof module !== 'undefined') module.exports = T;
})(typeof window !== 'undefined' ? window : globalThis);
