import {
  ClientAction,
  ViewFieldDescriptor,
  ViewContext,
  ActionWidgetConfig,
  ActionConfigKeyHandlers,
  ViewWidgetConfig,
  ViewWidgetState,
  IViewWidget,
  resolveActionStuffs,
} from '@handie/runtime-core';
import { ViewHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { BaseStructuralWidget } from '../../base';

class ViewStructuralWidget<
  ViewContextType extends ViewContext = ViewContext,
  S extends ViewWidgetState = ViewWidgetState,
  CT extends ViewWidgetConfig = ViewWidgetConfig,
  HW extends ViewHeadlessWidget<CT> = ViewHeadlessWidget<CT>
> extends BaseStructuralWidget<IViewWidget, S, CT, HW, ViewContextType> {
  public readonly state = {
    loading: false,
    topActions: [] as ClientAction[],
    itemActions: [] as ClientAction[],
  } as S;

  private __clientActionMap!: Record<string, ClientAction>;

  protected get fields(): ViewFieldDescriptor[] {
    return this.$$view.getFields();
  }

  private initActionStuffs(): void {
    const { top, item, map } = resolveActionStuffs(this.$$view);

    this.__clientActionMap = map;

    this.setState({ topActions: top, itemActions: item });
  }

  protected getAction(actionName: string): ClientAction | undefined {
    return this.__clientActionMap[actionName];
  }

  protected execute<AC extends ActionWidgetConfig = ActionWidgetConfig>(
    action: string | ClientAction<AC>,
    viewContext: ViewContext = this.$$view,
    handlers?: ActionConfigKeyHandlers<AC>,
  ): void {
    this.$$_h.execute(action, viewContext, handlers);
  }

  public componentWillMount(): void {
    this.initActionStuffs();
    this.on('busyChange', busy => this.setState({ loading: busy }));
  }
}

export { ViewStructuralWidget };
