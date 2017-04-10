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
    if ($target.siblings(selector + "." + cls).size()) {
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
    if ($(".Action.is-active").size()) {
      var $at = $(e.target).closest(".Action-trigger");
      var $ac = $(e.target).closest(".Action-content");
      var $aw = $ac.closest(".Action.is-active");

      if (!$.contains($(".Header-operations").get(0), e.target) || !$at.size() && !($ac.size() && $aw.size())) {
        $(".Action.is-active").removeClass("is-active");
      }
    }
  });

  $(".Header-operations .Action-trigger").on("click", function () {
    var $t = $(this);

    toggleStatus($t.closest(".Action"), ".Action", function (cls) {
      if ($t.siblings(".Action-content").size()) {
        $(this).addClass(cls);
      }
    });
  });
}

function changeNavStatus() {
  var flag = $("html").attr("data-page");

  if (!flag) {
    return;
  }

  var page = flag.split("-");
  var $nav = $(".Sidebar-navs > ul > li[data-flag=\"" + page[0] + "\"]");

  $nav.addClass("is-active");
  $("[data-flag=\"" + page[1] + "\"]", $nav).addClass("is-active");
}

function initSidebar() {
  changeNavStatus();

  $(".Sidebar-navs > ul > li").each(function () {
    if ($(".Navs", $(this)).size() === 0) {
      $(this).addClass("is-childless");
    }
  });

  $(".Sidebar-navs:not(.Navs--hover) > ul > li > a").on("click", function () {
    if (/^(javascript\:|\#)/.test($(this).attr("href"))) {
      toggleStatus($(this).closest("li"));

      return false;
    }
  });
}

$(document).ready(function () {
  initNavbar();
  initSidebar();
});

})();