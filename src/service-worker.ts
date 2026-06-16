export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/nanotrome/sw.js').then(
      (registration) => {
        console.log('Service worker registered:', registration)
      },
      (error) => {
        console.error(`Service worker registration failed: ${error}`)
      }
    )
  } else {
    console.error('Service workers are not suppported.')
  }
}
