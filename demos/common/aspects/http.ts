import type { AxiosInstance, AxiosResponse } from 'axios';
import type { ResponseExtra } from '@handie/runtime-core';

function setInterceptors(httpClient: AxiosInstance): void {
  (httpClient.interceptors.response as any).use((res: AxiosResponse) =>
    res.status === 200
      ? {
          success: true,
          message: '',
          code: '',
          data: undefined as any,
          extra: {} as ResponseExtra,
          ...res.data,
        }
      : {
          success: false,
          message: res.data as string,
          code: `${res.status}`,
          data: undefined as any,
          extra: {} as ResponseExtra,
        },
  );
}

export { setInterceptors };
