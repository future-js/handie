import type { ClientAction, ViewContext } from '../../vendors/organik';

import type { BaseWidgetConfig, BaseWidgetState } from './base';

interface ActionWidgetConfig extends BaseWidgetConfig {
  readonly icon?: string;
  readonly iconOnly?: boolean;
  readonly showIcon?: boolean;
  readonly disableWhenNoSelection?: boolean;
  readonly view?: string; // pop-up view or embedded view
  readonly goto?: string; // routable view
  readonly routeParamKeys?: string | string[] | Record<string, string>;
}

type ActionConfigKeyHandlers<CT extends ActionWidgetConfig = ActionWidgetConfig> = Partial<
  Record<
    keyof Pick<CT, 'goto' | 'view'>,
    (configValue: any, viewContext: ViewContext, config: CT) => any
  >
>;

interface IActionWidget<CT extends ActionWidgetConfig = ActionWidgetConfig> {
  readonly action: ClientAction<CT>;
}

interface ActionWidgetState extends BaseWidgetState {
  disabled: boolean;
}

export type { ActionWidgetConfig, ActionConfigKeyHandlers, IActionWidget, ActionWidgetState };
