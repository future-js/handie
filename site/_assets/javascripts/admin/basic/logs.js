(function() {
  $(document).ready(function() {
    $(".js-choosePeriod input:not([type='hidden'])").each(function() {
      var $ipt = $(this);
      var opts = {};
      var method = "";

      if ( $("input:not([type='hidden'])", $ipt.closest(".js-choosePeriod")).index(this) === 1 ) {
        opts.useCurrent = false;
        method = "maxDate";
      }
      else {
        method = "minDate";
      }

      $ipt.datetimepicker(opts);
      $ipt.on("dp.change", function( evt ) {
        var $dt = $(this);
        var date = evt.date;

        $dt.siblings("input:not([type='hidden'])").data("DateTimePicker")[method](date);
        $("input[name='" + $dt.attr("data-to") + "']", $dt.closest(".js-choosePeriod")).val(moment(date).format());
      });
    });
  });
})();
