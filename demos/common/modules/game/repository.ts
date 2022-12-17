import type { Pagination, ResponseResult } from '@handie/runtime-core';

import httpClient from '../../utils/http';
import type { GameEntity } from './typing';

const { mockGetList } = require('./mock'); // eslint-disable-line @typescript-eslint/no-var-requires

const inNodeJs = process.env.NODE_ENV === 'development';

async function getList(condition: Pagination): Promise<ResponseResult<GameEntity>> {
  return inNodeJs ? httpClient.get('/api/games', { params: condition }) : mockGetList(condition);
}

export { getList };
