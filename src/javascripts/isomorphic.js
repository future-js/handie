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

function initSidebar() {
  $(".Sidebar-navs > ul > li > a").on("click", function() {
    toggleStatus($(this).closest("li"));

    return false;
  });
}

$(document).ready(function() {
  initNavbar();
  initSidebar();
});
