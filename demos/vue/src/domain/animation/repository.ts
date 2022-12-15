import type { Pagination, ResponseResult } from '@/types';
import { isString } from '@/utils';
import httpClient from '@/utils/http';

import { AnimationEntity } from './typing';

async function getList(condition: Pagination): Promise<ResponseResult<AnimationEntity[]>> {
  return httpClient.get('/api/animations', { params: condition });
}

async function getOne(id: string | Record<string, any>): Promise<ResponseResult<AnimationEntity>> {
  return httpClient.get(`/api/animations/${isString(id) ? id : (id as Record<string, any>).id}`);
}

async function deleteList(
  animationList: AnimationEntity[],
): Promise<ResponseResult<AnimationEntity[]>> {
  return httpClient.delete('/api/animations', {
    params: { ids: animationList.map(({ id }) => id).join(',') },
  });
}

async function deleteOne(animation: AnimationEntity): Promise<ResponseResult<AnimationEntity>> {
  return httpClient.delete(`/api/animations/${animation.id}`);
}

async function insert(data) {
  console.log('insert', data);

  return new Promise(resolve => {
    setTimeout(() => resolve({ success: true }), 500);
  });
}

async function update(data) {
  console.log('update', data);

  return new Promise(resolve => {
    setTimeout(() => resolve({ success: true }), 500);
  });
}

export { getList, getOne, insert, update, deleteList, deleteOne };
