import { getServiceWorkerRegistration } from './serviceWorkerRegisteration';

export class Notifications {
  static async subscribe(): Promise<PushSubscriptionJSON | undefined> {
    const registration = await getServiceWorkerRegistration();
    const subscriptionOptions = {
      userVisibleOnly: true,
      applicationServerKey: process.env.APPLICATION_SERVER_KEY,
    };
    const permission = await registration.pushManager.permissionState(subscriptionOptions);
    if (permission === 'denied' || permission === 'prompt') {
      const subscription = await registration.pushManager.subscribe(subscriptionOptions);
      return subscription.toJSON();
    }
    return undefined;
  }
}
