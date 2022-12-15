import { Component, Prop } from 'vue-property-decorator';

import {
  DataValue,
  ContextExpression,
  ValueChecker,
  ViewFieldDescriptor,
  ObjectViewContext,
  FieldWidgetState,
  FieldWidgetConfig,
  IFieldWidget,
  isString,
  isBoolOrExprTrue,
} from '@handie/runtime-core';
import { FieldHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { BaseStructuralWidget } from '../base';

@Component
class FieldStructuralWidget<
  ValueType = DataValue,
  CT extends FieldWidgetConfig = FieldWidgetConfig,
  HW extends FieldHeadlessWidget<ValueType, CT> = FieldHeadlessWidget<ValueType, CT>,
  S extends FieldWidgetState = FieldWidgetState
> extends BaseStructuralWidget<IFieldWidget<ValueType>, S, CT, HW, ObjectViewContext> {
  @Prop({ type: Object, default: () => ({}) })
  public readonly field!: ViewFieldDescriptor;

  /**
   * Access the injected view context
   *
   * @deprecated use `$$view` instead, will remove in next major release
   */
  protected readonly context: ObjectViewContext = this.$$view;

  protected disabled: boolean = false;

  protected get showValidationRulesAsNative(): boolean {
    return this.$$_h.isValidationRulesShownAsNative(
      this.$$view.getConfig().showFieldValidationRulesAsNative,
    );
  }

  protected isTrue(
    booleanOrExpr: boolean | ContextExpression,
    defaultReturnValue?: DataValue,
  ): boolean {
    return isBoolOrExprTrue(this.$$view.getValue(), booleanOrExpr, defaultReturnValue);
  }

  protected getPlaceholder(): string {
    return this.$$_h.getPlaceholder();
  }

  protected setValueChecker(checker: ValueChecker): void {
    this.$$view.setFieldChecker(this.field.name, checker);
  }

  protected formatValue(value: ValueType = (this as any).value): string {
    return this.$$_h.format(value);
  }

  protected onChange(value: ValueType): void {
    this.$emit('change', value);
  }

  public created(): void {
    const { readonly, disabled } = this.field;

    if ((readonly !== undefined && this.isTrue(readonly, false)) || disabled === undefined) {
      return;
    }

    this.disabled = this.isTrue(disabled, false);

    if (isString(disabled)) {
      this.on('change', () => (this.disabled = this.isTrue(disabled, false)));
    }
  }
}

export { FieldStructuralWidget };
