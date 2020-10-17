const cache = true;
const CACHE_NAME = 'weather-app-cache-v1';
const whitelistedCaches = [CACHE_NAME];
const clearCache = (cacheList) => Promise.all(cacheList.map((cache) => {
  if (!whitelistedCaches.includes(cache)) {
    return caches.delete(cache);
  }
}));
const fetchAssetManifest = () => new Promise((resolve, reject) => {
  fetch('/asset-manifest.json')
    .then((res) => {
      if (res.status !== 200) {
        throw new Error(res.status);
      }

      return res.json();
    })
    .then((assets) => resolve(assets))
    .catch((err) => reject(err.message || err));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheList) => clearCache(cacheList))
      .then(() => console.log('cache cleared!'))
      .catch((e) => console.error('error clearing cache. reason: ' + e)),
    )
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => Promise.all([fetchAssetManifest(), Promise.resolve(cache)]))
      .then(([assets, cache]) => {
        cache.addAll(
          ['/', assets.main]
        );
        console.log('assets cached successfully');
      })
      .catch((err) => console.error('error caching assets. reason ' + err))
  )
});


self.addEventListener('fetch', function(event) {
  console.log(event);
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        return cachedResponse || fetch(event.request)
          .then((fetchedResponse) => {
            const clonedResponse = fetchedResponse.clone();

            caches.open(CACHE_NAME)
              .then((cache) => cache.put(event.request, clonedResponse));

            return fetchedResponse;
          });
      }),
  );
});
