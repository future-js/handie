import { TextFieldWidgetConfig } from '../../types/widget/field';
import { FieldHeadlessWidget } from './Field';

class TextFieldHeadlessWidget<
  CT extends TextFieldWidgetConfig = TextFieldWidgetConfig
> extends FieldHeadlessWidget<string, CT> {}

export { TextFieldHeadlessWidget };
