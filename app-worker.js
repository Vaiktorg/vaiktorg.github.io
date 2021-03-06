const cacheName = "app-" + "320ca55981a47f0b82c3f17c728e9ea28bb6d9ed";

self.addEventListener("install", event => {
  console.log("installing app worker 320ca55981a47f0b82c3f17c728e9ea28bb6d9ed");
  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        "/",
        "/app.css",
        "/app.js",
        "/manifest.json",
        "/wasm_exec.js",
        "/web/app.wasm",
        "/web/static/style.css",
        "http://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css",
        "https://i.imgur.com/vNxAhoY.png",
        "https://www.w3schools.com/w3css/4/w3.css",
        
      ]);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  console.log("app worker 320ca55981a47f0b82c3f17c728e9ea28bb6d9ed is activated");
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
