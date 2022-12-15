import type { ViewContext } from '../../vendors/organik';

import type { EnumFieldOption, EnumField } from '../../types/input';
import type { EnumFilterWidgetConfig } from '../../types/widget/filter';
import {
  resolveEnumOptions,
  resolveSingleEnumDisplayText,
  resolveMultipleEnumDisplayText,
} from '../../utils/widget';

import { FilterHeadlessWidget } from './Filter';

class EnumFilterHeadlessWidget<
  VT,
  CT extends EnumFilterWidgetConfig = EnumFilterWidgetConfig
> extends FilterHeadlessWidget<VT, CT, EnumField> {
  public initOptions(
    viewContext: ViewContext,
    callback: (options: EnumFieldOption[]) => void,
  ): void {
    resolveEnumOptions(viewContext, this.getFilter(), callback);
  }

  public getSingleDisplayText(value: number | string, options: EnumFieldOption[]): string {
    return resolveSingleEnumDisplayText(value, options);
  }

  public getMultipleDisplayText(
    value: number[] | string[],
    optionMap: Record<string, EnumFieldOption>,
  ): string {
    return resolveMultipleEnumDisplayText(value, optionMap);
  }
}

export { EnumFilterHeadlessWidget };
