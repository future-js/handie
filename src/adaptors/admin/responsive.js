function initResponsiveActions() {
  $(".Header-toggle").on("click", function() {
    $(".Page-sidebar").addClass("is-shown");

    return false;
  });

  $(".Page-sidebar").on("click", function( evt ) {
    let $sidebar = $(this);
    let $navs = $(".Sidebar-navs", $sidebar);

    if ( !($.contains($navs.get(0), evt.target) || $(evt.target).is($navs)) ) {
      $sidebar.removeClass("is-shown");
    }
  });
}
