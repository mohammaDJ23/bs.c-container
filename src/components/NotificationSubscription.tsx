import { FC, PropsWithChildren, Fragment, useEffect, useCallback } from 'react';
import { Notifications, getTokenInfo, isUserAuthenticated } from '../lib';
import { Fingerprint } from '../lib';
import { NotificationSubscriptionApi, NotificationUnsubscriptionApi, Request } from '../apis';
import { NotificationSubscriptionObj } from '../types';

const NotificationSubscription: FC<PropsWithChildren> = ({ children }) => {
  const isUserLoggedIn = isUserAuthenticated();

  const subscribeNotification = useCallback(async (id: number) => {
    try {
      const visitorId = await Fingerprint.getVisitorId();
      const pushSubscription = await Notifications.subscribe();
      const subscription: NotificationSubscriptionObj = Object.assign(pushSubscription, {
        visitorId,
        userId: id,
      });

      Notifications.cache(subscription);

      const request = new Request(new NotificationSubscriptionApi(subscription));
      await request.build();
    } catch (error) {
      console.error('Faild to subscribe the notification.', error);
    }
  }, []);

  const unsubscribeNotification = useCallback(async () => {
    try {
      let visitorId: string = '';

      const cachedSubscription = Notifications.getCached();
      if (cachedSubscription) {
        visitorId = cachedSubscription.visitorId;
      } else {
        visitorId = await Fingerprint.getVisitorId();
      }

      const request = new Request(new NotificationUnsubscriptionApi(visitorId));
      await request.build();

      Notifications.removeCached();
    } catch (error) {
      console.error('Faild to unsubscribe the notification.', error);
    }
  }, []);

  useEffect(() => {
    (async function () {
      if (isUserLoggedIn) {
        // if the browser does not support the notification
        if (!('Notification' in window)) {
          console.warn('The notification does not support for this browser.');
        }

        // if the permission was not granted
        else if (Notification.permission === 'default') {
          Notification.requestPermission()
            .then(async (permission) => {
              if (permission === 'granted') {
                const decodedToken = getTokenInfo()!;
                subscribeNotification(decodedToken.id);
              } else if (permission === 'denied') {
                unsubscribeNotification();
              }
            })
            .catch((error) => console.error(error));
        }

        // if the permission was granted
        else if (Notification.permission === 'granted') {
          const cachedSubscription = Notifications.getCached();
          const decodedToken = getTokenInfo()!;

          // when the cached subscription does not exists
          if (!cachedSubscription) {
            subscribeNotification(decodedToken.id);
          }

          // when subscription exsits and does not match to the previous user and then send a new one for the new user
          else if (cachedSubscription.userId !== decodedToken.id) {
            subscribeNotification(decodedToken.id);
          }
        }

        // if the permission was blocked just remove the notification
        else if (Notification.permission === 'denied') {
          unsubscribeNotification();
        }
      }
    })();
  }, [isUserLoggedIn]);

  return <Fragment>{children}</Fragment>;
};

export default NotificationSubscription;
