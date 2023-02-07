import type { ObjectViewWidgetConfig } from 'handie-vue';

interface FormViewWidgetBehaviors {
  readonly actionBarOutside?: boolean;
  readonly actionBarAlignment?: 'left' | 'center' | 'right';
}

type SuccessMessageGetter = (record: Record<string, any>) => string;

interface FormViewWidgetConfig extends ObjectViewWidgetConfig {
  readonly readonly?: boolean;
  readonly actionBarOutside?: boolean;
  readonly actionBarAlignment?: 'left' | 'center' | 'right';
  readonly gotoListView?: boolean;
  readonly listViewRouteName?: string;
  readonly successMessage?: string | SuccessMessageGetter;
}

export type { FormViewWidgetBehaviors, SuccessMessageGetter, FormViewWidgetConfig };
