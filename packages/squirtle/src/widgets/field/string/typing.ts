import type { FormControlPrefixAndSuffix } from 'petals-ui/dist/form-control';
import type { StringFieldWidgetConfig } from 'handie-react';

interface InputStringFieldWidgetConfig extends StringFieldWidgetConfig {
  readonly prefix?: FormControlPrefixAndSuffix | string;
  readonly suffix?: FormControlPrefixAndSuffix | string;
}

interface UrlStringFieldWidgetConfig extends StringFieldWidgetConfig {
  readonly scheme?: string | string[];
  readonly noAuthority?: boolean;
}

export type { InputStringFieldWidgetConfig, UrlStringFieldWidgetConfig };
