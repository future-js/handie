class MuuAppSidebar extends Polymer.Element {
  static get is() {
    return "x-app-sidebar";
  }

  static get properties() {
    return {
      items: {
        type: String,
        value: "",
        observer: "_itemsChanged"
      }
    };
  }

  /**
   * 菜单项属性
   * 
   * @param {*} newItems 新的菜单项数据
   * @param {*} oldItems 旧的菜单项数据
   */
  _itemsChanged( newItems, oldItems ) {
    this._generateMenu(newItems);
  }

  _resolveItems( items ) {
    return typeof items === "string" ? JSON.parse(items) : items;
  }

  /**
   * 生成侧边栏菜单
   * 
   * @param {*} items 菜单项数据
   */
  _generateMenu( items ) {
    const navs = this.shadowRoot.querySelector(".Sidebar-navs");
    const menu = navs.children[0];

    if ( menu ) {
      menu.remove();
    }

    if ( items ) {
      items = this._resolveItems(items);

      if ( Array.isArray(items) && items.length > 0 ) {
        const flag = document.documentElement.getAttribute("data-page");

        items.forEach(item => {
          navs.appendChild(this._generateList(item.views, true, {
            parts: !flag ? null : flag.split("-"),
            index: 1
          }, {
            label: item.name,
            flag: item.id
          }));
        });
      }
    }
  }

  /**
   * 生成菜单列表
   * 
   * @param {*} items 菜单项数据
   * @param {*} isPrimary 是否为主菜单
   * @param {*} flag 页面标识
   * @param {*} group 分组信息
   */
  _generateList( items, isPrimary, flag, group ) {
    const node = document.createElement("ul");

    if ( group ) {
      node.className = "Navs-menu Menu Menu--grouped";

      node.setAttribute("data-flag", group.flag);

      const branch = document.createElement("li");
      const label = document.createElement("span");

      branch.className = "Menu-label";

      label.appendChild(document.createTextNode(group.label));
      branch.appendChild(label);
      node.appendChild(branch);
    }

    items.forEach(item => {
      node.appendChild(this._generateItem(item, isPrimary, $.extend(true, {}, flag)));
    });

    return node;
  }

  /**
   * 生成菜单条目
   * 
   * @param {*} item 菜单条目数据
   * @param {*} isPrimary 是否为主菜单
   * @param {*} flag 页面标识
   */
  _generateItem( item, isPrimary, flag ) {
    const node = document.createElement("li");
    const link = document.createElement("a");
    const hasChildren = Array.isArray(item.children) && item.children.length > 0;
    const nodeClasses = [];

    link.setAttribute("href", item.url || "javascript:void(0);");

    if ( isPrimary ) {
      const icon = document.createElement("i");
      const span = document.createElement("span");

      icon.className = "fa fa-" + item.icon;
      span.appendChild(document.createTextNode(item.name));

      link.appendChild(icon);
      link.appendChild(span);

      if ( hasChildren ) {
        const switcher = document.createElement("span");
        const trigger = document.createElement("i");

        switcher.className = "Menu-switcher";
        trigger.className = "fa fa-angle-right";

        switcher.appendChild(trigger);
        link.appendChild(switcher);
      }
      else {
        nodeClasses.push("is-childless");
      }
    }
    else {
      link.appendChild(document.createTextNode(item.name));
    }

    if ( flag.parts && flag.parts[flag.index] === item.name ) {
      nodeClasses.push("is-active");
    }

    if ( nodeClasses.length > 0 ) {
      node.className = nodeClasses.join(" ");
    }

    node.setAttribute("data-flag", item.name);
    node.appendChild(link);

    if ( hasChildren ) {
      const wrapper = document.createElement("div");

      wrapper.className = "Navs";

      flag.index++;

      wrapper.appendChild(this._generateList(item.children, false, $.extend(true, {}, flag)));
      node.appendChild(wrapper);
    }

    return node;
  }

  /**
   * 切换菜单项选中状态
   * 
   * @param {*} $target 菜单项
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

  /**
   * 获取指定元素的偏移值
   * 
   * 修复 Shadow DOM 中的元素用 `$.fn.offset()` 获取恒为 `{ top: 0, left: 0 }`
   * 
   * 实现参考 `$.fn.offset()`
   * 
   * @param {*} el 
   */
  _resolveOffset( el ) {
    const doc = el && el.ownerDocument;
    const win = doc.defaultView || doc.parentWindow;
    const docEl = doc.documentElement;

    let box = { top: 0, left: 0 };

    if ( typeof el.getBoundingClientRect !== "undefined" ) {
      box = el.getBoundingClientRect();
    }

    return {
			top: box.top  + (win.pageYOffset || docEl.scrollTop)  - (docEl.clientTop  || 0),
			left: box.left + (win.pageXOffset || docEl.scrollLeft) - (docEl.clientLeft || 0)
    };
  }

  /**
   * 使选中菜单项在可视区域
   */
  _scrollSidebar() {
    const $item = $(".Sidebar-navs > .Menu > li.is-active", $(this.shadowRoot));

    if ( $item.length === 0 ) {
      return;
    }
  
    const $sidebar = $(this);
    const sidebarOffset = $sidebar.offset();
    const itemOffset = this._resolveOffset($item.get(0));
  
    if ( sidebarOffset && itemOffset && (itemOffset.top < sidebarOffset.top || itemOffset.top > sidebarOffset.top + $sidebar.outerHeight() - $item.outerHeight()) ) {
      $sidebar.scrollTop($sidebar.scrollTop() + itemOffset.top - sidebarOffset.top);
    }
  }

  initMenu( items ) {
    this._generateMenu(items);

    $(document).ready(() => {
      this._scrollSidebar();
    });
  }

  ready() {
    super.ready();

    this.initMenu(this.items);

    const toggleStatus = this._toggleStatus;

    $(".Sidebar-navs:not(.Navs--hover)", $(this.shadowRoot)).on("click", "> ul > li > a", function() {
      if ( /^(javascript\:|\#)/.test($(this).attr("href")) ) {
        toggleStatus($(this).closest("li"));
  
        return false;
      }
    });
  }
}
