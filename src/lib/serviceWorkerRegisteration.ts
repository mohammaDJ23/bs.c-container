export function getServiceWorker() {
  const serviceWorker = navigator.serviceWorker;
  if (!!serviceWorker) {
    return serviceWorker;
  }
  throw new Error('Service worker is not supported.');
}

export function getServiceWorkerRegistration() {
  const registration = getServiceWorker();
  return registration.ready;
}

export function register() {
  getServiceWorker()
    .register(process.env.CONTAINER_PUBLIC_PATH + 'sw.bundle.js', { scope: '/' })
    .then((registration) => console.log('service worker registered: ', registration))
    .catch((err) => console.error('service worker registration failed: ', err));
}
