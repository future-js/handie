let defaults = {};
const utils = {};

const SUPPORTS = {
  BS_MODAL: function() {
    return $.fn.hasOwnProperty("modal");
  },
  BS_TABLE: function() {
    return $.fn.hasOwnProperty("bootstrapTable");
  },
  BS_DATETIME: function() {
    return $.fn.hasOwnProperty("datetimepicker");
  },
  SELECT2: function() {
    return $.fn.hasOwnProperty("select2");
  },
  H5FX: function() {
    return window.hasOwnProperty("H5F");
  },
  MOMENTJS: function() {
    return window.hasOwnProperty("moment");
  }
};
