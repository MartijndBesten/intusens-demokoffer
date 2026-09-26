"""Genereert timeline.js (v0.9) om de echte stemmen heen.

Bron voor tekst/volgorde: LINES hieronder (inhoud identiek aan v0.6–v0.8). Duur per regel komt uit
video/vo/durations.json (vo_prepare.py). Ontbreekt een regel daar, dan geldt de v0.8-slotduur als schatting
en staat 'geschat': true in de tijdlijn.

Alle beelden en geluiden zijn relatief aan regels en scènegrenzen gedefinieerd, dus de tijdlijn schuift
automatisch mee met de werkelijke stemduur. Vaste blokken (display 3 → 2 → 1 → ULC → 080, website-hold,
leesduur saleskaart) blijven even lang.
"""
import json, os

HERE = os.path.dirname(os.path.abspath(__file__)); VO = os.environ.get('IS_VO_DIR') or os.path.normpath(os.path.join(HERE, '..', 'vo'))
LINES = [  # vo-naam, karakter, ondertitel, v0.8-slotduur (fallback)
    ('01-SW-he-collega', 'SW', 'Hé collega?', 0.8),
    ('02-BC-al-best-lang', 'BC', 'We zitten hier al best lang.', 1.3),
    ('03-SW-veel-te-lang', 'SW', 'Veel te lang.', 0.7),
    ('04-BC-neem-ons-mee', 'BC', 'Neem ons eens mee naar een installateur.', 1.7),
    ('05-BC-zo-moeilijk', 'BC', 'Kijk. Zo moeilijk ben ik niet.', 1.3),
    ('06-SW-080', 'SW', '080?', 0.8),
    ('07-BC-even-checken', 'BC', 'Even checken? Pak de site erbij.', 1.5),
    ('08-BC-code-op-display', 'BC', 'Code op het display, uitleg op je telefoon. Klaar.', 2.4),
    ('09-RL-en-ik-dan', 'RL', 'En ik dan?', 0.8),
    ('10-SW-jij-ook-op-site', 'SW', 'Jij staat ook op de site.', 1.0),
    ('11-SW-belangrijkere-vraag', 'SW', 'Maar goed. Belangrijkere vraag…', 1.3),
    ('12-BC-wie-eerste-vijftig', 'BC', 'Wie van ons is als eerste vijftig keer verkocht?', 1.8),
    ('13-SW-ik', 'SW', 'Ik.', 0.4),
    ('14-BC-succes', 'BC', 'Succes.', 0.5),
    ('15-SW-pak-die-koffer', 'SW', 'Dus… pak die koffer.', 0.9),
    ('16-BC-alsjeblieft', 'BC', 'Alsjeblieft.', 0.5),
]
WHO = {
    'SW': {'label': 'IntuSens Switch', 'color': '#eaf6ff', 'voice': 'Skye — iets hoger, sneller, licht brutaal; lichte robot-kleur'},
    'BC': {'label': 'IntuSens DALI-2 Broadcast', 'color': '#7fc8ff', 'voice': 'Orion — lager, droog, zelfverzekerd; lichte robot-kleur'},
    'RL': {'label': 'IntuSens Rail', 'color': '#a9b4c6', 'voice': 'Chloe — kort, helder; onderbreekt van boven'},
}
r2 = lambda v: round(v, 2)

