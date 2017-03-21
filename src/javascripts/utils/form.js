utils.select = {
  change: function( $sel, val, callback ) {
    $(((val == null || val === "") ? ":first" : `[value='${val}']`), $sel)
      .prop("selected", true)
      .siblings(":selected")
      .prop("selected", false);

    if ( $.isFunction(callback) ) {
      callback.call($sel.get(0));
    }

    $sel.trigger("change");

    return $sel;
  }
};

utils.form = {
  /**
   * 填充表单
   *
   * @param $form
   * @param data
   */
  fill: function( $form, data ) {
    $("[name]", $form).each(function() {
      let $ipt = $(this);
      let tagName = this.tagName.toLowerCase();
      let key = $ipt.attr("name");
      let value = data[key];

      if ( ["input", "textarea"].includes(tagName) ) {
        if ( ["radio", "checkbox"].includes($ipt.attr("type")) ) {
          $(`[name="${key}"][value="${value}"]`, $form).prop("checked", true);
        }
        else {
          $ipt.val(value);
        }
      }
      else if ( tagName === "select" ) {
        utils.select.change($ipt, value);
      }
    });
  }
};

if ( H5F ) {
  utils.form.h5f = function( $form ) {
    H5F.init($form, {immediate: false});

    $("[name]", $form).on({
      "H5F:valid": function( e, f ) {
        let $cell = $(e.target).closest("div");
        let $group = $(".ErrorGroup", $cell);

        $(".Error[data-name='" + f.name + "']", $cell).remove();

        if ( $(".Error", $group).size() === 0 ) {
          $group.remove();
        }
      },
      "H5F:invalid": function( e, f ) {
        let $cell = $(e.target).closest("div");
        let $err = $(".Error[data-name='" + f.name + "']", $cell);

        if ( $(".ErrorGroup", $cell).size() === 0 ) {
          $cell.append("<div class=\"ErrorGroup\" />");
        }

        if ( $err.size() === 0 ) {
          $(".ErrorGroup", $cell).append("<p class=\"Error\" data-name=\"" + f.name + "\" />");

          $err = $(".Error[data-name='" + f.name + "']", $cell);
        }

        $err.text(f.message);
      }
    });

    $form.on("reset", function() {
      $(".ErrorGroup", $form).remove();
    });
  };
}

utils.field = {
  fill: function( $container, data, callback ) {
    $("[data-field]", $container).each(function() {
      let $f = $(this);
      let val = data[$f.attr("data-field")];

      if ( $f.is("img") ) {
        $f.attr("src", val);
      }
      else {
        $f.text(val || "-");
      }

      if ( $.isFunction(callback) ) {
        callback.apply(this, [$f.attr("data-field"), val]);
      }
    });
  },
  datepicker: function( $picker = $(".js-pickDate"), opts ) {
    $picker.each(function() {
      let $p = $(this);
      let $ipt = $(`[name="${$p.attr("data-to")}"]`, $p.closest("form"));

      $p.datepicker($.extend({
        language: "zh-CN",
        autohide: true
      }, ($ipt.size() ? {
        pick: function() {
          $ipt.val(moment($(this).datepicker("getDate")).format());
        }
      } : null), opts));

      if ( $ipt.size() ) {
        $p.on("change", function() {
          if ( $(this).val() === "" ) {
            $ipt.val("");
          }
        });
      }
    });
  }
};
