import type { ViewWidgetConfig } from 'handie-react';

interface DetailViewWidgetBehaviors {
  readonly actionBarOutside?: boolean;
  readonly actionBarAlignment?: 'left' | 'center' | 'right';
}

interface DetailViewWidgetConfig extends ViewWidgetConfig {
  readonly actionBarOutside?: boolean;
  readonly actionBarAlignment?: 'left' | 'center' | 'right';
}

export type { DetailViewWidgetBehaviors, DetailViewWidgetConfig };
