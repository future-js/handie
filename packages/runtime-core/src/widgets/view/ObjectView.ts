import type { ActionDescriptor } from '../../vendors/organik';

import type { ObjectViewWidgetConfig } from '../../types/widget/view';

import { ViewHeadlessWidget } from './View';

class ObjectViewHeadlessWidget<
  CT extends ObjectViewWidgetConfig = ObjectViewWidgetConfig
> extends ViewHeadlessWidget<CT> {
  public getDefaultActions(): (string | ActionDescriptor)[] {
    return this.getCommonBehavior('view.objectViewDefaultActions');
  }
}

export { ObjectViewHeadlessWidget };
