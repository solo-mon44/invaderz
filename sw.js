self.addEventListener('fetch', (e) => {
  e.respondWith(
    (async () => {
      try {
        const response = await caches.match(e.request)
        return response || await fetch(e.request)
      } catch (err) {
        console.error('Fetch failed:', err)
        throw err
      }
    })()
  )
})
