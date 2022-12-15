import type { ViewWidgetConfig } from 'handie-react';

interface FormViewWidgetBehaviors {
  readonly actionBarOutside?: boolean;
  readonly actionBarAlignment?: 'left' | 'center' | 'right';
}

interface FormViewWidgetConfig extends ViewWidgetConfig {
  readonly actionBarOutside?: boolean;
  readonly actionBarAlignment?: 'left' | 'center' | 'right';
}

export type { FormViewWidgetBehaviors, FormViewWidgetConfig };
