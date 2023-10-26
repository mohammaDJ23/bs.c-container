import { FC, PropsWithChildren, Fragment, useEffect, useRef } from 'react';
import { getUserServiceSocket } from '../lib';

const UserServiceSocketProvider: FC<PropsWithChildren> = ({ children }) => {
  const socket = useRef(getUserServiceSocket());

  useEffect(() => {
    socket.current.on('connect_error', (err) => {
      console.error(err);
    });
  }, []);

  useEffect(() => {
    socket.current.emit('users_status');
    socket.current.on('users_status', (data) => {
      const event = new CustomEvent('users-status', {
        cancelable: true,
        detail: data,
      });
      window.dispatchEvent(event);
    });
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
