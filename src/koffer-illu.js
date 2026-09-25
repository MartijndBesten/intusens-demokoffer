/* TRILUX IntuSens Demokoffer — gestileerde koffer-illustratie (vector, geen foto).
   Geometrie nagetekend uit de kofferfoto's van 25-09-2026:
   - deksel:     assets/original/koffer-open-deksel-toonmodellen.jpeg      (uitsnede 160,130 – 1440,1020)
   - onderzijde: assets/original/koffer-open-onderzijde-werkende-sensoren.jpeg (uitsnede 140,190 – 1420,1090)
   Alle maten hieronder zijn uitsnede-pixels × 0,5625 (1280 px → 720 eenheden). Onderlinge posities zijn dus die van de echte koffer.
   Gebruik: KofferIllu.html({labels:true}) → HTML-string; KofferIllu.bind(rootEl, {onOpen(ref), info(ref)}). */
(function () {
  'use strict';
  var W = 720, H = 506;
  var C = {
    shell: '#171717', shellEdge: '#2e2e2e', tray: '#0c0c0c', trayEdge: '#242424',
    wFill: '#f4f4f2', wEdge: '#d6d6d1', wDet: '#c3c3be',
    gFill: '#aeb2b5', gEdge: '#92969a', gDet: '#7d8185',
    kFill: '#222222', kEdge: '#3b3b3b', kDet: '#555555',
    glass: '#2b3034', glassDet: '#6e767d', accent: '#4097DB'
  };
  function f(n) { return Math.round(n * 10) / 10; }
  function circle(cx, cy, r, fill, stroke, sw, extra) { return '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r) + '" fill="' + fill + '"' + (stroke ? ' stroke="' + stroke + '" stroke-width="' + (sw || 1) + '"' : '') + (extra || '') + '/>'; }
  function rect(x, y, w, h, rx, fill, stroke, sw, extra) { return '<rect x="' + f(x) + '" y="' + f(y) + '" width="' + f(w) + '" height="' + f(h) + '" rx="' + rx + '" fill="' + fill + '"' + (stroke ? ' stroke="' + stroke + '" stroke-width="' + (sw || 1) + '"' : '') + (extra || '') + '/>'; }
  function facets(cx, cy, r, n, color, sw, rot) {
    var s = '';
    for (var i = 0; i < n; i++) { var a = (rot || -90) * Math.PI / 180 + i * 2 * Math.PI / n; s += '<line x1="' + f(cx) + '" y1="' + f(cy) + '" x2="' + f(cx + r * Math.cos(a)) + '" y2="' + f(cy + r * Math.sin(a)) + '" stroke="' + color + '" stroke-width="' + (sw || 1) + '"/>'; }
    return s;
  }
  function ticks(cx, cy, r1, r2, n, color, sw) {
    var s = '';
    for (var i = 0; i < n; i++) { var a = i * 2 * Math.PI / n; s += '<line x1="' + f(cx + r1 * Math.cos(a)) + '" y1="' + f(cy + r1 * Math.sin(a)) + '" x2="' + f(cx + r2 * Math.cos(a)) + '" y2="' + f(cy + r2 * Math.sin(a)) + '" stroke="' + color + '" stroke-width="' + sw + '" stroke-linecap="round"/>'; }
    return s;
  }
  function pirFlower(cx, cy, r, fill, det) { // kleine PIR-lens (MiniS / Rail)
    var s = circle(cx, cy, r, fill, det, 1);
    for (var i = 0; i < 4; i++) { var a = i * Math.PI / 2 + Math.PI / 4; s += circle(cx + r * 0.38 * Math.cos(a), cy + r * 0.38 * Math.sin(a), r * 0.36, 'none', det, 0.8); }
    return s;
  }
  function sun(cx, cy, r, color) {
    var s = circle(cx, cy, r * 0.42, 'none', color, 1);
    for (var i = 0; i < 8; i++) { var a = i * Math.PI / 4; s += '<line x1="' + f(cx + r * 0.62 * Math.cos(a)) + '" y1="' + f(cy + r * 0.62 * Math.sin(a)) + '" x2="' + f(cx + r * Math.cos(a)) + '" y2="' + f(cy + r * Math.sin(a)) + '" stroke="' + color + '" stroke-width="1" stroke-linecap="round"/>'; }
    return s;
  }
  function clock(cx, cy, r, color) {
    return circle(cx, cy, r, 'none', color, 1) + '<path d="M' + f(cx) + ' ' + f(cy - r * 0.6) + ' V' + f(cy) + ' H' + f(cx + r * 0.5) + '" fill="none" stroke="' + color + '" stroke-width="1" stroke-linecap="round"/>';
  }

  /* ---- onderdelen: elk levert {body, halo, lx, ly} ---- */
  function miniR(cx, cy, variant) {
    var r = 40, s;
    if (variant === 'wit') {
      s = circle(cx, cy, r, C.wFill, C.wEdge, 1.2) + circle(cx, cy, r * 0.8, '#fbfbfa', C.wDet, 1) + circle(cx, cy, r * 0.52, 'none', C.wDet, 0.8) + facets(cx, cy, r * 0.8, 7, C.wDet, 0.8);
    } else if (variant === 'zwart') {
      s = circle(cx, cy, r, C.kFill, C.kEdge, 1.2) + circle(cx, cy, r * 0.78, '#141414', '#474747', 1) + facets(cx, cy, r * 0.78, 7, '#5a5a5a', 1) +
        '<path d="M' + f(cx - r * 0.5) + ' ' + f(cy - r * 0.35) + ' A ' + f(r * 0.62) + ' ' + f(r * 0.62) + ' 0 0 1 ' + f(cx + r * 0.25) + ' ' + f(cy - r * 0.6) + '" fill="none" stroke="#8a8a8a" stroke-width="1.4" stroke-linecap="round" opacity=".7"/>';
    } else { // zwart met heldere lens
      s = circle(cx, cy, r + 2, C.kFill, C.kEdge, 1.2) + circle(cx, cy, r * 0.8, '#9ea4a8', '#c9cdd0', 1) + circle(cx, cy, r * 0.62, 'none', '#dfe2e4', 0.9) + facets(cx, cy, r * 0.8, 7, '#e7e9ea', 0.9) + circle(cx, cy, r * 0.3, '#b9bec1', 'none');
    }
    return { body: s, halo: circle(cx, cy, r + 7, 'none', C.accent, 2), lx: cx, ly: cy + r + 15 };
  }
  function zhaga(cx, cy, variant) {
    var r = 44, s = circle(cx, cy, r, '#1a1c1e', '#3d4145', 1.4);
    if (variant === 'facet') {
      s += circle(cx, cy, r * 0.84, '#40464b', '#8a9196', 1) + circle(cx, cy, r * 0.84, 'none', '#aab0b4', 0.6, ' stroke-dasharray="2 3"') + circle(cx, cy, r * 0.6, 'none', '#9aa1a6', 0.8) + facets(cx, cy, r * 0.84, 7, '#c3c8cb', 0.9, -70);
    } else {
      s += circle(cx, cy, r * 0.84, '#262a2d', '#565c61', 1) +
        '<path d="M' + f(cx - r * 0.62) + ' ' + f(cy - r * 0.1) + ' A ' + f(r * 0.66) + ' ' + f(r * 0.66) + ' 0 0 1 ' + f(cx + r * 0.2) + ' ' + f(cy - r * 0.62) + '" fill="none" stroke="#9aa1a6" stroke-width="1.6" stroke-linecap="round" opacity=".75"/>' +
        '<path d="M' + f(cx + r * 0.35) + ' ' + f(cy + r * 0.55) + ' A ' + f(r * 0.7) + ' ' + f(r * 0.7) + ' 0 0 0 ' + f(cx + r * 0.66) + ' ' + f(cy + r * 0.1) + '" fill="none" stroke="#6e767d" stroke-width="1.2" stroke-linecap="round" opacity=".6"/>';
    }
    return { body: s, halo: circle(cx, cy, r + 7, 'none', C.accent, 2), lx: cx, ly: cy + r + 15 };
  }
  function miniS(cx, cy, variant) {
    var w = 107, h = 42, x = cx - w / 2, y = cy - h / 2, fill, edge, det, dotFill, s;
    if (variant === 'wit') { fill = C.wFill; edge = C.wEdge; det = '#bdbdb8'; dotFill = '#4b4b4b'; }
    else if (variant === 'grijs') { fill = C.gFill; edge = C.gEdge; det = '#83878b'; dotFill = '#3f4245'; }
    else { fill = '#2a2926'; edge = '#454440'; det = '#6d6b66'; dotFill = '#8b8983'; }
    s = rect(x, y, w, h, 4, fill, edge, 1.2) + rect(x + 4, y + 4, w - 8, h - 8, 3, 'none', det, 0.7);
    var dotsLeft = variant !== 'grijs';
    var dx = dotsLeft ? x + 12 : x + w - 12;
    for (var i = -1; i <= 1; i++) s += circle(dx, cy + i * 10, 3, dotFill, 'none');
    var smallX = dotsLeft ? x + 30 : x + w - 32, lensX = dotsLeft ? x + w * 0.62 : x + w * 0.4;
    s += circle(smallX, cy, 5, variant === 'zwart' ? '#5b5a55' : '#3c3c3c', 'none');
    s += variant === 'zwart' ? circle(x + w * 0.78, cy, 10, '#3a3a38', '#7a7872', 1) + circle(x + w * 0.78, cy, 5, '#56544f', 'none') : pirFlower(lensX, cy, 10, variant === 'wit' ? '#fafaf8' : '#c9ccce', det);
    return { body: s, halo: rect(x - 6, y - 6, w + 12, h + 12, 8, 'none', C.accent, 2), lx: cx, ly: cy + h / 2 + 15 };
  }
  function rail(cx, cy, variant) {
    var w = 340, h = variant === 'wit' ? 38 : 35, x = cx - w / 2, y = cy - h / 2;
    var fill = variant === 'wit' ? '#efece3' : '#1f1f1f', edge = variant === 'wit' ? '#d3cfc3' : '#3a3a3a', det = variant === 'wit' ? '#bab5a7' : '#555';
    var s = rect(x, y, w, h, 3, fill, edge, 1.2);
    s += '<path d="M' + f(x + 5) + ' ' + f(cy - 6) + ' L' + f(x + 13) + ' ' + f(cy) + ' L' + f(x + 5) + ' ' + f(cy + 6) + ' Z" fill="' + det + '"/>';
    s += '<path d="M' + f(x + w - 5) + ' ' + f(cy - 6) + ' L' + f(x + w - 13) + ' ' + f(cy) + ' L' + f(x + w - 5) + ' ' + f(cy + 6) + ' Z" fill="' + det + '"/>';
    s += '<line x1="' + f(x + w * 0.38) + '" y1="' + f(y + 3) + '" x2="' + f(x + w * 0.38) + '" y2="' + f(y + h - 3) + '" stroke="' + det + '" stroke-width=".8"/>';
    s += circle(393, cy, 6, variant === 'wit' ? '#4a4a4a' : '#101010', det, 1);
    s += variant === 'wit' ? pirFlower(458, cy, 10, '#f7f5ef', det) : circle(453, cy, 10, '#2c2c2c', '#6a6a6a', 1) + circle(453, cy, 5, '#3c3c3c', 'none');
    return { body: s, halo: rect(x - 6, y - 6, w + 12, h + 12, 7, 'none', C.accent, 2), lx: x + w + 0, ly: cy };
  }
  function plug(cx, cy) {
    var w = 40, h = 162, x = cx - w / 2, y = cy - h / 2;
    var s = rect(x, y, w, h * 0.72, 4, '#1d1d1d', '#3a3a3a', 1.2);
    s += rect(x + w * 0.52, y + 4, w * 0.4, h * 0.14, 2, '#2c2c2c', '#454545', 0.8);
    for (var i = 0; i < 5; i++) s += '<line x1="' + f(x + 6) + '" y1="' + f(y + 30 + i * 13) + '" x2="' + f(x + w - 6) + '" y2="' + f(y + 30 + i * 13) + '" stroke="#333" stroke-width="1"/>';
    for (var j = 0; j < 3; j++) s += rect(x + 5 + j * 11, y + h * 0.72, 8, h * 0.28, 2, '#2a2a2a', '#474747', 0.8);
    return { body: s, halo: rect(x - 6, y - 6, w + 12, h + 12, 8, 'none', C.accent, 2), lx: cx, ly: y + h + 13 };
  }
  function switchSensor(cx, cy) {
    var s = circle(cx, cy + 3, 100, 'rgba(0,0,0,.07)', 'none') + '<circle cx="' + cx + '" cy="' + cy + '" r="98" fill="url(#swBody)" stroke="#cfcfca" stroke-width="1.3"/>' + circle(cx, cy, 91, 'none', '#e4e4e0', 1) + circle(cx, cy, 64, '#f7f7f5', '#d9d9d4', 1.1) +
      circle(cx, cy, 28, '#ececE9', '#c9c9c4', 1) + circle(cx, cy, 19, 'none', '#d0d0cb', 0.8) + facets(cx, cy, 28, 16, '#d3d3ce', 0.6) +
      '<text x="' + cx + '" y="' + f(cy - 45) + '" font-size="6.5" letter-spacing="1.6" text-anchor="middle" fill="#c2c2bd" font-family="Segoe UI, Arial, sans-serif" font-weight="700">TRILUX</text>' +
      sun(cx, cy + 53, 5.5, '#a6a6a1') + clock(cx, cy + 68, 5, '#a6a6a1');
    return { body: s, halo: circle(cx, cy, 106, 'none', C.accent, 2), lx: cx, ly: cy + 120 };
  }
  function broadcastSensor(cx, cy) {
    var s = circle(cx, cy, 107, '#151515', '#2c2c2c', 1.2) + ticks(cx, cy, 88, 104, 132, '#2f2f2f', 1.6) + circle(cx, cy, 86, '#1e1e1e', '#333', 1) +
      '<circle cx="' + cx + '" cy="' + cy + '" r="72" fill="url(#bcBody)"/>' +
      circle(cx, cy, 25, '#3a3a3a', '#4f4f4f', 1) + circle(cx, cy, 17, 'none', '#5a5a5a', 0.8) + facets(cx, cy, 25, 16, '#555', 0.6) +
      '<text x="' + cx + '" y="' + f(cy - 44) + '" font-size="6.5" letter-spacing="1.6" text-anchor="middle" fill="#5c5c5c" font-family="Segoe UI, Arial, sans-serif" font-weight="700">TRILUX</text>' +
      circle(cx, cy - 60, 2, '#444', 'none') +
      sun(cx, cy + 45, 5.5, '#8c8c8c') + clock(cx, cy + 60, 5, '#8c8c8c');
    return { body: s, halo: circle(cx, cy, 115, 'none', C.accent, 2), lx: cx, ly: cy + 128 };
  }

  var PARTS = {
    deksel: [
      ['K08', 'MiniR · HB 01', function () { return miniR(228, 104, 'wit'); }],
      ['K09', 'MiniR · HB 05 NO L', function () { return miniR(374, 106, 'zwart'); }],
      ['K10', 'MiniR · HB 05', function () { return miniR(515, 110, 'helder'); }],
      ['K11', 'Zhaga · HB', function () { return zhaga(160, 215, 'facet'); }],
      ['K12', 'Zhaga · HB Corr', function () { return zhaga(160, 361, 'dome'); }],
      ['K05', 'MiniS · wit', function () { return miniS(278, 204, 'wit'); }],
      ['K06', 'MiniS · grijs', function () { return miniS(425, 206, 'grijs'); }],
      ['K07', 'MiniS · zwart', function () { return miniS(569, 209, 'zwart'); }],
      ['K03', 'Rail · wit', function () { return rail(428, 296, 'wit'); }],
      ['K04', 'Rail · zwart', function () { return rail(428, 361, 'zwart'); }],
      ['A03', 'Stekker', function () { return plug(73, 152); }],
      ['A03', 'Stekker', function () { return plug(667, 155); }]
    ],
    onderzijde: [
      ['K01', 'Switch', function () { return switchSensor(197, 232); }],
      ['K02', 'DALI-2 Broadcast', function () { return broadcastSensor(520, 235); }]
    ]
  };

  function shell(inner) {
    return rect(4, 4, W - 8, H - 8, 44, C.shell, C.shellEdge, 1.5) + rect(14, 14, W - 28, H - 28, 36, 'none', '#222', 1) + inner;
  }
  function panel(which, opts) {
    var defs = '<defs><radialGradient id="bcBody" cx="45%" cy="38%" r="70%"><stop offset="0" stop-color="#2d2d2d"/><stop offset="1" stop-color="#1c1c1c"/></radialGradient><radialGradient id="swBody" cx="42%" cy="36%" r="72%"><stop offset="0" stop-color="#ffffff"/><stop offset=".75" stop-color="#f3f3f1"/><stop offset="1" stop-color="#e6e6e2"/></radialGradient></defs>';
    var bg;
    if (which === 'deksel') {
      bg = shell(rect(28, 28, W - 56, H - 56, 26, C.tray, C.trayEdge, 1) +
        '<text x="366" y="446" font-size="34" font-weight="700" letter-spacing="2" text-anchor="middle" fill="#f2f2f2" font-family="Segoe UI, Helvetica Neue, Arial, sans-serif">INTUSENS</text>');
    } else {
      bg = shell('<clipPath id="trayClip"><rect x="28" y="28" width="' + (W - 56) + '" height="' + (H - 56) + '" rx="26"/></clipPath>' +
        '<g clip-path="url(#trayClip)"><rect x="28" y="28" width="338" height="' + (H - 56) + '" fill="#eeeeec"/><rect x="366" y="28" width="' + (W - 28 - 366) + '" height="' + (H - 56) + '" fill="#1b1b1b"/></g>' +
        rect(28, 28, W - 56, H - 56, 26, 'none', C.trayEdge, 1) +
        '<text x="208" y="406" font-size="17" font-weight="700" letter-spacing="1" text-anchor="middle" fill="#3a3a3a" font-family="Segoe UI, Helvetica Neue, Arial, sans-serif">INTUSENS</text>' +
        '<text x="208" y="421" font-size="8" text-anchor="middle" fill="#6d6d6d" font-family="Segoe UI, Arial, sans-serif">Switch</text>' +
        '<text x="523" y="406" font-size="17" font-weight="700" letter-spacing="1" text-anchor="middle" fill="#f0f0f0" font-family="Segoe UI, Helvetica Neue, Arial, sans-serif">INTUSENS</text>' +
        '<text x="523" y="421" font-size="8" text-anchor="middle" fill="#a8a8a8" font-family="Segoe UI, Arial, sans-serif">DALI-2 Broadcast</text>');
    }
    var parts = PARTS[which].map(function (p, i) {
      var g = p[2](), ref = p[0], lab = p[1];
      var info = opts.info ? opts.info(ref) : null;
      var aria = (info && info.label ? info.label : lab);
      var lblFill = which === 'onderzijde' ? (ref === 'K01' ? '#555' : '#bbb') : '#c9c9c9';
      var isRail = ref === 'K03' || ref === 'K04';
      var lbl = '<text class="lbl" x="' + f(isRail ? g.lx + 10 : g.lx) + '" y="' + f(isRail ? g.ly + 3.5 : g.ly) + '" text-anchor="' + (isRail ? 'start' : 'middle') + '" fill="' + lblFill + '">' + lab + '</text>';
      return '<g class="kc" tabindex="0" role="link" data-ref="' + ref + '" data-i="' + i + '" aria-label="' + aria.replace(/"/g, '&quot;') + '"><g class="halo">' + g.halo + '</g><g class="body">' + g.body + '</g>' + lbl + '</g>';
    }).join('');
    return '<svg class="illu-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + (which === 'deksel' ? 'Deksel van de demokoffer met de toonmodellen' : 'Onderzijde van de demokoffer met de twee werkende sensoren') + '">' + defs + bg + parts + '</svg>';
  }

  function html(opts) {
    opts = opts || {};
    return '<div class="illu' + (opts.labels ? ' labels' : '') + (opts.compact ? ' compact' : '') + '">' +
      '<figure class="illu-panel"><figcaption><b>Deksel</b><span>de toonmodellen</span></figcaption>' + panel('deksel', opts) + '</figure>' +
      '<figure class="illu-panel"><figcaption><b>Onderzijde</b><span>de twee werkende sensoren</span></figcaption>' + panel('onderzijde', opts) + '</figure>' +
      '<div class="illu-tip" role="status" aria-live="polite"></div></div>';
  }

  function bind(root, ctx) {
    if (!root) return;
    var tip = root.querySelector('.illu-tip');
    function show(g) {
      var ref = g.getAttribute('data-ref'), info = ctx.info ? ctx.info(ref) : { label: ref };
      root.classList.add('hovering'); g.classList.add('on');
      tip.innerHTML = '<b>' + info.label + '</b>' + (info.sub ? '<span>' + info.sub + '</span>' : '') + (info.cta ? '<em>' + info.cta + ' →</em>' : '');
      var r = g.getBoundingClientRect(), rr = root.getBoundingClientRect();
      var x = r.left + r.width / 2 - rr.left, y = r.bottom - rr.top + 8;
      tip.style.left = Math.max(90, Math.min(rr.width - 90, x)) + 'px'; tip.style.top = y + 'px'; tip.classList.add('on');
    }
    function hide(g) { root.classList.remove('hovering'); if (g) g.classList.remove('on'); tip.classList.remove('on'); }
    root.querySelectorAll('.kc').forEach(function (g) {
      g.addEventListener('mouseenter', function () { show(g); });
      g.addEventListener('mouseleave', function () { hide(g); });
      g.addEventListener('focus', function () { show(g); });
      g.addEventListener('blur', function () { hide(g); });
      g.addEventListener('click', function () { if (ctx.onOpen) ctx.onOpen(g.getAttribute('data-ref')); });
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (ctx.onOpen) ctx.onOpen(g.getAttribute('data-ref')); } });
    });
  }

  window.KofferIllu = { html: html, bind: bind };
})();
