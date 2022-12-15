import { ResponseResult } from './shared/types';

declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<ResponseResult>;
    (url: string, config?: AxiosRequestConfig): Promise<ResponseResult>;
    request<T = any>(config: AxiosRequestConfig): Promise<ResponseResult<T>>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ResponseResult<T>>;
    delete(url: string, config?: AxiosRequestConfig): Promise<ResponseResult>;
    head(url: string, config?: AxiosRequestConfig): Promise<ResponseResult>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseResult<T>>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseResult<T>>;
    patch<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<ResponseResult<T>>;
  }
}
