import { StringFieldWidgetConfig } from '../../types/widget/field';
import { FieldHeadlessWidget } from './Field';

class StringFieldHeadlessWidget<
  CT extends StringFieldWidgetConfig = StringFieldWidgetConfig
> extends FieldHeadlessWidget<string, CT> {}

export { StringFieldHeadlessWidget };
