import { ThemeOptions } from '@/types';

export default {
  icon: {
    providers: {
      ol: {
        type: 'svg',
        urls: ['//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js'],
        resolve: ref => `icon-${ref}`,
      },
      el: { type: 'font', resolve: ref => `el-icon-${ref}` },
      ivu: { type: 'font' },
    },
  },
  behavior: {
    common: {
      action: {
        showIcon: true,
        iconOnly: true,
      },
      filter: {
        showValidationRulesAsNative: true,
      },
      field: {
        showUnavailableOption: true,
        showHintAtFormItem: true,
        hintPositionOfFormItem: 'label',
        hintIcon: 'el:question',
        showValidationRulesAsNative: true,
      },
    },
    view: {
      form: {
        actionBarOutside: true,
        actionBarAlignment: 'right',
      },
    },
    search: {
      form: {
        formControlSize: 'small',
      },
    },
    field: {
      textarea: {
        showWordLimit: true,
      },
    },
  },
} as ThemeOptions;
