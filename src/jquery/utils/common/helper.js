import { mixin } from "handie/utils/common";

/**
 * 初始化 Bootstrap 所提供的工具提示
 * 
 * https://getbootstrap.com/docs/3.3/javascript/#tooltips
 * 
 * @param {*} $el 目标元素
 * @param {*} opts 配置项
 */
export function initBootstrapTooltip( $el, opts ) {
  $el.tooltip(mixin(true, {placement: "auto bottom", trigger: "hover", container: "body"}, opts));
}

export * from "handie/utils/common";

export * from "./supports";