def build(g=1.0, write=True):
    """g = factor op de 'gewone' pauzes tussen regels (niet op race-beats, display, website-hold of saleskaart)."""
    dj = os.path.join(VO, 'durations.json'); durs = json.load(open(dj)) if os.path.exists(dj) else {}
    L = []
    def line(i, t0):
        vo, who, text, fb = LINES[i]; d = durs.get(vo); dur = d['actief_s'] if d else fb
        o = {'vo': vo, 't0': r2(t0), 't1': r2(t0 + dur), 'who': who, 'text': text}
        if d: o['env'] = d['env']
        else: o['geschat'] = True
        L.append(o); return o
    # ---- S1: opening (vlot) ----
    l1 = line(0, 0.45); l2 = line(1, l1['t1'] + 0.30 * g); l3 = line(2, l2['t1'] + 0.22 * g); l4 = line(3, l3['t1'] + 0.30 * g)
    s2a = r2(l4['t1'] + 0.30 * g)
    # ---- S2a ----
    l5 = line(4, s2a + 0.25 * g); s2b = r2(l5['t1'] + 0.15)
    # ---- S2b: display (vaste lengte 5,8 s) ----
    s3 = r2(s2b + 5.8)
    display = {'base': 'assets/display-base.jpg', 'pressAt': r2(s2b + 0.1),
               'steps': [[r2(s2b + 0.9), '3'], [r2(s2b + 1.5), '2'], [r2(s2b + 2.1), '1'], [r2(s2b + 2.7), 'ULC'], [r2(s2b + 3.9), '080']],
               'ledOn': r2(s2b + 3.9),
               'chips': [[s2b, r2(s2b + 0.85), 'Drukknop 3 s vasthouden'], [r2(s2b + 2.9), r2(s2b + 3.9), 'ULC · ontgrendeld'], [r2(s2b + 4.15), s3, '080 · lichtdrempel (fabrieksinstelling 80 %)']]}
    # ---- S3: website ----
    l6 = line(5, s3 + 0.2); l7 = line(6, l6['t1'] + 0.30 * g)
    phoneIn = r2(l7['t0'] + 0.55 * (l7['t1'] - l7['t0'])); linkOn = r2(phoneIn + 1.1)
    l8 = line(7, max(l7['t1'] + 0.45 * g, linkOn - 0.4))
    zoom0 = r2(l8['t1'] - 0.1); s4 = r2(max(zoom0 + 2.5, phoneIn + 5.8))
    # ---- S4: Rail ----
    l9 = line(8, s4 + 0.3 * g); l10 = line(9, l9['t1'] + 0.30 * g); s5 = r2(l10['t1'] + 0.55 * g)
    rail = {'tiltT0': r2(l9['t0'] - 0.1), 'tiltT1': r2(l9['t0'] + 0.6), 'label': [r2(l9['t0'] + 0.2), r2(l9['t0'] + 1.3)],
            'bounce': r2(l9['t0'] + 0.05), 'back': [r2(l10['t0'] - 0.15), r2(l10['t0'] + 0.35)], 'react': r2(l10['t1'] + 0.05)}
    # ---- S5: race ----
    # race-beats (0,35 / 0,30 / 0,65 / 0,45 s) worden NIET gecomprimeerd: de grap moet landen
    l11 = line(10, s5 + 0.3 * g); l12 = line(11, l11['t1'] + 0.35); l13 = line(12, l12['t1'] + 0.30); l14 = line(13, l13['t1'] + 0.65)
    rest = [l14['t1'], r2(l14['t1'] + 0.45)]; show = rest[1]
    counter = {'show': show, 'steps': [[r2(show + 0.45), 12, 18], [r2(show + 0.8), 27, 31], [r2(show + 1.15), 43, 46]]}
    cardA = {'t0': r2(show + 1.55), 't1': r2(show + 3.55)}; cardB = {'t0': cardA['t1'], 't1': r2(cardA['t1'] + 8.4)}
    l15 = line(14, cardB['t1'] + 0.2); l16 = line(15, l15['t1'] + 0.2 * g)
    endLook = r2(l16['t1'] + 0.1); blackout = r2(endLook + 0.3); duration = r2(blackout + 0.3)
    T = {
        'fps': 24, 'duration': duration, 'who': WHO,
        'scenes': [{'id': 'S1', 't0': 0.0, 't1': s2a, 'naam': 'Ze willen uit de koffer'}, {'id': 'S2', 't0': s2a, 't1': s3, 'naam': 'Hoe werkt Broadcast?'},
                   {'id': 'S3', 't0': s3, 't1': s4, 'naam': 'Code op display → uitleg op telefoon'}, {'id': 'S4', 't0': s4, 't1': s5, 'naam': 'Rail-cameo'},
                   {'id': 'S5', 't0': s5, 't1': duration, 'naam': 'Switch vs Broadcast'}],
        'cuts': {'s2a': s2a, 's2b': s2b, 's3': s3, 's4': s4, 's5': s5},
        'lines': L, 'display': display, 'phoneIn': phoneIn, 'linkOn': linkOn,
        'phoneZoom': {'t0': zoom0, 't1': s4, 'scale': 1.6}, 'rail': rail,
        'race': {'restAfterSucces': rest}, 'counter': counter, 'cardA': cardA, 'cardB': cardB,
        'endLook': endLook, 'blackout': blackout,
        'sfx': {'kofferOpen': 0.15, 'kofferClose': blackout, 'sensorClick': [l1['t0'] - 0.05, l2['t0'] - 0.05], 'railClick': l9['t0'] - 0.05,
                'phoneSwipe': phoneIn, 'thumps': [s2b, s3, s5, cardA['t0'], cardB['t0']], 'endClick': r2(endLook + 0.15)},
        'bed': {'bpm': 104, 'duckCard': [cardB['t0'], cardB['t1']]},
        'stemmen': 'echt' if durs else 'geschat (v0.8-slots; stemmen nog niet geplaatst)', 'pauzefactor': round(g, 2),
    }
    if not write: return T
    js = ("/* IntuSens promofilm — timeline (v0.9). GEGENEREERD door build_timeline.py — niet met de hand bewerken.\n"
          " * Tekst/volgorde: LINES in build_timeline.py. Duur per regel: video/vo/durations.json (vo_prepare.py).\n */\n"
          "(function (root) {\n  var T = " + json.dumps(T, ensure_ascii=False, indent=1) + ";\n"
          "  root.TIMELINE = T;\n  if (typeof module !== 'undefined') module.exports = T;\n"
          "})(typeof window !== 'undefined' ? window : globalThis);\n")
    open(os.path.join(HERE, 'timeline.js'), 'w', encoding='utf-8').write(js)
    print(f"timeline.js: {duration}s (zwart {blackout}s), stemmen: {T['stemmen']}, pauzefactor {g:.2f}")
    for o in L: print(f"  {o['t0']:6.2f}–{o['t1']:6.2f}  {o['who']}  {o['text']}{'  (geschat)' if o.get('geschat') else ''}")

if __name__ == '__main__':
    # doel ≈ 50 s: alleen de gewone pauzes iets compacter (min. 85 %), nooit stemmen, race-beats of vaste blokken.
    # (v0.9-meting: 60 % pauzes wint maar 1,5 s en klinkt gejaagd; natuurlijkheid gaat voor.)
    g = 1.0
    while build(g, write=False)['duration'] > 51.0 and g > 0.85: g = round(g - 0.05, 2)
    build(g)
