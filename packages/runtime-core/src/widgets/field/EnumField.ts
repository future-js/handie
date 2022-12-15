import { ViewContext, runExpression } from '../../vendors/organik';

import type { ObjectValue } from '../../types';
import type { EnumFieldOption, EnumField } from '../../types/input';
import type { EnumFieldWidgetConfig, ResolvedEnumFieldOption } from '../../types/widget/field';
import { isString } from '../../utils';
import {
  resolveEnumOptions,
  resolveSingleEnumDisplayText,
  resolveMultipleEnumDisplayText,
} from '../../utils/widget';

import { FieldHeadlessWidget } from './Field';

class EnumFieldHeadlessWidget<
  VT,
  CT extends EnumFieldWidgetConfig = EnumFieldWidgetConfig
> extends FieldHeadlessWidget<VT, CT, EnumField> {
  private options!: EnumFieldOption[];

  private resolveRenderOptions(record: ObjectValue): ResolvedEnumFieldOption[] {
    const resolved: ResolvedEnumFieldOption[] = [];

    this.options.forEach(({ available, ...others }) => {
      let optionAvailable = true;

      if (isString(available)) {
        optionAvailable = runExpression({ value: record }, available!);
      }

      let disabled = false;

      if (!optionAvailable) {
        let { showUnavailableOption } = this.getConfig();

        if (showUnavailableOption === undefined) {
          showUnavailableOption = this.getCommonBehavior('field.showUnavailableOption');
        }

        if (showUnavailableOption !== true) {
          return;
        }

        disabled = true;
      }

      resolved.push({ ...others, disabled });
    });

    return resolved;
  }

  public initOptions(
    viewContext: ViewContext,
    callback: (
      options: EnumFieldOption[],
      renderOptionsResolver: (record: ObjectValue) => ResolvedEnumFieldOption[],
    ) => void,
  ): void {
    resolveEnumOptions(viewContext, this.getField(), enumOptions => {
      this.options = enumOptions;

      callback(enumOptions, this.resolveRenderOptions.bind(this));
    });
  }

  public getSingleDisplayText(value: number | string, options: ResolvedEnumFieldOption[]): string {
    return resolveSingleEnumDisplayText(value, options);
  }

  public getMultipleDisplayText(
    value: number[] | string[],
    optionMap: Record<string, EnumFieldOption>,
  ): string {
    return resolveMultipleEnumDisplayText(value, optionMap);
  }
}

export { EnumFieldHeadlessWidget };
