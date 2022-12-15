import { ThemeOptions, mixin } from '@handie/runtime-core';

const defaultTheme: ThemeOptions = {
  icon: {
    providers: {
      ol: {
        type: 'svg',
        urls: ['//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js'],
        resolve: ref => `icon-${ref}`,
      },
    },
  },
  behavior: {
    common: {
      action: {
        showIcon: true,
        iconOnly: true,
      },
      // search: {
      //   searchWhenSelectableFilterChange: false,
      // },
      filter: {
        showValidationRulesAsNative: true,
      },
      field: {
        // enumFieldRenderType: 'select',
        showUnavailableOption: true,
        showHintAtFormItem: true,
        hintPositionOfFormItem: 'label',
        hintIcon: 'ol:python',
        showValidationRulesAsNative: true,
      },
    },
    view: {
      // table: {
      //   inlineActionRenderType: 'link',
      // },
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
};

function getTheme(theme?: ThemeOptions): ThemeOptions {
  return theme ? mixin(true, {}, defaultTheme, theme) : defaultTheme;
}

export { getTheme };
