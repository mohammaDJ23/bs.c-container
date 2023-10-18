import { FC, PropsWithChildren, Fragment, useEffect } from 'react';
import { Notifications, getTokenInfo, isUserAuthenticated } from '../lib';
import { Fingerprint } from '../lib/fingerprint';
import { NotificationSubscriptionApi, Request } from '../apis';
import { NotificationSubscriptionObj } from '../types';

const NotificationSubscription: FC<PropsWithChildren> = ({ children }) => {
  const isUserLoggedIn = isUserAuthenticated();

  useEffect(() => {
    (async function () {
      try {
        if (isUserLoggedIn) {
          const permission = await Notifications.getPermission();
          if (permission !== 'granted') {
            Notifications.removeCached();
          }

          const userInfo = getTokenInfo()!;
          const userId = userInfo.id;

          const cachedSubscription = Notifications.getCached();
          if (cachedSubscription && cachedSubscription.userId === userId) {
            return;
          }

          const pushSubscription = await Notifications.subscribe();
          const visitorId = await Fingerprint.getVisitorId();
          const subscription: NotificationSubscriptionObj = Object.assign(pushSubscription, { visitorId, userId });
          Notifications.cache(subscription);

          const request = new Request(new NotificationSubscriptionApi(subscription));
          await request.build();
        }
      } catch (error) {
        console.error('Faild to subscribe the notification.', error);
      }
    })();
  }, [isUserLoggedIn]);

  return <Fragment>{children}</Fragment>;
};

export default NotificationSubscription;
