// Blue Knight Alumni Hub — Service Worker
// Strategy: Cache-First for static assets, Network-First for dynamic content

const CACHE_NAME = 'alumni-hub-v1.0.0';
const OFFLINE_URL = '/offline.html';

// All assets to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/style.css'
];

// ── INSTALL: pre-cache all critical assets
self.addEventListener('install', event => {
  console.log('[SW] Installing Alumni Hub Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Pre-caching assets');
        // Use individual adds so one failure doesn't break the whole install
        return Promise.allSettled(
          PRECACHE_ASSETS.map(url =>
            cache.add(url).catch(err =>
              console.warn('[SW] Failed to cache:', url, err)
            )
          )
        );
      })
      .then(() => {
        console.log('[SW] Install complete — skipping waiting');
        return self.skipWaiting();
      })
  );
});

// ── ACTIVATE: clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating new Service Worker...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => name !== CACHE_NAME)
            .map(name => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[SW] Activation complete — claiming clients');
        return self.clients.claim();
      })
  );
});

// ── FETCH: Cache-First strategy with network fallback
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Skip chrome-extension and non-http requests
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // Serve from cache immediately (Cache-First)
          console.log('[SW] Serving from cache:', event.request.url);
          return cachedResponse;
        }

        // Not in cache — fetch from network and cache the response
        return fetch(event.request)
          .then(networkResponse => {
            // Only cache valid responses
            if (!networkResponse || networkResponse.status !== 200 ||
                networkResponse.type === 'error') {
              return networkResponse;
            }

            // Clone the response (it can only be consumed once)
            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          })
          .catch(() => {
            // Network failed — serve the offline fallback
            console.log('[SW] Network failed, serving offline fallback');
            return caches.match(OFFLINE_URL);
          });
      })
  );
});

// ── MESSAGE: allow the app to trigger cache updates
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});