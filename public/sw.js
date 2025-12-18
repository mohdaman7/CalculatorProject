// Service Worker for Calculator PWA
// Provides offline support and caching strategies

const CACHE_NAME = 'calculator-v1'
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/apple-icon.png',
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.log('Cache addAll error:', err)
        // Continue even if some assets fail to cache
        return Promise.resolve()
      })
    })
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch event - cache strategies
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return
  }

  const { pathname } = new URL(event.request.url)

  // Static assets: cache first, fallback to network
  if (pathname === '/' || pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2)$/)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((fetchResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, fetchResponse.clone())
            return fetchResponse
          })
        })
      }).catch(() => {
        // Offline fallback
        if (pathname === '/') {
          return caches.match('/')
        }
        return new Response('Offline', { status: 503 })
      })
    )
    return
  }

  // API requests: network first, fallback to cache
  if (pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache successful API responses
          if (response.ok) {
            const cache = caches.open(CACHE_NAME)
            cache.then((c) => c.put(event.request, response.clone()))
          }
          return response
        })
        .catch(() => {
          // Fallback to cached API response
          return caches.match(event.request).then((response) => {
            return response || new Response(
              JSON.stringify({ error: 'Offline', cached: false }),
              { status: 503, headers: { 'Content-Type': 'application/json' } }
            )
          })
        })
    )
    return
  }

  // Default: network first
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  )
})

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
