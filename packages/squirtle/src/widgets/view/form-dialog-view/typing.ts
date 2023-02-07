import type { FormControlSize, DialogViewWidgetConfig } from 'handie-react';

interface FormDialogViewWidgetConfig extends DialogViewWidgetConfig {
  readonly moduleLabel?: string;
  readonly formControlLabelWidth?: number | string;
  readonly formControlSize?: FormControlSize;
}

export type { FormDialogViewWidgetConfig };
