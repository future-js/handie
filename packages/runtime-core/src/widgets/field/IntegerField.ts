import { IntegerFieldWidgetConfig } from '../../types/widget/field';
import { FieldHeadlessWidget } from './Field';

class IntegerFieldHeadlessWidget<
  CT extends IntegerFieldWidgetConfig = IntegerFieldWidgetConfig
> extends FieldHeadlessWidget<number, CT> {}

export { IntegerFieldHeadlessWidget };
