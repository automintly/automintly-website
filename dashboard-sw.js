'use strict';

const CACHE_NAME = 'automintly-dashboard-launcher-v1';
const PUBLIC_SHELL = [
  '/client-dashboard.html',
  '/dashboard-install.js',
  '/dashboard-icon.svg',
  '/dashboard-manifest.json'
];

self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
    return cache.addAll(PUBLIC_SHELL);
  }));
});

self.addEventListener('activate', function (event) {
  event.waitUntil(caches.keys().then(function (names) {
    return Promise.all(names.filter(function (name) {
      return name !== CACHE_NAME;
    }).map(function (name) {
      return caches.delete(name);
    }));
  }).then(function () {
    return self.clients.claim();
  }));
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || !PUBLIC_SHELL.includes(url.pathname)) return;

  event.respondWith(caches.match(event.request, { ignoreSearch: true }).then(function (cached) {
    return cached || fetch(event.request);
  }));
});
