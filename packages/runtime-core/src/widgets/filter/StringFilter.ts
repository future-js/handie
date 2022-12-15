import { StringFilterWidgetConfig } from '../../types/widget/filter';
import { FilterHeadlessWidget } from './Filter';

class StringFilterHeadlessWidget<
  CT extends StringFilterWidgetConfig = StringFilterWidgetConfig
> extends FilterHeadlessWidget<string, CT> {}

export { StringFilterHeadlessWidget };
