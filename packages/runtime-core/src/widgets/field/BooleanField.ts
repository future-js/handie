import { BooleanFieldWidgetConfig } from '../../types/widget/field';
import { FieldHeadlessWidget } from './Field';

class BooleanFieldHeadlessWidget<
  CT extends BooleanFieldWidgetConfig = BooleanFieldWidgetConfig
> extends FieldHeadlessWidget<boolean, CT> {
  public getPositiveLabel(): string {
    return this.getConfig().positiveLabel || '是';
  }

  public getNegativeLabel(): string {
    return this.getConfig().negativeLabel || '否';
  }

  public isNegativeFirst(): boolean {
    return this.getConfig().negativeFirst || false;
  }
}

export { BooleanFieldHeadlessWidget };
