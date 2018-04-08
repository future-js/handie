class MuuField extends Polymer.Element {
  static get is() {
    return "x-field";
  }

  static get properties() {
    return {
      type: {
        type: String,
        value: "",
        observer: "_updateType"
      },
      label: {
        type: String,
        value: "",
        observer: "_updateLabel"
      },
      required: {
        type: Boolean,
        value: false,
        observer: "_updateRequired"
      },
      name: {
        type: String,
        value: "",
        observer: "_updateFieldName"
      },
      value: {
        type: String,
        value: "",
        observer: "_updateFieldValue"
      }
    };
  }

  /**
   * 生成随机 ID
   */
  __generateRandomId() {
    return `muu-field-${(new Date()).getTime().toString(32).toUpperCase()}`;
  }

  /**
   * 处理字段相关信息
   */
  __resolveField() {
    let $el = this.__$el;
    let type = this.type;
    
    const tagName = type === "textarea" ? "textarea" : "input";

    if ( !type ) {
      type = "text";
    }

    if ( $el && $el.get(0).tagName.toLowerCase() === tagName ) {
      if ( tagName === "input" ) {
        $el.attr("type", type);
      }
      
      return $el;
    }

    let html;

    switch ( tagName ) {
      case "textarea":
        html = "<textarea />";
        break;
      default:
        html = `<input type="${type}" />`;
    }
    
    this.__$el = $(html);

    if ( $el ) {
      $el.after(this.__$el).remove();
    }
    else {
      this.__fieldId = this.__generateRandomId();

      this.__$group = $(`<div class="form-group"><label for="${this.__fieldId}" class="control-label"></label></div>`);
      this.__$label = $("label", this.__$group);
    }

    return this.__$el
      .addClass("form-control input-sm")
      .attr({
        id: this.__fieldId,
        name: this.name,
        required: this.required
      })
      .prop("required", this.required)
      .val(this.value);
  }

  /**
   * 获取关联表单组件
   */
  __resolveParent() {
    const parent = $(this).closest("x-form").get(0);

    if ( !parent ) {
      return;
    }

    parent.__children = (parent.__children || []).concat(this);

    this.__parent = parent;

    const $root = $(parent.shadowRoot);

    $("slot", $root).remove();

    let $form = $("form", $root);

    if ( parent.vertical ) {
      if ( !$form.children(".row").length ) {
        $form.prepend(`<div class="row" />`);
      }

      $form.children(".row").append(this.__$group);
    }
    else {
      $form.append(this.__$group);
    }

    return parent;
  }

  /**
   * 移除栅格相关样式
   * 
   * @param {*} $el 目标元素
   */
  __removeGridClass( $el ) {
    return $el.removeClass(( idx, cls ) => {
      const arr = [];

      $.each(cls.split(" "), ( i, c ) => {
        if ( /^col\-/.test(c) ) {
          arr.push(c);
        }
      });

      return arr.join(" ");
    });
  }

  /**
   * 判断是否为有效的列大小
   * 
   * @param {*} col 列的大小
   */
  __isColumnValid( col ) {
    return $.isNumeric(col) && col * 1 > 0 && col * 1 < 12;
  }

  /**
   * 获取栅格相关样式
   * 
   * 支持格式：
   * 1. 「1」到「11」的整数；
   * 2. 有前缀「xs」、「sm」、「md」、「lg」的符合上述要求的数字。
   * 
   * @param {*} cols 需要被解析的列的大小列表
   */
  __resolveGridClass( cols ) {
    if ( cols.length === 1 && this.__isColumnValid(cols[0]) ) {
      return [`col-sm-${cols[0]}`];
    }

    const prefixes = ["xs", "sm", "md", "lg"];
    const sizes = {};

    $.each(prefixes, ( idx, size ) => {
      sizes[size] = "";
    });

    const nonprefixed = [];
    const resolved = [];

    $.each(cols, ( idx, col ) => {
      const parts = col.split("-");

      if ( parts.length > 2 ) {
        return;
      }

      let prefix = parts[0];
      let size = parts[1];

      if ( parts.length === 1 ) {
        size = prefix;
        prefix = "";
      }

      if ( !this.__isColumnValid(size) ) {
        return;
      }

      if ( prefix ) {
        if ( !sizes.hasOwnProperty(prefix) || sizes[prefix] ) {
          return;
        }

        sizes[prefix] = size;

        resolved.push(`col-${prefix}-${size}`);
      }
      else {
        nonprefixed.push(size);
      }
    });

    $.each(prefixes, ( idx, prefix ) => {
      if ( sizes[prefix] || nonprefixed.length === 0 ) {
        return;
      }

      const size = nonprefixed.shift();

      sizes[prefix] = size;

      resolved.push(`col-${prefix}-${size}`);
    });

    return resolved;
  }

  /**
   * 处理栅格
   */
  __resolveGrid() {
    const $group = this.__removeGridClass(this.__$group);
    const $label = this.__removeGridClass(this.__$label);
    const $div = this.__removeGridClass($label.siblings("div"));

    let grid = this.__parent.grid;

    if ( this.__parent.vertical ) {
      if ( !grid ) {
        return;
      }

      $group.addClass(this.__resolveGridClass(grid.split("|")).join(" "));
    }
    else {
      const cols = (grid || "3:9").split(":");

      $label.addClass(`col-sm-${cols[0]}`);
      $div.addClass(`col-sm-${cols[1]}`);
    }
  }

  /**
   * 更新关联控件类型
   */
  _updateType() {
    this.__resolveField();
  }

  /**
   * 更新关联标签文本
   * 
   * @param {*} labelText 标签文本
   */
  _updateLabel( labelText ) {
    this.__resolveField();
    this.__$label.text(labelText || "");
  }

  /**
   * 更新关联控件必要性
   * 
   * @param {*} isRequired 是否必需
   */
  _updateRequired( isRequired ) {
    if ( isRequired ) {
      this.__$label.addClass("is-required");
    }
    else {
      this.__$label.removeClass("is-required");
    }

    this.__resolveField()
      .attr("required", isRequired)
      .prop("required", isRequired);
  }

  /**
   * 更新关联控件字段名
   * 
   * @param {*} fieldName 字段名
   */
  _updateFieldName( fieldName ) {
    this.__resolveField().attr("name", fieldName);
  }

  /**
   * 更新关联控件字段值
   * 
   * @param {*} fieldValue 字段值
   */
  _updateFieldValue( fieldValue ) {
    this.__resolveField().val(fieldValue);
  }

  ready() {
    super.ready();

    if ( !this.__resolveParent() ) {
      return;
    }

    // 调整布局
    $(this).on("adjust.internal.muu.field", () => {
      this.__resolveGrid();
    });
    
    // 调整结构
    $(this).on("draw.internal.muu.field", () => {
      const isVertical = this.__parent.vertical;
      const $label = this.__$label;

      let $div = $label.siblings("div");

      if ( isVertical ) {
        $label.after(this.__$el);
        $div.remove();
      }
      else {
        if ( $div.length === 0 ) {
          $div = $("<div />");

          $label.after($div);
        }

        $div.prepend(this.__$el);
      }

      $(this).trigger("adjust.internal.muu.field");
    });
    
    $(this).trigger("draw.internal.muu.field");
  }
}
