import { FC, PropsWithChildren, Fragment, useEffect } from 'react';
import { Notifications, isUserAuthenticated } from '../lib';

const NotificationSubscription: FC<PropsWithChildren> = ({ children }) => {
  const isUserLoggedIn = isUserAuthenticated();

  useEffect(() => {
    if (isUserLoggedIn) {
      Notifications.subscribe().then((subscription) => {
        if (subscription) {
          console.log(subscription);
        }
      });
    }
  }, [isUserLoggedIn]);

  return <Fragment>{children}</Fragment>;
};

export default NotificationSubscription;
