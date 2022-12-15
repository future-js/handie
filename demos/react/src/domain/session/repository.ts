import { ResponseResult } from '@/shared/types';

function login({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<ResponseResult> {
  return Promise.resolve(
    (username === 'admin' && password === 'handie'
      ? { success: true }
      : { success: false, message: '用户名或密码错误' }) as ResponseResult,
  );
}

export { login };
