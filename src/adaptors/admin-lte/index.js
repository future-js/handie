function scrollSidebar() {
  let $sidebar = $(".main-sidebar");
  let $item = $(".sidebar > .sidebar-menu > li.active", $sidebar);

  let sidebarOffset = $sidebar.offset();
  let itemOffset = $item.offset();

  if ( sidebarOffset && itemOffset && (itemOffset.top < sidebarOffset.top || itemOffset.top > sidebarOffset.top + $sidebar.outerHeight() - $item.outerHeight()) ) {
    $sidebar.scrollTop($sidebar.scrollTop() + itemOffset.top - sidebarOffset.top);
  }
}

function initResponsiveActions() {
  $(".Header-toggle").on("click", function() {
    $(".main-sidebar").addClass("is-shown").show();

    return false;
  });

  $(".main-sidebar").on("click", function( evt ) {
    let $sidebar = $(this);
    let $navs = $(".sidebar", $sidebar);

    if ( !($.contains($navs.get(0), evt.target) || $(evt.target).is($navs)) ) {
      $sidebar.removeClass("is-shown").hide();
    }
  });
}

$(document).ready(function() {
  scrollSidebar();
  initResponsiveActions();
});
