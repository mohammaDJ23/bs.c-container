import { NotificationSubscriptionObj } from '../types';
import { LocalStorage } from './localStorage';
import { getServiceWorkerRegistration } from './serviceWorkerRegisteration';

export class Notifications {
  private static cacheKey: string = 'push-notification';
  private static pushSubscriptionOptions: PushSubscriptionOptionsInit = {
    userVisibleOnly: true,
    applicationServerKey: process.env.APPLICATION_SERVER_KEY,
  };

  static async subscribe(): Promise<PushSubscriptionJSON> {
    const registration = await getServiceWorkerRegistration();
    let subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      subscription = await registration.pushManager.subscribe(this.pushSubscriptionOptions);
    }
    return subscription.toJSON();
  }

  static async getPermission(): Promise<PermissionState> {
    const registration = await getServiceWorkerRegistration();
    return registration.pushManager.permissionState(this.pushSubscriptionOptions);
  }

  static cache(obj: NotificationSubscriptionObj) {
    LocalStorage.setItem(this.cacheKey, obj);
  }

  static getCached(): NotificationSubscriptionObj | null {
    return LocalStorage.getItem(this.cacheKey);
  }

  static removeCached() {
    LocalStorage.removeItem(this.cacheKey);
  }
}
