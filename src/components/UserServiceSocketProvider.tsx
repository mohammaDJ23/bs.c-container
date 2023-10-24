import { FC, PropsWithChildren, Fragment, useEffect } from 'react';
import { getUserServiceSocket } from '../lib';

const UserServiceSocketProvider: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    const socket = getUserServiceSocket();
    socket.on('connect_error', (err) => {});
    socket.on('users_status', (data) => {
      const event = new CustomEvent('on-users-status', {
        cancelable: true,
        detail: data,
      });
      window.dispatchEvent(event);
    });
    return () => {
      socket.removeAllListeners();
    };
  }, []);

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
