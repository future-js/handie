import { retrieveData, mixin } from '../vendors/toolbox';

import { BuiltInClientAction } from '../types/action';
import { ThemeStyle, ThemeBehavior, ThemeOptions } from '../types';

let defaultTheme: ThemeOptions = {
  behavior: {
    common: {
      action: {
        renderType: 'button',
        showIcon: false,
        iconOnly: false,
        disableWhenNoSelection: true,
        createAction: BuiltInClientAction.Create,
        editAction: BuiltInClientAction.Edit,
        submitAction: BuiltInClientAction.Submit,
        resetAction: BuiltInClientAction.Reset,
        cancelAction: BuiltInClientAction.Cancel,
        deleteAction: BuiltInClientAction.Delete,
      },
      filter: {
        dateFilterRenderType: 'date-range',
        dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
        dateFormat: 'YYYY-MM-DD',
        showHintAsPlaceholder: true,
        showValidationRulesAsNative: false,
        showEmptyValueOption: true,
        emptyValueOptionLabel: '全部',
      },
      search: {
        conditionPersists: false,
        searchWhenSelectableFilterChange: false,
      },
      field: {
        booleanFieldRenderType: 'radio',
        enumFieldRenderType: 'radio',
        dateFieldRenderType: 'date',
        dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
        dateFormat: 'YYYY-MM-DD',
        showUnavailableOption: false,
        showHintAsPlaceholder: true,
        showHintAtFormItem: false,
        hintPositionOfFormItem: 'explain',
        hintIcon: 'question',
        showValidationRulesAsNative: false,
      },
      view: {
        objectViewFormLayout: 'horizontal',
        objectViewFormControlLabelWidth: 200,
        objectViewFormControlSize: 'medium',
        objectViewShowValidationMessage: true,
        objectViewActionBarOutside: false,
        objectViewActionBarAlignment: 'left',
        objectViewDefaultActions: [BuiltInClientAction.Cancel, BuiltInClientAction.Submit],
        listViewDensity: 'medium',
        listViewPageSizes: [10, 20, 50, 100],
        listViewDefaultPageSize: 20,
      },
    },
  },
};

/**
 * 设置默认主题
 *
 * @param options 配置项
 * @param merge 是否合并
 */
function setDefaultTheme(options: ThemeOptions, merge?: boolean): void {
  if (merge) {
    const { style, behavior, template } = options;

    defaultTheme = {
      style: mixin(true, {}, defaultTheme.style || {}, style || {}) as ThemeStyle,
      behavior: mixin(true, {}, defaultTheme.behavior || {}, behavior || {}) as ThemeBehavior,
      template: template || defaultTheme.template,
    };

    return;
  }

  defaultTheme = options;
}

function getThemeOption(optionKey: keyof ThemeOptions): any {
  return optionKey === 'template' ? defaultTheme.template : defaultTheme[optionKey] || {};
}

function getBehaviorByKey(key: string, defaultBehavior?: any): any {
  const behavior = retrieveData(defaultTheme || {}, `behavior.${key}`);

  return behavior === undefined ? defaultBehavior : behavior;
}

function resolveFieldBehavior(config: Record<string, any>, key: string, defaultBehavior: any): any {
  return config[key] === undefined
    ? getBehaviorByKey(`common.field.${key}`, defaultBehavior)
    : config[key];
}

export { setDefaultTheme, getThemeOption, getBehaviorByKey, resolveFieldBehavior };
