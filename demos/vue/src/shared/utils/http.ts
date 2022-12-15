import axios, { AxiosResponse } from 'axios';

import { ResponseExtra, ResponseResult } from '../types';

function normalizeResponse<DataType = any>(res: AxiosResponse): ResponseResult<DataType> {
  return res.status === 200
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
      };
}

export { normalizeResponse, axios as default };
