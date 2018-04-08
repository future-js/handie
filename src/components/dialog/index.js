class MuuDialog extends Polymer.Element {
  static get is() {
    return "x-dialog";
  }
  
  static get properties() {
    return {
      size: {
        type: String,
        value: "",
        observer: "_sizeChanged"
      },
      dialogTitle: {
        type: String,
        value: ""
      }
    };
  }

  _sizeChanged( size ) {
    const $dlg = $(".modal-dialog", $(this.shadowRoot));
    const sizes = ["lg", "sm"];
    const classes = [];
    const regexp = new RegExp(`modal\\-(${sizes.join("|")})`, "g");

    $.each($dlg.attr("class").split(" "), ( idx, cls ) => {
      if ( !regexp.test(cls) ) {
        classes.push(cls);
      }
    });

    if ( sizes.indexOf(size) > -1 ) {
      classes.push(`modal-${size}`);
    }

    $dlg.attr("class", classes.join(" "));
  }

  _resolveEventTarget( evt ) {
    return evt.originalEvent && evt.originalEvent.composedPath ? evt.originalEvent.composedPath()[0] : evt.target;
  }

  /**
   * Hack Bootstrap Modal
   */
  _hack() {
    const $host = $(this);
    const $dlg = $(".modal-dialog", $(this.shadowRoot));

    $host.modal({show: false});
    
    const inst = $host.data("bs.modal");
    const CLICK_EVENT = "click.dismiss.bs.modal";
    const MOUSEDOWN_EVENT = "mousedown.dismiss.bs.modal";
    
    inst.$dialog = $dlg;

    $dlg.on(CLICK_EVENT, "[data-dismiss='modal']", ( evt ) => {
      $dlg.get(0).dispatchEvent(new Event(CLICK_EVENT, {bubbles: true, composed: true}));
    });

    $host.on("shown.bs.modal", () => {
      // Hack for `mousedown.dismiss.bs.modal` event binding in `Modal.prototype.show`
      $dlg.off(MOUSEDOWN_EVENT).on(MOUSEDOWN_EVENT, () => {
        $host.one("mouseup.dismiss.bs.modal", ( evt ) => {
          if ( $(this._resolveEventTarget(evt)).is($host) ) {
            inst.ignoreBackdropClick = true;
          }
        });
      });

      $host
        .off(CLICK_EVENT)
        // Hack for `click.dismiss.bs.modal` event binding in `Modal.prototype.backdrop`
        .on(CLICK_EVENT, ( evt ) => {
          if ( inst.ignoreBackdropClick ) {
            inst.ignoreBackdropClick = false;

            return;
          }

          if ( this._resolveEventTarget(evt) !== evt.currentTarget ) {
            return;
          }

          inst.options.backdrop === "static" ? $host.get(0).focus(): inst.hide();
        })
        // Hack for `click.dismiss.bs.modal` event binding in `Modal.prototype.show`
        .on(CLICK_EVENT, ( evt ) => {
          if ( $(this._resolveEventTarget(evt)).closest("[data-dismiss=\"modal\"]").length ) {
            inst.hide(evt);
          }
        });
    });
  }
  
  ready() {
    super.ready();

    $(this).addClass("modal fade");

    this._hack();
  }
}
