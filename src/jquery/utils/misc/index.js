import { isString, isFunction, isPlainObject } from '../common/helper';

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

export {
  alertMessage as alert
}
