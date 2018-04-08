function toggleStatus( $target, selector, callback ) {
  let cls = "is-active";

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

function initNavbar() {
  $(document).on("click", function( e ) {
    if ( $(".Action.is-active").length ) {
      let $at = $(e.target).closest(".Action-trigger");
      let $ac = $(e.target).closest(".Action-content");
      let $aw = $ac.closest(".Action.is-active");

      if ( !$.contains($(".Header-operations").get(0), e.target) || (!$at.length && !($ac.length && $aw.length)) ) {
        $(".Action.is-active").removeClass("is-active");
      }
    }
  });

  $(".Header-operations .Action-trigger").on("click", function() {
    let $t = $(this);

    toggleStatus($t.closest(".Action"), ".Action", function( cls ) {
      if ( $t.siblings(".Action-content").length ) {
        $(this).addClass(cls);
      }
    });
  });
}

/**
 * 给选中的菜单项添加标记
 */
function resolveActiveStatus() {
  let flag = $("html").attr("data-page");

  if ( !flag ) {
    return;
  }

  let page = flag.split("-");
  let $grouped = $(".Sidebar-navs > ul.Menu--grouped[data-flag]");
  let $menu, $nav;

  if ( $grouped.length ) {
    $menu = $grouped.closest(`[data-flag='${page[0]}']`);

    if ( $menu.length === 0 ) {
      $menu = $(".Sidebar-navs > ul:not(.Menu--grouped)");
    }

    if ( page.length > 2 ) {
      page.shift();
    }
  }
  else {
    $menu = $(".Sidebar-navs > ul");
  }

  $nav = $menu.find(`> li[data-flag="${page[0]}"]`);

  $nav
    .add($(`[data-flag="${page.pop()}"]`, $nav))
    .addClass("is-active");
}

/**
 * 给有子菜单的菜单项添加标记
 */
function resolveChildStatus() {
  $(".Sidebar-navs > ul > li:not(.Menu-label)").each(function() {
    let $item = $(this);

    if ( $(".Navs", $item).length === 0 ) {
      $item.addClass("is-childless");
    }
    else {
      $item.children("a").append(`<span class="Menu-switcher"><i class="fa fa-angle-right"></i></span>`);
    }
  });
}

/**
 * 使选中菜单项在可视区域
 */
function scrollSidebar() {
  let $sidebar = $(".Sidebar");
  let $item = $(".Sidebar-navs > .Menu > li.is-active", $sidebar);

  let sidebarOffset = $sidebar.offset();
  let itemOffset = $item.offset();

  if ( sidebarOffset && itemOffset && (itemOffset.top < sidebarOffset.top || itemOffset.top > sidebarOffset.top + $sidebar.outerHeight() - $item.outerHeight()) ) {
    $sidebar.scrollTop($sidebar.scrollTop() + itemOffset.top - sidebarOffset.top);
  }
}

function initSidebar() {
  resolveActiveStatus();
  resolveChildStatus();
  scrollSidebar();

  $(".Sidebar-navs:not(.Navs--hover) > ul > li > a").on("click", function() {
    if ( /^(javascript\:|\#)/.test($(this).attr("href")) ) {
      toggleStatus($(this).closest("li"));

      return false;
    }
  });
}
