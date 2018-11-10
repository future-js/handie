import { resolveInstance } from '../helper';
import { Toast } from '../../../../components/toast';

let $toast;

export default function( opts ) {
  const { text, icon, duration, callback } = opts;

  $toast = resolveInstance({
    $vm: $toast,
    options: Toast,
    props: {
      text,
      icon: icon === 'error' ? 'fail' : icon,
      duration: duration * 1000
    },
    init( $vm ) {
      $vm.$on('hidden', () => ($vm.show = false));
    }
  });

  $toast.$once('shown', callback);

  $toast.show = true;
}
