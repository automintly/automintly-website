'use strict';

const CACHE_NAME = 'automintly-dashboard-launcher-v3';
const PUBLIC_SHELL = [
  '/client-dashboard.html',
  '/dashboard-install.js',
  '/dashboard-icon.svg',
  '/dashboard-icon-192.png',
  '/dashboard-icon-512.png',
  '/dashboard-manifest.json'
];

self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
    return cache.addAll(PUBLIC_SHELL);
  }).then(function () {
    return self.skipWaiting();
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

  event.respondWith(fetch(event.request).then(function (response) {
    if (response.ok) {
      const copy = response.clone();
      event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
        return cache.put(event.request, copy);
      }));
    }
    return response;
  }).catch(function () {
    return caches.match(event.request, { ignoreSearch: true });
  }));
});
