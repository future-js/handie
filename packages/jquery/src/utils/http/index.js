import * as http from 'handie/utils/http';

import { isPlainObject, last } from '../common/helper';
import { setDefaults, getDefaults } from '../storage/helper';

import HTTP_DEFAULTS from './defaults';

setDefaults('http', HTTP_DEFAULTS);

function waitingForResponse( $target, text = getDefaults('http.waitingText') ) {
  const $dlg = $target.closest('.modal');

  if ( $dlg.length ) {
    $dlg.addClass('is-waiting');

    if ( $('.js-waitForResult', $dlg).length ) {
      $('.js-waitForResult', $dlg).show();
    }
    else {
      $('.modal-content', $dlg).append(`<div class="Layer Layer--loading js-waitForResult"><p>${text}</p></div>`);
    }

    $('button', $('.modal-header, .modal-footer', $dlg)).prop('disabled', true);
  }
}

function generateHttpUtil( method ) {
  return ( ...args ) => {
    const opts = last(args);

    if ( isPlainObject(opts) && opts.$waiting ) {
      waitingForResponse(opts.$waiting, opts.waitingText);
    }

    return http[method](...args);
  }
}

const httpGetUtil = generateHttpUtil('get');
const httpPostUtil = generateHttpUtil('post');
const httpPutUtil = generateHttpUtil('put');
const httpDeleteUtil = generateHttpUtil('delete');

export {
  httpGetUtil as get,
  httpPostUtil as post,
  httpPutUtil as put,
  httpDeleteUtil as delete,
  waitingForResponse as waiting
}

export const result = ( ...args ) => getDefaults('http.responseHandler')(...args);
