utils.setDefaults = function( settings ) {
  $.extend(true, defaults, settings);
};

utils.$el = {
  triggerType: function( $el ) {
    return $el.attr("class").match(/js\-([a-zA-Z]+)/)[1];
  }
};
