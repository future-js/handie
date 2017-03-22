"use strict";

function toggleStatus( $target, selector, callback ) {
  let cls = "is-active";

  if ( $.type(selector) !== "string" ) {
    selector = "";
  }

  if ( $target.hasClass(cls) ) {
    $target.removeClass(cls);
  }
  else {
    if ( $target.siblings(`${selector}.${cls}`).size() ) {
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
    if ( $(".Action.is-active").size() ) {
      let $at = $(e.target).closest(".Action-trigger");
      let $ac = $(e.target).closest(".Action-content");
      let $aw = $ac.closest(".Action.is-active");

      if ( !$.contains($(".Header-operations").get(0), e.target) || (!$at.size() && !($ac.size() && $aw.size())) ) {
        $(".Action.is-active").removeClass("is-active");
      }
    }
  });

  $(".Header-operations .Action-trigger").on("click", function() {
    let $t = $(this);

    toggleStatus($t.closest(".Action"), ".Action", function( cls ) {
      if ( $t.siblings(".Action-content").size() ) {
        $(this).addClass(cls);
      }
    });
  });
}

function changeNavStatus() {
  let flag = $("html").attr("data-page");

  if ( !flag ) {
    return;
  }

  let page = flag.split("-");
  let $nav = $(`.Sidebar-navs > ul > li[data-flag="${page[0]}"]`);

  $nav.addClass("is-active");
  $(`[data-flag="${page[1]}"]`, $nav).addClass("is-active");
}

function initSidebar() {
  changeNavStatus();

  $(".Sidebar-navs > ul > li").each(function() {
    if ( $(".Navs", $(this)).size() === 0 ) {
      $(this).addClass("is-childless");
    }
  });

  $(".Sidebar-navs:not(.Navs--hover) > ul > li > a").on("click", function() {
    if ( /^(javascript\:|\#)/.test($(this).attr("href")) ) {
      toggleStatus($(this).closest("li"));

      return false;
    }
  });
}

$(document).ready(function() {
  initNavbar();
  initSidebar();
});
