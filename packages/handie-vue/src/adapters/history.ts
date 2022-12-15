import { pathToRegexp, match, compile } from 'path-to-regexp';
import type { Location as VueRouterLocation } from 'vue-router';

import {
  LocationDescriptor,
  HistoryLocation,
  LocationRoute,
  isPlainObject,
} from '@handie/runtime-core';

import type { RouteConfig } from '../types/router';
import { getVueApp } from '../utils';

let allRoutes: RouteConfig[] = [];

function patchRoutesDeeply(routes: RouteConfig[], parentPath?: string): RouteConfig[] {
  const patched: RouteConfig[] = [];

  routes.forEach(({ path, children, ...others }) => {
    if (path === '*') {
      return;
    }

    const resolvedPath = parentPath && path.charAt(0) !== '/' ? `${parentPath}/${path}` : path;
    const resolved: RouteConfig = { path: resolvedPath, ...others };

    if (children && children.length > 0) {
      resolved.children = patchRoutesDeeply(children, resolvedPath);
    }

    patched.push(resolved);
  });

  return patched;
}

function setRoutes(routes: RouteConfig[]): void {
  allRoutes = patchRoutesDeeply(routes);
}

function findRouteDeeply(pathname: string, routes: RouteConfig[] = allRoutes) {
  const route: any = { current: undefined, ancestors: [] };

  for (let i = 0; i < routes.length; i++) {
    const r = routes[i];
    const dynamicMatched = pathToRegexp(r.path).exec(pathname);

    if (dynamicMatched || r.path === pathname) {
      route.current = r;
      break;
    }

    if ((r.children || []).length === 0) {
      continue;
    }

    const found = findRouteDeeply(pathname, r.children);

    if (found.current) {
      route.current = found.current;
      route.ancestors.unshift(r, ...found.ancestors);
      break;
    }
  }

  return route;
}

function getLocation(): LocationRoute {
  const { path, hash, query } = getVueApp()!.$route;

  const { current, ancestors } = findRouteDeeply(path) as any;
  const { params = {} } = match(current.path, { decode: decodeURIComponent })(path) || {};

  return {
    name: current.name,
    path,
    rawPath: current.path,
    hash,
    query,
    params,
    ancestors,
  };
}

function resolveHistoryParams(location: HistoryLocation): VueRouterLocation {
  let resolved: VueRouterLocation;

  if (isPlainObject(location)) {
    const { name, path, query, params = {} } = location as LocationDescriptor;

    resolved = { query };

    if (name) {
      resolved.name = name;
      resolved.params = params;
    } else {
      resolved.path = compile(path)(params);
    }
  } else {
    resolved = { path: location as string };
  }

  return resolved;
}

export { setRoutes, findRouteDeeply, getLocation, resolveHistoryParams };
