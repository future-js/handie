/*!
 * Handie 
 * UI stuffs for the dashboard of a website.
 * https://ourai.github.io/handie/
 *
 * Copyright 2017, Ourai Lin <ourairyu@gmail.com> (http://ourai.ws/)
 * Released under the MIT license.
 *
 * 000000000000000000000000000000000000000000000000
 * 00000000000000000000CLft11f1tfCG0000000000000000
 * 0000000000000000CLt1i1iitttt11111G00000000000000
 * 00000000000000Ctt1111i1ttit111f1111fG00000000000
 * 000000000000G1i1t11;ii111i1t1tt11ft1itG000000000
 * 000000000000ti1ii1iiii111i1i1i1;i11itit000000000
 * 00000000000G1;iiii1;11t1;11ii1i1;i111iC000000000
 * 0000000000Li;;;iiii;;;i;iii1ii1i;ft1ti0000000000
 * 00000000008i1:;1tittf1;iii;;1ii;;ii,CC0000000000
 * 000000000081iti1i1tif1;itL;:iii;;;:;L00000000000
 * 000000000081i11t1f1i;;1ffL11111;1;:;;00000000000
 * 000000000000t;it1i;1tt1LftL1,f1iii;;iG0000000000
 * 000000000008tGGCL0CtitttfCCL1fti;;;i:f0000000000
 * 000000000008iGG0CLCCLttLffLCL1if1;;1ii8000000000
 * 000000000008iL000088801fLLLf1;1ffi11;G0000000000
 * 000000000000LiG0GCCG080iftttt11ftii1;L0000000000
 * 000000000000GtiifffLCLftit1iift1iii1iG0000000000
 * G0G000000000000GLfttLC0t;;:1i;11t1fCt00000000000
 * GGGGGGGG000000000000C1L1:;i;1tfCLffftL0000000000
 * GGGGGGGGGG0G00000000f;;1;i1tLfffffL;1;f000000000
 * GGGGGGGGGGGGGGG0G001;;i;11ifLfff1i1iit1fG00000GG
 * GGGGGGGGGGGGGGGGGG0L1;1ifttti;;::ifGLLit:1C0GGGG
 * GGGGGGGGGGGGGGGGGGGG01i1;1;;:;1tCCGCfftft::fGGGG
 * GGGGGGGGGGGGGGGGGGGGLi:i1;:tLCfLLLCiiLCtifi:tGGG
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