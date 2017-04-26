let defaults = {};
const utils = {};
const SUPPORTS = {
  BS_MODAL: $.fn.hasOwnProperty("modal"),
  BS_TABLE: $.fn.hasOwnProperty("bootstrapTable"),
  BS_DATETIME: $.fn.hasOwnProperty("datetimepicker"),
  SELECT2: $.fn.hasOwnProperty("select2"),
  H5FX: window.hasOwnProperty("H5F"),
  MOMENTJS: window.hasOwnProperty("moment")
};
