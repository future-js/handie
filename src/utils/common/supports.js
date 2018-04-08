import { hasOwnProp } from "./helper";

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

export function supportPointerEvents() {
  const style = document.createElement("a").style;

  style.cssText = "pointer-events:auto";

  return style.pointerEvents === "auto";
}

export function supportWebSocket() {
  return hasOwnProp("WebSocket", window);
}

export function supportWebNotification() {
  return hasOwnProp("Notification", window);
}

export function supportLocalStorage() {
  return hasOwnProp("localStorage", window);
}
