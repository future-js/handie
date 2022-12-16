import httpClient from '@_/utils/http';

import { Pagination, ResponseResult } from '@/types';

import { GameEntity } from './typing';

async function getList(condition: Pagination): Promise<ResponseResult<GameEntity>> {
  return httpClient.get('/api/games', { params: condition });
}

export { getList };
