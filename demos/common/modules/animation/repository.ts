import { Pagination, ResponseResult, isString } from '@handie/runtime-core';

import httpClient from '../../utils/http';

import { AnimationEntity } from './typing';

async function getList(condition: Pagination): Promise<ResponseResult<AnimationEntity[]>> {
  return httpClient.get('/api/animations', { params: condition });
}

async function getOne(id: string | Record<string, any>): Promise<ResponseResult<AnimationEntity>> {
  return httpClient
    .get(`/api/animations/${isString(id) ? id : (id as Record<string, any>).id}`)
    .then(({ data, ...others }) => ({
      ...others,
      data: { ...data, dateRange: [data.date.start, data.date.end], startDate: data.date.start },
    }));
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

async function deleteOne(animation: AnimationEntity): Promise<ResponseResult<AnimationEntity>> {
  return httpClient.delete(`/api/animations/${animation.id}`);
}

async function deleteList(
  animationList: AnimationEntity[],
): Promise<ResponseResult<AnimationEntity[]>> {
  return httpClient.delete('/api/animations', {
    params: { ids: animationList.map(({ id }) => id).join(',') },
  });
}

export { getList, getOne, insert, update, deleteOne, deleteList };
