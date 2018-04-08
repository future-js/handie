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

function scrollSidebar() {
  var $sidebar = $(".main-sidebar");
  var $item = $(".sidebar > .sidebar-menu > li.active", $sidebar);

  var sidebarOffset = $sidebar.offset();
  var itemOffset = $item.offset();

  if (sidebarOffset && itemOffset && (itemOffset.top < sidebarOffset.top || itemOffset.top > sidebarOffset.top + $sidebar.outerHeight() - $item.outerHeight())) {
    $sidebar.scrollTop($sidebar.scrollTop() + itemOffset.top - sidebarOffset.top);
  }
}

function initResponsiveActions() {
  $(".Header-toggle").on("click", function () {
    $(".main-sidebar").addClass("is-shown").show();

    return false;
  });

  $(".main-sidebar").on("click", function (evt) {
    var $sidebar = $(this);
    var $navs = $(".sidebar", $sidebar);

    if (!($.contains($navs.get(0), evt.target) || $(evt.target).is($navs))) {
      $sidebar.removeClass("is-shown").hide();
    }
  });
}

$(document).ready(function () {
  scrollSidebar();
  initResponsiveActions();
});

})();