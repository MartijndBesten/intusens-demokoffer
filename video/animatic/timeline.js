/* IntuSens promofilm — animatic timeline (v0.2)
 * Alle tijden in seconden. Dit bestand is de enige bron voor dialoog en timing;
 * index.html (beeld) en audio.py (placeholder-geluid) lezen hieruit.
 *
 * v0.2: meer schermtijd voor bediening → 080 → website (inhoudelijke kern),
 *       twee eindkaarten (grapwedstrijd vs. persoonlijke saleschallenge).
 */
(function (root) {
  var T = {
    fps: 24,
    duration: 34.0,
    who: {
      SW: { label: 'IntuSens Switch', color: '#eaf6ff' },
      BC: { label: 'IntuSens DALI-2 Broadcast', color: '#7fc8ff' },
      REST: { label: 'Uit de koffer', color: '#a9b4c6' }
    },
    scenes: [
      { id: 'S1', t0: 0.0, t1: 5.8, naam: 'Ze willen uit de koffer' },
      { id: 'S2', t0: 5.8, t1: 12.1, naam: 'Hoe werkt Broadcast?' },
      { id: 'S3', t0: 12.1, t1: 19.4, naam: 'Code op display → uitleg op telefoon' },
      { id: 'S4', t0: 19.4, t1: 21.8, naam: 'De rest bemoeit zich ermee' },
      { id: 'S5', t0: 21.8, t1: 34.0, naam: 'Switch vs Broadcast' }
    ],
    // scènegrenzen die index.html gebruikt
    cuts: { s2a: 5.8, s2b: 7.3, s3: 12.1, s4: 19.4, s5: 21.8 },
    lines: [
      { t0: 0.5, t1: 1.3, who: 'SW', text: 'Hé collega?' },
      { t0: 1.5, t1: 2.8, who: 'BC', text: 'We zitten hier al best lang.' },
      { t0: 3.0, t1: 3.7, who: 'SW', text: 'Veel te lang.' },
      { t0: 3.9, t1: 5.6, who: 'BC', text: 'Neem ons eens mee naar een installateur.' },
      { t0: 6.0, t1: 7.3, who: 'BC', text: 'Kijk. Zo moeilijk ben ik niet.' },
      { t0: 12.2, t1: 12.9, who: 'SW', text: '080?' },
      { t0: 13.1, t1: 14.5, who: 'BC', text: 'Even checken? Pak de site erbij.' },
      { t0: 15.3, t1: 17.6, who: 'BC', text: 'Code op het display, uitleg op je telefoon. Klaar.' },
      { t0: 19.6, t1: 20.8, who: 'REST', text: 'Hallo? Wij zitten er óók nog in.' },
      { t0: 20.9, t1: 21.8, who: 'SW', text: 'Jullie komen ook op de site.' },
      { t0: 22.0, t1: 23.2, who: 'SW', text: 'Maar goed. Belangrijkere vraag…' },
      { t0: 23.3, t1: 24.4, who: 'BC', text: 'Wie haalt als eerste de vijftig?' },
      { t0: 24.5, t1: 24.9, who: 'SW', text: 'Ik.' },
      { t0: 25.0, t1: 25.5, who: 'BC', text: 'Succes.' },
      { t0: 31.7, t1: 32.6, who: 'SW', text: 'Dus… pak die koffer.' },
      { t0: 32.8, t1: 33.3, who: 'BC', text: 'Alsjeblieft.' }
    ],
    // Echte bedieningsfoto's (assets/processed) + tekst die letterlijk uit src/data.js komt
    photos: [
      { t0: 7.3, t1: 8.4, src: '../../assets/processed/bediening-broadcast-03.jpg', cap: 'Drukknop 3 s vasthouden' },
      { t0: 8.4, t1: 9.4, src: '../../assets/processed/bediening-broadcast-01.jpg', cap: '3 → 2 → 1' },
      { t0: 9.4, t1: 10.6, src: '../../assets/processed/bediening-broadcast-04.jpg', cap: 'ULC · ontgrendeld' },
      { t0: 10.6, t1: 12.1, src: '../../assets/processed/bediening-broadcast-05.jpg', cap: '080 · lichtdrempel (fabrieksinstelling 80 %)' }
    ],
    phoneIn: 13.7,
    linkOn: 14.7,
    phoneZoom: { t0: 17.5, t1: 19.4 },   // camera duwt naar de telefoon: site blijft langer leesbaar
    // Race-tellers: stappen (stopt vóór 50)
    counter: { show: 24.7, steps: [[25.6, 12, 18], [26.0, 27, 31], [26.4, 43, 46]] },
    cardA: { t0: 26.9, t1: 29.0 },       // grapwedstrijd Switch vs Broadcast
    cardB: { t0: 29.0, t1: 31.6 },       // persoonlijke saleschallenge + "projectorders tellen niet mee"
    blackout: 33.6
  };
  root.TIMELINE = T;
  if (typeof module !== 'undefined') module.exports = T;
})(typeof window !== 'undefined' ? window : globalThis);
