import { TextFilterWidgetConfig } from '../../types/widget/filter';
import { FilterHeadlessWidget } from './Filter';

class TextFilterHeadlessWidget<
  CT extends TextFilterWidgetConfig = TextFilterWidgetConfig
> extends FilterHeadlessWidget<string, CT> {}

export { TextFilterHeadlessWidget };
