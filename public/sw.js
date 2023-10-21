import { setCacheNameDetails } from 'workbox-core';
import { offlineFallback } from 'workbox-recipes';
import { registerRoute, Route, setDefaultHandler, setCatchHandler } from 'workbox-routing';
import { NetworkFirst, StaleWhileRevalidate, NetworkOnly } from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

setDefaultHandler(new NetworkOnly());

offlineFallback({
  pageFallback: process.env.CONTAINER_PUBLIC_PATH + 'offline.html',
});

setCatchHandler(async ({ request }) => {
  if (request.destination === 'script') {
    const cache = await caches.open('workbox-precaches');
    const response = await cache.match(process.env.CONTAINER_PUBLIC_PATH + 'offline.bundle.js');
    if (response) {
      return response;
    }
  }

  if (request.destination === 'document') {
    const cache = await caches.open('workbox-offline-fallbacks');
    const response = await cache.match(process.env.CONTAINER_PUBLIC_PATH + 'offline.html');
    if (response) {
      return response;
    }
  }

  return Response.error();
});

setCacheNameDetails({
  precache: 'precaches',
  suffix: '',
});

precacheAndRoute(
  (self.__WB_MANIFEST || [])
    .filter(() => false)
    .concat([
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

      { url: process.env.CONTAINER_PUBLIC_PATH + 'offline.bundle.js', revision: null },
    ])
);

registerRoute(
  new Route(
    ({ request }) => {
      return request.destination === 'image';
    },
    new StaleWhileRevalidate({
      cacheName: 'images',
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

self.addEventListener('push', (event) => {
  const data = event.data.json();
  if (data.type === 'created_user') {
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: `${data.createdUser.firstName} ${data.createdUser.lastName} as a new user with ${data.createdUser.role} role is created by ${data.createdUser.parent.firstName} ${data.createdUser.parent.lastName}.`,
        vibrate: [100, 50, 100],
        image: '/app-icon_512.png',
        icon: '/app-icon_512.png',
        badge: '/app-icon_512.png',
        data: { createdUser: data.createdUser },
        tag: 'created_user',
        timestamp: Math.floor(Date.now()),
      })
    );
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.notification.tag === 'created_user') {
    const url = `${self.origin}/bank/users/${event.notification.data.createdUser.id}`;
    event.waitUntil(self.clients.openWindow(url));
  }
});
