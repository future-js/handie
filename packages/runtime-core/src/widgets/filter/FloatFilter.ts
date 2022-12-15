import { FloatFilterWidgetConfig } from '../../types/widget/filter';
import { FilterHeadlessWidget } from './Filter';

class FloatFilterHeadlessWidget<
  CT extends FloatFilterWidgetConfig = FloatFilterWidgetConfig
> extends FilterHeadlessWidget<number, CT> {}

export { FloatFilterHeadlessWidget };
