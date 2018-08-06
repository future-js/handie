import { hasOwnProp } from "handie/utils/common";

export function supportBootstrapModal() {
  return hasOwnProp("modal", $.fn);
}

export function supportBootstrapTable() {
  return hasOwnProp("bootstrapTable", $.fn);
}

export function supportBootstrapDateTime() {
  return hasOwnProp("datetimepicker", $.fn);
}

export function supportSelect2() {
  return hasOwnProp("select2", $.fn);
}

export function supportH5fx() {
  return hasOwnProp("H5F", window);
}

export function supportMomentJs() {
  return hasOwnProp("moment", window);
}
