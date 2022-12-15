import VueRouter from 'vue-router';

import {
  ComponentGetter,
  ViewDescriptor,
  ViewComponentRenderer,
  isString,
  isFunction,
  getViews,
  createView,
} from '@handie/runtime-core';

import type { RouteComponent, RouteConfig, ResolvedRouteConfig, RouterCreator } from '../types';
import { createModuleContext } from './context';

let routerCreator = routes => new VueRouter({ mode: 'history', routes });

function setRouterCreator(creator: RouterCreator): void {
  if (isFunction(creator)) {
    routerCreator = creator;
  }
}

function resolveRouteComponent(
  moduleName: string,
  viewRenderer: ViewComponentRenderer,
): RouteComponent {
  let component: RouteComponent | undefined;

  if (isFunction(viewRenderer)) {
    component = (viewRenderer as ComponentGetter)();
  } else {
    component = createView(createModuleContext(moduleName), viewRenderer as ViewDescriptor);
  }

  return component;
}

function resolveRoutes(routes: RouteConfig[]): ResolvedRouteConfig[] {
  return routes.map(({ component, children, ...others }) => {
    const resolved: ResolvedRouteConfig = others;

    if (component) {
      if (isString(component)) {
        const [moduleName, _, viewName] = (component as string).split('.');
        const viewRenderer = getViews(moduleName)[viewName];

        if (viewRenderer) {
          resolved.component = resolveRouteComponent(moduleName, viewRenderer);
        }
      } else {
        resolved.component = component as RouteComponent;
      }
    }

    if (children) {
      resolved.children = resolveRoutes(children);
    }

    return resolved;
  });
}

function createRouter(routes: RouteConfig[]): VueRouter {
  return routerCreator(resolveRoutes(routes));
}

export { setRouterCreator, createRouter };
