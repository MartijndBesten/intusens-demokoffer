/* TRILUX IntuSens demokoffer — Interactive Sales Guide
   Plain JS, geen build, geen externe afhankelijkheden. Werkt via file:// en op elke statische host.
   Data: src/data.js (gegenereerd uit data/*.json door tools/build_data.py). */
(function () {
  'use strict';
  var D = window.INTUSENS_DATA;
  if (!D) { document.body.innerHTML = '<p style="padding:40px;font-family:sans-serif">Data ontbreekt: draai <code>python3 tools/build_data.py</code>.</p>'; return; }
  var P = D.producten, K = D.koffer, B = D.bediening, DEMO = D.demo;
  var main = document.getElementById('main');
  var STATUS_LABEL = { 'bevestigd': 'officieel bevestigd', 'onzeker': 'bron niet officieel of niet ingezien', 'te-verifieren': 'nog te verifiëren', 'waarneming': 'waargenomen, nog te bevestigen', 'schematisch': 'schematisch' };

  /* ---------- helpers ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function st(status, open) {
    if (!status) return '';
    var t = STATUS_LABEL[status] || status;
    if (open) t += ' · ' + open;
    return '<span class="st ' + esc(status) + '" title="' + esc(t) + '">' + esc(t) + '</span>';
  }
  function val(field) { // veld {waarde,status,open,noot}
    if (!field) return '<em class="muted">—</em>';
    if (field.waarde == null) return '<span class="na">nog te verifiëren' + (field.open ? ' (' + esc(field.open) + ')' : '') + '</span>';
    return esc(field.waarde) + ' ' + st(field.status, field.open);
  }
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
  function legend() {
    return '<div class="legend">' + st('bevestigd') + st('onzeker') + st('te-verifieren') + '<span class="muted">Waarden zonder officiële bron worden niet als feit getoond. Details: OPEN-PUNTEN.md</span></div>';
  }

  /* ---------- navigatie ---------- */
  var NAV = [
    ['#/koffer', 'De koffer'], ['#/familie', 'Sensorfamilie'], ['#/varianten', 'Vier regelvarianten'],
    ['#/bediening/switch', 'Bediening'], ['#/snelstart', 'Snelstart'], ['#/status', 'Bronstatus']
  ];
  function renderNav(route) {
    var links = document.getElementById('navlinks');
    links.innerHTML = NAV.map(function (n) {
      var active = route === n[0].slice(2) || (n[0] === '#/bediening/switch' && route.indexOf('bediening') === 0) || (n[0] === '#/familie' && route.indexOf('product') === 0);
      return '<a href="' + n[0] + '"' + (active ? ' class="active"' : '') + '>' + n[1] + '</a>';
    }).join('') + '<a href="#/demo" class="cta">Start klantdemo</a><a href="#" id="fs" title="Volledig scherm (F)">⛶</a>';
    links.classList.remove('open');
    document.getElementById('fs').addEventListener('click', function (e) { e.preventDefault(); toggleFullscreen(); });
  }
  function toggleFullscreen() {
    var d = document;
    if (!d.fullscreenElement && d.documentElement.requestFullscreen) d.documentElement.requestFullscreen().catch(function () { toast('Volledig scherm niet beschikbaar in deze browser (gebruik F11).'); });
    else if (d.exitFullscreen) d.exitFullscreen();
  }
  document.getElementById('burger').addEventListener('click', function () { document.getElementById('navlinks').classList.toggle('open'); });

  /* ---------- START ---------- */
  function viewStart() {
    var hero = '<section class="hero"><div class="hero-in"><div>' +
      '<div class="brand">TRILUX</div>' +
      '<h1>IntuSens<small>Demokoffer · Interactive Sales Guide</small></h1>' +
      '<p class="sub">Ontdek de sensor. Begrijp de toepassing. Laat hem direct zien.</p>' +
      '<div class="hero-actions">' +
      link('#/demo', 'btn light', 'Start demo') + link('#/koffer', 'btn outline-light', 'Bekijk de koffer') +
      link('#/familie', 'btn outline-light', 'Sensorfamilie') + link('#/snelstart', 'btn outline-light', 'Snelle handleiding') +
      '</div></div>' +
      '<div class="hero-visual">' + (K.foto_hero ? '<img src="' + esc(K.foto_hero) + '" alt="Geopende TRILUX IntuSens-demokoffer">' : '<div class="ph"><b>Kofferfoto volgt</b><span>Plaats de overzichtsfoto van de geopende koffer in</span><span class="mono">assets/original/</span><span>en vul <span class="mono">foto_hero</span> in data/koffer.json</span></div>') + '</div>' +
      '</div></section>';
    var kern = P.familie.kern;
    var strip = '<div class="strip">' + [
      ['PIR + daglicht', 'meet beweging en beschikbaar daglicht'],
      ['Tot 18 m', 'montagehoogtes van 2 tot 18 meter'],
      ['Zonder app', 'instellen op de sensor: draaiwiel en display'],
      ['Vier varianten', 'Switch · DALI-2 Broadcast · DALI-2 Input Device · Bluetooth NLC']
    ].map(function (x) { return '<div><b>' + x[0] + '</b><span>' + x[1] + '</span></div>'; }).join('') + '</div>';
    var intro = section('', '<div class="head"><div class="eyebrow">Wat is IntuSens?</div><h2>' + esc(P.familie.claim) + '</h2></div>' + strip +
      '<p class="small muted" style="margin-top:12px">Bron: trilux.com IntuSens-productpagina (A08). ' + st('bevestigd') + '</p>');
    var routes = section('grey', '<div class="head"><div class="eyebrow">Kies je route</div><h2>Wat wil je laten zien?</h2></div><div class="grid g4">' + [
      ['#/koffer', 'De koffer', 'Wat zit waar, klikbaar per onderdeel.'],
      ['#/varianten', 'Vier regelvarianten', 'Switch, Broadcast, Input Device en Bluetooth NLC in één vergelijking.'],
      ['#/bediening/switch', 'Bediening', 'Stap voor stap, met digitale sensor om te oefenen.'],
      ['#/demo', 'Klantdemo', 'Begeleide flow van circa 5 minuten met spreektekst.']
    ].map(function (x) { return '<a class="card" href="' + x[0] + '"><div class="card-body"><b>' + x[1] + '</b><span class="sub">' + x[2] + '</span></div></a>'; }).join('') + '</div>');
    var use = section('', '<div class="grid g2"><div><div class="eyebrow">Waar gebruik je IntuSens?</div><h2>Van kantoor tot magazijn</h2><p class="lead">Dezelfde sensorfamilie voor ' + P.familie.toepassingen.lijst.join(', ') + '.</p></div>' +
      '<div class="kv"><div class="box"><h4>Lokaal regelen</h4><ul><li>Switch: schakelt 230 V direct.</li><li>DALI-2 Broadcast: regelt alle armaturen op de lijn als één groep.</li><li>Instellen op de sensor, zonder app.</li></ul></div>' +
      '<div class="box"><h4>Centraal lichtmanagement</h4><ul><li>DALI-2 Input Device: levert aanwezigheid en licht aan LiveLink.</li><li>Groepen, scènes en gebouwkoppeling in het systeem.</li><li>Bluetooth NLC: draadloze variant; status per artikel controleren.</li></ul></div></div></div>');
    return hero + intro + routes + use;
  }

  /* ---------- KOFFER ---------- */
  function stageHtml(stg, idx, edit) {
    return '<div class="stage-block"><h3 style="margin-bottom:6px">' + esc(stg.titel) + '</h3><p class="muted" style="margin-bottom:12px">' + esc(stg.tekst) + '</p>' +
      '<div class="koffer-stage" data-stage="' + idx + '"><img src="' + esc(stg.foto) + '" alt="' + esc(stg.alt) + '" draggable="false">' +
      stg.hotspots.map(function (h, i) {
        if (h.x == null || h.y == null) return '';
        return '<button class="hs" data-stage="' + idx + '" data-i="' + i + '" style="left:' + h.x + '%;top:' + h.y + '%" aria-label="' + esc(h.label) + '">' + (i + 1) + '</button>';
      }).join('') + '</div></div>';
  }
  function viewKoffer(q) {
    var edit = q.edit === '1';
    var stages = K.stages || [];
    var stagesHtml = stages.map(function (stg, i) { return stageHtml(stg, i, edit); }).join('');
    var placed = 0, total = 0; stages.forEach(function (stg) { stg.hotspots.forEach(function (h) { total++; if (h.x != null) placed++; }); });
    var tools = '<div class="koffer-tools"><label class="toggle"><input type="checkbox" id="showhs"> Toon onderdelen</label>' +
      '<span class="muted small">' + placed + ' van ' + total + ' hotspots geplaatst · tik op een punt voor het productdetail</span>' +
      '<a href="#/koffer' + (edit ? '' : '?edit=1') + '" class="btn ghost sm" style="margin-left:auto">' + (edit ? 'Editor sluiten' : 'Hotspot-editor') + '</a></div>';
    var editor = '';
    if (edit) {
      editor = '<div class="editor" id="editor"><b>Hotspot-editor</b> — kies een onderdeel, klik op de bijbehorende foto om de positie te zetten. Kopieer daarna het JSON-blok naar <span class="mono">data/koffer.json</span> (veld <span class="mono">stages[].hotspots</span>) en draai <span class="mono">tools/build_data.py</span>.<br><br>' +
        '<select id="edsel">' + stages.map(function (stg, si) { return stg.hotspots.map(function (h, i) { return '<option value="' + si + ':' + i + '">' + esc(stg.titel.split(':')[0]) + ' · ' + (i + 1) + '. ' + esc(h.label) + (h.x != null ? ' ✓' : '') + '</option>'; }).join(''); }).join('') + '</select> ' +
        '<button class="btn sm" id="edcopy">Kopieer JSON</button> <button class="btn ghost sm" id="edreset">Positie wissen</button>' +
        '<textarea id="edjson" readonly></textarea></div>';
    }
    var grid = '<div class="grid g3 koffer-grid" id="kgrid">' + K.hotspots.map(function (h, i) {
      var p = product(h.ref), a = acc(h.ref);
      var href = p ? '#/product/' + p.id : '#/snelstart';
      var img = p ? '<div class="card-img' + (isDark(p) ? ' dark' : '') + '">' + imgOrPh(p.beeld, p.kort, p.beeld_noot, isDark(p)) + (p.kofferrol === 'actief' ? '<span class="tag dark rol">werkend</span>' : '') + '</div>' : (a && a.foto ? '<div class="card-img dark">' + imgOrPh(a.foto, a.naam) + '</div>' : '');
      return '<a class="card" href="' + href + '">' + img + '<div class="card-body"><span class="tag grey">' + esc(h.familie) + '</span><b>' + esc(h.label) + '</b><span class="sub">' + esc(h.functie) + '</span>' + (p ? '<span class="small muted">' + esc(p.designation || 'typecode nog te bepalen') + '</span>' : '') + (h.noot ? '<span class="small muted">' + esc(h.noot) + '</span>' : '') + '</div></a>';
    }).join('') + '</div>';
    var actief = P.producten.filter(function (p) { return p.kofferrol === 'actief'; });
    var html = section('tight', '<div class="head"><div class="eyebrow">De koffer</div><h2>Wat zit waar?</h2><p class="lead">In het deksel de toonmodellen van alle bouwvormen, in de onderzijde de twee werkende demonstratiesensoren. Tik op een punt voor het productdetail.</p></div>' + tools + stagesHtml + editor) +
      section('tight', '<div class="head"><div class="eyebrow">Werkend in de koffer</div><h2>Twee sensoren die je live laat zien</h2></div><div class="grid g2">' + actief.map(function (p) {
        return '<a class="card" href="#/bediening/' + (p.id === 'K01' ? 'switch' : 'broadcast') + '"><div class="card-img wide' + (isDark(p) ? ' dark' : '') + '">' + imgOrPh(p.beeld, p.kort, p.beeld_noot, isDark(p)) + '</div><div class="card-body"><b>' + esc(p.kort) + '</b><span class="sub">' + esc(p.sub) + '</span><span class="sub">' + esc(p.verkoopzin) + '</span><span class="tag" style="margin-top:8px;align-self:flex-start">Naar de bediening</span></div></a>';
      }).join('') + '</div>') +
      section('grey', '<div class="head"><div class="eyebrow">Rasterweergave</div><h2>Alle onderdelen</h2><p class="lead">Dezelfde inhoud als de hotspots, ook op een telefoon.</p></div>' + grid) +
      section('', '<div class="head"><div class="eyebrow">Uitbreidingsmogelijkheid – later</div><h2>Aansluitingen aan de achterzijde</h2><p class="lead">' + esc(K.uitbreiding_later) + '</p></div><div class="grid g3">' + P.accessoires.filter(function (a) { return !a.nodig_basisdemo; }).map(function (a) {
        return '<div class="card"><div class="card-body"><span class="tag grey">niet nodig voor de basisdemo</span><b>' + esc(a.naam) + '</b><span class="sub">' + esc(a.functie) + '</span>' + (a.waarneming ? '<span class="small muted">' + esc(a.waarneming) + '</span>' : '') + '</div></div>';
      }).join('') + '</div><p style="margin-top:16px">' + link('#/snelstart', 'btn ghost', 'Foto van de achterzijde: Wat zit waar?') + '</p>');
    setTimeout(function () { bindKoffer(edit); }, 0);
    return html;
  }
  function bindKoffer(edit) {
    var stagesEl = document.querySelectorAll('.koffer-stage'); if (!stagesEl.length) return;
    var chk = document.getElementById('showhs');
    chk.addEventListener('change', function () { stagesEl.forEach(function (el) { el.classList.toggle('show', chk.checked); }); });
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
      var src = f.beelden[0];
      return '<a class="card" href="#/familie?bouwvorm=' + f.id + '"><div class="card-img' + (/zwart/.test(src || '') ? ' dark' : '') + '">' + imgOrPh(src, f.naam, f.beeld_bron) + '</div><div class="card-body"><b>' + esc(f.naam) + '</b><span class="sub">' + esc(f.sub) + '</span><span class="sub">' + esc(f.montagehoogte.waarde || '') + '</span></div></a>';
    }).join('') + '</div>';
    var heights = '<div class="height-bar"><div><b>Low Bay</b><span>2–5 m · kantoor, klaslokaal, vergaderruimte</span></div><div><b>High Bay</b><span>5–18 m · hallen, magazijnen, sporthallen</span></div><div><b>High Bay Corridor</b><span>5–18 m · gangen en stellinggangen, langgerekt gebied</span></div></div><p class="small muted" style="margin-top:10px">Montagehoogtes: TRILUX klantpresentatie 18-05-2026, p. 15 (B03) en trilux.com (A08). Detectiediameters zijn nog niet uit een officiële bron bevestigd en worden daarom niet getoond (OP-01).</p>';
    var sel = q.bouwvorm ? bouwvorm(q.bouwvorm) : null;
    var detail = '';
    if (sel) {
      var imgs = sel.beelden.length ? sel.beelden.map(function (s) { return '<div class="pd-img' + (/zwart/.test(s) ? ' dark' : '') + '"><img src="' + esc(s) + '" alt="' + esc(sel.naam) + '"></div>'; }).join('') : '<div class="pd-img"><div class="ph"><b>Foto volgt</b><span>' + esc(sel.beeld_bron) + '</span></div></div>';
      var rows = [['Montage', sel.montage], ['Optiek', sel.optiek], ['Detectietechniek', sel.detectie], ['Kleuren', sel.kleuren], ['Interfaces', sel.interfaces], ['IP-klasse', sel.ip], ['Detectiegebied', sel.detectiegebied], ['Montagehoogte', sel.montagehoogte], ['Typische toepassing', sel.toepassing]];
      detail = section('grey fade', '<div class="pd-hero"><div class="grid g2" style="gap:12px">' + imgs + '</div><div class="pd-title"><div class="fam-name">Bouwvorm</div><h1>' + esc(sel.naam) + '</h1><p class="sell">' + esc(sel.kop) + '</p>' +
        '<dl class="spec" style="margin-top:20px">' + rows.map(function (r) { return '<dt>' + r[0] + '</dt><dd>' + val(r[1]) + '</dd>'; }).join('') + '</dl>' +
        '<p class="small muted" style="margin-top:14px">Beeld: ' + esc(sel.beeld_bron) + '</p>' +
        '<div class="btn-row" style="margin-top:16px">' + sel.in_koffer.map(function (id) { var p = product(id); return link('#/product/' + id, 'btn ghost sm', esc(p.kort) + ' · ' + esc(p.sub.split(' · ')[0])); }).join('') + '</div></div></div>');
    }
    var table = '';
    if (all) {
      var cols = [['montage', 'Montage'], ['optiek', 'Optiek'], ['detectie', 'Detectie'], ['kleuren', 'Kleuren'], ['interfaces', 'Interfaces'], ['ip', 'IP'], ['detectiegebied', 'Detectiegebied'], ['montagehoogte', 'Montagehoogte'], ['toepassing', 'Toepassing']];
      table = section('fade', '<div class="head"><div class="eyebrow">Alle technische gegevens</div><h2>Bouwvormen vergeleken</h2></div><div class="tbl-wrap"><table><thead><tr><th>Kenmerk</th>' + P.bouwvormen.map(function (f) { return '<th>' + esc(f.naam.replace('IntuSens ', '')) + '</th>'; }).join('') + '</tr></thead><tbody>' +
        cols.map(function (c) { return '<tr><td><b>' + c[1] + '</b></td>' + P.bouwvormen.map(function (f) { return '<td>' + val(f[c[0]]) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>' + legend());
    }
    return section('tight', '<div class="head"><div class="eyebrow">Sensorfamilie</div><h2>Één familie. Vijf montagevormen.</h2><p class="lead">Dezelfde PIR- en daglichtdetectie, dezelfde bedienfilosofie. Alleen de plek verschilt: op het plafond, op het armatuur, in het armatuur of in de lichtlijn.</p></div>' + cards + heights +
      '<div class="btn-row" style="margin-top:28px">' + link('#/familie?alles=1' + (q.bouwvorm ? '&bouwvorm=' + q.bouwvorm : ''), 'btn ghost', 'Alle technische gegevens') + link('#/varianten', 'btn ghost', 'De vier regelvarianten') + '</div>') + detail + table;
  }

  /* ---------- VARIANTEN ---------- */
  function viewVarianten() {
    var v = P.regelvarianten;
    var cards = '<div class="var">' + v.map(function (x) {
      return '<div class="card"><div class="card-img' + (x.id === 'switch' || x.id === 'ipd' ? ' dark' : '') + '"><img src="' + esc(x.beeld) + '" alt="' + esc(x.naam) + '"></div><div class="card-body"><b>' + esc(x.naam) + '</b><div class="kop">' + esc(x.kop) + '</div><ul>' + x.uitleg.map(function (u) { return '<li>' + esc(u) + '</li>'; }).join('') + '</ul>' + (x.noot ? '<p class="small" style="margin-top:8px">' + st(x.status) + '</p>' : '') + '<div class="zeg"><em>Wat zeg ik?</em>' + esc(x.verkoper_zegt) + '</div></div></div>';
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
    return section('tight', '<div class="head"><div class="eyebrow">De vier regelvarianten</div><h2>Zelfde sensor, andere rol</h2><p class="lead">Eerst bepalen wat de sensor in het systeem moet doen. Daarna pas de uitvoering kiezen.</p></div>' + cards + '<p class="small muted" style="margin-top:14px">Beelden: TRILUX klantpresentatie 18-05-2026, p. 9 (B03). De kleur van het beeld zegt niets over de beschikbare kleuren per variant of over de kofferuitvoering.</p>') +
      section('grey', '<div class="head"><div class="eyebrow">In één oogopslag</div><h2>Wat vertel je de klant?</h2></div>' + cmp +
        '<div class="note"><b>Bluetooth NLC</b> staat bewust niet in deze vergelijking: de productstatus per artikel en de inzet in LiveLink Premium Hybrid zijn niet bevestigd (OP-02, OP-03). Noem de variant als "in de familie", niet als algemeen leverbaar.</div>' +
        '<div class="note"><b>Van standalone naar systeem.</b> De DALI-2 Input Device bestuurt de armaturen niet zelf zoals de Broadcast-sensor. Hij levert aanwezigheid en licht aan het systeem; LiveLink bepaalt groepen, scènes en koppelingen. Bron: trilux.com (A08), B03 p. 12 en LiveLink-documentatie (CL-181 in de presentatie-repo).</div>');
  }

  /* ---------- BEDIENING ---------- */
  function viewBediening(kind) {
    var isSw = kind !== 'broadcast';
    var p = product(isSw ? 'K01' : 'K02'), spec = isSw ? B.switch : B.broadcast, g = B.gemeenschappelijk;
    var tabs = '<div class="btn-row" style="margin-bottom:24px">' + link('#/bediening/switch', 'btn ' + (isSw ? '' : 'ghost') + ' sm', 'Switch') + link('#/bediening/broadcast', 'btn ' + (isSw ? 'ghost' : '') + ' sm', 'DALI-2 Broadcast') + '</div>';
    var steps = '<div class="steps">' + B.stappen.map(function (s) { return '<div class="step"><i>' + s.n + '</i><b>' + esc(s.kop) + '</b><p>' + esc(s.tekst) + '</p>' + st(s.status) + '</div>'; }).join('') + '</div>';
    var keten = spec.keten ? '<div class="chain">' + spec.keten.map(function (k, i) { return (i ? '<span></span>' : '') + '<div' + (i === 1 ? ' class="hi"' : '') + '>' + esc(k) + '</div>'; }).join('') + '</div>' : '';
    var known = '<div class="kv"><div class="box"><h4>Officieel bevestigd</h4><ul>' + g.bevestigd.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '<li class="muted small">' + esc(g.b03_parameters.tekst) + ' ' + st(g.b03_parameters.status) + '</li></ul></div>' +
      '<div class="box"><h4>Waargenomen op de koffer (foto), betekenis nog te bevestigen</h4><ul>' + g.waarneming.map(function (w) { return '<li>' + esc(w.tekst) + ' ' + st(w.status, w.open) + (w.noot ? '<br><span class="small muted">' + esc(w.noot) + '</span>' : '') + '</li>'; }).join('') + '</ul></div>' +
      '<div class="box" style="grid-column:1/-1"><h4>Nog niet uit officiële documentatie bekend (' + esc(g.onbekend_open) + ')</h4><ul style="columns:2;column-gap:32px">' + g.onbekend.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul><p class="small muted" style="margin:10px 0 0">Deze punten worden pas in de app gezet als de installatie-/bedieningshandleiding van de sensor is ingezien. Tot die tijd blijft de digitale sensor hieronder schematisch: hij toont het principe (drukken, kiezen, draaien, waarde zien), niet de echte codes, bereiken of eenheden.</p></div></div>';
    var fotos = (spec.fotos || []).length ? '<div class="fotostrip">' + spec.fotos.map(function (f) { return '<img src="' + esc(f) + '" alt="Displaystand op de koffer">'; }).join('') + '</div><p class="small muted">Foto\'s van de koffer (25-09-2026): displaystanden zoals waargenomen. Betekenis van cijfers en letters: OP-16/OP-17.</p>' : '';
    var flow = '<ol style="font-size:16px;padding-left:22px">' + spec.demo_flow.map(function (t) { return '<li style="margin:6px 0">' + esc(t) + '</li>'; }).join('') + '</ol>';
    var sim = '<div class="sim"><div class="sensor" id="sensor" aria-label="Digitale IntuSens-sensor, schematisch">' + sensorSVG(isDark(p)) + '</div>' +
      '<div class="sim-ctl"><div class="eyebrow">Digitale sensor · schematisch</div><h3>Oefen de bediening</h3><p class="muted">Indeling zoals op de koffer: display boven de lens, zon en klok eronder, draairing buiten. Klik op het zonsymbool (drukpunt) om de functie te kiezen: zon = helderheidsdrempel, klok = nalooptijd (aanname, OP-15). Draai aan de ring of gebruik de knoppen; het display toont de stand. Stappen, eenheden en codes zijn illustratief (OP-16, OP-17).</p>' +
      '<div class="row"><button class="btn sm" id="sim-press">Druk</button><button class="btn ghost sm" id="sim-min">Draai −</button><button class="btn ghost sm" id="sim-plus">Draai +</button><button class="btn ghost sm" id="sim-reset">Terug naar rust</button></div>' +
      '<div class="sim-state" id="sim-state">Rust · geen functie gekozen</div></div></div>';
    var html = section('tight', '<div class="head"><div class="eyebrow">Interactieve bediening</div><h2>' + esc(spec.kop) + '</h2><p class="lead">' + esc(spec.wat_zie_je) + ' ' + st(spec.wat_zie_je_status, spec.wat_zie_je_open) + '</p></div>' + tabs + steps) +
      section('grey', '<div class="head"><div class="eyebrow">Stap voor stap</div><h2>Zo doe je het bij de klant</h2></div><div class="grid g2"><div>' + flow + (spec.grenzen ? '<div class="note warn"><b>Aantal armaturen.</b> ' + esc(spec.grenzen) + '</div>' : '') + '</div><div>' + keten + (isSw ? '<div class="note"><b>Wat de klant ziet.</b> In de koffer schakelt de Switch niets zichtbaars: geen lamp, display uit tot je de sensor bedient. Laat dus het display en de instelling zien, en vertel wat de sensor in een ruimte zou schakelen.</div>' : '') + '</div></div>') +
      section('', sim + fotos) +
      section('grey', '<div class="head"><div class="eyebrow">Wat weten we zeker?</div><h2>Bronstatus van de bediening</h2></div>' + known);
    setTimeout(bindSim, 0);
    return html;
  }
  function sensorSVG(dark) {
    /* Schematische weergave; indeling volgt de kofferfoto's: draairing buiten, display boven de PIR-lens,
       zon- en kloksymbool onder de lens (zon = drukpunt op de Broadcast-sensor, foto 25-09-2026). */
    var body = dark ? '#1c1c1c' : '#f2f2f2', ring = dark ? '#262626' : '#e6e6e6', edge = dark ? '#3c3c3c' : '#cfcfcf', lens = dark ? '#2a2a2a' : '#e0e0e0', txt = dark ? '#d0d0d0' : '#555';
    var ticks = '';
    for (var i = 0; i < 72; i++) { var a = i * 5 * Math.PI / 180; ticks += '<line x1="' + (200 + 158 * Math.cos(a)).toFixed(1) + '" y1="' + (200 + 158 * Math.sin(a)).toFixed(1) + '" x2="' + (200 + 178 * Math.cos(a)).toFixed(1) + '" y2="' + (200 + 178 * Math.sin(a)).toFixed(1) + '" stroke="' + edge + '" stroke-width="2.2"/>'; }
    return '<svg viewBox="0 0 400 400" role="img">' +
      '<defs><radialGradient id="g1" cx="40%" cy="35%"><stop offset="0" stop-color="' + (dark ? '#3a3a3a' : '#ffffff') + '"/><stop offset="1" stop-color="' + body + '"/></radialGradient></defs>' +
      '<g class="ring" id="ring"><circle cx="200" cy="200" r="190" fill="' + ring + '" stroke="' + edge + '" stroke-width="1.5"/>' + ticks + '<circle id="marker" cx="200" cy="32" r="5" fill="#072D78"/></g>' +
      '<circle cx="200" cy="200" r="150" fill="url(#g1)" stroke="' + edge + '" stroke-width="1"/>' +
      '<circle cx="200" cy="200" r="110" fill="' + (dark ? '#151515' : '#e9e9e9') + '"/>' +
      '<text x="200" y="88" font-size="9" fill="' + txt + '" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" letter-spacing="3" opacity=".7">TRILUX</text>' +
      '<text id="lcd" class="lcd" x="200" y="132" font-size="38" fill="#eaf2ff" text-anchor="middle" font-family="Consolas, Menlo, monospace" font-weight="700">– –</text>' +
      '<circle cx="200" cy="200" r="42" fill="' + lens + '" stroke="' + edge + '" stroke-width="1.5"/>' +
      '<circle cx="200" cy="200" r="28" fill="none" stroke="' + edge + '" stroke-width="1"/><circle cx="200" cy="200" r="14" fill="none" stroke="' + edge + '" stroke-width="1"/>' +
      '<g class="btn-press" id="press"><circle cx="200" cy="268" r="17" fill="transparent"/><text id="ico-sun" data-off="' + txt + '" x="200" y="275" font-size="22" text-anchor="middle" fill="' + txt + '" font-family="Segoe UI Symbol, Arial, sans-serif">☼</text></g>' +
      '<text id="ico-clock" data-off="' + txt + '" x="200" y="306" font-size="20" text-anchor="middle" fill="' + txt + '" font-family="Segoe UI Symbol, Arial, sans-serif">◷</text>' +
      '<text x="200" y="352" font-size="10" fill="' + txt + '" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" letter-spacing="2" opacity=".8">SCHEMATISCH · GEEN ECHTE CODES</text>' +
      '</svg>';
  }
  function bindSim() {
    var root = document.getElementById('sensor'); if (!root) return;
    var lcd = document.getElementById('lcd'), sun = document.getElementById('ico-sun'), clk = document.getElementById('ico-clock'), ring = document.getElementById('ring'), state = document.getElementById('sim-state');
    var mode = 0, vals = { 1: 5, 2: 5 }, angle = 0, timer = null, MAX = 10;
    var MODES = { 0: 'Rust · geen functie gekozen', 1: 'Helderheidsdrempel (zon) · stand', 2: 'Nalooptijd (klok) · stand' };
    function render() {
      sun.setAttribute('fill', mode === 1 ? '#4097DB' : ''); clk.setAttribute('fill', mode === 2 ? '#4097DB' : ''); if (mode !== 1) sun.setAttribute('fill', sun.getAttribute('data-off')); if (mode !== 2) clk.setAttribute('fill', clk.getAttribute('data-off'));
      lcd.textContent = mode ? String(vals[mode]) : '– –'; lcd.setAttribute('opacity', mode ? '1' : '.35');
      ring.setAttribute('transform', 'rotate(' + angle + ' 200 200)');
      state.textContent = mode ? MODES[mode] + ' ' + vals[mode] + ' van ' + MAX + ' (illustratief; werkelijk bereik nog te verifiëren, OP-17)' : MODES[0];
      clearTimeout(timer); if (mode) timer = setTimeout(function () { mode = 0; render(); toast('Instelmodus verlaten (schematisch)'); }, 10000);
    }
    function press() { mode = (mode + 1) % 3; render(); }
    function turn(d) { if (!mode) { toast('Druk eerst om een functie te kiezen'); return; } vals[mode] = Math.max(1, Math.min(MAX, vals[mode] + d)); angle += d * 12; render(); }
    document.getElementById('press').addEventListener('click', press);
    document.getElementById('sim-press').addEventListener('click', press);
    document.getElementById('sim-plus').addEventListener('click', function () { turn(1); });
    document.getElementById('sim-min').addEventListener('click', function () { turn(-1); });
    var rs = document.getElementById('sim-reset'); if (rs) rs.addEventListener('click', function () { mode = 0; render(); });
    var drag = null;
    function ang(e) { var r = root.getBoundingClientRect(); var t = e.touches ? e.touches[0] : e; return Math.atan2(t.clientY - (r.top + r.height / 2), t.clientX - (r.left + r.width / 2)) * 180 / Math.PI; }
    function down(e) { drag = { a: ang(e), acc: 0 }; e.preventDefault(); }
    function move(e) { if (!drag) return; var a = ang(e), d = a - drag.a; if (d > 180) d -= 360; if (d < -180) d += 360; drag.a = a; drag.acc += d; while (drag.acc >= 24) { drag.acc -= 24; turn(1); } while (drag.acc <= -24) { drag.acc += 24; turn(-1); } }
    function up() { drag = null; }
    ring.addEventListener('mousedown', down); ring.addEventListener('touchstart', down, { passive: false });
    window.addEventListener('mousemove', move); window.addEventListener('touchmove', move, { passive: true });
    window.addEventListener('mouseup', up); window.addEventListener('touchend', up);
    render();
  }

  /* ---------- PRODUCT ---------- */
  function viewProduct(id) {
    var p = product(id); if (!p) return section('', '<h2>Onbekend product</h2><p>' + link('#/koffer', '', 'Terug naar de koffer') + '</p>');
    var f = bouwvorm(p.family);
    var schema = p.interface === 'Switch (230 V)' ? ['230 V', 'IntuSens Switch', 'verlichting aan/uit'] : p.interface === 'DALI-2 Broadcast' ? ['230 V', 'IntuSens Broadcast', 'DALI-bus', 'alle armaturen als één groep'] : ['DALI-2-bus', esc(p.kort) + ' (Input Device)', 'DALI-2-controller / LiveLink', 'groepen, scènes, koppelingen'];
    var schemaHtml = '<div class="schema">' + schema.map(function (s, i) { return (i ? '<span></span>' : '') + '<div' + (i === 1 ? ' class="hi"' : '') + '>' + s + '</div>'; }).join('') + '</div>';
    var uitv = '<div class="chips"><span class="chip">Kleur: ' + esc(p.colour || 'nog te verifiëren') + '</span><span class="chip">Optiek: ' + esc(p.optic || 'nog te verifiëren') + '</span><span class="chip">Interface: ' + esc(p.interface || 'nog te verifiëren') + '</span><span class="chip">Montage: ' + esc(p.mounting || 'nog te verifiëren') + '</span></div>';
    var tech = '<div class="tech">' + p.techniek.map(function (t) { return '<div><small>' + esc(t.label) + '</small>' + (t.waarde == null ? '<b class="na">nog te verifiëren' + (t.open ? ' · ' + esc(t.open) : '') + '</b>' : '<b>' + esc(t.waarde) + '</b>') + st(t.status, t.waarde == null ? '' : t.open) + (t.noot ? '<div class="small muted" style="margin-top:4px">' + esc(t.noot) + '</div>' : '') + '</div>'; }).join('') + '</div>';
    var art = '<div class="tbl-wrap"><table><thead><tr><th>Variant</th><th>Volledige omschrijving</th><th>TOC</th><th>TK</th><th>Kleur</th><th>Optiek</th><th>Interface</th></tr></thead><tbody><tr>' +
      '<td><b>' + esc(p.kort) + '</b><br><span class="small muted">' + esc(p.sub) + '</span></td>' +
      '<td>' + (p.designation ? '<span class="mono">' + esc(p.designation) + '</span><br>' + st(p.designation_status) + (p.designation_noot ? '<br><span class="small muted">' + esc(p.designation_noot) + '</span>' : '') : '<span class="na">typecode nog te bepalen</span>') + '</td>' +
      '<td>' + (p.toc ? '<span class="mono">' + esc(p.toc) + '</span><br>' + st(p.toc_status) : '<span class="na">TOC nog te verifiëren</span>') + '</td>' +
      '<td>' + (p.tk ? '<span class="mono">' + esc(p.tk) + '</span><br>' + st(p.tk_status) + (p.tk_noot ? '<br><span class="small muted">' + esc(p.tk_noot) + '</span>' : '') : (p.artikelnummer_label ? '<span class="na">TK nog te verifiëren</span><br><span class="small muted">op het typeplaatje: <span class="mono">' + esc(p.artikelnummer_label) + '</span> · ' + esc(p.artikelnummer_label_noot) + '</span>' : '<span class="na">TK nog te verifiëren</span>')) + '</td>' +
      '<td>' + esc(p.colour || '—') + '<br><span class="small muted">' + esc(p.colour_status) + '</span></td><td>' + esc(p.optic || '—') + '<br><span class="small muted">' + esc(p.optic_status) + '</span></td><td>' + esc(p.interface || '—') + '<br><span class="small muted">' + esc(p.interface_status) + '</span></td></tr></tbody></table></div>' +
      '<p class="small muted" style="margin-top:10px">TOC en TK zijn verschillende nummers en worden nooit gelijkgesteld. Zie OPEN-PUNTEN.md en DATA/producten.json voor de bronstatus.</p>' + (p.label_foto ? '<div class="label-proof"><img src="' + esc(p.label_foto) + '" alt="Typeplaatje ' + esc(p.kort) + '"><div><b>Typeplaatje</b><br><span class="small muted">Bewijsfoto van het typeplaatje op deze sensor (25-09-2026). Typecode, TOC en TK hierboven zijn hiervan afgelezen.</span></div></div>' : '<p class="small muted">Geen typeplaatje gefotografeerd; artikelgegevens daarom nog niet bevestigd.</p>');
    var src = '<ul class="src-list">' + p.source.map(function (s) { return '<li>' + esc(s.type) + (s.ref ? ' — ' + esc(s.ref) : '') + (s.url ? ' — ' + esc(s.url) : '') + (s.filename ? ' — ' + esc(s.filename) : '') + ' · ' + (s.verified ? 'geverifieerd' : 'niet geverifieerd') + (s.noot ? ' · ' + esc(s.noot) : '') + '</li>'; }).join('') + '</ul>';
    var nav = '<div class="btn-row" style="margin-top:22px">' + (p.id === 'K01' ? link('#/bediening/switch', 'btn', 'Bediening Switch') : p.id === 'K02' ? link('#/bediening/broadcast', 'btn', 'Bediening Broadcast') : '') + link('#/familie?bouwvorm=' + p.family, 'btn ghost', 'Bouwvorm ' + esc(f.naam.replace('IntuSens ', ''))) + link('#/koffer', 'btn ghost', 'Terug naar de koffer') + '</div>';
    return section('tight', '<div class="crumbs">' + link('#/koffer', '', 'De koffer') + ' › ' + link('#/familie?bouwvorm=' + p.family, '', esc(f.naam)) + '</div><div class="pd-hero"><div class="pd-img' + (isDark(p) ? ' dark' : '') + '">' + imgOrPh(p.beeld, p.kort, p.beeld_noot) + '</div><div class="pd-title"><div class="fam-name">' + esc(f.naam) + ' · ' + esc(p.sub) + (p.kofferrol === 'actief' ? ' · <span class="tag dark">werkend in de koffer</span>' : '') + '</div><h1>' + esc(p.kort) + '</h1><p class="sell">' + esc(p.verkoopzin) + '</p>' + nav + (p.beeld_noot ? '<p class="small muted" style="margin-top:14px">Beeld: ' + esc(p.beeld_noot) + '</p>' : '') + '</div></div>') +
      section('tight', '<div class="pd-sec"><h2>Waarvoor?</h2><ul class="plain lead-txt">' + p.waarvoor.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div>' +
        '<div class="pd-sec"><h2>Zo werkt hij</h2>' + schemaHtml + '</div>' +
        '<div class="pd-sec"><h2>Waar gebruik je hem?</h2><div class="chips">' + p.waar.map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join('') + '</div></div>' +
        '<div class="pd-sec"><h2>Uitvoeringen</h2>' + uitv + '</div>' +
        '<div class="pd-sec"><h2>Techniek</h2>' + tech + legend() + '</div>' +
        '<div class="pd-sec"><h2>Artikelgegevens</h2>' + art + '</div>' +
        '<div class="pd-sec"><h2>Bronnen</h2>' + src + '</div>');
  }

  /* ---------- SNELSTART ---------- */
  function viewSnelstart() {
    var steps = '<div class="qs">' + K.snelstart.map(function (s) { return '<div><i>' + s.n + '</i><b>' + esc(s.titel) + '</b><p>' + esc(s.tekst) + '</p></div>'; }).join('') + '</div>';
    var noten = '<div class="note"><b>Goed om te weten:</b><ul style="margin:6px 0 0;padding-left:18px">' + K.snelstart_noten.map(function (n) { return '<li>' + esc(n.tekst) + ' ' + st(n.status, n.open) + '</li>'; }).join('') + '</ul></div>';
    var nn = '<div class="grid g3">' + K.niet_nodig.map(function (n) { var a = acc(n.ref); return '<div class="card"><div class="card-body"><span class="tag grey">niet nodig</span><b>' + esc(n.naam) + '</b><span class="sub">' + esc(a ? a.functie : '') + '</span></div></div>'; }).join('') + '</div><p class="muted" style="margin-top:14px">' + esc(K.uitbreiding_later) + '</p>';
    var back = '<div class="back-labels"><div class="koffer-stage" style="aspect-ratio:16/9;background:#222">' + (K.foto_achter ? '<img src="' + esc(K.foto_achter) + '" alt="' + esc(K.foto_achter_alt) + '" style="object-fit:cover">' : '<div class="ph"><b>Foto achterzijde volgt</b><span>Plaats de foto in</span><span class="mono">assets/original/koffer-achter.jpg</span><span>en vul <span class="mono">foto_achter</span> in data/koffer.json</span></div>') + '</div>' +
      '<div><h3 style="margin-bottom:12px">Van links naar rechts</h3><ol>' + K.achterzijde_labels.map(function (l) { var a = acc(l.ref); return '<li><b>' + esc(l.label) + '</b><br><span class="muted small">' + esc(a ? a.functie : '') + ' · ' + esc(l.positie) + '</span></li>'; }).join('') + '</ol>' + (K.foto_hoesje ? '<div class="card" style="margin-top:16px"><div class="card-img wide" style="padding:0"><img src="' + esc(K.foto_hoesje) + '" alt="Hoesje met de netkabel" style="object-fit:cover;mix-blend-mode:normal"></div><div class="card-body"><b>Stap 2: netsnoer uit het hoesje</b><span class="sub">Het hoesje met het 230 V-snoer zit in de koffer.</span></div></div>' : '') + '</div></div>';
    return section('tight', '<div class="head"><div class="eyebrow">Snelstart</div><h2>Demokoffer in 30 seconden</h2><p class="lead">Open dit scherm vlak voor de afspraak.</p></div>' + steps + noten + '<div class="btn-row" style="margin-top:20px">' + link('#/demo', 'btn', 'Start klantdemo') + link('#/bediening/switch', 'btn ghost', 'Bediening Switch') + link('#/bediening/broadcast', 'btn ghost', 'Bediening Broadcast') + '</div>') +
      section('grey', '<div class="head"><div class="eyebrow">Niet nodig voor de basisdemo</div><h2>Laat deze onderdelen in de koffer</h2></div>' + nn) +
      section('', '<div class="head"><div class="eyebrow">Wat zit waar?</div><h2>Achterzijde van de koffer</h2></div>' + back);
  }

  /* ---------- STATUS ---------- */
  function viewStatus() {
    var c = { bevestigd: 0, onzeker: 0, 'te-verifieren': 0 };
    function count(o) { if (!o || typeof o !== 'object') return; if (Array.isArray(o)) { o.forEach(count); return; } if (o.status && c.hasOwnProperty(o.status)) c[o.status]++; if (o.toc_status && c.hasOwnProperty(o.toc_status)) c[o.toc_status]++; if (o.tk_status && c.hasOwnProperty(o.tk_status)) c[o.tk_status]++; if (o.designation_status && c.hasOwnProperty(o.designation_status)) c[o.designation_status]++; Object.keys(o).forEach(function (k) { if (typeof o[k] === 'object') count(o[k]); }); }
    count(P.bouwvormen); count(P.producten); count(P.familie); count(P.regelvarianten);
    var rows = P.producten.map(function (p) { return '<tr><td>' + esc(p.id) + '</td><td>' + esc(p.kort) + ' · ' + esc(p.sub) + '</td><td class="mono">' + (p.designation ? esc(p.designation) : '<span class="na">onbekend</span>') + '</td><td>' + st(p.designation_status) + '</td><td class="mono">' + (p.toc ? esc(p.toc) : '<span class="na">—</span>') + '</td><td>' + st(p.toc_status) + '</td><td>' + (p.tk ? esc(p.tk) : '<span class="na">TK nog te verifiëren</span>') + '</td></tr>'; }).join('');
    return section('tight', '<div class="head"><div class="eyebrow">Bronstatus</div><h2>Wat is bevestigd, wat niet?</h2><p class="lead">Deze app toont geen technische gegevens als feit zonder officiële bron. Alles wat nog open staat, staat in OPEN-PUNTEN.md en VERIFICATIERAPPORT.md in de projectmap.</p></div>' +
      '<div class="status-list"><div>' + st('bevestigd') + '<br><b style="font-size:28px">' + c.bevestigd + '</b> velden</div><div>' + st('onzeker') + '<br><b style="font-size:28px">' + c.onzeker + '</b> velden</div><div>' + st('te-verifieren') + '<br><b style="font-size:28px">' + c['te-verifieren'] + '</b> velden</div><div><span class="st">gebouwd</span><br><b style="font-size:28px">' + esc(D._gebouwd) + '</b></div></div>' +
      '<div class="note warn"><b>Vóór extern gebruik:</b> kofferfoto\'s aanleveren (OP-10), typeplaatjes fotograferen, TOC en TK per artikel in SAP/trilux.com controleren (OP-02 t/m OP-06), bedieningshandleiding van Switch en Broadcast inzien (OP-15 t/m OP-17).</div>') +
      section('grey', '<div class="head"><div class="eyebrow">Artikelen in de koffer</div><h2>TOC en TK per onderdeel</h2></div><div class="tbl-wrap"><table><thead><tr><th>ID</th><th>Onderdeel</th><th>Typecode</th><th>Status</th><th>TOC</th><th>Status</th><th>TK</th></tr></thead><tbody>' + rows + '</tbody></table></div>' + legend() +
        '<h3 style="margin:32px 0 12px">Bronnen</h3><ul class="src-list" style="font-size:14px"><li><b>A08</b> — trilux.com IntuSens-productpagina en productcategorie (alleen via zoekfragmenten; site vanuit de bouwomgeving niet bereikbaar).</li><li><b>A12</b> — trilux.com lichtpraktijk DALI (algemene DALI-grenzen; zoekfragmenten).</li><li><b>B03</b> — TRILUX IntuSens Customer Presentation 18-05-2026, via de bronaudit in de presentatie-repo; document zelf in deze sessie niet ingezien.</li><li><b>opgave</b> — projectbrief van 25-09-2026 (typecodes, TOC\'s, kofferinhoud) zonder bijgevoegde bron.</li><li>Volledige lijst: SOURCES.md.</li></ul>');
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
    if (s.live) { var p = product(s.live === 'switch' ? 'K01' : 'K02'); vis = (s.foto ? '<img src="' + esc(s.foto) + '" alt="' + esc(s.titel) + '" style="width:110px;height:110px;object-fit:cover;border-radius:50%;margin:0 auto 10px;display:block">' : '') + '<div class="sensor" id="sensor" style="max-width:360px">' + sensorSVG(p.colour === 'zwart') + '</div><div class="demo-live"><button class="btn sm" id="sim-press">Druk</button><button class="btn ghost sm" id="sim-min">Draai −</button><button class="btn ghost sm" id="sim-plus">Draai +</button></div><div class="sim-state" id="sim-state" style="margin-top:10px"></div>'; }
    else if (s.familie) vis = '<div class="demo-vis fam">' + P.bouwvormen.map(function (f) { return '<div>' + imgOrPh(f.beelden[0], f.naam, f.beeld_bron) + '</div>'; }).join('') + '<div>' + imgOrPh('assets/processed/is-hbc.jpg', 'High Bay Corridor') + '</div></div>';
    else if (s.koffer) vis = '<div class="demo-vis koffer">' + (K.foto_boven ? '<img src="' + esc(K.foto_boven) + '" alt="' + esc(K.foto_boven_alt) + '" style="object-fit:cover;mix-blend-mode:normal">' : '<div class="ph"><b>Kofferfoto volgt</b><span>Wijs in de fysieke koffer aan wat werkt en wat toonmodel is.</span></div>') + '</div>';
    else vis = '<div class="demo-vis' + (isDarkSrc(s.beeld) ? ' dark' : '') + '">' + imgOrPh(s.beeld, s.titel) + '</div>';
    return '<div class="demo-top"><a href="#/" class="btn ghost sm" id="demo-exit">Stop demo</a><div class="prog"><i style="width:' + ((demoIdx + 1) / n * 100) + '%"></i></div><span class="n">' + (demoIdx + 1) + ' / ' + n + '</span><button class="btn ghost sm" id="demo-fs" title="Volledig scherm">⛶</button></div>' +
      '<div class="demo-body"><div class="demo-in fade"><div><div class="eyebrow">Klantdemo · ' + (demoIdx + 1) + '</div><h1>' + esc(s.titel) + '</h1><p class="msg">' + esc(s.boodschap) + '</p><ul>' + s.punten.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul></div><div>' + vis + '</div></div></div>' +
      '<div class="demo-bottom"><details><summary>Wat zeg ik?</summary><p>' + esc(s.zeg) + '</p></details><div class="navb"><button class="btn ghost" id="demo-prev"' + (demoIdx === 0 ? ' disabled' : '') + '>‹ Vorige</button><button class="btn" id="demo-next">' + (demoIdx === n - 1 ? 'Afsluiten' : 'Volgende ›') + '</button></div></div>';
  }
  function bindDemo() {
    var root = document.getElementById('demo'); if (!root) return;
    function go(d) { var n = DEMO.schermen.length; if (demoIdx + d >= n) { location.hash = '#/'; return; } demoIdx = Math.max(0, Math.min(n - 1, demoIdx + d)); history.replaceState(null, '', '#/demo?s=' + (demoIdx + 1)); root.innerHTML = demoScreen(); bind(); }
    function bind() {
      document.getElementById('demo-prev').addEventListener('click', function () { go(-1); });
      document.getElementById('demo-next').addEventListener('click', function () { go(1); });
      document.getElementById('demo-fs').addEventListener('click', toggleFullscreen);
      if (document.getElementById('sensor')) bindSim();
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
    else if (route === 'status') html = viewStatus();
    else if (route === 'demo') html = viewDemo(q);
    else html = section('', '<h2>Pagina niet gevonden</h2><p>' + link('#/', '', 'Naar het startscherm') + '</p>');
    main.innerHTML = html;
    renderNav(route);
    if (route !== 'demo') window.scrollTo(0, 0);
    document.title = (route ? route.split('/')[0].charAt(0).toUpperCase() + route.split('/')[0].slice(1) + ' · ' : '') + 'IntuSens demokoffer · TRILUX';
  }
  window.addEventListener('hashchange', render);
  window.addEventListener('keydown', function (e) { if ((e.key === 'f' || e.key === 'F') && !e.ctrlKey && !e.metaKey && !/input|textarea|select/i.test(document.activeElement.tagName)) toggleFullscreen(); });
  render();
})();
