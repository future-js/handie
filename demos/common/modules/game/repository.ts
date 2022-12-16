import type { Pagination, ResponseResult } from '@handie/runtime-core';

import httpClient from '../../utils/http';

import type { GameEntity } from './typing';

async function getList(condition: Pagination): Promise<ResponseResult<GameEntity>> {
  return httpClient.get('/api/games', { params: condition });
}

export { getList };
