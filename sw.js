const staticCacheName = 'site-static';
const assets = [
    '/',
    '#intro',
    '/index.html',
    '/js/app.js',
    '/assets/kindle.png',
    '/assets/ebook-cover.png',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js'
];

// install service worker
self.addEventListener('install', evt =>{
    //console.log('service worker has been installed');
    evt.waitUntil( 
        caches.open(staticCacheName).then(cache => {
        console.log('caching shell assets');
        cache.addAll(assets)
    }))
});

// activate event
self.addEventListener('activate', evt => {
    //console.log('Service worker has been activated');
})
// fetch event
self.addEventListener('fetch', evt => {
    //console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
          return cacheRes || fetch(evt.request);
        })
      );
    });



