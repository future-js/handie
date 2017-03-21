utils.setDefaults = function( settings ) {
  $.extend(defaults, settings);
};

utils.$el = {
  triggerType: function( $el ) {
    return $el.attr("class").match(/js\-([a-zA-Z]+)/)[1];
  }
};
