import { registerRoute, Route } from 'workbox-routing';
import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

precacheAndRoute([
  { url: '/', revision: null },

  { url: '/auth/login', revision: null },
  { url: '/auth/forgot-password', revision: null },
  { url: '/auth/reset-password', revision: null },

  { url: '/bank/dashboard', revision: null },
  { url: '/bank/bills', revision: null },
  { url: '/bank/bills/deleted', revision: null },
  { url: '/bank/users', revision: null },
  { url: '/bank/users/deleted', revision: null },
  { url: '/bank/create-bill', revision: null },
  { url: '/bank/create-user', revision: null },
]);

registerRoute(
  new Route(
    ({ request }) => {
      return request.destination === 'image';
    },
    new StaleWhileRevalidate({
      cacheName: 'images',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 30,
          maxAgeSeconds: 3 * 24 * 60 * 60,
        }),
      ],
    })
  )
);

registerRoute(
  new Route(
    ({ request }) => {
      return request.destination === 'script';
    },
    new StaleWhileRevalidate({
      cacheName: 'scripts',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 60,
          maxAgeSeconds: 3 * 24 * 60 * 60,
        }),
      ],
    })
  )
);

registerRoute(
  new Route(
    ({ request }) => {
      return request.destination === 'style';
    },
    new StaleWhileRevalidate({
      cacheName: 'styles',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 60,
          maxAgeSeconds: 3 * 24 * 60 * 60,
        }),
      ],
    })
  )
);

registerRoute(
  new Route(
    ({ request }) => {
      return request.destination === 'font';
    },
    new StaleWhileRevalidate({
      cacheName: 'fonts',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 10,
          maxAgeSeconds: 3 * 24 * 60 * 60,
        }),
      ],
    })
  )
);

registerRoute(
  ({ request, url }) => {
    return request.method === 'GET' && url.pathname.startsWith('/api/');
  },
  new NetworkFirst({
    cacheName: 'apis',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 3 * 24 * 60 * 60,
      }),
    ],
  })
);
