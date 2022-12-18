import type { ResponseResult } from '@handie/runtime-core';

import httpClient from '../../utils/http';
import { UserAndPermissions } from './typing';
import { DEMO_USER } from './helper';

const { mockGetCurrentUser } = require('./mock'); // eslint-disable-line @typescript-eslint/no-var-requires

async function login(params: { username: string; password: string }): Promise<ResponseResult> {
  return Promise.resolve(
    (Object.entries(params).every(([k, v]) => v === DEMO_USER[k])
      ? { success: true }
      : { success: false, message: '用户名或密码错误' }) as ResponseResult,
  );
}

async function getCurrentUser(): Promise<ResponseResult<UserAndPermissions>> {
  return process.env.NODE_ENV === 'development'
    ? httpClient.get('/api/session/user')
    : mockGetCurrentUser();
}

export { login, getCurrentUser };
