import type { FormControlPrefixAndSuffix } from 'petals-ui/dist/form-control';
import type { FloatFieldWidgetConfig } from 'handie-react';

interface NumberFloatFieldWidgetConfig extends FloatFieldWidgetConfig {
  readonly prefix?: FormControlPrefixAndSuffix | string;
  readonly suffix?: FormControlPrefixAndSuffix | string;
}

export type { NumberFloatFieldWidgetConfig };
