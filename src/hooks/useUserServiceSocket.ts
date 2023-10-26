import { useRef } from 'react';
import { getUserServiceSocket } from '../lib';

export function useUserServiceSocket() {
  const socket = useRef<ReturnType<typeof getUserServiceSocket>>(getUserServiceSocket());
  return socket.current;
}
