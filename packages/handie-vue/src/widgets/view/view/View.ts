import { Component } from 'vue-property-decorator';

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

@Component
class ViewStructuralWidget<
  ViewContextType extends ViewContext = ViewContext,
  S extends ViewWidgetState = ViewWidgetState,
  CT extends ViewWidgetConfig = ViewWidgetConfig,
  HW extends ViewHeadlessWidget<CT> = ViewHeadlessWidget<CT>
> extends BaseStructuralWidget<IViewWidget, S, CT, HW, ViewContextType> {
  /**
   * Access the injected view context
   *
   * @deprecated use `$$view` instead, will remove in next major release
   */
  protected readonly context: ViewContextType = this.$$view;

  protected loading: boolean = false;

  protected topActions: ClientAction[] = [];
  protected itemActions: ClientAction[] = [];

  private __clientActionMap!: Record<string, ClientAction>;

  protected get fields(): ViewFieldDescriptor[] {
    return this.$$view.getFields();
  }

  private initActionStuffs(): void {
    const { top, item, map } = resolveActionStuffs(this.$$view);

    this.topActions = top;
    this.itemActions = item;
    this.__clientActionMap = map;
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

  public created(): void {
    this.initActionStuffs();
    this.on('busyChange', busy => (this.loading = busy));
  }
}

export { ViewStructuralWidget };
