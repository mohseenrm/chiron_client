var cacheName = 'Elixir-cache-1';
var filesToCache = [
    '/',
    '/index.html',
    '/dist/css.main.css',
    '/dist/js/jquery.min.js',
    '/images/logo.svg',
    '/images/logo2.png',
    '/images/logo2.svg'
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(caches.open(cacheName).then(function (cache) {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(filesToCache);
    }));
});

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(caches.keys().then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
            if (key !== cacheName) {
                console.log('[ServiceWorker] Removing old cache', key);
                return caches.delete(key);
            }
        }));
    }));
    return self
        .clients
        .claim();
});

self.addEventListener('fetch', function (e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(caches.match(e.request).then(function (response) {
        return response || fetch(e.request);
    }));
});