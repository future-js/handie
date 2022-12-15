import { Component } from 'vue-property-decorator';

import {
  EnumFieldOption,
  ResolvedEnumFieldOption,
  EnumFieldWidgetConfig,
  EnumFieldWidgetState,
  IFieldWidget,
  isString,
} from '@handie/runtime-core';
import { EnumFieldHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { FieldStructuralWidget } from './Field';

@Component
class BaseEnumFieldStructuralWidget<
  ValueType,
  S extends EnumFieldWidgetState = EnumFieldWidgetState,
  CT extends EnumFieldWidgetConfig = EnumFieldWidgetConfig
> extends FieldStructuralWidget<ValueType, CT, EnumFieldHeadlessWidget<ValueType, CT>, S> {
  protected internalOptions: EnumFieldOption[] = [];

  protected options: ResolvedEnumFieldOption[] = [];

  protected optionMap: Record<string, EnumFieldOption> = {};

  public created(): void {
    this.setHeadlessWidget(
      new EnumFieldHeadlessWidget(this.$props as IFieldWidget<ValueType>, this.$$view),
    );

    this.$$_h.initOptions(this.$$view, (options, resolveRenderOptions) => {
      this.internalOptions = options;
      this.options = resolveRenderOptions(this.$$view.getValue());
      this.optionMap = options.reduce((prev, opt) => ({ ...prev, [opt.value]: opt }), {});

      if (options.some(({ available }) => isString(available))) {
        this.on('change', value => (this.options = resolveRenderOptions(value)));
      }
    });
  }
}

export { BaseEnumFieldStructuralWidget };
