import { ReactNode } from 'react';

type NavLinkRenderer = (text: string, location: string) => ReactNode;

type NavMenuPosition = 'header' | 'aside' | 'both';

interface AdminLayoutWidgetBehaviors {
  readonly navMenuPosition?: NavMenuPosition;
}

export { NavLinkRenderer, NavMenuPosition, AdminLayoutWidgetBehaviors };
