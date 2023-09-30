export function register() {
  if (navigator.serviceWorker) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register(process.env.CONTAINER_PUBLIC_PATH + 'sw.bundle.js', { scope: '/' })
        .then((registration) => console.log('service worker registered: ', registration))
        .catch((err) => console.error('service worker registration failed: ', err));
    });
  }
}
