/* TRILUX IntuSens Demokoffer — gestileerde koffer-illustratie (vector, geen foto).
   Geometrie nagetekend uit de kofferfoto's van 25-09-2026:
   - deksel:     assets/original/koffer-open-deksel-toonmodellen.jpeg      (uitsnede 160,130 – 1440,1020)
   - onderzijde: assets/original/koffer-open-onderzijde-werkende-sensoren.jpeg (uitsnede 140,190 – 1420,1090)
   Alle maten hieronder zijn uitsnede-pixels × 0,5625 (1280 px → 720 eenheden). Onderlinge posities zijn dus die van de echte koffer.
   Gebruik: KofferIllu.html({labels:true}) → HTML-string; KofferIllu.bind(rootEl, {onOpen(ref), info(ref)}). */
(function () {
  'use strict';
  function T(x) { return window.INTUSENS_T ? window.INTUSENS_T(x) : x; }
  var W = 720, H = 506;
  var C = {
    shell: '#171717', shellEdge: '#2e2e2e', tray: '#0c0c0c', trayEdge: '#242424',
    wFill: '#f4f4f2', wEdge: '#d6d6d1', wDet: '#c3c3be',
    gFill: '#aeb2b5', gEdge: '#92969a', gDet: '#7d8185',
    kFill: '#262626', kEdge: '#4b4b4b', kDet: '#5c5c5c',
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
    var r = 44, s = circle(cx, cy, r, '#1c1e20', '#52575c', 1.5);
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
    else { fill = '#2d2c29'; edge = '#5c5a54'; det = '#74726c'; dotFill = '#8b8983'; }
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
    var fill = variant === 'wit' ? '#efece3' : '#232323', edge = variant === 'wit' ? '#d3cfc3' : '#4c4c4c', det = variant === 'wit' ? '#bab5a7' : '#555';
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
    var s = rect(x, y, w, h * 0.72, 4, '#212121', '#4c4c4c', 1.2);
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
    var s = circle(cx, cy, 107, '#141414', '#454545', 1.4) + ticks(cx, cy, 88, 104, 132, '#393939', 1.6) + circle(cx, cy, 86, '#1e1e1e', '#333', 1) +
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

  var HX = 26; // extra hoogte onder de koffer voor handgreep/scharnieren
  function corner(tx, ty, sx, sy) { // rubberen hoekbeschermer
    return '<path transform="translate(' + tx + ' ' + ty + ') scale(' + sx + ' ' + sy + ')" d="M0 62 V44 A44 44 0 0 1 44 0 H62 V12 H46 A34 34 0 0 0 12 46 V62 Z" fill="#2a2a2a" stroke="#5a5a5a" stroke-width="1.2"/>';
  }
  function plate(x, y, w, h, screws) {
    var s = rect(x, y, w, h, 3, '#2c2c2c', '#5e5e5e', 1.2) + rect(x + 2, y + 2, w - 4, h - 4, 2, 'none', 'rgba(255,255,255,.06)', 1);
    for (var i = 0; i < screws; i++) s += circle(x + w * (i + 1) / (screws + 1), y + h / 2, 1.8, '#111', '#6a6a6a', 0.6);
    return s;
  }
  function shell(inner, which) {
    var s = '';
    // kofferkuip: sterkere contour, lichte verloop, bovenrand-highlight
    s += rect(4, 4, W - 8, H - 8, 44, 'url(#caseGrad)', '#5a5a5a', 2);
    s += rect(7, 7, W - 14, H - 14, 41, 'none', 'rgba(255,255,255,.08)', 1.2);
    // wand tussen rand en binnenplaat
    s += rect(15, 15, W - 30, H - 30, 34, '#1c1c1c', '#070707', 1.6);
    s += inner;
    // hoekbeschermers
    s += corner(4, 4, 1, 1) + corner(W - 4, 4, -1, 1) + corner(4, H - 4, 1, -1) + corner(W - 4, H - 4, -1, -1);
    if (which === 'deksel') {
      // sluitingen boven, scharnieren onder
      s += plate(150, -1, 52, 14, 2) + plate(W - 202, -1, 52, 14, 2);
      s += plate(170, H - 10, 84, 18, 3) + plate(W - 254, H - 10, 84, 18, 3);
    } else {
      // scharnieren boven, sluitingen + handgreep onder
      s += plate(170, -8, 84, 18, 3) + plate(W - 254, -8, 84, 18, 3);
      s += plate(130, H - 9, 52, 16, 2) + plate(W - 182, H - 9, 52, 16, 2);
      s += '<path d="M' + (W / 2 - 92) + ' ' + (H - 6) + ' h184 v10 q0 14 -14 14 h-156 q-14 0 -14 -14 Z" fill="#232323" stroke="#5e5e5e" stroke-width="1.4"/>' +
           rect(W / 2 - 70, H + 2, 140, 7, 3.5, '#0b0b0b', '#3a3a3a', 1);
    }
    return s;
  }
  function tray(x, y, w, h, rx) { // foam-binnenplaat, duidelijk anders dan de wand
    return rect(x, y, w, h, rx, 'url(#foam)', '#000', 2.2) + rect(x + 1.5, y + 1.5, w - 3, h - 3, rx - 1, 'none', 'rgba(255,255,255,.07)', 1);
  }
  function panel(which, opts) {
    var defs = '<defs><radialGradient id="bcBody" cx="45%" cy="38%" r="70%"><stop offset="0" stop-color="#2d2d2d"/><stop offset="1" stop-color="#1c1c1c"/></radialGradient><radialGradient id="swBody" cx="42%" cy="36%" r="72%"><stop offset="0" stop-color="#ffffff"/><stop offset=".75" stop-color="#f3f3f1"/><stop offset="1" stop-color="#e6e6e2"/></radialGradient>' +
      '<linearGradient id="caseGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#303030"/><stop offset=".5" stop-color="#222"/><stop offset="1" stop-color="#171717"/></linearGradient>' +
      '<pattern id="foam" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#121212"/><circle cx="1.5" cy="1.5" r=".7" fill="#1a1a1a"/><circle cx="4.5" cy="4.5" r=".7" fill="#191919"/></pattern></defs>';
    var bg;
    if (which === 'deksel') {
      bg = shell(tray(28, 28, W - 56, H - 56, 26) +
        '<text x="366" y="446" font-size="34" font-weight="700" letter-spacing="2" text-anchor="middle" fill="#f2f2f2" font-family="Segoe UI, Helvetica Neue, Arial, sans-serif">INTUSENS</text>', which);
    } else {
      bg = shell('<clipPath id="trayClip"><rect x="28" y="28" width="' + (W - 56) + '" height="' + (H - 56) + '" rx="26"/></clipPath>' +
        '<g clip-path="url(#trayClip)"><rect x="28" y="28" width="338" height="' + (H - 56) + '" fill="#eeeeec"/><rect x="366" y="28" width="' + (W - 28 - 366) + '" height="' + (H - 56) + '" fill="#1f1f1f"/></g>' +
        rect(28, 28, W - 56, H - 56, 26, 'none', '#000', 2.2) + rect(29.5, 29.5, W - 59, H - 59, 25, 'none', 'rgba(255,255,255,.08)', 1) +
        '<text x="208" y="406" font-size="17" font-weight="700" letter-spacing="1" text-anchor="middle" fill="#3a3a3a" font-family="Segoe UI, Helvetica Neue, Arial, sans-serif">INTUSENS</text>' +
        '<text x="208" y="421" font-size="8" text-anchor="middle" fill="#6d6d6d" font-family="Segoe UI, Arial, sans-serif">Switch</text>' +
        '<text x="523" y="406" font-size="17" font-weight="700" letter-spacing="1" text-anchor="middle" fill="#f0f0f0" font-family="Segoe UI, Helvetica Neue, Arial, sans-serif">INTUSENS</text>' +
        '<text x="523" y="421" font-size="8" text-anchor="middle" fill="#a8a8a8" font-family="Segoe UI, Arial, sans-serif">DALI-2 Broadcast</text>', which);
    }
    var parts = PARTS[which].map(function (p, i) {
      var g = p[2](), ref = p[0], lab = T(p[1]);
      var info = opts.info ? opts.info(ref) : null;
      var aria = (info && info.label ? info.label : lab);
      var lblFill = which === 'onderzijde' ? (ref === 'K01' ? '#555' : '#bbb') : '#c9c9c9';
      var isRail = ref === 'K03' || ref === 'K04';
      var lbl = '<text class="lbl" x="' + f(isRail ? g.lx + 10 : g.lx) + '" y="' + f(isRail ? g.ly + 3.5 : g.ly) + '" text-anchor="' + (isRail ? 'start' : 'middle') + '" fill="' + lblFill + '">' + lab + '</text>';
      return '<g class="kc" tabindex="0" role="link" data-ref="' + ref + '" data-i="' + i + '" aria-label="' + aria.replace(/"/g, '&quot;') + '"><g class="halo">' + g.halo + '</g><g class="body">' + g.body + '</g>' + lbl + '</g>';
    }).join('');
    return '<svg class="illu-svg" viewBox="0 -10 ' + W + ' ' + (H + HX + 10) + '" role="img" aria-label="' + (which === 'deksel' ? T('Deksel van de demokoffer met alle bouwvormen') : T('Onderzijde van de demokoffer met de twee werkende sensoren')) + '">' + defs + bg + parts + '</svg>';
  }

  function html(opts) {
    opts = opts || {};
    return '<div class="illu' + (opts.labels ? ' labels' : '') + (opts.compact ? ' compact' : '') + '">' +
      '<figure class="illu-panel"><figcaption><b>' + T('Deksel') + '</b><span>' + T('alle bouwvormen') + '</span></figcaption>' + panel('deksel', opts) + '</figure>' +
      '<figure class="illu-panel"><figcaption><b>' + T('Onderzijde') + '</b><span>' + T('twee werkende sensoren') + '</span></figcaption>' + panel('onderzijde', opts) + '</figure>' +
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


  /* ---- losse weergaven (bediening, snelstart, familie) ---- */
  var DEFS = '<defs><radialGradient id="bcBody" cx="45%" cy="38%" r="70%"><stop offset="0" stop-color="#2d2d2d"/><stop offset="1" stop-color="#1c1c1c"/></radialGradient><radialGradient id="swBody" cx="42%" cy="36%" r="72%"><stop offset="0" stop-color="#ffffff"/><stop offset=".75" stop-color="#f3f3f1"/><stop offset="1" stop-color="#e6e6e2"/></radialGradient></defs>';
  function marker(n, x, y, tx, ty, dark) {
    var c = dark ? '#ffffff' : '#072D78';
    return '<g class="mk"><line x1="' + f(x) + '" y1="' + f(y) + '" x2="' + f(tx) + '" y2="' + f(ty) + '" stroke="' + c + '" stroke-width="1" opacity=".55"/>' +
      circle(x, y, 3, c, 'none') + circle(tx, ty, 11, dark ? '#0b0b0b' : '#ffffff', c, 1.3) +
      '<text x="' + f(tx) + '" y="' + f(ty + 4) + '" font-size="12" font-weight="600" text-anchor="middle" fill="' + c + '" font-family="Segoe UI, Arial, sans-serif">' + n + '</text></g>';
  }
  /* sensor('K01'|'K02', {markers:bool}) — grote losse sensor op zijn kofferpaneel */
  function sensor(ref, opts) {
    opts = opts || {};
    var sw = ref === 'K01', cx = 200, cy = 190, k = 1.45, g = sw ? switchSensor(cx, cy) : broadcastSensor(cx, cy);
    var bg = sw ? '#efefed' : '#1b1b1b', mk = '';
    function P(dx, dy) { return [cx + dx * k, cy + dy * k]; }
    if (opts.markers) {
      var dark = !sw, ringR = sw ? 94 : 97, a;
      a = P(12, 7);                     mk += marker(1, a[0], a[1], 352, 318, dark);   // PIR-lens
      a = P(-ringR * 0.72, -ringR * 0.69); mk += marker(2, a[0], a[1], 40, 36, dark); // draairing
      a = P(12, -45);                   mk += marker(3, a[0], a[1], 352, 36, dark);    // display boven de lens
    }
    return '<svg class="sensor-svg" viewBox="0 0 400 380" role="img" aria-label="' + (sw ? 'IntuSens Switch' : 'IntuSens DALI-2 Broadcast') + '">' + DEFS +
      '<rect x="0" y="0" width="400" height="380" rx="18" fill="' + bg + '"/><g transform="translate(' + cx + ' ' + cy + ') scale(' + k + ') translate(' + (-cx) + ' ' + (-cy) + ')">' + g.body + '</g>' + mk + '</svg>';
  }
  /* part('K11'|'K12') — losse weergave van een toonmodel op donkere ondergrond */
  /* part('K03'…'K12') — losse weergave van een toonmodel op donkere ondergrond (zelfde tekening als in het deksel) */
  var PART_FRAME = { K03: [428, 296, 400, 300], K04: [428, 361, 400, 300], K05: [278, 204, 160, 120], K06: [425, 206, 160, 120], K07: [569, 209, 160, 120],
    K08: [228, 104, 160, 120], K09: [374, 106, 160, 120], K10: [515, 110, 160, 120], K11: [160, 215, 160, 120], K12: [160, 361, 160, 120] }; // alle kaders 4:3, gelijk aan de kaarten
  function part(ref) {
    var entry = null, fr = PART_FRAME[ref];
    PARTS.deksel.forEach(function (p) { if (!entry && p[0] === ref) entry = p; });
    if (!entry || !fr) { entry = PARTS.deksel[3]; fr = PART_FRAME.K11; }
    var g = entry[2](), x = fr[0] - fr[2] / 2, y = fr[1] - fr[3] / 2;
    return '<svg class="part-svg" viewBox="' + f(x) + ' ' + f(y) + ' ' + fr[2] + ' ' + fr[3] + '" role="img" aria-label="' + T(entry[1]).replace(/"/g, '&quot;') + '">' +
      '<rect x="' + f(x) + '" y="' + f(y) + '" width="' + fr[2] + '" height="' + fr[3] + '" fill="#111"/>' + g.body + '</svg>';
  }
  /* icon('aansluiten'|'inschakelen') — rustige lijnillustraties voor de snelstart */
  function icon(kind) {
    var st = 'fill="none" stroke="#111" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"';
    if (kind === 'aansluiten') {
      return '<svg class="qs-svg" viewBox="0 0 240 160" role="img" aria-label="' + T('Netsnoer achter in de koffer en in het stopcontact') + '">' +
        '<rect x="18" y="34" width="120" height="92" rx="14" fill="#1b1b1b"/><rect x="26" y="42" width="104" height="76" rx="9" fill="none" stroke="#333" stroke-width="1.2"/>' +
        '<rect x="66" y="74" width="24" height="18" rx="3" fill="#0d0d0d" stroke="#555" stroke-width="1.2"/><rect x="71" y="79" width="3" height="8" fill="#888"/><rect x="76.5" y="79" width="3" height="8" fill="#888"/><rect x="82" y="79" width="3" height="8" fill="#888"/>' +
        '<rect x="48" y="75" width="10" height="16" rx="2" fill="#0d0d0d" stroke="#555" stroke-width="1.2"/>' +
        '<path d="M90 83 C 130 83, 140 120, 176 120" ' + st + ' stroke="#4097DB"/>' +
        '<rect x="176" y="98" width="46" height="46" rx="10" ' + st + '/><circle cx="191" cy="121" r="3" fill="#111"/><circle cx="207" cy="121" r="3" fill="#111"/>' +
        '<text x="78" y="146" font-size="10" text-anchor="middle" fill="#6b6b6b" font-family="Segoe UI, Arial, sans-serif">' + T('achterzijde koffer') + '</text></svg>';
    }
    return '<svg class="qs-svg" viewBox="0 0 240 160" role="img" aria-label="' + T('Hoofdschakelaar achterop aan') + '">' +
      '<rect x="70" y="26" width="100" height="108" rx="14" fill="#1b1b1b"/><rect x="100" y="42" width="40" height="76" rx="6" fill="#0d0d0d" stroke="#555" stroke-width="1.2"/>' +
      '<path d="M104 80 L136 66 L136 112 L104 112 Z" fill="#2a2a2a" stroke="#6a6a6a" stroke-width="1"/><path d="M104 46 L136 46 L136 66 L104 80 Z" fill="#3a3a3a" stroke="#6a6a6a" stroke-width="1"/>' +
      '<text x="120" y="60" font-size="13" text-anchor="middle" fill="#4097DB" font-family="Segoe UI, Arial, sans-serif" font-weight="700">I</text>' +
      '<text x="120" y="102" font-size="11" text-anchor="middle" fill="#8a8a8a" font-family="Segoe UI, Arial, sans-serif" font-weight="700">O</text>' +
      '<text x="120" y="152" font-size="10" text-anchor="middle" fill="#6b6b6b" font-family="Segoe UI, Arial, sans-serif">' + T('hoofdschakelaar') + '</text></svg>';
  }

  window.KofferIllu = { html: html, bind: bind, sensor: sensor, part: part, icon: icon };
})();
