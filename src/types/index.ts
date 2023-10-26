export interface TokenInfo {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  expiration: string;
}

interface UserStatusObj extends TokenInfo {
  lastConnection: Date | null;
}

export interface NotificationSubscriptionObj extends PushSubscriptionJSON {
  visitorId: string;
  userId: number;
}

export type UsersStatusType = Record<number, UserStatusObj>;
