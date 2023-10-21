import { FC, PropsWithChildren, Fragment, useEffect } from 'react';
import { getUserServiceSocket } from '../lib';
import { useSnackbar } from 'notistack';

const UserServiceSocketProvider: FC<PropsWithChildren> = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // const userServiceSocket = getUserServiceSocket();
    // userServiceSocket.on('connect_error', err => {
    //   enqueueSnackbar({message : err.message, variant: "error"})
    // });
    // return () => {
    //   userServiceSocket.removeAllListeners();
    // };
  }, []);

  return <Fragment>{children}</Fragment>;
};

export default UserServiceSocketProvider;
