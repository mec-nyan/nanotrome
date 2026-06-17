const VERSION = 'v0.1.7'

const CACHE_NAME = `nanotrome-${VERSION}`

const GPATH = '/nanotrome'

const APP_STATIC_RESOURCES = [
  `${GPATH}/`,
  `${GPATH}/index.html`,
  `${GPATH}/assets/index.css`,
  `${GPATH}/assets/index.js`,
  `${GPATH}/manifest.json`,
  `${GPATH}/icons/icon.svg`,
  `${GPATH}/screenshots/nanotrome-screenshot-narrow.webp`,
  `${GPATH}/screenshots/nanotrome-screenshot-wide.webp`,
]

self.addEventListener('install', (e) => {
  e.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME)
      cache.addAll(APP_STATIC_RESOURCES)
    })()
  )
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    (async () => {
      const names = await caches.keys()
      await Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name)
          }
          return undefined
        })
      )
      await clients.claim()
    })()
  )
})

self.addEventListener('fetch', (e) => {
  if (e.request.mode === 'navigate') {
    e.respondWith(caches.match(`${GPATH}/`))
    return
  }

  e.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME)
      const cachedResponse = await cache.match(e.request.url)
      if (cachedResponse) {
        return cachedResponse
      }
      try {
        const resp = await fetch(e.request)
        return resp
      } catch (err) {
        return new Response(null, { status: 404 })
      }
    })()
  )
})
