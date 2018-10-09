import { isFunction, map, mixin } from '../../utils/common/helper';
import { resolveAction } from '../../utils/action/helper';
import { invoke } from '../../adapters/bridge';

export default function( Vue ) {
  mixin(Vue.muu, {
    alert( ...args ) {
      return invoke('notice.alert', ...args);
    },
    confirm( ...args ) {
      return invoke('notice.confirm', ...args);
    },
    actionSheet( opts ) {
      opts = mixin({
          title: '',
          actions: [],
          cancel: {
            text: '取消'
          }
        }, opts);
      
      opts.actions = map(opts.actions, ( action, idx ) => resolveAction(idx, action));
  
      if ( !isFunction(opts.handler) ) {
        opts.handler = function() {}
      }
  
      if ( !isFunction(opts.cancel.handler) ) {
        opts.cancel.handler = function() {}
      }

      return invoke('notice.actionSheet', opts);
    }
  });
}
