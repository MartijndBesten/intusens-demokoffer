/* IntuSens promofilm — timeline (v0.8: vlottere timing + echte voice-over-slots)
 * Alle tijden in seconden. Dit bestand is de enige bron voor dialoog en timing;
 * index.html (beeld), audio.py (mix) en vo_cues.py (voice-over-cuesheet) lezen hieruit.
 *
 * v0.8: inhoud/tekst/opbouw identiek aan v0.6/v0.7. Timing iets vlotter (opening -0,6 s, overgangen
 *       compacter, Rail-cameo compact, race vóór de tellers strakker; display, website en leesduur
 *       saleschallenge ongewijzigd). Geen pseudo-spraak meer: elke regel is een voice-over-slot.
 *       Elke regel heeft een 'vo' bestandsnaam (video/vo/<vo>.wav); audio.py plaatst het bestand op t0
 *       als het bestaat, anders blijft het slot stil (ondertitel is leidend).
 */
(function (root) {
  var T = {
    fps: 24,
    duration: 45.8,
    who: {
      SW: { label: 'IntuSens Switch', color: '#eaf6ff', voice: 'iets hoger, sneller, licht brutaal, energiek; subtiele elektronische/robotische verwerking; niet kinderachtig' },
      BC: { label: 'IntuSens DALI-2 Broadcast', color: '#7fc8ff', voice: 'wat lager, droog, rustig maar niet sloom, zelfverzekerd; subtiele robotische verwerking' },
      RL: { label: 'IntuSens Rail', color: '#a9b4c6', voice: 'kort, iets helderder; mengt zich onverwacht van boven in het gesprek' }
    },
    scenes: [
      { id: 'S1', t0: 0.0, t1: 6.3, naam: 'Ze willen uit de koffer' },
      { id: 'S2', t0: 6.3, t1: 13.7, naam: 'Hoe werkt Broadcast?' },
      { id: 'S3', t0: 13.7, t1: 22.1, naam: 'Code op display → uitleg op telefoon' },
      { id: 'S4', t0: 22.1, t1: 25.2, naam: 'Rail-cameo' },
      { id: 'S5', t0: 25.2, t1: 45.8, naam: 'Switch vs Broadcast' }
    ],
    // scènegrenzen die index.html gebruikt
    cuts: { s2a: 6.3, s2b: 7.9, s3: 13.7, s4: 22.1, s5: 25.2 },
    // t1 = einde van het slot (max. lengte van de ingesproken regel); 'vo' = bestandsnaam in video/vo/
    lines: [
      { vo: '01-SW-he-collega', t0: 0.5, t1: 1.3, who: 'SW', text: 'Hé collega?' },
      { vo: '02-BC-al-best-lang', t0: 1.6, t1: 2.9, who: 'BC', text: 'We zitten hier al best lang.' },
      { vo: '03-SW-veel-te-lang', t0: 3.2, t1: 3.9, who: 'SW', text: 'Veel te lang.' },
      { vo: '04-BC-neem-ons-mee', t0: 4.2, t1: 5.9, who: 'BC', text: 'Neem ons eens mee naar een installateur.' },
      { vo: '05-BC-zo-moeilijk', t0: 6.6, t1: 7.9, who: 'BC', text: 'Kijk. Zo moeilijk ben ik niet.' },
      { vo: '06-SW-080', t0: 13.9, t1: 14.7, who: 'SW', text: '080?' },
      { vo: '07-BC-even-checken', t0: 15.0, t1: 16.5, who: 'BC', text: 'Even checken? Pak de site erbij.' },
      { vo: '08-BC-code-op-display', t0: 17.3, t1: 19.7, who: 'BC', text: 'Code op het display, uitleg op je telefoon. Klaar.' },
      { vo: '09-RL-en-ik-dan', t0: 22.4, t1: 23.2, who: 'RL', text: 'En ik dan?' },
      { vo: '10-SW-jij-ook-op-site', t0: 23.5, t1: 24.5, who: 'SW', text: 'Jij staat ook op de site.' },
      { vo: '11-SW-belangrijkere-vraag', t0: 25.5, t1: 26.8, who: 'SW', text: 'Maar goed. Belangrijkere vraag…' },
      { vo: '12-BC-wie-eerste-vijftig', t0: 27.1, t1: 28.9, who: 'BC', text: 'Wie van ons is als eerste vijftig keer verkocht?' },
      { vo: '13-SW-ik', t0: 29.15, t1: 29.55, who: 'SW', text: 'Ik.' },
      { vo: '14-BC-succes', t0: 30.15, t1: 30.65, who: 'BC', text: 'Succes.' },
      { vo: '15-SW-pak-die-koffer', t0: 43.5, t1: 44.4, who: 'SW', text: 'Dus… pak die koffer.' },
      { vo: '16-BC-alsjeblieft', t0: 44.6, t1: 45.1, who: 'BC', text: 'Alsjeblieft.' }
    ],
    // Bedieningsreeks (S2b): display-animatie op de echte foto (display-base.jpg). Stappen/teksten uit src/data.js.
    display: {
      base: 'assets/display-base.jpg',
      pressAt: 8.0,
      steps: [[8.8, '3'], [9.4, '2'], [10.0, '1'], [10.6, 'ULC'], [11.8, '080']],
      ledOn: 11.8,
      chips: [[7.9, 8.75, 'Drukknop 3 s vasthouden'], [10.8, 11.8, 'ULC · ontgrendeld'], [12.05, 13.7, '080 · lichtdrempel (fabrieksinstelling 80 %)']]
    },
    phoneIn: 15.7,
    linkOn: 16.8,
    phoneZoom: { t0: 19.6, t1: 22.1, scale: 1.6 },   // 2,5 s leesbaar (ongewijzigd)
    rail: { tiltT0: 22.3, tiltT1: 23.0, label: [22.6, 23.7], bounce: 22.5, back: [23.4, 23.9], react: 24.4 },
    // Race: "Ik." → 0,6 s beat → "Succes." → 0,45 s droge blik → tellers
    race: { restAfterSucces: [30.65, 31.1] },
    counter: { show: 31.1, steps: [[31.7, 12, 18], [32.1, 27, 31], [32.5, 43, 46]] },
    cardA: { t0: 32.9, t1: 34.9 },
    cardB: { t0: 34.9, t1: 43.3 },       // volledig opgebouwd vanaf ± 36,3 → 7,0 s stil leesbaar (ongewijzigd)
    endLook: 45.2,
    blackout: 45.5,
    // audio-cues (gesynthetiseerd) — zie audio.py
    sfx: {
      kofferOpen: 0.15, kofferClose: 45.5,
      sensorClick: [0.5, 1.6],
      railClick: 22.4,
      phoneSwipe: 15.7,
      thumps: [7.9, 13.7, 25.2, 32.9, 34.9],
      endClick: 45.35
    },
    // soundbed: lichte tech-pulse; rustiger tijdens de saleskaart
    bed: { bpm: 104, duckCard: [34.9, 43.3] }
  };
  root.TIMELINE = T;
  if (typeof module !== 'undefined') module.exports = T;
})(typeof window !== 'undefined' ? window : globalThis);
