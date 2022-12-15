import { ThemeOptions } from '@/shared/types';

export default {
  icon: {
    providers: {
      ol: {
        type: 'svg',
        urls: ['//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js'],
        resolve: ref => `icon-${ref}`,
      },
      antd: { type: 'svg' },
    },
  },
  behavior: {
    common: {
      action: {
        showIcon: true,
        iconOnly: true,
      },
      search: {
        searchWhenSelectableFilterChange: false,
      },
      filter: {
        showValidationRulesAsNative: true,
      },
      field: {
        enumFieldRenderType: 'select',
        showUnavailableOption: true,
        showHintAtFormItem: true,
        hintPositionOfFormItem: 'label',
        hintIcon: 'ol:python',
        showValidationRulesAsNative: true,
      },
    },
    search: {
      form: {
        formControlSize: 'small',
      },
    },
    view: {
      table: {
        inlineActionRenderType: 'link',
      },
    },
    field: {
      textarea: {
        showWordLimit: true,
      },
    },
  },
} as ThemeOptions;
