import { RouteConfig, RouteRecord } from '@/types';

import { RouteAccessible, NavMenu } from './typing';

function resolveAvailableNavs(routes: RouteConfig[], accessible: RouteAccessible): NavMenu[] {
  const resolved: NavMenu[] = [];

  routes.forEach(({ name = '', meta = {}, children }) => {
    if (name === 'root' || meta.show === false || !(!meta.auth || accessible[meta.auth])) {
      return;
    }

    const nav: NavMenu = { name, text: meta.text || '', icon: meta.icon };

    if (children && children.length > 0) {
      nav.children = resolveAvailableNavs(children, accessible);

      if (nav.children.length === 0) {
        return;
      }
    }

    resolved.push(nav);
  });

  return resolved;
}

function canAccessCurrentRoute(
  matched: RouteRecord[],
  accessible: RouteAccessible | null,
): boolean {
  return accessible
    ? matched.every(record => !record.meta.auth || accessible[record.meta.auth])
    : false;
}

export { resolveAvailableNavs, canAccessCurrentRoute };
