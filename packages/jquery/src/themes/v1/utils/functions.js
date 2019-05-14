function toggleStatus( $target, selector, callback ) {
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
 * 给选中的菜单项添加标记
 */
function resolveActiveStatus() {
  const flag = $("html").attr("data-page");

  if ( !flag ) {
    return;
  }

  const page = flag.split("-");
  const $grouped = $(".Sidebar-navs > ul.Menu--grouped[data-flag]");

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
    const $item = $(this);

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
  const $sidebar = $(".Sidebar");
  const $item = $(".Sidebar-navs > .Menu > li.is-active", $sidebar);

  const sidebarOffset = $sidebar.offset();
  const itemOffset = $item.offset();

  if ( sidebarOffset && itemOffset && (itemOffset.top < sidebarOffset.top || itemOffset.top > sidebarOffset.top + $sidebar.outerHeight() - $item.outerHeight()) ) {
    $sidebar.scrollTop($sidebar.scrollTop() + itemOffset.top - sidebarOffset.top);
  }
}

export function initNavbar() {
  $(document).on("click", e => {
    if ( $(".Action.is-active").length ) {
      const $at = $(e.target).closest(".Action-trigger");
      const $ac = $(e.target).closest(".Action-content");
      const $aw = $ac.closest(".Action.is-active");

      if ( !$.contains($(".Header-operations").get(0), e.target) || (!$at.length && !($ac.length && $aw.length)) ) {
        $(".Action.is-active").removeClass("is-active");
      }
    }
  });

  $(".Header-operations .Action-trigger").on("click", function() {
    const $t = $(this);

    toggleStatus($t.closest(".Action"), ".Action", function( cls ) {
      if ( $t.siblings(".Action-content").length ) {
        $(this).addClass(cls);
      }
    });
  });
}

export function initSidebar() {
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

export function initResponsiveActions() {
  $(".Header-toggle").on("click", () => {
    $(".Page-sidebar").addClass("is-shown");

    return false;
  });

  $(".Page-sidebar").on("click", function( evt ) {
    const $sidebar = $(this);
    const $navs = $(".Sidebar-navs", $sidebar);

    if ( !($.contains($navs.get(0), evt.target) || $(evt.target).is($navs)) ) {
      $sidebar.removeClass("is-shown");
    }
  });
}
