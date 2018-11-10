import Vue from "vue";
import VueRouter from "vue-router";

import { isArray } from "../common/helper";
import { connect } from "./connect";

Vue.use(VueRouter);

/**
 * 处理应用配置项
 * 
 * @param {*} opts 原始配置项
 */
function resolveOptions( opts ) {
  // 路由可以是个数组
  if ( isArray(opts.router) ) {
    opts.router = new VueRouter({routes: opts.router});
  }

  return opts;
}

/**
 * 创建应用
 * 
 * @param {*} opts 配置项
 */
export function createApp( opts ) {
  return connect(Vue, resolveOptions(opts));
}
