var APP_NAME = 'StickyMobile';
var APP_VER = '4.8.4';  // Actualizamos la versión
var CACHE_NAME = APP_NAME + '-' + APP_VER;

// Archivos necesarios para que la aplicación funcione sin conexión.
var REQUIRED_FILES = [
    // HTML Files
    '/index.html',
    // Styles (Usar los archivos CSS en lugar de SCSS)
    '/assets/styles/bootstrap.css',  // Reemplaza con el archivo CSS compilado
    '/styles.css',  // Asegúrate de que este archivo CSS exista
    // Scripts
    '/assets/scripts/custom.js',
    '/assets/scripts/bootstrap.js',
    // Plugins
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
    // Fonts
    '/assets/fonts/css/fontawesome-all.min.css',
    '/assets/fonts/webfonts/fa-brands-400.woff2',
    '/assets/fonts/webfonts/fa-regular-400.woff2',
    '/assets/fonts/webfonts/fa-solid-900.woff2',
    // Images
    '/assets/images/empty.png',
];

// Diagnóstico del Service Worker. Pon true para mostrar registros en la consola.
var APP_DIAG = true;

// Función del Service Worker.
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                // Añadir archivos al caché
                return cache.addAll(REQUIRED_FILES);
            })
            .catch(function(error) {
                // Salida de error si las ubicaciones de los archivos son incorrectas
                if (APP_DIAG) {
                    console.error('Service Worker Cache: Error - Verifica el array REQUIRED_FILES en el archivo _service-worker.js. Puede que falten archivos o la ruta sea incorrecta. Error: ' + error);
                }
            })
            .then(function() {
                // Instalar SW si todo está bien
                return self.skipWaiting();
            })
            .then(function() {
                if (APP_DIAG) {
                    console.log('Service Worker: Caché está OK');
                }
            })
    );
    if (APP_DIAG) {
        console.log('Service Worker: Instalado');
    }
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        // Obtener datos de la caché si está sin conexión
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    if (APP_DIAG) {
                        console.log('Service Worker: Sirviendo desde la caché:', event.request.url);
                    }
                    return response;
                }
                return fetch(event.request).catch(function(error) {
                    if (APP_DIAG) {
                        console.error('Service Worker: Error al buscar:', error);
                    }
                    return new Response('No se pudo cargar el recurso.', {
                        status: 404,
                        statusText: 'Not Found'
                    });
                });
            })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
    event.waitUntil(
        // Comprobar el número de caché, borrar todos los recursos y volver a añadir si el número de caché ha cambiado
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => (cacheName.startsWith(APP_NAME + "-")))
                    .filter(cacheName => (cacheName !== CACHE_NAME))
                    .map(cacheName => caches.delete(cacheName))
            );
        })
    );
    if (APP_DIAG) {
        console.log('Service Worker: Activado');
    }
});
