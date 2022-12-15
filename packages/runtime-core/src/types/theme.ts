import type { IconProviders } from 'petals-ui/dist/icon';
import type { FormControlSize } from 'petals-ui/dist/form-control';
import type { FormLayoutType } from 'petals-ui/dist/form';
import type { DensityType } from 'petals-ui/dist/data-table';

import type { ActionDescriptor } from '../vendors/organik';

import type {
  ActionRenderType,
  BooleanInputRenderType,
  EnumInputRenderType,
  DateInputRenderType,
} from './render-type';

interface ActionCommonBehaviors {
  renderType?: ActionRenderType;
  showIcon?: boolean; // 是否显示图标
  iconOnly?: boolean; // 是否只显示图标
  disableWhenNoSelection?: boolean;
  createAction?: string | string[];
  editAction?: string | string[];
  submitAction?: string | string[];
  resetAction?: string | string[];
  cancelAction?: string | string[];
  deleteAction?: string | string[];
}

interface FilterCommonBehaviors {
  dateFilterRenderType?: DateInputRenderType;
  dateTimeFormat?: string;
  dateFormat?: string;
  showHintAsPlaceholder?: boolean; // 输入提示作为过滤器占位符显示
  showValidationRulesAsNative?: boolean; // 校验规则作为原生属性
  showEmptyValueOption?: boolean; // 是否显示空值（值为空字符串）的选项
  emptyValueOptionLabel?: string; // 空值选项显示的文本
}

interface SearchCommonBehaviors {
  conditionPersists?: boolean;
  searchWhenSelectableFilterChange?: boolean;
}

interface FieldCommonBehaviors {
  booleanFieldRenderType?: BooleanInputRenderType; // 布尔字段默认部件
  enumFieldRenderType?: EnumInputRenderType;
  dateFieldRenderType?: DateInputRenderType;
  dateTimeFormat?: string;
  dateFormat?: string;
  showUnavailableOption?: boolean;
  showHintAsPlaceholder?: boolean; // 输入提示作为表单控件占位符显示
  showHintAtFormItem?: boolean; // 输入提示显示在表单条目中
  hintPositionOfFormItem?: 'explain' | 'label'; // 表单条目中输入提示所在位置
  hintIcon?: string;
  showValidationRulesAsNative?: boolean; // 校验规则作为原生属性
}

interface ViewCommonBehaviors {
  objectViewFormLayout?: FormLayoutType; // 表单布局
  objectViewFormControlLabelWidth?: number | string; // 表单控件文本标签宽度
  objectViewFormControlSize?: FormControlSize;
  objectViewShowValidationMessage?: boolean;
  objectViewActionBarOutside?: boolean;
  objectViewActionBarAlignment?: 'left' | 'center' | 'right';
  objectViewDefaultActions?: (string | ActionDescriptor)[];
  listViewDensity?: DensityType;
  listViewPageSizes?: number[];
  listViewDefaultPageSize?: number;
}

interface CommonWidgetBehaviors {
  action?: ActionCommonBehaviors;
  filter?: FilterCommonBehaviors;
  search?: SearchCommonBehaviors;
  field?: FieldCommonBehaviors;
  view?: ViewCommonBehaviors;
}

interface ThemeBehavior {
  common?: CommonWidgetBehaviors;
  [key: string]: any;
}

type ThemeStyle = { [key: string]: string };

interface ThemeOptions {
  icon?: {
    providers?: IconProviders;
  };
  style?: ThemeStyle;
  behavior?: ThemeBehavior;
  template?: string;
}

export type { ThemeStyle, ThemeBehavior, ThemeOptions };
