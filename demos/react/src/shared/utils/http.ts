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

function normalizeFintechResponse<DataType = any>({
  status,
  data,
}: AxiosResponse): ResponseResult<DataType> {
  return status === 200
    ? {
        success: data.success,
        message: data.message || '',
        code: data.msgCode || '',
        data: data.value,
        extra: data.resultMap || {},
      }
    : {
        success: false,
        message: data as string,
        code: `${status}`,
        data: undefined as any,
        extra: {} as ResponseExtra,
      };
}

export { normalizeResponse, normalizeFintechResponse, axios as default };
