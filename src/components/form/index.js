class MuuForm extends Polymer.Element {
  static get is() {
    return "x-form";
  }

  static get properties() {
    return {
      grid: {
        type: String,
        value: "",
        observer: "_updateGrid"
      },
      vertical: {
        type: Boolean,
        value: false,
        observer: "_updateDirection"
      },
      novalidate: {
        type: Boolean,
        value: false,
        observer: "_updateValidation"
      }
    };
  }

  __resolveForm() {
    let $el = this.__$el;

    if ( !$el ) {
      this.__$el = $("form", $(this.shadowRoot));

      $el = this.__$el;
    }

    return $el;
  }

  __triggerChildrenEvent( eventName ) {
    $(this.__children).each(function() {
      $(this).trigger(eventName);
    });
  }

  __triggerEvent( formEvt ) {
    const $form = this.__$el;

    const evt = $.Event(formEvt.type);
    const preventDefault = evt.preventDefault;

    evt.preventDefault = function( ...args ) {
      formEvt.preventDefault();
      preventDefault.apply(this, ...args);
    }

    evt.relatedTarget = $form.get(0);

    return $(this).trigger(evt, {
      serialize: () => {
        return $form.serializeArray();
      },
      jsonify: () => {
        return muu.form.jsonify($form);
      },
      h5f: H5F.get($form)
    });
  }

  __initEvents() {
    const el = this;
    const $el = $(el);
    const $form = el.__$el;

    $el.on("submit reset", function( evt ) {
      if ( evt.relatedTarget !== $form.get(0) && arguments.length < 2 ) {
        evt.stopImmediatePropagation();
        
        $form.trigger(evt.type);
      }
    });

    $el.on("submit", ( evt, extra ) => {
      if ( extra && extra.h5f && extra.h5f.invalidCount ) {
        evt.stopImmediatePropagation();

        return false;
      }
    });

    $form.on("submit reset", ( evt ) => {
      el.__triggerEvent(evt);
    });
  }

  _updateGrid( newGrid ) {
    this.__resolveForm();
    this.__triggerChildrenEvent("adjust.internal.muu.field");
  }

  _updateDirection( isVertical ) {
    const $form = this.__resolveForm();

    if ( isVertical ) {
      $form.removeClass("form-horizontal");
      
      const $groups = $form.children();

      if ( !$groups.eq(0).is(".row") ) {
        $groups.wrapAll(`<div class="row" />`);
      }
    }
    else {
      $form.addClass("form-horizontal");

      const $row = $form.children(".row");

      if ( $row.length > 0 ) {
        $row.children().unwrap();
      }
    }

    this.__triggerChildrenEvent("draw.internal.muu.field");
  }

  _updateValidation() {
    if ( !this.__validationInitializable ) {
      return;
    }
  }

  ready() {
    super.ready();

    this.__initEvents();

    const $form = this.__$el;

    $form.ready(() => {
      this.__validationInitializable = true;

      if ( !this.novalidate ) {
        muu.form.h5f($form);
      }
    });
  }
}
