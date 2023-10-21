import { FC, PropsWithChildren, Fragment, useEffect } from 'react';
import { Notifications, getTokenInfo, isUserAuthenticated } from '../lib';
import { Fingerprint } from '../lib/fingerprint';
import { NotificationSubscriptionApi, NotificationUnsubscriptionApi, Request } from '../apis';
import { NotificationSubscriptionObj } from '../types';

const NotificationSubscription: FC<PropsWithChildren> = ({ children }) => {
  const isUserLoggedIn = isUserAuthenticated();

  useEffect(() => {
    (async function () {
      if (isUserLoggedIn) {
        try {
          console.log(process.env.FINGERPRINT_API_KEY);
          console.log(process.env.APPLICATION_SERVER_KEY);

          const visitorId = await Fingerprint.getVisitorId();
          const cachedSubscription = Notifications.getCached();

          console.log('visitorId: ', visitorId);

          try {
            const permission = await Notifications.getPermission();
            console.log('permission: ', permission);
            if (permission !== 'granted' && cachedSubscription) {
              Notifications.removeCached();
              const request = new Request(new NotificationUnsubscriptionApi(visitorId));
              await request.build();
            }
          } catch (error) {
            console.error('Faild to unsubscribe the notification.', error);
          }

          try {
            const userInfo = getTokenInfo()!;
            const userId = userInfo.id;

            if (cachedSubscription && cachedSubscription.userId === userId) {
              return;
            }

            const pushSubscription = await Notifications.subscribe();
            const subscription: NotificationSubscriptionObj = Object.assign(pushSubscription, { visitorId, userId });
            Notifications.cache(subscription);
            console.log(subscription);

            const request = new Request(new NotificationSubscriptionApi(subscription));
            await request.build();
          } catch (error) {
            console.error('Faild to subscribe the notification.', error);
          }
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [isUserLoggedIn]);

  return <Fragment>{children}</Fragment>;
};

export default NotificationSubscription;
