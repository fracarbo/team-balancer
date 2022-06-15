// named cache in Cache Storage
const CACHE_NAME = 'cache-v1';

// list of requests whose responses will be pre-cached at install
const INITIAL_CACHED_RESOURCES = [
    '/',
    '/index.html',
    'https://unpkg.com/vue@3',
    '/css/main.css',
    '/css/bootstrap.min.css'
];

// install event handler (note async operation)
// opens named cache, pre-caches identified resources above
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll(INITIAL_CACHED_RESOURCES);
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request))
    .then(cachedResponse => cachedResponse || fetch(event.request))
})