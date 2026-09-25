/* TRILUX IntuSens demokoffer — meertaligheid (NL standaard, EN, FR).
   Eén centrale vertaalstructuur: window.INTUSENS_I18N = { nl: {}, en: {...}, fr: {...} } (src/translations.js,
   gegenereerd uit data/i18n/*.json). Sleutels zijn de Nederlandse teksten; ontbreekt een sleutel, dan blijft de
   Nederlandse tekst staan. Codes (ULC, LOC, DA+, typecodes) en productnamen staan bewust niet in de tabellen. */
(function () {
  'use strict';
  var KEY = 'intusens-lang', LANGS = ['nl', 'en', 'fr'], NAMES = { nl: 'Nederlands', en: 'English', fr: 'Français' };
  var tables = window.INTUSENS_I18N || {};
  var lang = 'nl';
  try { var s = localStorage.getItem(KEY); if (s && LANGS.indexOf(s) >= 0) lang = s; } catch (e) {}
  function t(s, vars) {
    var tbl = tables[lang] || {};
    var out = (lang !== 'nl' && Object.prototype.hasOwnProperty.call(tbl, s)) ? tbl[s] : s;
    if (vars) out = out.replace(/\{(\w+)\}/g, function (m, k) { return vars[k] !== undefined ? vars[k] : m; });
    return out;
  }
  function skip(s) { return /^(https?:|assets\/|#\/|data:)/.test(s); }
  function tr(v) { // vertaalt alle tekst in een data-object (diep), zonder het origineel te wijzigen
    if (typeof v === 'string') return skip(v) ? v : t(v);
    if (Array.isArray(v)) return v.map(tr);
    if (v && typeof v === 'object') { var o = {}; for (var k in v) if (Object.prototype.hasOwnProperty.call(v, k)) o[k] = tr(v[k]); return o; }
    return v;
  }
  function set(l) { if (LANGS.indexOf(l) < 0) return false; lang = l; try { localStorage.setItem(KEY, l); } catch (e) {} document.documentElement.lang = l; return true; }
  document.documentElement.lang = lang;
  window.INTUSENS_T = t;
  window.INTUSENS_LANG = { t: t, tr: tr, set: set, get: function () { return lang; }, LANGS: LANGS, NAMES: NAMES, has: function (l) { return !!(tables[l] && Object.keys(tables[l]).length); } };
})();
