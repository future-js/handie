import { isString, isFunction, isPlainObject, arrayEach, hasOwnProp, mixin, clone } from "../common/helper";
import { defaults } from "../common/settings";

let bizData = {};

function resolveRefKeys( str ) {
  return isString(str) &&
    (new RegExp("^[0-9a-z_]+(\.[0-9a-z_]+)*$", "i")).test(str) ?
    str.split(".") : [];
}

function setData( key, val ) {
  let keys = resolveRefKeys(key);

  if ( arguments.length < 2 || keys.length === 0 ) {
    return;
  }

  let lastKey = keys.pop();
  let tmp = bizData;

  arrayEach(keys, function( k ) {
    if ( !hasOwnProp(k, tmp) ) {
      tmp[k] = {};
    }

    tmp = tmp[k];
  });

  tmp[lastKey] = val;

  return val;
}

function getData( key ) {
  let keys = resolveRefKeys(key);

  if ( keys.length === 0 ) {
    return;
  }

  let idx = 0;
  let keyLength = keys.length;
  let tmp = clone(bizData);
  let val, k;

  for ( ; idx < keyLength; idx++ ) {
    k = keys[idx];
    val = tmp[k];

    if ( !hasOwnProp(k, tmp) ) {
      break;
    }

    tmp = val;
  }

  return val;
}

function alertMessage( message, settings ) {
  let type, formatter;

  if ( isString(settings) ) {
    type = settings;
  }
  else if ( isPlainObject(settings) ) {
    type = settings.type;
    formatter = settings.formatter;
  }

  if ( type === "bootstrap" ) {
    let $m = $(".js-alertSystemMessage");

    if ( $m.length === 0 ) {
      $m = $(`
          <div class="modal fade js-alertSystemMessage">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                  <h4 class="modal-title">系统提示</h4>
                </div>
                <div class="modal-body"></div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                </div>
              </div>
            </div>
          </div>
        `);

      $("body").append($m);
    }

    if ( !isFunction(formatter) ) {
      formatter = message => {
        return `<p class="u-textBreak">${message}</p>`;
      };
    }

    $(".modal-body", $m).html(formatter.call(null, message) || message);

    $m.modal("show");
  }
  else {
    window.alert(message);
  }
}

export const $el = {
  triggerType: ( $el ) => {
    return $el.attr("class").match(/js\-([a-zA-Z]+)/)[1];
  }
};

export function setDefaults( settings ) {
  mixin(true, defaults, settings);
}

export {
  setData as set,
  getData as get,
  alertMessage as alert
}
