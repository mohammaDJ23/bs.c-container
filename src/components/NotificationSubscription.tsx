import { FC, PropsWithChildren, Fragment, useEffect } from 'react';
import { Notifications, isUserAuthenticated } from '../lib';
import { Fingerprint } from '../lib/fingerprint';

const NotificationSubscription: FC<PropsWithChildren> = ({ children }) => {
  const isUserLoggedIn = isUserAuthenticated();

  useEffect(() => {
    (async function () {
      try {
        if (isUserLoggedIn) {
          const pushSubscription = await Notifications.subscribe();
          if (pushSubscription) {
            const visitorId = await Fingerprint.getVisitorId();
            const subscription = Object.assign(pushSubscription, { visitorId });
            console.log(subscription);
          }
        }
      } catch (error) {
        console.error('Faild to subscribe the notification.', error);
      }
    })();
  }, [isUserLoggedIn]);

  return <Fragment>{children}</Fragment>;
};

export default NotificationSubscription;
