/* IntuSens promofilm — animatic timeline (v0.1)
 * Alle tijden in seconden. Dit bestand is de enige bron voor dialoog en timing;
 * index.html (beeld) en audio.py (placeholder-geluid) lezen hieruit.
 */
(function (root) {
  var T = {
    fps: 24,
    duration: 31.0,
    // Karakters: kleur voor caption/label
    who: {
      SW: { label: 'IntuSens Switch', color: '#eaf6ff' },
      BC: { label: 'IntuSens DALI-2 Broadcast', color: '#7fc8ff' },
      REST: { label: 'Uit de koffer', color: '#a9b4c6' }
    },
    scenes: [
      { id: 'S1', t0: 0.0, t1: 6.7, naam: 'Ze willen uit de koffer' },
      { id: 'S2', t0: 6.7, t1: 12.0, naam: 'Hoe werkt Broadcast?' },
      { id: 'S3', t0: 12.0, t1: 17.6, naam: 'Website' },
      { id: 'S4', t0: 17.6, t1: 20.5, naam: 'De rest bemoeit zich ermee' },
      { id: 'S5', t0: 20.5, t1: 31.0, naam: 'Switch vs Broadcast' }
    ],
    lines: [
      { t0: 0.7, t1: 1.7, who: 'SW', text: 'Hé collega?' },
      { t0: 2.0, t1: 3.5, who: 'BC', text: 'We zitten hier al best lang.' },
      { t0: 3.7, t1: 4.5, who: 'SW', text: 'Veel te lang.' },
      { t0: 4.8, t1: 6.6, who: 'BC', text: 'Neem ons eens mee naar een installateur.' },
      { t0: 7.0, t1: 8.4, who: 'BC', text: 'Kijk. Zo moeilijk ben ik niet.' },
      { t0: 12.1, t1: 12.8, who: 'SW', text: '080?' },
      { t0: 13.0, t1: 14.5, who: 'BC', text: 'Even checken? Pak de site erbij.' },
      { t0: 15.0, t1: 17.4, who: 'BC', text: 'Code op het display, uitleg op je telefoon. Klaar.' },
      { t0: 17.8, t1: 19.2, who: 'REST', text: 'Hallo? Wij zitten er óók nog in.' },
      { t0: 19.3, t1: 20.4, who: 'SW', text: 'Jullie komen ook op de site.' },
      { t0: 20.7, t1: 22.0, who: 'SW', text: 'Maar goed. Belangrijkere vraag…' },
      { t0: 22.1, t1: 23.3, who: 'BC', text: 'Wie haalt als eerste de vijftig?' },
      { t0: 23.4, t1: 23.8, who: 'SW', text: 'Ik.' },
      { t0: 24.0, t1: 24.5, who: 'BC', text: 'Succes.' },
      { t0: 28.6, t1: 29.6, who: 'SW', text: 'Dus… pak die koffer.' },
      { t0: 29.8, t1: 30.3, who: 'BC', text: 'Alsjeblieft.' }
    ],
    // Echte bedieningsfoto's (assets/processed) + tekst die letterlijk uit src/data.js komt
    photos: [
      { t0: 8.5, t1: 9.3, src: '../../assets/processed/bediening-broadcast-03.jpg', cap: 'Drukknop 3 s vasthouden' },
      { t0: 9.3, t1: 10.0, src: '../../assets/processed/bediening-broadcast-01.jpg', cap: '3 → 2 → 1' },
      { t0: 10.0, t1: 10.9, src: '../../assets/processed/bediening-broadcast-04.jpg', cap: 'ULC · ontgrendeld' },
      { t0: 10.9, t1: 12.0, src: '../../assets/processed/bediening-broadcast-05.jpg', cap: '080 · lichtdrempel (fabrieksinstelling 80 %)' }
    ],
    // Race-tellers: stappen (stopt vóór 50)
    counter: { show: 23.6, steps: [[24.6, 12, 18], [25.1, 27, 31], [25.6, 43, 46]] },
    titleCard: { t0: 26.2, t1: 28.4 },
    phoneIn: 14.2,
    linkOn: 15.0,
    blackout: 30.6
  };
  root.TIMELINE = T;
  if (typeof module !== 'undefined') module.exports = T;
})(typeof window !== 'undefined' ? window : globalThis);
