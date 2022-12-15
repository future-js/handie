import type { ClientAction, ViewContext } from '../../vendors/organik';

import type {
  ActionWidgetConfig,
  ActionConfigKeyHandlers,
  IActionWidget,
} from '../../types/widget/action';
import { executeClientAction } from '../../utils/widget/action';
import { BaseHeadlessWidget } from '../base';

class ActionHeadlessWidget<
  CT extends ActionWidgetConfig = ActionWidgetConfig
> extends BaseHeadlessWidget<IActionWidget<CT>, CT> {
  private getAction(): ClientAction<CT> {
    return this.getProp('action');
  }

  public getConfig(): CT {
    return this.getAction().config || ({} as CT);
  }

  public resolveClassNames(className?: string): string {
    return ['ActionWidget', className, this.getConfig().className].filter(cls => !!cls).join(' ');
  }

  /**
   * Execute client action with view context
   *
   * @param viewContext injected view context
   * @param handlers handler for specific action config key
   */
  public execute(viewContext: ViewContext, handlers?: ActionConfigKeyHandlers<CT>): void {
    executeClientAction(viewContext, this.getAction(), this.getConfig(), handlers);
  }

  /**
   * Render content of action widget
   *
   * @param iconWithTextRenderer render `Icon` component and text
   * @returns content of action widget
   */
  public renderContent<NodeType>(
    iconWithTextRenderer: (iconRef: string, text: string, iconOnly: boolean) => NodeType[],
  ): NodeType[] | string {
    const text = this.getAction().text || '';

    let { showIcon, iconOnly, icon } = this.getConfig();

    if (showIcon === undefined) {
      showIcon = this.getCommonBehavior('action.showIcon');
    }

    if (iconOnly === undefined) {
      iconOnly = this.getCommonBehavior('action.iconOnly');
    }

    return !showIcon || !icon ? text : iconWithTextRenderer(icon, text, iconOnly!);
  }
}

export { ActionHeadlessWidget };
