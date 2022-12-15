import type { FormControlSize, SearchWidgetConfig, ActionWidgetConfig } from '@handie/runtime-core';

interface FormSearchWidgetConfig extends SearchWidgetConfig {
  readonly formControlLabelWidth?: number | string;
  readonly hideFormControlLabel?: boolean;
  readonly arrangement?: string;
  readonly searchable?: boolean;
  readonly resettable?: boolean;
}

interface ButtonActionWidgetConfig extends ActionWidgetConfig {
  readonly size?: FormControlSize;
}

export type { FormSearchWidgetConfig, ButtonActionWidgetConfig };
