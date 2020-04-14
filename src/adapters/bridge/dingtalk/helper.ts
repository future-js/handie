import { isFunction } from '../../../utils/is/type';
import { mixin } from '../../../utils/collection';
import { retrieveData } from '../../../utils/storage/helper';

/**
 * 调用钉钉 API
 *
 * @param {*} ref API 引用
 * @param {*} opts 配置项
 */
export function invokeDingTalkApi( ref: string, opts?: any ): any {
  // const handler = retrieveData(dd, ref);

  // if ( !isFunction(handler) ) {
  //   return;
  // }

  // return handler(mixin({onFail: ( ...args: any[] ) => console.log(...args)}, opts));
}
