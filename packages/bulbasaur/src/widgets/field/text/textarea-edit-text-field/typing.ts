import type { FieldWidgetConfig } from '@handie/runtime-core';

interface TextareaTextFieldWidgetBehaviors {
  showWordLimit?: boolean;
  rows?: number;
}

interface TextareaTextFieldWidgetConfig extends FieldWidgetConfig {
  readonly showWordLimit?: boolean;
  readonly rows?: number;
}

export type { TextareaTextFieldWidgetBehaviors, TextareaTextFieldWidgetConfig };
