import { isFunction } from '../../../../utils/common/helper';
import { resolveInstance } from '../helper';
import { Toast } from '../../../../components/toast';

let $loading;

function showLoading( opts ) {
  const { text, callback } = opts;

  $loading = resolveInstance({
    $vm: $loading,
    options: Toast,
    props: {
      text,
      icon: 'loading',
      duration: -1
    }
  });

  isFunction(callback) && $loading.$once('shown', callback);

  $loading.show = true;
}

function hideLoading( callback ) {
  isFunction(callback) && $loading.$once('hidden', callback);

  $loading.show = false;
}

export default {
  show: showLoading,
  hide: hideLoading
};
