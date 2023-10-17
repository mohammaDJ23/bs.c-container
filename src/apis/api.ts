import { AxiosRequestConfig, CreateAxiosDefaults } from 'axios';
import { RootApiObj } from './resetApi';
import { NotificationSubscriptionObj } from '../types';
import { getToken } from '../lib';

export abstract class RootApi<D = any> implements RootApiObj<D> {
  protected _isInitialApi: boolean = false;

  constructor(public readonly api: AxiosRequestConfig<D>, public readonly config: CreateAxiosDefaults<D> = {}) {
    this.api = api;
    this.config = config;
  }

  get isInitialApi() {
    return this._isInitialApi;
  }

  setInitialApi(value: boolean = true) {
    this._isInitialApi = value;
    return this;
  }
}

export class NotificationSubscriptionApi extends RootApi {
  constructor(data: NotificationSubscriptionObj) {
    super(
      {
        url: `/api/v1/notification/subscribe`,
        method: 'post',
        data,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      },
      { baseURL: process.env.NOTIFICATION_SERVICE }
    );
  }
}
