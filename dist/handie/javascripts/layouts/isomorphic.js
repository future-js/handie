/*!
 * Handie 
 * UI stuffs for the dashboard of a website.
 * https://ourai.github.io/handie/
 *
 * Copyright 2017, Ourai Lin <ourairyu@gmail.com> (http://ourai.ws/)
 * Released under the MIT license.
 *
 * 00000000000000000000000000000000000000000000000000000000000000000000
 * 000000000000000000000000000000000CCLCCLLGG00000000000000000000000000
 * 00000000000000000000000000GGCtt1;iii1t1;it1fCG0000000000000000000000
 * 00000000000000000000000Cftt1i1t1iitttt1tiitii1tG00000000000000000000
 * 000000000000000000000Ltfti111i;111ftt1t1f1t11i;1LLG00000000000000000
 * 0000000000000000000Lt11it1i1fi1f1111ift1i;fL1Lffi11fCG00000000000000
 * 00000000000000000Gfii11t111::1i;ttt1;ittttffit;Ltt1;1tG0000000000000
 * 00000000000000000f;111;i1ii;iii11i1t;11i1;1tiii111i1;tt8000000000000
 * 0000000000000000C1i1i1;11i1i;1i1tt;i1i1;;i11;;11ti;fiit8000000000000
 * 0000000000000008Ct;:1;;i;1i:1111f;ii;tiii1ii11:1tt1i;tG0000000000000
 * 00000000000000Cii;;:;iiiii;;::;i;ii;;i1t1;11iiiLtf11;t00000000000000
 * 000000000000008fi1;:;;ii1ftf1t;;;::i;;iii1ii;:;iii,CfL80000000000000
 * 000000000000000Gii1,itff1:fiL1ti1t111;;i1i;;;;;;;;,f0000000000000000
 * 0000000000000000iittifiiitLitf1;;itCf;:;iiti;i:;:;:L8000000000000000
 * 000000000000000G:i1tt;fifftiti::;fffCt:tftti;i;;:;;;G000000000000000
 * 0000000000000008f:i1ifLffi;:,;1fLCfft1t1:i11;tii;;;:t800000000000000
 * 00000000000000008C1:;1111;itft1iLtttfCC::fLi1;ii::i1t800000000000000
 * 00000000000000008ffGGCLf0Gf1;1ftttfLCGCiiCit1;:i1:;;:000000000000000
 * 000000000000000081CCL0880GGCft1ttLffCfLCCt1ftt;::;i;;f00000000000000
 * 00000000000000008;tG00CLfLCGGCt1LffffCCfL11if11;;11i;C00000000000000
 * 000000000000000081;080080880880t1LLCLLLf1:i1Cftiit1:t800000000000000
 * 00000000000000008L;f0000800GG088i;LLfttt1i11tt1i;i1it000000000000000
 * 00000000000000000G;1fLLLft1G0088G1it1ttt1tttffL;:1i;;G00000000000000
 * 000000000000000000ft;;tLtLLfCCft1titt1;iift1ii;ii11;L000000000000000
 * G00G0G000000000000000Cftif1f1CCG0t;i;:;11i:111t1tCLi0000000000000000
 * GGGGGGGG00G00000000000000GCffLC0G;::,i1;;i1t1ff1LLL1L000000000000000
 * GGGGGGGGGGGG0G000000000000000Gi1t1;:1i:i1t1CCCfLfLtf1C00000000000000
 * GGGGGGGGGGGGGG0G000000000000G1;;11;;;1f1LL1tLtff1L;t;iL00000000G00G0
 * GGGGGGGGGGGGGGGGGGGG0000000G;;i;i;;;titLCLfCL1t;t1:;;;:L00000G0000GG
 * GGGGGGGGGGGGGGGGGGGGGGGGG00i:i;i;1f111LLLf1titii;i1tfLL:1G00G0G0GGG0
 * GGGGGGGGGGGGGGGGGGGGGGGGGG0Cii;iiiff1ff1i;:i::,ifCGLGt;Li,ifG00GGGGG
 * GGGGGGGGGGGGGGGGGGGGGGGGGGGG00;1ff;it;;;:;::;fCCGCLGLCitC1:,;C0GGGGG
 * GGGGGGGGGGGGGGGGGGGGGGGGGGGGG01,::;;::i;itCCLCCCLGC;;CCitf1;::fGGGGG
 * GGGGGGGGGGGGGGGGGGGGGGGGGGGGGi;;;1t1;:tLLLftfLCLCt,1tLCL1;ff1::LGGGG
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