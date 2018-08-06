import { isArray, isPlainObject } from '../common/helper';
import { jsonify } from '../form';

export default {
  RESTful: true,
  waitingText: '数据保存中，请耐心等待...',
  jsonify: params => isPlainObject(params) || isArray(params) ? params : jsonify(params),
  completeHandler() {
    $('.modal:visible .js-waitForResult:visible').each(function() {
      const $layer = $(this);
      const $modal = $layer.closest('.modal');
  
      $layer.hide();
      $modal.removeClass('is-waiting');
      $('button', $('.modal-header, .modal-footer', $modal)).prop('disabled', false);
    });
  }
}
