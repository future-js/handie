$(document).ready(function() {
  $(".FormPanel form").on("submit", function() {
    location.href = $(this).attr("action");
    
    return false;
  });
});
