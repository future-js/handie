import type { ReactNode } from 'react';

type NavLinkRenderer = (text: string, location: string) => ReactNode;

type NavMenuPosition = 'header' | 'aside' | 'both';

interface AdminLayoutWidgetBehaviors {
  readonly navMenuPosition?: NavMenuPosition;
}

export type { NavLinkRenderer, NavMenuPosition, AdminLayoutWidgetBehaviors };
