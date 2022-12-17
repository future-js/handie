import { Pagination, ResponseResult, isString } from '@handie/runtime-core';

import httpClient from '../../utils/http';
import { AnimationEntity } from './typing';

const { mockGetList, mockGetOne, mockDeleteOne, mockDeleteList } = require('./mock'); // eslint-disable-line @typescript-eslint/no-var-requires

const inNodeJs = process.env.NODE_ENV === 'development';

async function getList(condition: Pagination): Promise<ResponseResult<AnimationEntity[]>> {
  return inNodeJs
    ? httpClient.get('/api/animations', { params: condition })
    : mockGetList(condition);
}

async function getOne(id: string | Record<string, any>): Promise<ResponseResult<AnimationEntity>> {
  const resolvedId = isString(id) ? id : (id as Record<string, any>).id;
  const resResolver = ({ data, ...others }) =>
    ({
      ...others,
      data: { ...data, dateRange: [data.date.start, data.date.end], startDate: data.date.start },
    } as ResponseResult<AnimationEntity>);

  return inNodeJs
    ? httpClient.get(`/api/animations/${resolvedId}`).then(resResolver)
    : resResolver(mockGetOne({ id: resolvedId }));
}

async function insert(data: AnimationEntity): Promise<ResponseResult> {
  console.log('insert', data);

  return new Promise(resolve => {
    setTimeout(() => resolve({ success: true } as ResponseResult), 500);
  });
}

async function update(data: AnimationEntity): Promise<ResponseResult> {
  console.log('update', data);

  return new Promise(resolve => {
    setTimeout(() => resolve({ success: true } as ResponseResult), 500);
  });
}

async function deleteOne({ id }: AnimationEntity): Promise<ResponseResult<AnimationEntity>> {
  return inNodeJs ? httpClient.delete(`/api/animations/${id}`) : mockDeleteOne({ id });
}

async function deleteList(
  animationList: AnimationEntity[],
): Promise<ResponseResult<AnimationEntity[]>> {
  const ids = animationList.map(({ id }) => id).join(',');

  return inNodeJs
    ? httpClient.delete('/api/animations', {
        params: { ids },
      })
    : mockDeleteList({ ids });
}

export { getList, getOne, insert, update, deleteOne, deleteList };
