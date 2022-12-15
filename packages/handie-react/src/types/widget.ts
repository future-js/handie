import type { SearchWidgetConfig, ActionWidgetConfig } from '@handie/runtime-core';

interface FormSearchWidgetConfig extends SearchWidgetConfig {
  readonly formControlLabelWidth?: number | string;
  readonly hideFormControlLabel?: boolean;
  readonly arrangement?: string;
  readonly searchable?: boolean;
  readonly resettable?: boolean;
}

interface ButtonActionWidgetConfig extends ActionWidgetConfig {
  readonly size?: 'large' | 'medium' | 'small';
}

export type { FormSearchWidgetConfig, ButtonActionWidgetConfig };
