import { initNavbar, initSidebar, initResponsiveActions } from "./functions";

$(document).ready(function() {
  initNavbar();
  initSidebar();

  initResponsiveActions();

  $("form").on("reset", function() {
    handie.form.reset($(this));
  });

  $(".Area--query .Card-content .form-group select").each(function() {
    $(this).data("select2").$container.css("width", "100%");
  });

  // 按条件查询数据
  $(".Area--query form").on("submit", function() {
    handie.table.refresh(true);

    return false;
  });
});
