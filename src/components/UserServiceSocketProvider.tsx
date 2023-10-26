import { FC, PropsWithChildren, Fragment, useEffect, useRef, useState } from 'react';
import { UserRoles, getTokenInfo, getUserServiceSocket, isUserAuthenticated } from '../lib';

const UserServiceSocketProvider: FC<PropsWithChildren> = ({ children }) => {
  const socket = useRef(getUserServiceSocket());
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isUserAuthenticated());

  useEffect(() => {
    if (!isUserLoggedIn) {
      setIsUserLoggedIn(isUserAuthenticated());
    }
  }, [isUserLoggedIn]);

  useEffect(() => {
    socket.current.on('connect_error', (err) => {
      console.error('Socket error: ', err);
    });
  }, []);

  useEffect(() => {
    if (isUserLoggedIn) {
      const userInfo = getTokenInfo()!;
      if (userInfo.role === UserRoles.OWNER) {
        socket.current.emit('users_status');
        socket.current.on('users_status', (data) => {
          console.log(data);
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

export default UserServiceSocketProvider;
