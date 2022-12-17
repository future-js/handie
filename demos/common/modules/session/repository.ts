import type { ResponseResult } from '@handie/runtime-core';

import httpClient from '../../utils/http';
import { UserAndPermissions } from './typing';

const { mockGetCurrentUser } = require('./mock'); // eslint-disable-line @typescript-eslint/no-var-requires

async function getCurrentUser(): Promise<ResponseResult<UserAndPermissions>> {
  return process.env.NODE_ENV === 'development'
    ? httpClient.get('/api/session/user')
    : mockGetCurrentUser();
}

export { getCurrentUser };
