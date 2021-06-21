const STATIC_CACHE = "static-v2";
const DYNAMIC_CACHE = "dynamic-v2";
const INMUTABLE_CACHE = "inmutable-v1";

const APP_SHELL = [
  //   "/",
  "index.html",
  "favicon.ico",
  "manifest.json",
  "asset-manifest.json",
  "static/js/2.77706537.chunk.js",

  // "static/js/2.77706537.chunk.js.map",
  // "static/js/main.8b7a45d7.chunk.js",
  // "static/js/main.8b7a45d7.chunk.js.map",
  // "static/js/runtime-main.2f9f3538.js",
  // "static/js/runtime-main.2f9f3538.js.map",

  // "https://corona-api.com/countries",
];

const APP_SHELL_INMUTABLE = ["static/css/2.86846cc5.chunk.css"];

function clearCache(cacheName, numeroItems) {
  caches.open(cacheName).then((cache) => {
    return cache.keys().then((keys) => {
      if (keys.length > numeroItems) {
        // eslint-disable-next-line no-unused-vars
        cache.delete(keys[0]).then(clearCache(cacheName, numeroItems));
      }
    });
  });
}

function updateDynamicCache(dynamicCache, request, response) {
  if (response.ok) {
    return caches.open(dynamicCache).then((cache) => {
      cache.put(request, response.clone());
      clearCache(dynamicCache, 50);
      return response.clone();
    });
  } else {
    return response;
  }
}

//install
// eslint-disable-next-line no-restricted-globals
self.addEventListener("install", (e) => {
  const cacheInmutable = caches
    .open(INMUTABLE_CACHE)
    .then((cache) => cache.addAll(APP_SHELL_INMUTABLE))
    .catch((e) => console.log("Works"));

  const cacheStatic = caches
    .open(STATIC_CACHE)
    .then((cache) => cache.addAll(APP_SHELL))
    .catch((e) => console.log("Works2"));

  e.waitUntil(Promise.all([cacheInmutable, cacheStatic]));
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("activate", (e) => {
  //clean up cache storage
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

// eslint-disable-next-line no-restricted-globals
self.addEventListener("fetch", (e) => {
  let response = null;
  //Network first if there is a request to the API
  if (e.request.url.includes("corona-api")) {
    response = fetch(e.request)
      .then((res) => {
        if (!res) return caches.match(e.request);

        caches.open(DYNAMIC_CACHE).then((cache) => {
          cache.put(e.request, res);
          clearCache(DYNAMIC_CACHE, 50);
        });

        return res.clone();
      })
      .catch(() => caches.match(e.request));
  } else {
    //Cache first network fallback
    response = caches.match(e.request).then((resCache) => {
      let res = null;
      if (resCache) {
        res = resCache;
      } else {
        res = fetch(e.request).then((dynamicRes) =>
          updateDynamicCache(DYNAMIC_CACHE, e.request, dynamicRes)
        );
      }
      return res;
    });
  }
  e.respondWith(response);
});
