import { IntegerFilterWidgetConfig } from '../../types/widget/filter';
import { FilterHeadlessWidget } from './Filter';

class IntegerFilterHeadlessWidget<
  CT extends IntegerFilterWidgetConfig = IntegerFilterWidgetConfig
> extends FilterHeadlessWidget<number, CT> {}

export { IntegerFilterHeadlessWidget };
