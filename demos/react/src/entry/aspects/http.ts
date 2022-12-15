import { AxiosResponse } from 'axios';

import httpClient, { normalizeResponse, normalizeFintechResponse } from '@/shared/utils/http';

function setInterceptors(): void {
  (httpClient.interceptors.response as any).use((res: AxiosResponse) =>
    res.config.url!.indexOf('/fintech') > -1
      ? normalizeFintechResponse(res)
      : normalizeResponse(res),
  );
}

export { setInterceptors };
