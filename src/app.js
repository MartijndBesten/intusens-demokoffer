/* TRILUX IntuSens demokoffer — Interactive Sales Guide
   Plain JS, geen build, geen externe afhankelijkheden. Werkt via file:// en op elke statische host.
   Data: src/data.js (gegenereerd uit data/*.json door tools/build_data.py). */
(function () {
  'use strict';
  var D = window.INTUSENS_DATA;
  if (!D) { document.body.innerHTML = '<p style="padding:40px;font-family:sans-serif">Data ontbreekt: draai <code>python3 tools/build_data.py</code>.</p>'; return; }
  var P = D.producten, K = D.koffer, B = D.bediening, DEMO = D.demo;
  var main = document.getElementById('main');

  /* ---------- helpers ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function product(id) { for (var i = 0; i < P.producten.length; i++) if (P.producten[i].id === id) return P.producten[i]; return null; }
  function bouwvorm(id) { for (var i = 0; i < P.bouwvormen.length; i++) if (P.bouwvormen[i].id === id) return P.bouwvormen[i]; return null; }
  function acc(id) { for (var i = 0; i < P.accessoires.length; i++) if (P.accessoires[i].id === id) return P.accessoires[i]; return null; }
  var DARK_IMGS = /(is-(switch|broadcast|ipd|nlc|inbouw-wit|opbouw-zwart)|\/(k0[2-9]|k1[0-2]|a03)-[a-z-]+|koffer-(deksel|onderzijde|hero|achterzijde|dicht|open))[a-z-]*\.jpg$/;
  function isDark(p) { return !!(p && p.beeld && DARK_IMGS.test(p.beeld)); }
  function isDarkSrc(src) { return !!(src && DARK_IMGS.test(src)); }
  function imgOrPh(src, alt, note, dark) {
    if (src) return '<img src="' + esc(src) + '" alt="' + esc(alt) + '">';
    return '<div class="ph"><b>Foto volgt</b><span>' + esc(note || 'nog geen beeld beschikbaar') + '</span></div>';
  }
  function link(href, cls, text) { return '<a href="' + esc(href) + '" class="' + esc(cls) + '">' + text + '</a>'; }
  function toast(msg) { var t = document.getElementById('toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('on'); }, 1800); }
  function section(cls, inner) { return '<section class="section ' + (cls || '') + '"><div class="wrap">' + inner + '</div></section>'; }
  function salesImg(p, cls) { // productbeeld voor sales: officieel of koffer; Zhaga als illustratie
    var sa = p.sales || {};
    if (sa.beeld) return '<div class="' + cls + (isDarkSrc(sa.beeld) ? ' dark' : '') + '"><img src="' + esc(sa.beeld) + '" alt="' + esc(p.kort) + '"></div>';
    return '<div class="' + cls + ' dark illu-img">' + window.KofferIllu.part(p.id) + '</div>';
  }
  function famImg(f, cls) {
    var sa = f.sales || {};
    if (sa.foto) return '<div class="' + cls + (isDarkSrc(sa.foto) ? ' dark' : '') + '"><img src="' + esc(sa.foto) + '" alt="' + esc(f.naam) + '"></div>';
    return '<div class="' + cls + ' dark illu-img">' + window.KofferIllu.part('K11') + '</div>';
  }

  /* ---------- navigatie ---------- */
  var NAV = [
    ['#/koffer', 'De koffer'], ['#/familie', 'Sensorfamilie'], ['#/varianten', 'Vier regelvarianten'],
    ['#/bediening/switch', 'Bediening'], ['#/snelstart', 'Snelstart']
  ];
  function renderNav(route) {
    var links = document.getElementById('navlinks');
    links.innerHTML = NAV.map(function (n) {
      var active = route === n[0].slice(2) || (n[0] === '#/bediening/switch' && route.indexOf('bediening') === 0) || (n[0] === '#/familie' && route.indexOf('product') === 0);
      return '<a href="' + n[0] + '"' + (active ? ' class="active"' : '') + '>' + n[1] + '</a>';
    }).join('') + '<a href="#/demo" class="cta">Start demo</a><a href="#" id="fs" title="Volledig scherm (F)">⛶</a>';
    links.classList.remove('open');
    document.getElementById('fs').addEventListener('click', function (e) { e.preventDefault(); toggleFullscreen(); });
  }
  function toggleFullscreen() {
    var d = document;
    if (!d.fullscreenElement && d.documentElement.requestFullscreen) d.documentElement.requestFullscreen().catch(function () { toast('Volledig scherm niet beschikbaar in deze browser (gebruik F11).'); });
    else if (d.exitFullscreen) d.exitFullscreen();
  }
  document.getElementById('burger').addEventListener('click', function () { document.getElementById('navlinks').classList.toggle('open'); });

  /* ---------- KOFFER-ILLUSTRATIE ---------- */
  var TOUCH = window.matchMedia && window.matchMedia('(hover: none)').matches;
  function illuInfo(ref) {
    var p = product(ref), a = acc(ref);
    if (p) return { label: p.kort, sub: p.sales.sub + (p.kofferrol === 'actief' ? ' · werkend' : ''), cta: 'Bekijk product' };
    if (a) return { label: a.naam, sub: 'voor latere uitbreiding', cta: 'Snelstart' };
    return { label: ref };
  }
  function illuOpen(ref) { location.hash = product(ref) ? '#/product/' + ref : '#/snelstart'; }
  function illuHtml(labels, id) {
    return '<div class="illu-wrap" id="' + id + '">' + window.KofferIllu.html({ labels: labels || TOUCH, info: illuInfo }) +
      '<div class="illu-tools"><label class="toggle"><input type="checkbox" class="illu-lbl"' + (labels || TOUCH ? ' checked' : '') + '> Namen tonen</label><span>Beweeg over een sensor of tik erop voor meer informatie.</span></div></div>';
  }
  function illuBind(id) {
    var wrap = document.getElementById(id); if (!wrap || !window.KofferIllu) return;
    var root = wrap.querySelector('.illu');
    window.KofferIllu.bind(root, { info: illuInfo, onOpen: illuOpen });
    var cb = wrap.querySelector('.illu-lbl'); if (cb) cb.addEventListener('change', function () { root.classList.toggle('labels', cb.checked); });
  }

  /* ---------- START ---------- */
  function viewStart() {
    var hero = '<section class="hero hero-illu"><div class="hero-in">' +
      '<div class="hero-text"><div class="brand"><img src="assets/brand/trilux-logo-wit-crop.png" alt="TRILUX"></div>' +
      '<h1>IntuSens<small>Demokoffer</small></h1>' +
      '<p class="sub">De sensorfamilie van TRILUX voor aanwezigheids- en daglichtafhankelijke lichtregeling, van kantoor tot hal.</p>' +
      '<div class="hero-actions">' +
      link('#/demo', 'btn light', 'Start demo') + link('#/koffer', 'btn outline-light', 'Bekijk de koffer') +
      link('#/familie', 'btn outline-light', 'Sensorfamilie') + link('#/snelstart', 'btn outline-light', 'Snelstart') +
      '</div></div>' +
      '<div class="hero-visual-illu">' + illuHtml(false, 'illu-home') + '</div>' +
      '</div></section>';
    setTimeout(function () { illuBind('illu-home'); }, 0);
    var strip = '<div class="strip">' + [
      ['PIR + daglicht', 'meet beweging en beschikbaar daglicht'],
      ['Tot 18 m', 'montagehoogtes van 2 tot 18 meter'],
      ['Vijf bouwvormen', 'plafond · Zhaga Book 18 · MiniR · MiniS · Rail'],
      ['Vier varianten', 'Switch · DALI-2 Broadcast · DALI-2 Input Device · Bluetooth NLC']
    ].map(function (x) { return '<div><b>' + x[0] + '</b><span>' + x[1] + '</span></div>'; }).join('') + '</div>';
    var intro = section('', '<div class="head"><div class="eyebrow">Wat is IntuSens?</div><h2>' + esc(P.familie.claim) + '</h2></div>' + strip);
    var routes = section('grey', '<div class="head"><div class="eyebrow">Verder kijken</div><h2>Waar wilt u beginnen?</h2></div><div class="grid g4">' + [
      ['#/koffer', 'De koffer', 'Wat zit waar, klikbaar per onderdeel.'],
      ['#/familie', 'Sensorfamilie', 'Vijf bouwvormen, van plafond tot lichtlijn.'],
      ['#/bediening/switch', 'Bediening', 'Zo stelt u Switch en Broadcast in.'],
      ['#/demo', 'Demo', 'Een rondleiding in acht stappen.']
    ].map(function (x) { return '<a class="card route" href="' + x[0] + '"><div class="card-body"><b>' + x[1] + '</b><span class="sub">' + x[2] + '</span><i class="arrow">→</i></div></a>'; }).join('') + '</div>');
    var use = section('', '<div class="grid g2"><div><div class="eyebrow">Toepassingen</div><h2>Van kantoor tot magazijn</h2><p class="lead">Dezelfde sensorfamilie voor ' + P.familie.toepassingen.lijst.join(', ') + '.</p></div>' +
      '<div class="kv"><div class="box"><h4>Lokaal regelen</h4><ul><li>Switch: schakelt de verlichting direct.</li><li>DALI-2 Broadcast: regelt alle armaturen op de lijn als één groep.</li><li>Switch en Broadcast: instellen op de sensor, zonder app.</li></ul></div>' +
      '<div class="box"><h4>Centraal lichtmanagement</h4><ul><li>DALI-2 Input Device: levert aanwezigheid en licht aan LiveLink.</li><li>Groepen, scènes en gebouwkoppeling in het systeem.</li><li>Bluetooth NLC: draadloze variant binnen de familie.</li></ul></div></div></div>');
    return hero + intro + routes + use;
  }

  /* ---------- KOFFER ---------- */
  function stageHtml(stg, idx, edit) {
    return '<div class="stage-block"><h3 style="margin-bottom:12px">' + esc(stg.titel) + '</h3>' +
      '<div class="koffer-stage" data-stage="' + idx + '"><img src="' + esc(stg.foto) + '" alt="' + esc(stg.alt) + '" draggable="false">' +
      stg.hotspots.map(function (h, i) {
        if (!edit || h.x == null || h.y == null) return '';
        return '<button class="hs" data-stage="' + idx + '" data-i="' + i + '" style="left:' + h.x + '%;top:' + h.y + '%" aria-label="' + esc(h.label) + '">' + (i + 1) + '</button>';
      }).join('') + '</div></div>';
  }
  function viewKoffer(q) {
    var edit = q.edit === '1' && (location.protocol === 'file:' || location.hostname === 'localhost');
    var stages = K.stages || [];
    var stagesHtml = stages.map(function (stg, i) { return stageHtml(stg, i, edit); }).join('');
    var editor = '';
    if (edit) {
      editor = '<div class="koffer-tools"><label class="toggle"><input type="checkbox" id="showhs" checked> Punten tonen</label></div><div class="editor" id="editor"><b>Hotspot-editor (intern)</b> — kies een onderdeel, klik op de bijbehorende foto. Kopieer het JSON-blok naar <span class="mono">data/koffer.json</span> en draai <span class="mono">tools/build_data.py</span>.<br><br>' +
        '<select id="edsel">' + stages.map(function (stg, si) { return stg.hotspots.map(function (h, i) { return '<option value="' + si + ':' + i + '">' + esc(stg.titel.split(':')[0]) + ' · ' + (i + 1) + '. ' + esc(h.label) + '</option>'; }).join(''); }).join('') + '</select> ' +
        '<button class="btn sm" id="edcopy">Kopieer JSON</button> <button class="btn ghost sm" id="edreset">Positie wissen</button>' +
        '<textarea id="edjson" readonly></textarea></div>';
    }
    var seen = {};
    var grid = '<div class="grid g3 koffer-grid">' + K.hotspots.filter(function (h) { if (seen[h.ref] || !product(h.ref)) return false; seen[h.ref] = 1; return true; }).map(function (h) {
      var p = product(h.ref);
      return '<a class="card" href="#/product/' + p.id + '">' + salesImg(p, 'card-img') + '<div class="card-body"><span class="tag grey">' + esc(bouwvorm(p.family).naam.replace('IntuSens ', '')) + (p.kofferrol === 'actief' ? ' · werkend' : '') + '</span><b>' + esc(p.kort) + '</b><span class="sub">' + esc(p.sales.sub) + '</span></div></a>';
    }).join('') + '</div>';
    var actief = P.producten.filter(function (p) { return p.kofferrol === 'actief'; });
    var html = section('dark tight', '<div class="head"><div class="eyebrow">De koffer</div><h2>Wat zit waar?</h2><p class="lead">In het deksel alle bouwvormen, in de onderzijde twee werkende sensoren.</p></div>' + illuHtml(false, 'illu-koffer')) +
      section('tight', '<div class="head"><div class="eyebrow">Werkend in de koffer</div><h2>Twee werkende sensoren</h2></div><div class="grid g2">' + actief.map(function (p) {
        return '<a class="card choice" href="#/bediening/' + (p.id === 'K01' ? 'switch' : 'broadcast') + '"><div class="choice-vis">' + window.KofferIllu.sensor(p.id) + '</div><div class="card-body"><b>' + esc(p.kort) + '</b><span class="sub">' + esc(p.sales.wat) + '</span><span class="go">Bediening bekijken →</span></div></a>';
      }).join('') + '</div>') +
      section('grey', '<div class="head"><div class="eyebrow">Alle onderdelen</div><h2>Wat zit er in de koffer?</h2></div>' + grid) +
      section('tight', '<div class="head"><div class="eyebrow">In het echt</div><h2>Zo ziet de koffer eruit</h2></div>' + stagesHtml + editor) +
      section('', '<div class="head"><div class="eyebrow">Achterzijde</div><h2>Aansluitingen voor later</h2><p class="lead">' + esc(K.uitbreiding_later) + '</p></div>');
    setTimeout(function () { bindKoffer(edit); illuBind('illu-koffer'); }, 0);
    return html;
  }
  function bindKoffer(edit) {
    var stagesEl = document.querySelectorAll('.koffer-stage'); if (!stagesEl.length || !edit) return;
    stagesEl.forEach(function (el) { el.classList.add('show'); });
    var chk = document.getElementById('showhs');
    if (chk) chk.addEventListener('change', function () { stagesEl.forEach(function (el) { el.classList.toggle('show', chk.checked); }); });
    var tip = null;
    function hideTip() { if (tip) { tip.remove(); tip = null; } }
    function showTip(btn) {
      hideTip();
      var h = K.stages[+btn.getAttribute('data-stage')].hotspots[+btn.getAttribute('data-i')];
      tip = document.createElement('div'); tip.className = 'hs-tip';
      tip.innerHTML = '<b>' + esc(h.label) + '</b><span class="sub">' + esc(h.familie) + '</span><br>' + esc(h.functie) + (h.noot ? '<br><span class="sub">' + esc(h.noot) + '</span>' : '');
      tip.style.left = btn.style.left; tip.style.top = btn.style.top;
      if (parseFloat(btn.style.left) > 70) tip.style.transform = 'translate(-90%,12px)';
      if (parseFloat(btn.style.left) < 20) tip.style.transform = 'translate(-10%,12px)';
      btn.parentNode.appendChild(tip);
    }
    document.querySelectorAll('.hs').forEach(function (btn) {
      btn.addEventListener('mouseenter', function () { showTip(btn); });
      btn.addEventListener('focus', function () { showTip(btn); });
      btn.addEventListener('mouseleave', hideTip);
      btn.addEventListener('blur', hideTip);
      btn.addEventListener('click', function (e) {
        if (edit) { e.stopPropagation(); document.getElementById('edsel').value = btn.getAttribute('data-stage') + ':' + btn.getAttribute('data-i'); return; }
        var h = K.stages[+btn.getAttribute('data-stage')].hotspots[+btn.getAttribute('data-i')];
        if (product(h.ref)) location.hash = '#/product/' + h.ref; else location.hash = '#/snelstart';
      });
    });
    if (edit) {
      var sel = document.getElementById('edsel'), ta = document.getElementById('edjson');
      function dump() { ta.value = JSON.stringify(K.stages.map(function (stg) { return { id: stg.id, hotspots: stg.hotspots.map(function (h) { return { ref: h.ref, x: h.x, y: h.y, label: h.label, familie: h.familie, functie: h.functie, noot: h.noot }; }) }; }), null, 1); }
      dump();
      stagesEl.forEach(function (stage) {
        stage.addEventListener('click', function (e) {
          var parts = sel.value.split(':'), si = +parts[0], i = +parts[1];
          if (si !== +stage.getAttribute('data-stage')) { toast('Dit onderdeel hoort bij de andere foto'); return; }
          var r = stage.getBoundingClientRect();
          var x = Math.round((e.clientX - r.left) / r.width * 1000) / 10, y = Math.round((e.clientY - r.top) / r.height * 1000) / 10;
          var h = K.stages[si].hotspots[i]; h.x = x; h.y = y;
          var b = stage.querySelector('.hs[data-i="' + i + '"]');
          if (!b) { b = document.createElement('button'); b.className = 'hs'; b.setAttribute('data-i', i); b.setAttribute('data-stage', si); b.textContent = i + 1; stage.appendChild(b); }
          b.style.left = x + '%'; b.style.top = y + '%'; stage.classList.add('show');
          sel.options[sel.selectedIndex].text = sel.options[sel.selectedIndex].text.replace(' ✓', '') + ' ✓';
          dump(); toast('Hotspot gezet op ' + x + '%, ' + y + '%');
        });
      });
      document.getElementById('edcopy').addEventListener('click', function () { ta.select(); try { document.execCommand('copy'); toast('JSON gekopieerd'); } catch (e) { toast('Kopieer handmatig uit het tekstvak'); } });
      document.getElementById('edreset').addEventListener('click', function () { var parts = sel.value.split(':'), si = +parts[0], i = +parts[1]; var h = K.stages[si].hotspots[i]; h.x = null; h.y = null; var b = stagesEl[si].querySelector('.hs[data-i="' + i + '"]'); if (b) b.remove(); sel.options[sel.selectedIndex].text = sel.options[sel.selectedIndex].text.replace(' ✓', ''); dump(); });
    }
  }

  /* ---------- FAMILIE ---------- */
  function viewFamilie(q) {
    var all = q.alles === '1';
    var cards = '<div class="fam">' + P.bouwvormen.map(function (f) {
      var sa = f.sales;
      return '<a class="card fam-card' + (q.bouwvorm === f.id ? ' sel' : '') + '" href="#/familie?bouwvorm=' + f.id + (all ? '&alles=1' : '') + '">' + famImg(f, 'card-img') + '<div class="card-body"><b>' + esc(f.naam) + '</b><span class="sub">' + esc(sa.montage) + '</span><span class="optic">' + esc(sa.optiek) + '</span><span class="use">' + esc(sa.toepassing) + '</span></div></a>';
    }).join('') + '</div>';
    var heights = '<div class="height-bar"><div><b>Low Bay</b><span>2–5 m · kantoor, klaslokaal, vergaderruimte</span></div><div><b>High Bay</b><span>5–18 m · hallen, magazijnen, sporthallen</span></div><div><b>High Bay Corridor</b><span>5–18 m · gangen en stellinggangen</span></div></div>';
    var sel = q.bouwvorm ? bouwvorm(q.bouwvorm) : null;
    var detail = '';
    if (sel) {
      var V = P.vergelijking, ci = V.kolommen.indexOf(sel.id);
      var tech = V.rijen.filter(function (r) { return r[ci + 1] && r[ci + 1] !== '—'; }).map(function (r) { return '<dt>' + r[0] + '</dt><dd>' + esc(r[ci + 1]) + '</dd>'; }).join('');
      var prods = sel.in_koffer.map(function (id) { var p = product(id); return '<a class="mini" href="#/product/' + id + '">' + salesImg(p, 'mini-img') + '<span><b>' + esc(p.kort) + '</b>' + esc(p.sales.sub) + '</span></a>'; }).join('');
      detail = section('grey fade', '<div class="pd-hero">' + famImg(sel, 'pd-img') + '<div class="pd-title"><div class="fam-name">Bouwvorm</div><h1>' + esc(sel.naam) + '</h1><p class="sell">' + esc(sel.sales.wat) + '</p>' +
        '<div class="lvl"><h4>Toepassing</h4><p>' + esc(sel.sales.toepassing) + '</p></div>' +
        '<details class="tech-d"><summary>Techniek</summary><dl class="spec">' + tech + '</dl></details>' +
        '<h4 class="in-koffer">In de koffer</h4><div class="minis">' + prods + '</div></div></div>');
    }
    var table = '';
    if (all) {
      var V2 = P.vergelijking;
      table = section('fade', '<div class="head"><div class="eyebrow">Alle technische gegevens</div><h2>Bouwvormen vergeleken</h2></div><div class="tbl-wrap cmp-tbl"><table><thead><tr><th></th>' + V2.kolommen.map(function (id) { return '<th>' + esc(bouwvorm(id).naam.replace('IntuSens ', '')) + '</th>'; }).join('') + '</tr></thead><tbody>' +
        V2.rijen.map(function (r) { return '<tr><th scope="row">' + r[0] + '</th>' + r.slice(1).map(function (v) { return '<td' + (v === '—' ? ' class="dash"' : '') + '>' + esc(v) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>');
    }
    return section('tight', '<div class="head"><div class="eyebrow">Sensorfamilie</div><h2>Eén familie. Vijf bouwvormen.</h2><p class="lead">Eén sensorfamilie, vijf bouwvormen voor verschillende montage- en toepassingssituaties: op het plafond, op het armatuur, in het armatuur of in de lichtlijn.</p></div>' + cards + heights +
      '<div class="btn-row" style="margin-top:28px">' + link('#/familie?alles=1' + (q.bouwvorm ? '&bouwvorm=' + q.bouwvorm : ''), 'btn ghost', 'Alle technische gegevens') + link('#/varianten', 'btn ghost', 'De vier regelvarianten') + '</div>') + detail + table;
  }

  /* ---------- VARIANTEN ---------- */
  function viewVarianten() {
    var v = P.regelvarianten;
    var cards = '<div class="var">' + v.map(function (x) {
      return '<div class="card"><div class="card-img' + (x.id === 'switch' || x.id === 'ipd' ? ' dark' : '') + '"><img src="' + esc(x.beeld) + '" alt="' + esc(x.naam) + '"></div><div class="card-body"><b>' + esc(x.naam) + '</b><div class="kop">' + esc(x.kop) + '</div><ul>' + x.uitleg.map(function (u) { return '<li>' + esc(u) + '</li>'; }).join('') + '</ul></div></div>';
    }).join('') + '</div>';
    var rows = [
      ['Wie regelt het licht?', 'de sensor zelf', 'de sensor zelf', 'het systeem (bv. LiveLink)'],
      ['Wat stuurt de sensor?', '230 V-belasting aan/uit', 'alle DALI-armaturen op de lijn, samen', 'signalen naar de DALI-2-controller'],
      ['Adressering nodig?', 'nee', 'nee (broadcast)', 'ja, door het systeem'],
      ['Dimmen?', 'nee, schakelen', 'ja, incl. constantlichtregeling', 'bepaalt het systeem'],
      ['Instellen', 'op de sensor', 'op de sensor', 'in het systeem (LiveLink ONE)'],
      ['Meerdere groepen / scènes?', 'nee', 'nee, één groep', 'ja'],
      ['Typisch', 'enkele ruimte, eenvoudige vervanging', 'ruimte met één lichtgroep', 'gebouw met lichtmanagement']
    ];
    var cmp = '<div class="cmp"><div class="h l">&nbsp;</div><div class="h" data-col="Switch">Switch</div><div class="h" data-col="Broadcast">DALI-2 Broadcast</div><div class="h" data-col="Input Device">DALI-2 Input Device</div>' +
      rows.map(function (r) { return '<div class="l">' + r[0] + '</div><div>' + r[1] + '</div><div>' + r[2] + '</div><div>' + r[3] + '</div>'; }).join('') + '</div>';
    return section('tight', '<div class="head"><div class="eyebrow">De vier regelvarianten</div><h2>Zelfde sensor, andere rol</h2><p class="lead">Eerst bepalen wat de sensor in het systeem moet doen. Daarna pas de uitvoering kiezen.</p></div>' + cards) +
      section('grey', '<div class="head"><div class="eyebrow">In één oogopslag</div><h2>De verschillen op een rij</h2></div>' + cmp +
        '<div class="note"><b>Bluetooth NLC</b> is de draadloze variant in de familie. Neem voor beschikbaarheid contact op met TRILUX.</div>' +
        '<div class="note"><b>Van standalone naar systeem.</b> De DALI-2 Input Device bestuurt de armaturen niet zelf zoals de Broadcast-sensor. Hij levert aanwezigheid en licht aan het systeem; LiveLink bepaalt groepen, scènes en koppelingen.</div>');
  }

  /* ---------- BEDIENING ---------- */
  function annotated(ref) {
    var sa = B.sales[ref === 'K01' ? 'switch' : 'broadcast'];
    return '<div class="annot"><div class="annot-vis">' + window.KofferIllu.sensor(ref, { markers: true }) + '</div><ol class="annot-list">' +
      sa.aanwijzingen.map(function (a, i) { return '<li><i>' + (i + 1) + '</i><div><b>' + esc(a[0]) + '</b><span>' + esc(a[1]) + '</span></div></li>'; }).join('') + '</ol></div>';
  }
  function viewBediening(kind) {
    var isSw = kind !== 'broadcast', ref = isSw ? 'K01' : 'K02', sa = B.sales[isSw ? 'switch' : 'broadcast'];
    var tabs = '<div class="seg">' + link('#/bediening/switch', isSw ? 'on' : '', 'Switch') + link('#/bediening/broadcast', isSw ? '' : 'on', 'DALI-2 Broadcast') + '</div>';
    var stappen = '<div class="steps3">' + sa.stappen.map(function (st, i) { return '<div class="s3"><i>' + (i + 1) + '</i><b>' + esc(st[0]) + '</b><p>' + esc(st[1]) + '</p></div>'; }).join('') + '</div>';
    var keten = sa.keten ? section('grey', '<div class="head"><div class="eyebrow">Zo werkt het</div><h2>Eén sensor, één lichtgroep</h2></div><div class="flowline">' + sa.keten.map(function (k, i) { return (i ? '<span class="arr">→</span>' : '') + '<div' + (i === 1 ? ' class="hi"' : '') + '>' + esc(k) + '</div>'; }).join('') + '</div>') : '';
    return section('tight', tabs + '<div class="head"><h2>' + esc(sa.titel) + '</h2><p class="lead">' + esc(sa.sub) + '</p></div>' + annotated(ref) + '<p class="small muted" style="margin-top:18px">' + esc(sa.koffer) + '</p>') +
      section(isSw ? 'grey' : '', '<div class="head"><div class="eyebrow">In drie stappen</div><h2>Zo werkt de bediening</h2></div>' + stappen +
        '<div class="btn-row" style="margin-top:28px">' + link('#/demo', 'btn', 'Start demo') + link('#/product/' + ref, 'btn ghost', 'Productinformatie') + '</div>') + keten;
  }

  /* ---------- PRODUCT ---------- */
  function viewProduct(id) {
    var p = product(id); if (!p) return section('', '<h2>Onbekend product</h2><p>' + link('#/koffer', '', 'Terug naar de koffer') + '</p>');
    var f = bouwvorm(p.family), sa = p.sales;
    var schema = p.id === 'K01' ? ['230 V', 'IntuSens Switch', 'verlichting aan/uit'] : p.id === 'K02' ? ['230 V', 'IntuSens Broadcast', 'DALI-bus', 'armaturen als één groep'] : ['DALI-2-bus', esc(p.kort), 'DALI-2-controller, bijv. LiveLink', 'groepen, scènes, koppelingen'];
    var schemaHtml = '<div class="schema">' + schema.map(function (x, i) { return (i ? '<span></span>' : '') + '<div' + (i === 1 ? ' class="hi"' : '') + '>' + x + '</div>'; }).join('') + '</div>';
    var art = sa.artikel || {};
    var artRows = [['Typecode', art.typecode], ['TOC', art.toc], ['TK', art.tk]].filter(function (r) { return r[1]; });
    var tech = '<dl class="spec">' + sa.techniek.map(function (t) { return '<dt>' + esc(t[0]) + '</dt><dd>' + esc(t[1]) + '</dd>'; }).join('') +
      artRows.map(function (r) { return '<dt>' + r[0] + '</dt><dd class="mono">' + esc(r[1]) + '</dd>'; }).join('') + '</dl>';
    var nav = '<div class="btn-row" style="margin-top:22px">' + (p.id === 'K01' ? link('#/bediening/switch', 'btn', 'Bediening') : p.id === 'K02' ? link('#/bediening/broadcast', 'btn', 'Bediening') : '') + link('#/familie?bouwvorm=' + p.family, 'btn ghost', 'Bouwvorm ' + esc(f.naam.replace('IntuSens ', ''))) + link('#/koffer', 'btn ghost', 'Terug naar de koffer') + '</div>';
    return section('tight', '<div class="crumbs">' + link('#/koffer', '', 'De koffer') + ' › ' + link('#/familie?bouwvorm=' + p.family, '', esc(f.naam)) + '</div><div class="pd-hero">' + salesImg(p, 'pd-img') + '<div class="pd-title"><div class="fam-name">' + esc(f.naam) + (p.kofferrol === 'actief' ? ' · <span class="tag dark">werkend in de koffer</span>' : '') + '</div><h1>' + esc(p.kort) + '</h1><p class="pd-sub">' + esc(sa.sub) + '</p><p class="sell">' + esc(sa.wat) + '</p>' + nav + '</div></div>') +
      section('tight', '<div class="lv3">' +
        '<div class="pd-sec"><h2>Zo werkt het</h2>' + schemaHtml + '</div>' +
        '<div class="pd-sec"><h2>Toepassingen</h2><div class="chips">' + sa.waar.map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join('') + '</div></div>' +
        '<div class="pd-sec"><details class="tech-d"><summary>Techniek</summary>' + tech + '</details></div></div>');
  }

  /* ---------- SNELSTART ---------- */
  function viewSnelstart() {
    var ss = K.snelstart_sales, I = window.KofferIllu;
    var step = function (n, t, body) { return '<div class="qs3"><div class="qs3-h"><i>' + n + '</i><b>' + esc(t[0]) + '</b></div><p>' + esc(t[1]) + '</p>' + body + '</div>'; };
    var keuze = '<div class="qs3-choice">' + ['K01', 'K02'].map(function (r) { return '<a class="choice-sm" href="#/bediening/' + (r === 'K01' ? 'switch' : 'broadcast') + '">' + I.sensor(r) + '<b>' + (r === 'K01' ? 'Switch' : 'DALI-2 Broadcast') + '</b></a>'; }).join('') + '</div>';
    var back = K.foto_achter ? '<details class="back-d"><summary>Achterkant van de koffer bekijken</summary><img src="' + esc(K.foto_achter) + '" alt="' + esc(K.foto_achter_alt) + '"><p class="small muted">Links DA2 BCast, midden netaansluiting met hoofdschakelaar, rechts Switch.</p></details>' : '';
    return section('tight', '<div class="head"><div class="eyebrow">Snelstart</div><h2>Demokoffer in 30 seconden</h2></div>' +
      '<div class="qs3-row">' + step(1, ss.stappen[0], '<div class="qs3-vis">' + I.icon('aansluiten') + '</div>') + step(2, ss.stappen[1], '<div class="qs3-vis">' + I.icon('inschakelen') + '</div>') + step(3, ss.stappen[2], keuze) + '</div>' +
      '<div class="qs3-foot"><a class="btn big" href="#/demo">Start demo</a><p class="small muted">' + esc(ss.noot) + '<br>' + esc(ss.tip) + '</p></div>' + back);
  }

  /* ---------- DEMO (sales-modus) ---------- */
  var demoIdx = 0;
  function viewDemo(q) {
    demoIdx = Math.max(0, Math.min(DEMO.schermen.length - 1, (+q.s || 1) - 1));
    document.body.classList.add('demo-mode');
    setTimeout(bindDemo, 0);
    return '<div class="demo" id="demo">' + demoScreen() + '</div>';
  }
  function demoScreen() {
    var s = DEMO.schermen[demoIdx], n = DEMO.schermen.length;
    var vis;
    if (s.live) vis = annotated(s.live === 'switch' ? 'K01' : 'K02');
    else if (s.familie) vis = '<div class="demo-fam">' + P.bouwvormen.map(function (f) { return '<div>' + famImg(f, 'df-img') + '<span>' + esc(f.naam.replace('IntuSens ', '')) + '</span></div>'; }).join('') + '</div>';
    else if (s.koffer) vis = '<div class="demo-illu">' + illuHtml(true, 'illu-demo') + '</div>';
    else vis = '<div class="demo-vis' + (isDarkSrc(s.beeld) ? ' dark' : '') + '">' + imgOrPh(s.beeld, s.titel) + '</div>';
    return '<div class="demo-top"><a href="#/" class="btn ghost sm" id="demo-exit">Sluiten</a><div class="prog"><i style="width:' + ((demoIdx + 1) / n * 100) + '%"></i></div><span class="n">' + (demoIdx + 1) + ' / ' + n + '</span><button class="btn ghost sm" id="demo-fs" title="Volledig scherm">⛶</button></div>' +
      '<div class="demo-body"><div class="demo-in fade' + (s.koffer ? ' wide' : '') + '"><div><div class="eyebrow">Demo · ' + (demoIdx + 1) + '</div><h1>' + esc(s.titel) + '</h1><p class="msg">' + esc(s.boodschap) + '</p><ul>' + s.punten.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul></div><div>' + vis + '</div></div></div>' +
      '<div class="demo-bottom"><div class="navb"><button class="btn ghost" id="demo-prev"' + (demoIdx === 0 ? ' disabled' : '') + '>‹ Vorige</button><button class="btn" id="demo-next">' + (demoIdx === n - 1 ? 'Afsluiten' : 'Volgende ›') + '</button></div></div>';
  }
  function bindDemo() {
    var root = document.getElementById('demo'); if (!root) return;
    function go(d) { var n = DEMO.schermen.length; if (demoIdx + d >= n) { location.hash = '#/'; return; } demoIdx = Math.max(0, Math.min(n - 1, demoIdx + d)); history.replaceState(null, '', '#/demo?s=' + (demoIdx + 1)); root.innerHTML = demoScreen(); bind(); }
    function bind() {
      document.getElementById('demo-prev').addEventListener('click', function () { go(-1); });
      document.getElementById('demo-next').addEventListener('click', function () { go(1); });
      document.getElementById('demo-fs').addEventListener('click', toggleFullscreen);
      if (document.getElementById('illu-demo')) illuBind('illu-demo');
    }
    bind();
    root._key = function (e) { if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); go(1); } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(-1); } else if (e.key === 'Escape') { location.hash = '#/'; } };
    window.addEventListener('keydown', root._key);
  }

  /* ---------- router ---------- */
  function parse() {
    var h = location.hash.replace(/^#\/?/, ''); var q = {}; var i = h.indexOf('?');
    if (i >= 0) { h.slice(i + 1).split('&').forEach(function (kv) { var p = kv.split('='); q[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || ''); }); h = h.slice(0, i); }
    return { route: h, q: q };
  }
  function render() {
    var r = parse(), route = r.route, q = r.q, html;
    var old = document.getElementById('demo'); if (old && old._key) window.removeEventListener('keydown', old._key);
    document.body.classList.remove('demo-mode');
    if (route === '' || route === 'start') html = viewStart();
    else if (route === 'koffer') html = viewKoffer(q);
    else if (route === 'familie') html = viewFamilie(q);
    else if (route === 'varianten') html = viewVarianten();
    else if (route.indexOf('bediening') === 0) html = viewBediening(route.split('/')[1]);
    else if (route.indexOf('product/') === 0) html = viewProduct(route.split('/')[1]);
    else if (route === 'snelstart') html = viewSnelstart();
    else if (route === 'demo') html = viewDemo(q);
    else html = section('', '<h2>Pagina niet gevonden</h2><p>' + link('#/', '', 'Naar het startscherm') + '</p>');
    main.innerHTML = html;
    renderNav(route);
    if (route !== 'demo') window.scrollTo(0, 0);
    document.title = (route ? route.split('/')[0].charAt(0).toUpperCase() + route.split('/')[0].slice(1) + ' · ' : '') + 'IntuSens demokoffer · TRILUX';
  }
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }
  window.addEventListener('hashchange', render);
  window.addEventListener('keydown', function (e) { if ((e.key === 'f' || e.key === 'F') && !e.ctrlKey && !e.metaKey && !/input|textarea|select/i.test(document.activeElement.tagName)) toggleFullscreen(); });
  render();
})();
