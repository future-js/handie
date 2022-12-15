type RouteAccessible = Record<string, boolean>;

type NavMenu = {
  name: string;
  text: string;
  icon?: string;
  children?: NavMenu[];
};

export { RouteAccessible, NavMenu };
