// MealMind service worker
// Cache-first for core app assets, with a network-fallback-to-cache
// strategy for everything else (safe default for a same-origin, no-API app).
//
// Bump CACHE_NAME whenever index-13-4.html, manifest.json, or icon.png
// change, so returning users pick up the new version instead of a stale
// cached copy.
const CACHE_NAME = 'mealmind-cache-v1';

const CORE_ASSETS = [
  './index-13-4.html',
  './manifest.json',
  './icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle simple GETs — IndexedDB reads/writes never go through
  // fetch, so this never touches user nutrition data.
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request)
        .then((networkResponse) => {
          // Cache a copy of anything same-origin we fetch successfully,
          // so it's available offline next time too.
          if (networkResponse && networkResponse.ok) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Offline and not cached — nothing sensible to serve.
          return cachedResponse;
        });
    })
  );
});
