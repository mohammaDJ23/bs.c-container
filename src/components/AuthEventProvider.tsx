import { FC, PropsWithChildren, Fragment, useEffect } from 'react';

const AuthEventProvider: FC<PropsWithChildren> = ({ children }) => {
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

export default AuthEventProvider;
