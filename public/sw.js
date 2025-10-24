// Service Worker - Comprehensive implementation for PWA
const CACHE_NAME = 'freecloudminer-v2'; // Sürüm V2'ye yükseltildi
const urlsToCache = [
  '/', // Ana sayfa
  '/index.html', // Ana HTML dosyası
  '/static/js/bundle.js',
  '/static/css/main.css',
  
  // Manifest ve İkonlar (PWA için Kritik)
  '/manifest.json', 
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/favicon.svg',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/logo.png', // Sitenin ana logosu
  
  // (Ek olarak: Sitenin kullandığı ana font dosyaları varsa buraya eklenmelidir.)
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        // Tüm dosyaları önbelleğe kaydeder
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Önbellekte varsa önbellekten döndür
        if (response) {
          return response;
        }
        // Yoksa ağdan almaya çalış
        return fetch(event.request);
      }
    )
  );
});

// Yeni sürümde eski önbelleği temizleme kuralı (Opsiyonel ama önerilir)
self.addEventListener('activate', function(event) {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
