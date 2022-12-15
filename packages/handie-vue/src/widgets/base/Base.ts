import Vue from 'vue';
import { Component, Inject } from 'vue-property-decorator';

import {
  EventHandler,
  EventHandlers,
  LocationRoute,
  HistoryHelper,
  SessionHelper,
  AppHelper,
  ModuleContext,
  ViewContext,
  BaseWidgetConfig,
  BaseWidgetState,
  isString,
  isPlainObject,
  toKebabCase,
} from '@handie/runtime-core';
import { BaseHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { getEventWithNamespace, resolveBindEvent } from '../../utils';

type WidgetBehaviors = { [key: string]: any };

@Component
class BaseStructuralWidget<
  P extends Record<string, any> = {}, // eslint-disable-line @typescript-eslint/ban-types
  S extends BaseWidgetState = BaseWidgetState,
  C extends BaseWidgetConfig = BaseWidgetConfig,
  H extends BaseHeadlessWidget<P, C> = BaseHeadlessWidget<P, C>,
  V extends ViewContext = ViewContext
> extends Vue {
  /**
   * Access the injected view context
   */
  @Inject({ from: 'viewContext', default: null })
  protected readonly $$view!: V;

  private __style!: Record<string, any>;

  /**
   * Headless widget instance
   */
  protected $$_h!: H; // eslint-disable-line camelcase

  protected get $$app(): AppHelper {
    return this.$$_h.getAppHelper();
  }

  /**
   * Shortcut for `history` of `this.$$app`
   */
  protected get $$history(): HistoryHelper {
    return this.$$app.history;
  }

  /**
   * Shortcut for `getLocation()` of `this.$$history`
   */
  protected get $$route(): LocationRoute {
    return this.$$history.getLocation();
  }

  /**
   * Shortcut for `session` of `this.$$app`
   */
  protected get $$session(): SessionHelper {
    return this.$$app.session;
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

  protected getStyle(): Record<string, any> {
    const style = this.config.style || {};
    const resolved: Record<string, any> = {};

    Object.keys(style).forEach(key => {
      const val = style[key];

      if (isString(val)) {
        resolved[`--handie-${toKebabCase(key)}`] = val;
      } else if (isPlainObject(val)) {
        // TODO: style object that the first level is the prefix of CSS variables
      }
    });

    return resolved;
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

  public beforeDestroy(): void {
    this.off();
  }
}

export { BaseStructuralWidget };
