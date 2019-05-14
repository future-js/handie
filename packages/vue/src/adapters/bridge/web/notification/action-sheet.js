import { isFunction } from '../../../../utils/common/helper';
import { resolveInstance, rebindEvent } from '../helper';
import { ActionSheet } from '../../../../components/action-sheet';

let $actionSheet;

export default function( opts ) {
  const { title, actions, cancel: cancelable } = opts;

  $actionSheet = resolveInstance({
    $vm: $actionSheet,
    options: ActionSheet,
    props: {title, actions, cancelable},
    init( $vm ) {
      $vm.$on('trigger', function( item ) {
        (isFunction(item.handler) ? item.handler : opts.handler).call(this, item);
      });
  
      $vm.$on('hidden', () => ($vm.show = false));
    }
  });

  rebindEvent($actionSheet, 'cancel', cancelable.handler);

  $actionSheet.show = true;
}
