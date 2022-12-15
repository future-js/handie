import { ResponseResult } from '@/types';
import httpClient from '@/utils/http';

import { UserAndPermissions } from './typing';

async function getCurrentUser(): Promise<ResponseResult<UserAndPermissions>> {
  return httpClient.get('/api/session/user');
}

export { getCurrentUser };
