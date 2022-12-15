import Vue, { ComponentOptions, AsyncComponent } from 'vue';
import VueRouter, { RouteConfig as _RouteConfig, RouteRecord as _RouteRecord } from 'vue-router';

type RouteComponent = ComponentOptions<Vue> | typeof Vue | AsyncComponent;

type RouteMeta = {
  text?: string;
  icon?: string;
  show?: boolean;
  auth?: string;
};

type BaseRouteConfig = Omit<_RouteConfig, 'meta' | 'children' | 'component'> & {
  meta?: RouteMeta;
};

type RouteConfig = BaseRouteConfig & {
  component?: string | RouteComponent;
  children?: RouteConfig[];
};

type ResolvedRouteConfig = BaseRouteConfig & {
  component?: RouteComponent;
  children?: ResolvedRouteConfig[];
};

type RouteRecord = Omit<_RouteRecord, 'meta'> & {
  meta: RouteMeta;
};

type RouterCreator = (routes: ResolvedRouteConfig[]) => VueRouter;

export type {
  RouteComponent,
  RouteMeta,
  RouteConfig,
  ResolvedRouteConfig,
  RouteRecord,
  RouterCreator,
};
