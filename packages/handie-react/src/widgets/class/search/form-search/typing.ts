import type { FormControlSize } from '@handie/runtime-core';

interface FormSearchWidgetBehaviors {
  formLayout?: 'inline' | 'flex' | 'grid';
  formControlLabelWidth?: number | string;
  formControlSize?: FormControlSize;
  hideFormControlLabel?: boolean;
  searchable?: boolean;
  resettable?: boolean;
  actionsStandalone?: boolean;
  submitButtonAsPrimary?: boolean;
}

export type { FormSearchWidgetBehaviors };
