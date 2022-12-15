import { FloatFieldWidgetConfig } from '../../types/widget/field';
import { FieldHeadlessWidget } from './Field';

class FloatFieldHeadlessWidget<
  CT extends FloatFieldWidgetConfig = FloatFieldWidgetConfig
> extends FieldHeadlessWidget<number, CT> {}

export { FloatFieldHeadlessWidget };
