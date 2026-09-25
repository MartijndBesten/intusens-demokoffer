/* Service worker TRILUX IntuSens Demokoffer — gegenereerd door tools/publish_site.py.
   Doel: na het eerste bezoek werkt de site ook zonder internet (bij de klant).
   Strategie: alle bestanden vooraf in de cache; cache-first; bij een nieuwe versie wordt de oude cache opgeruimd. */
const CACHE = "intusens-demokoffer-d3d6c55246b8";
const FILES = [
 "./",
 "assets/brand/trilux-logo-kleur-zwart.png",
 "assets/brand/trilux-logo-wit-crop.png",
 "assets/brand/trilux-logo-wit.png",
 "assets/brand/trilux-logo-zwart-crop.png",
 "assets/icons/apple-touch-icon.png",
 "assets/icons/favicon-32.png",
 "assets/icons/favicon.svg",
 "assets/icons/icon-192.png",
 "assets/icons/icon-512.png",
 "assets/processed/a03-stekker-links.jpg",
 "assets/processed/a03-stekker-rechts.jpg",
 "assets/processed/bediening-broadcast-01.jpg",
 "assets/processed/bediening-broadcast-02.jpg",
 "assets/processed/bediening-broadcast-03.jpg",
 "assets/processed/bediening-broadcast-04.jpg",
 "assets/processed/bediening-broadcast-05.jpg",
 "assets/processed/bediening-broadcast-06.jpg",
 "assets/processed/is-broadcast.jpg",
 "assets/processed/is-hb.jpg",
 "assets/processed/is-hbc.jpg",
 "assets/processed/is-inbouw-wit.jpg",
 "assets/processed/is-ipd.jpg",
 "assets/processed/is-lb.jpg",
 "assets/processed/is-minir-wit.jpg",
 "assets/processed/is-minir-zwart.jpg",
 "assets/processed/is-minir.jpg",
 "assets/processed/is-minis.jpg",
 "assets/processed/is-nlc.jpg",
 "assets/processed/is-opbouw-zwart.jpg",
 "assets/processed/is-rail.jpg",
 "assets/processed/is-switch.jpg",
 "assets/processed/k01-switch.jpg",
 "assets/processed/k02-broadcast.jpg",
 "assets/processed/k03-rail-wit.jpg",
 "assets/processed/k04-rail-zwart.jpg",
 "assets/processed/k05-minis-wit.jpg",
 "assets/processed/k06-minis-grijs.jpg",
 "assets/processed/k07-minis-zwart.jpg",
 "assets/processed/k08-minir-wit.jpg",
 "assets/processed/k09-minir-zwart-a.jpg",
 "assets/processed/k10-minir-zwart-b.jpg",
 "assets/processed/k11-zhaga-a.jpg",
 "assets/processed/k12-zhaga-b.jpg",
 "assets/processed/koffer-achterzijde.jpg",
 "assets/processed/koffer-deksel-tray.jpg",
 "assets/processed/koffer-dicht.jpg",
 "assets/processed/koffer-hero.jpg",
 "assets/processed/koffer-hoesje-netkabel.jpg",
 "assets/processed/koffer-netaansluiting.jpg",
 "assets/processed/koffer-onderzijde.jpg",
 "assets/processed/koffer-open-schuin.jpg",
 "assets/processed/label-k05-minis-lb-01.jpg",
 "assets/processed/label-k06-minis-lb-03.jpg",
 "assets/processed/label-k08-minir-hb-01.jpg",
 "assets/processed/label-k09-minir-hb-05-no-l.jpg",
 "assets/processed/label-k10-minir-hb-05.jpg",
 "assets/processed/label-k11-zb18-hb.jpg",
 "assets/processed/label-k12-zb18-hb-corr.jpg",
 "assets/processed/losse-onderdelen.jpg",
 "assets/qr/intusens-demokoffer-koffer-80mm.png",
 "assets/qr/intusens-demokoffer-sticker-50mm.png",
 "assets/qr/intusens-demokoffer.png",
 "assets/qr/intusens-demokoffer.svg",
 "index.html",
 "manifest.webmanifest",
 "print/intusens-demokoffer-handleiding.html",
 "robots.txt",
 "src/app.js",
 "src/data.js",
 "src/koffer-illu.js",
 "src/styles.css"
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => {
      if (hit) return hit;
      if (req.mode === "navigate") return caches.match("./index.html").then((idx) => idx || fetch(req));
      return fetch(req);
    })
  );
});
