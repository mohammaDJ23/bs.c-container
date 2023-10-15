import { getServiceWorkerRegistration } from './serviceWorkerRegisteration';

export class Notifications {
  static async subscribe(): Promise<PushSubscriptionJSON | undefined> {
    try {
      const registration = await getServiceWorkerRegistration();
      const subscriptionOptions = {
        userVisibleOnly: true,
        applicationServerKey: 'BOd2EQ8LTe3KAgMX9lWwTlHTRzv1Iantw50Mw6pUnsNr3pcxl8iglUs-YlQEQLo4UbJk9oyXs_BxgyAe0TCqKME',
      };
      const permission = await registration.pushManager.permissionState(subscriptionOptions);
      if (permission === 'denied' || permission === 'prompt') {
        const subscription = await registration.pushManager.subscribe(subscriptionOptions);
        return subscription.toJSON();
      }
      return undefined;
    } catch (error) {
      throw error;
    }
  }
}
