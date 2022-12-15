import { Component } from 'react';

import {
  EventHandlers,
  EventHandler,
  AppHelper,
  ModuleContext,
  ViewContext,
  BaseWidgetConfig,
  BaseWidgetState,
} from '@handie/runtime-core';
import { BaseHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { generateWidgetId, getEventWithNamespace, resolveBindEvent } from '../../../utils';
import ViewReactContext from '../../../contexts/view';

type WidgetBehaviors = { [key: string]: any };

class BaseStructuralWidget<
  P extends Record<string, any> = {}, // eslint-disable-line @typescript-eslint/ban-types
  S extends BaseWidgetState = BaseWidgetState,
  C extends BaseWidgetConfig = BaseWidgetConfig,
  H extends BaseHeadlessWidget<P, C> = BaseHeadlessWidget<P, C>,
  V extends ViewContext = ViewContext
> extends Component<P, S> {
  static contextType = ViewReactContext;

  private __handieReactWidgetId: string = generateWidgetId();

  private __style!: Record<string, any>;

  /**
   * Headless widget instance
   */
  protected $$_h!: H; // eslint-disable-line camelcase

  protected get $$app(): AppHelper {
    return this.$$_h.getAppHelper();
  }

  /**
   * Access the injected view context
   */
  protected get $$view(): V {
    return this.context.viewContext;
  }

  /**
   * Access the injected module context
   */
  protected get $$module(): ModuleContext {
    return this.$$view.getModuleContext() as ModuleContext;
  }

  protected get config(): C {
    return this.$$_h.getConfig();
  }

  protected setHeadlessWidget(hw: H): void {
    this.$$_h = hw;
  }

  protected setBehaviors(keyInTheme: string, options: WidgetBehaviors): void {
    this.$$_h.setBehaviors(keyInTheme, options);
  }

  protected getBehavior(path: string): any {
    return this.$$_h.getBehavior(path);
  }

  protected getCommonBehavior(path: string, defaultBehavior?: any): any {
    return this.$$_h.getCommonBehavior(path, defaultBehavior);
  }

  protected setStyleClassNames(styleClassNames: Record<string, string>): void {
    this.__style = styleClassNames;
  }

  protected getStyleClassName(className: string): string {
    return (this.__style || {})[className] || '';
  }

  protected on(event: string | EventHandlers, handler?: EventHandler): void {
    if (this.$$view) {
      this.$$view.on(resolveBindEvent(this, event), handler);
    }
  }

  protected off(event?: string, handler?: EventHandler): void {
    if (this.$$view) {
      this.$$view.off(getEventWithNamespace(this, event), handler);
    }
  }

  public componentWillUnmount(): void {
    this.off();
  }
}

export { BaseStructuralWidget };
