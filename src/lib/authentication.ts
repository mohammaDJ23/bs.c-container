import { decodeToken } from 'react-jwt';
import { TokenInfo } from '../types';
import { LocalStorage } from './';

export enum UserRoles {
  OWNER = 'owner',
  ADMIN = 'admin',
  USER = 'user',
}

export function getToken(): string {
  const token = LocalStorage.getItem<string>('access_token');
  const tokenExpiration = LocalStorage.getItem<number>('access_token_expiration');

  if (token && tokenExpiration) if (new Date().getTime() < new Date(tokenExpiration).getTime()) return token;

  return '';
}

export function getTokenInfo() {
  return decodeToken<TokenInfo>(getToken());
}

export function isUserAuthenticated() {
  return !!getToken();
}
