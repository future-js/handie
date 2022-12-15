import type { DataValue, ObjectViewContext } from '../../vendors/organik';

import type { UnknownViewField, ViewFieldDescriptor } from '../../types/input';
import type { FieldWidgetConfig, IFieldWidget } from '../../types/widget/field';

import { isBoolean, isFunction } from '../../utils';
import { resolvePlaceholder } from '../../utils/widget';

import { BaseHeadlessWidget } from '../base';

class FieldHeadlessWidget<
  VT extends DataValue = DataValue,
  CT extends FieldWidgetConfig = FieldWidgetConfig,
  FT extends UnknownViewField = ViewFieldDescriptor
> extends BaseHeadlessWidget<IFieldWidget<VT>, CT> {
  protected getField(): FT {
    return this.getProp('field') as FT;
  }

  protected getFieldValue(): VT | undefined {
    return this.getViewContext<ObjectViewContext>().getFieldValue<VT>(this.getField().name);
  }

  public getConfig(): CT {
    return (this.getField().config || {}) as CT;
  }

  public getPlaceholder(): string {
    return resolvePlaceholder(
      this.getField(),
      this.getConfig().showHintAsPlaceholder,
      this.getCommonBehavior('field.showHintAsPlaceholder'),
    );
  }

  public isValidationRulesShownAsNative(configFromView: boolean | undefined): boolean {
    return isBoolean(configFromView)
      ? configFromView
      : this.getCommonBehavior('field.showValidationRulesAsNative', false);
  }

  public format(value: VT = this.getProp('value')): string {
    return isFunction(this.getField().formatter)
      ? this.getField().formatter!(value, this.getViewContext().getValue())
      : value;
  }
}

export { FieldHeadlessWidget };
