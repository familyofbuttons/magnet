// Service Worker for Magnetic Mayhem (GitHub Pages compatible)

const CACHE_VERSION = 'v10';
const CACHE_NAME = `magnetic-mayhem-${CACHE_VERSION}`;

// IMPORTANT: All paths must be RELATIVE for GitHub Pages
const PRECACHE_URLS = [
  'index.html',
  'index.html?source=pwa',
  'pwa-icons/icon-192.png',
  'pwa-icons/icon-512.png'
];

// Install: cache core files
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_URLS).catch(err => {
        console.warn('SW precache failed', err);
      });
    })
  );
});

// Activate: remove old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

// Fetch handler
self.addEventListener('fetch', event => {
  const request = event.request;

  // Only handle GET
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Navigation requests → network first, fallback to cached index.html
  if (request.mode === 'navigate' || (request.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put('index.html', copy));
          return response;
        })
        .catch(() => caches.match('index.html'))
    );
    return;
  }

  // Other requests → cache first, then network
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request)
        .then(networkResponse => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type !== 'opaque') {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, copy).catch(()=>{});
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // fallback for images
          if (request.destination === 'image') {
            return caches.match('pwa-icons/icon-192.png');
          }
          // fallback for everything else
          return caches.match('index.html');
        });
    })
  );
});

// Allow skipWaiting
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
