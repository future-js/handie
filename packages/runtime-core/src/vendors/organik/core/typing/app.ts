import type { DialogShortcutMethod } from 'petals-ui/dist/dialog';
import type { MessageShortcutMethod } from 'petals-ui/dist/message';

interface LocationDescriptor {
  name: string;
  path: string; // path starts with slash `/`
  hash: string;
  query: Record<string, any>; // plain object will be converted to query string in URL
  params: Record<string, any>; // variables start with `:` in path
}

type HistoryLocation = string | Partial<LocationDescriptor>;

interface LocationRoute extends LocationDescriptor {
  rawPath: string; // path with params like `/otaku/animations/:id`
  ancestors: Pick<LocationRoute, 'name'>[];
}

interface HistoryHelper {
  getLocation(): LocationRoute;
  back(): void;
  forward(): void;
  go(delta?: number): void;
  push(location: HistoryLocation): any;
  replace(location: HistoryLocation): any;
}

type AuthorityMap = Record<string, boolean>;
type UserAuthority = AuthorityMap | null;

interface SessionHelper {
  getAuthority(): UserAuthority;
}

interface AppHelper {
  readonly history: HistoryHelper;
  readonly session: SessionHelper;
  // dialog shortcuts
  alert: DialogShortcutMethod;
  confirm: DialogShortcutMethod;
  // message shortcuts
  success: MessageShortcutMethod;
  error: MessageShortcutMethod;
  warning: MessageShortcutMethod;
  info: MessageShortcutMethod;
}

export type {
  LocationDescriptor,
  HistoryLocation,
  LocationRoute,
  HistoryHelper,
  UserAuthority,
  SessionHelper,
  AppHelper,
};
