import { BooleanFilterWidgetConfig } from '../../types/widget/filter';
import { FilterHeadlessWidget } from './Filter';

class BooleanFilterHeadlessWidget<
  CT extends BooleanFilterWidgetConfig = BooleanFilterWidgetConfig
> extends FilterHeadlessWidget<boolean, CT> {}

export { BooleanFilterHeadlessWidget };
