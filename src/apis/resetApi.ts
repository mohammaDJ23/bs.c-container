import axios, { AxiosRequestConfig, CreateAxiosDefaults, AxiosInstance, AxiosError, AxiosResponse } from 'axios';

export interface ErrorObj {
  statusCode: number;
  message: string;
  timestamp: number;
  path: string;
}

export interface RootApiObj<D = any> {
  readonly api: AxiosRequestConfig<D>;
  readonly config?: CreateAxiosDefaults<D>;
}

export class Request<R = any, D = any> implements RootApiObj<D> {
  private readonly axiosInstance: AxiosInstance;
  public readonly api: AxiosRequestConfig<D>;
  public readonly config?: CreateAxiosDefaults<D> | undefined;

  constructor({ api, config = {} }: RootApiObj<D>) {
    this.api = api;
    this.axiosInstance = axios.create(config);
  }

  async build(): Promise<AxiosResponse<R, D>> {
    try {
      return this.axiosInstance.request<R, AxiosResponse<R>, D>(this.api);
    } catch (error) {
      const err = error as AxiosError<ErrorObj, D>;
      throw err;
    }
  }
}
