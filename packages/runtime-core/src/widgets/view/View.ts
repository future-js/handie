import { ActionDescriptor, ClientAction, ViewContext, resolveAction } from '../../vendors/organik';

import type { ActionWidgetConfig, ActionConfigKeyHandlers } from '../../types/widget/action';
import type { ViewWidgetConfig, IViewWidget } from '../../types/widget/view';
import { executeClientAction } from '../../utils/widget/action';

import { BaseHeadlessWidget } from '../base';

class ViewHeadlessWidget<CT extends ViewWidgetConfig = ViewWidgetConfig> extends BaseHeadlessWidget<
  IViewWidget,
  CT
> {
  public getConfig(): CT {
    return (this.getViewContext().getConfig() || {}) as CT;
  }

  public execute<AC extends ActionWidgetConfig = ActionWidgetConfig>(
    actionNameOrDescriptor: string | ClientAction<AC>,
    viewContext: ViewContext = this.getViewContext(),
    handlers?: ActionConfigKeyHandlers<AC>,
  ): void {
    const action = resolveAction(actionNameOrDescriptor as string | ActionDescriptor) as
      | ClientAction<AC>
      | undefined;

    if (action) {
      executeClientAction(viewContext, action, (action.config || {}) as AC, handlers);
    }
  }
}

export { ViewHeadlessWidget };
