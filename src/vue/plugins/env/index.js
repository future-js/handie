import { isDingTalk, isWeChat, isAndroid } from '../../utils/common/helper';
import { setPrivate } from '../../utils/storage/helper';

export default function( Vue ) {
  const env = {
      dingtalk: isDingTalk() !== false,
      wechat: isWeChat(),
      android: isAndroid()
    };
  
  env.native = env.dingtalk;
  
  Vue.muu.env = env;

  setPrivate('env', env);
  setPrivate('approach', env.dingtalk ? isDingTalk() : 'web');
}
