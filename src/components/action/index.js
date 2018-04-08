class MuuAction extends Polymer.Element {
  static get is() {
    return "x-action";
  }

  static get properties() {
    return {
      type: {
        type: String,
        value: "",
        observer: "_typeChanged"
      },
      url: {
        type: String,
        value: "javascript:void(0);"
      }
    };
  }

  _typeChanged( newVal, oldVal ) {
    this.__isCustom = newVal === "custom";
  }

  /**
   * 页头动作激活状态
   * 
   * @param {*} $target 页头动作
   * @param {*} selector 选择器
   * @param {*} callback 回调函数
   */
  _toggleStatus( $target, selector, callback ) {
    const cls = "is-active";
  
    if ( $.type(selector) !== "string" ) {
      selector = "";
    }
  
    if ( $target.hasClass(cls) ) {
      $target.removeClass(cls);
    }
    else {
      if ( $target.siblings(`${selector}.${cls}`).length ) {
        $target.siblings(`${selector}.${cls}`).removeClass(cls);
      }
  
      if ( $.isFunction(callback) ) {
        callback.call($target.get(0), cls);
      }
      else {
        $target.addClass(cls);
      }
    }
  }

  _initTriggerEvent() {
    const el = this;
    const toggleStatus = el._toggleStatus;

    $(".Action-trigger", $(el.shadowRoot)).on("click", function() {
      const $t = $(this);

      if ( !($t.is("a[href^='javascript:']") || $t.is("button")) ) {
        return;
      }
  
      toggleStatus($(el), null, function( cls ) {
        if ( $t.siblings(".Action-content").length ) {
          $(this).addClass(cls);
        }
      });
    });
  }

  ready() {
    super.ready();

    const el = this;

    $(document).on("click", function( e ) {
      const tagName = el.tagName.toLowerCase();
      const cls = "is-active";

      if ( $(`${tagName}.${cls}`).length ) {
        const $aw = $(e.target).closest(`${tagName}.${cls}`);
  
        if ( $aw.length === 0 ) {
          $(`${tagName}.${cls}`).removeClass(cls);
        }
      }
    });

    $("dom-if", $(el.shadowRoot)).on("dom-change", () => {
      el._initTriggerEvent();
    });
  }
}
