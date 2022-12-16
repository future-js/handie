import httpClient from '@_/utils/http';

import { ResponseResult } from '@/types';

import { UserAndPermissions } from './typing';

async function getCurrentUser(): Promise<ResponseResult<UserAndPermissions>> {
  return httpClient.get('/api/session/user');
}

export { getCurrentUser };
