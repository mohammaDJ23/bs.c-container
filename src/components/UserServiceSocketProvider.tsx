import { FC, PropsWithChildren, Fragment, useEffect, useState } from 'react';
import { UserRoles, getTokenInfo, isUserAuthenticated } from '../lib';
import { useUserServiceSocket } from '../hooks';
import { UsersStatusType } from '../types';

const UsersServiceSocketProvider: FC<PropsWithChildren> = ({ children }) => {
  const socket = useUserServiceSocket();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isUserAuthenticated());

  useEffect(() => {
    if (!isUserLoggedIn) {
      setIsUserLoggedIn(isUserAuthenticated());
    }
  }, [isUserLoggedIn]);

  useEffect(() => {
    if (isUserLoggedIn) {
      const userInfo = getTokenInfo()!;
      if (userInfo.role === UserRoles.OWNER) {
        socket.emit('users_status');
        socket.on('users_status', (data: UsersStatusType) => {
          const event = new CustomEvent('users-status', {
            cancelable: true,
            detail: data,
          });
          window.dispatchEvent(event);
        });
      }
    }
  }, [isUserLoggedIn]);

  useEffect(() => {
    window.addEventListener('on-login', () => {
      window.location.reload();
    });
    window.addEventListener('on-logout', () => {
      window.location.reload();
    });
  }, []);

  return <Fragment>{children}</Fragment>;
};

export default UsersServiceSocketProvider;
