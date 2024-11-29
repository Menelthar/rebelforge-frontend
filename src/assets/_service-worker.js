var APP_NAME = 'StickyMobile';
var APP_VER = '4.8.4'; // Actualizamos la versión
var CACHE_NAME = APP_NAME + '-' + APP_VER;

// Archivos necesarios para que la aplicación funcione sin conexión
var REQUIRED_FILES = [
    '/index.html',
    '/assets/styles/bootstrap.css', 
    '/styles.css', 
    '/assets/scripts/custom.js',
    '/assets/scripts/bootstrap.js',
    '/assets/plugins/before-after/before-after.css',
    '/assets/plugins/before-after/before-after.js',
    '/assets/plugins/charts/charts.js',
    '/assets/plugins/charts/charts-call-graphs.js',
    '/assets/plugins/countdown/countdown.js',
    '/assets/plugins/filterizr/filterizr.js',
    '/assets/plugins/filterizr/filterizr.css',
    '/assets/plugins/filterizr/filterizr-call.js',
    '/assets/plugins/galleryViews/gallery-views.js',
    '/assets/plugins/glightbox/glightbox.js',
    '/assets/plugins/glightbox/glightbox.css',
    '/assets/plugins/glightbox/glightbox-call.js',
    '/assets/fonts/css/fontawesome-all.min.css',
    '/assets/fonts/webfonts/fa-brands-400.woff2',
    '/assets/fonts/webfonts/fa-regular-400.woff2',
    '/assets/fonts/webfonts/fa-solid-900.woff2',
    '/assets/images/empty.png',
];

// Diagnóstico del Service Worker
var APP_DIAG = true;

// Función del Service Worker
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(REQUIRED_FILES);
            })
            .catch(function(error) {
                if (APP_DIAG) {
                    console.error('Error al añadir archivos al caché:', error);
                }
            })
            .then(function() {
                return self.skipWaiting();
            })
            .then(function() {
                if (APP_DIAG) {
                    console.log('Caché del Service Worker está OK');
                }
            })
    );
    if (APP_DIAG) {
        console.log('Service Worker: Instalado');
    }
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    if (APP_DIAG) {
                        console.log('Sirviendo desde la caché:', event.request.url);
                    }
                    return response;
                }
                return fetch(event.request).catch(function(error) {
                    if (APP_DIAG) {
                        console.error('Error al obtener el recurso:', error);
                    }
                    return new Response('Recurso no encontrado', {
                        status: 404,
                        statusText: 'No encontrado'
                    });
                });
            })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => (cacheName.startsWith(APP_NAME + "-")))
                          .filter(cacheName => (cacheName !== CACHE_NAME))
                          .map(cacheName => caches.delete(cacheName))
            );
        })
    );
    if (APP_DIAG) {
        console.log('Service Worker: Activado');
    }
});
