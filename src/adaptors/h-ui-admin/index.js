function scrollSidebar() {
  let $sidebar = $(".Hui-aside");
  let $item = $(".menu_dropdown > dl.is-current:first", $sidebar);

  let sidebarOffset = $sidebar.offset();
  let itemOffset = $item.offset();

  if ( sidebarOffset && itemOffset && (itemOffset.top < sidebarOffset.top || itemOffset.top > sidebarOffset.top + $sidebar.outerHeight() - $item.outerHeight()) ) {
    $sidebar.scrollTop($sidebar.scrollTop() + itemOffset.top - sidebarOffset.top - parseFloat($(".Menu-label", $item).css("margin-top"), 10));
  }

  let tabUrl = $sidebar.attr("data-url");

  if ( tabUrl ) {
    $("dt", $(".menu_dropdown > dl.is-current [data-href='" + tabUrl + "']", $sidebar).closest("dl")).trigger("click");
  }
}

function initResponsiveActions() {
  let $sidebar = $(".Hui-aside");
  let $combine = $sidebar.add(".Hui-main");

  $(".Header-toggle").on("click", function() {
    $combine.addClass("is-shown");
    $sidebar.show();

    return false;
  });

  $sidebar.on("click", function( evt ) {
    let $navs = $(".menu_dropdown", $sidebar);

    if ( !($.contains($navs.get(0), evt.target) || $(evt.target).is($navs)) ) {
      $combine.removeClass("is-shown");
      $sidebar.hide();
    }
  });
}

$(document).ready(function() {
  scrollSidebar();
  initResponsiveActions();
});
