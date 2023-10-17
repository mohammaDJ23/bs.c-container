export namespace Container {
  export interface TokenInfo {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    expiration: string;
  }
}

export interface NotificationSubscriptionObj extends PushSubscriptionJSON {
  visitorId: string;
}
