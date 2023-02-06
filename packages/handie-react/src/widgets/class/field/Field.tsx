import {
  DataValue,
  ContextExpression,
  ValueChecker,
  ObjectViewContext,
  FieldWidgetState,
  FieldWidgetConfig,
  IFieldWidget,
  isString,
  isBoolOrExprTrue,
} from '@handie/runtime-core';
import { FieldHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { BaseStructuralWidget } from '../base';

class FieldStructuralWidget<
  ValueType = DataValue,
  CT extends FieldWidgetConfig = FieldWidgetConfig,
  HW extends FieldHeadlessWidget<ValueType, CT> = FieldHeadlessWidget<ValueType, CT>,
  S extends FieldWidgetState = FieldWidgetState
> extends BaseStructuralWidget<IFieldWidget<ValueType>, S, CT, HW, ObjectViewContext> {
  public readonly state = { disabled: false } as S;

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
    this.$$view.setFieldChecker(this.props.field.name, checker);
  }

  protected formatValue(value: ValueType = this.props.value): string {
    return this.$$_h.format(value);
  }

  protected onChange(value: ValueType): void {
    this.props.onChange(value);
  }

  public componentWillMount(): void {
    const { readonly, disabled } = this.props.field;

    if ((readonly !== undefined && this.isTrue(readonly, false)) || disabled === undefined) {
      return;
    }

    this.setState({ disabled: this.isTrue(disabled, false) });

    if (isString(disabled)) {
      this.on('change', () => this.setState(() => ({ disabled: this.isTrue(disabled, false) })));
    }
  }
}

export { FieldStructuralWidget };
