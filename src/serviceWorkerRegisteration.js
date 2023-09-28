import { isProduction } from './lib';

export function register() {
  if (navigator.serviceWorker) {
    window.addEventListener('load', () => {
      let fileUrl = '/sw.bundle.js';

      if (isProduction()) {
        fileUrl = '/container/static' + fileUrl;
      }

      navigator.serviceWorker
        .register(fileUrl)
        .then((registration) => console.log('service worker registered: ', registration))
        .catch((err) => console.error('service worker registration failed: ', err));
    });
  }
}
