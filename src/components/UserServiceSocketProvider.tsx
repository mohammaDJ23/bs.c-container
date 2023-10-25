import { FC, PropsWithChildren, Fragment, useEffect } from 'react';
import { getUserServiceSocket } from '../lib';

const UserServiceSocketProvider: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    const socket = getUserServiceSocket();
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
