import { Component, Prop } from 'vue-property-decorator';

import {
  RequestParams,
  ResponseSuccess,
  ResponseFail,
  ObjectValue,
  ListValue,
  FieldWidgetConfig,
  RelationFieldWidgetState,
  IFieldWidget,
  noop,
} from '@handie/runtime-core';
import type { DynamicRelationField } from '@handie/runtime-core/dist/types/input';
import { RelationFieldHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { FieldStructuralWidget } from './Field';

@Component
class RelationFieldStructuralWidget<
  ValueType extends ObjectValue | ListValue = ObjectValue | ListValue,
  S extends RelationFieldWidgetState<ValueType> = RelationFieldWidgetState<ValueType>,
  CT extends FieldWidgetConfig = FieldWidgetConfig
> extends FieldStructuralWidget<ValueType, CT, RelationFieldHeadlessWidget<ValueType, CT>, S> {
  @Prop({ type: [Object, Array], default: null })
  public readonly value!: ValueType;

  protected internalValue: ValueType = null as any;

  protected get labelKey(): string {
    return this.$$_h.getLabelKey();
  }

  protected get valueKey(): string {
    return this.$$_h.getValueKey();
  }

  protected fetchRelatedList(
    params: RequestParams,
    success: ResponseSuccess = noop,
    fail: ResponseFail = noop,
  ): void {
    this.$$_h.fetchRelatedList(params, success, fail);
  }

  public created(): void {
    this.setHeadlessWidget(
      new RelationFieldHeadlessWidget(this.$props as IFieldWidget<ValueType>, this.$$view),
    );

    if (!this.field.dynamic || !(this.field as DynamicRelationField).referenceValueGetter) {
      this.internalValue = this.value;
    }

    if (this.field.dynamic) {
      this.on('dataChange', dataSource =>
        this.$$_h.fetchReferenceValue(dataSource, ({ data }) => (this.internalValue = data)),
      );
    }
  }
}

export { RelationFieldStructuralWidget };
