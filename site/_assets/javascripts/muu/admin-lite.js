/*!
 * MUU v1.6.8
 * Unified UI framework for admin websites of MaiHaoChe.com
 * http://doc.haimaiche.net/muu/
 *
 * Copyright 2017, Ourai Lin <ourairyu@gmail.com> (http://ourai.ws/)
 * Released under the MIT license.
 *
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@8888888888888888888888888888888888@@@@@@@@@@
 * @@@@@@@@@0LffffffffffffffffffffffffffffffffL0@@@@@@@@@
 * @@@@@@@@8LffffffffffffffffffffffffffffffffffL8@@@@@@@@
 * @@@@@@@8LfffffGGGGGGGGGGGGGGGGGGGGGGGGGGfffffL8@@@@@@@
 * @@@@@@@Cfffff0@@@@@@@@@@@@@@@@@@@@@@@@@@0fffffC@@@@@@@
 * @@@@@@GLffffG@@@@@@@@@@.880088.@@@@@@@@@@GffffLG@@@@@@
 * @@@@@0LffffC@@@@@@@@80CLLffffLLC08@@@@@@@@CffffL0@@@@@
 * @@@@@Cfffff8@@@@@@@0LffffffffffffL0@@@@@@@8fffffC@@@@@
 * @@@@8LffffG@@@@@@@GffffffLCCLffffffG@@@@@@@GffffL8@@@@
 * @@@@8fffff0@@@@@@0LffffC8@@@@8CffffL0@@@@@@0fffff8@@@@
 * @@@@8ffffL8@@@@@@Cfffff0@@@@@@0fffffC@@@@@@8Lffff8@@@@
 * @@@@0ffffL8@@@@@@GLffffG8@@@@8GffffLG@@@@@@8Lffff0@@@@
 * @@@@0ffffL8@@@@@@@GfffffLC8@@8LffffG@@@@@@@8Lffff0@@@@
 * @@@@0ffffL8@@@@@@@8GLfttttLC8@@0CLG@@@@@@@@8Ltttt0@@@@
 * @@@@0ttttL8@@@@@@@@@8GLfttttfC8@@8@@@@@@@@@8Ltttt0@@@@
 * @@@@0ttttL8@@@@@@@@@@@8GLftttffC0@@@@@@@@@@8Ltttt0@@@@
 * @@@@0ttttL8@@@@@80GCLG8@80LtttttffCG08@@@@@8Ltttt0@@@@
 * @@@@0ttttfffffffftttttLG@@:GLftttttttfffffffftttt0@@@@
 * @@@@0tttttttttttttttffLG8@@@@8GLffttttttttttttttt0@@@@
 * @@@@8LLLLLLLLLLCCGG00@@@@@@@@@@@@00GGCCLLLLLLLLLL8@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */

(function() {

"use strict";

function toggleStatus($target, selector, callback) {
  var cls = "is-active";

  if ($.type(selector) !== "string") {
    selector = "";
  }

  if ($target.hasClass(cls)) {
    $target.removeClass(cls);
  } else {
    if ($target.siblings(selector + "." + cls).length) {
      $target.siblings(selector + "." + cls).removeClass(cls);
    }

    if ($.isFunction(callback)) {
      callback.call($target.get(0), cls);
    } else {
      $target.addClass(cls);
    }
  }
}

function initNavbar() {
  $(document).on("click", function (e) {
    if ($(".Action.is-active").length) {
      var $at = $(e.target).closest(".Action-trigger");
      var $ac = $(e.target).closest(".Action-content");
      var $aw = $ac.closest(".Action.is-active");

      if (!$.contains($(".Header-operations").get(0), e.target) || !$at.length && !($ac.length && $aw.length)) {
        $(".Action.is-active").removeClass("is-active");
      }
    }
  });

  $(".Header-operations .Action-trigger").on("click", function () {
    var $t = $(this);

    toggleStatus($t.closest(".Action"), ".Action", function (cls) {
      if ($t.siblings(".Action-content").length) {
        $(this).addClass(cls);
      }
    });
  });
}

function resolveActiveStatus() {
  var flag = $("html").attr("data-page");

  if (!flag) {
    return;
  }

  var page = flag.split("-");
  var $grouped = $(".Sidebar-navs > ul.Menu--grouped[data-flag]");
  var $menu = void 0,
      $nav = void 0;

  if ($grouped.length) {
    $menu = $grouped.closest("[data-flag='" + page[0] + "']");

    if ($menu.length === 0) {
      $menu = $(".Sidebar-navs > ul:not(.Menu--grouped)");
    }

    if (page.length > 2) {
      page.shift();
    }
  } else {
    $menu = $(".Sidebar-navs > ul");
  }

  $nav = $menu.find("> li[data-flag=\"" + page[0] + "\"]");

  $nav.add($("[data-flag=\"" + page.pop() + "\"]", $nav)).addClass("is-active");
}

function resolveChildStatus() {
  $(".Sidebar-navs > ul > li:not(.Menu-label)").each(function () {
    var $item = $(this);

    if ($(".Navs", $item).length === 0) {
      $item.addClass("is-childless");
    } else {
      $item.children("a").append("<span class=\"Menu-switcher\"><i class=\"fa fa-angle-right\"></i></span>");
    }
  });
}

function scrollSidebar() {
  var $sidebar = $(".Sidebar");
  var $item = $(".Sidebar-navs > .Menu > li.is-active", $sidebar);

  var sidebarOffset = $sidebar.offset();
  var itemOffset = $item.offset();

  if (sidebarOffset && itemOffset && (itemOffset.top < sidebarOffset.top || itemOffset.top > sidebarOffset.top + $sidebar.outerHeight() - $item.outerHeight())) {
    $sidebar.scrollTop($sidebar.scrollTop() + itemOffset.top - sidebarOffset.top);
  }
}

function initSidebar() {
  resolveActiveStatus();
  resolveChildStatus();
  scrollSidebar();

  $(".Sidebar-navs:not(.Navs--hover) > ul > li > a").on("click", function () {
    if (/^(javascript\:|\#)/.test($(this).attr("href"))) {
      toggleStatus($(this).closest("li"));

      return false;
    }
  });
}

function initResponsiveActions() {
  $(".Header-toggle").on("click", function () {
    $(".Page-sidebar").addClass("is-shown");

    return false;
  });

  $(".Page-sidebar").on("click", function (evt) {
    var $sidebar = $(this);
    var $navs = $(".Sidebar-navs", $sidebar);

    if (!($.contains($navs.get(0), evt.target) || $(evt.target).is($navs))) {
      $sidebar.removeClass("is-shown");
    }
  });
}

$(document).ready(function () {
  initNavbar();
  initSidebar();

  initResponsiveActions();
});

})();