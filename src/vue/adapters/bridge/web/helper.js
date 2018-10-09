import { isFunction, mixin } from '../../../utils/common/helper';
import { getPrivate } from '../../../utils/storage/helper';

/**
 * 合并组件属性到实例上
 * 
 * @param {*} $vm 实例
 * @param {*} props 属性
 */
function mergeProps( $vm, props ) {
  const defaults = {};

  for ( let i in $vm.$options.props ) {
    defaults[i] = $vm.$options.props[i].default;
  }

  const resolved = mixin({}, defaults, props);

  for ( let i in resolved ) {
    $vm[i] = resolved[i];
  }
}

/**
 * 处理 Vue 组件实例
 * 
 * @param {*} opts 配置项
 */
export function resolveInstance( opts ) {
  const { options, props, init } = opts;
  const Vue = getPrivate('runtime');
  
  let $vm = opts.$vm;

  if ( $vm ) {
    mergeProps($vm, props);
  }
  else {
    const VueComponent = Vue.extend(options);

    $vm = new VueComponent({el: document.createElement('div'), propsData: props});

    isFunction(init) && init($vm);

    document.body.appendChild($vm.$el);
  }

  return $vm;
}

/**
 * 重新绑定事件
 * 
 * @param {*} $vm 实例
 * @param {*} event 事件名
 * @param {*} handler 处理函数
 */
export function rebindEvent( $vm, event, handler ) {
  $vm.$off(event);

  $vm.$on(event, handler);
}
