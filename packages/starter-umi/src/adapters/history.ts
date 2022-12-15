import { pathToRegexp, match, compile } from 'path-to-regexp';
// @ts-ignore
import { history } from 'umi';
import {
  LocationDescriptor,
  HistoryLocation,
  LocationRoute,
  isPlainObject,
} from 'handie-react-starter-antd';

let allRoutes: Record<string, any>[] = [];
let routeMap: Record<string, any> = {};

function resolveRouteMap(routes: any[], map: Record<string, any>): Record<string, any> {
  return routes.reduce((prev, cur) => {
    const acc = { ...prev, [cur.name || cur.path]: cur };

    return (cur.routes || []).length > 0 ? resolveRouteMap(cur.routes, acc) : acc;
  }, map);
}

function setRoutes(routes: Record<string, any>[]): void {
  allRoutes = routes;
  routeMap = resolveRouteMap(allRoutes, {});
}

function findRouteDeeply(pathname: string, routes: any[] = allRoutes) {
  const route: any = { current: undefined, ancestors: [] };

  for (let i = 0; i < routes.length; i++) {
    const r = routes[i];
    const dynamicMatched = pathToRegexp(r.path).exec(pathname);

    if (dynamicMatched || r.path === pathname) {
      route.current = r;
      break;
    }

    if ((r.routes || []).length === 0) {
      continue;
    }

    const found = findRouteDeeply(pathname, r.routes);

    if (found.current) {
      route.current = found.current;
      route.ancestors.unshift(r, ...found.ancestors);
      break;
    }
  }

  return route;
}

function getLocation(): LocationRoute {
  const {
    location: { pathname, hash, query = {} },
  } = history;

  const { current, ancestors } = findRouteDeeply(pathname) as any;
  const { params = {} } = match(current.path, { decode: decodeURIComponent })(pathname) || {};

  return {
    name: current.name,
    path: pathname,
    rawPath: current.path,
    hash,
    query,
    params,
    ancestors,
  };
}

function resolveHistoryParams(location: HistoryLocation): any {
  let resolved: any;

  if (isPlainObject(location)) {
    const { name, path, query, params = {} } = location as LocationDescriptor;

    resolved = {
      pathname: compile(name ? routeMap[name].path : path)(params),
      query,
      state: params,
    };
  } else {
    resolved = { pathname: location as string };
  }

  return resolved;
}

export { setRoutes, findRouteDeeply, getLocation, resolveHistoryParams };
