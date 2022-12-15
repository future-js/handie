import { Component } from 'vue-property-decorator';

import type {
  DataValue,
  FieldWidgetState,
  FieldWidgetConfig,
  IFieldWidget,
} from '@handie/runtime-core';
import { FieldHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { FieldStructuralWidget } from './Field';

@Component
class UntypedFieldStructuralWidget<
  VT extends DataValue = DataValue,
  S extends FieldWidgetState = FieldWidgetState,
  CT extends FieldWidgetConfig = FieldWidgetConfig
> extends FieldStructuralWidget<VT, CT, FieldHeadlessWidget<VT, CT>, S> {
  public created(): void {
    this.setHeadlessWidget(new FieldHeadlessWidget(this.$props as IFieldWidget<VT>, this.$$view));
  }
}

export { UntypedFieldStructuralWidget };
