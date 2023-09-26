export function register() {
  if (navigator.serviceWorker) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.bundle.js')
        .then((registration) => console.log('service worker registered: ', registration))
        .catch((err) => console.error('service worker registration failed: ', err));
    });
  }
}
