const STATIC_CACHE = "static-v1";
const DYNAMIC_CACHE = "dynamic-v1";
const INMUTABLE_CACHE = "inmutable-v1";

const APP_SHELL = [
  //   "/",
  "index.html",
  "favicon.ico",
  "manifest.json",
  "asset-manifest.json",
  "static/js/2.77706537.chunk.js",
  "static/js/2.77706537.chunk.js.map",
  "static/js/main.8b7a45d7.chunk.js",
  "static/js/main.8b7a45d7.chunk.js.map",
  "static/js/runtime-main.2f9f3538.js",
  "static/js/runtime-main.2f9f3538.js.map",
  "https://corona-api.com/countries",
];

const APP_SHELL_INMUTABLE = [
  "static/css/2.86846cc5.chunk.css",
  "static/css/2.86846cc5.chunk.css.map",
  "static/css/main.144267e9.chunk.css",
  "static/css/main.144267e9.chunk.css.map",
];

function updateDynamicCache(dynamicCache, request, response) {
  if (response.ok) {
    return caches.open(dynamicCache).then((cache) => {
      cache.put(request, response.clone());
      return response.clone();
    });
  } else {
    return response;
  }
}

//install
self.addEventListener("install", (e) => {
  const cacheInmutable = caches
    .open(INMUTABLE_CACHE)
    .then((cache) => cache.addAll(APP_SHELL_INMUTABLE));

  const cacheStatic = caches
    .open(STATIC_CACHE)
    .then((cache) => cache.addAll(APP_SHELL));

  e.waitUntil(Promise.all([cacheInmutable, cacheStatic]));
});

self.addEventListener("activate", (e) => {
  const response = caches.keys().then((keys) => {
    keys.forEach((key) => {
      if (key !== STATIC_CACHE && key.includes("static")) {
        return caches.delete(key);
      }
      if (key !== DYNAMIC_CACHE && key.includes("dynamic")) {
        return caches.delete(key);
      }
    });
  });

  e.waitUntil(response);
});

self.addEventListener("fetch", (e) => {
  const response = caches.match(e.request).then((res) => {
    let response = null;
    if (res) {
      response = res;
    } else {
      response = fetch(e.request).then((dynamicRes) =>
        updateDynamicCache(DYNAMIC_CACHE, e.request, dynamicRes)
      );
    }
    return response;
  });
  e.respondWith(response);
});
