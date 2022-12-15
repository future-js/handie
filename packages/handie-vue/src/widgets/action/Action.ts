import type { VNode } from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import {
  ClientAction,
  ActionWidgetState,
  ActionWidgetConfig,
  IActionWidget,
  getControl,
  getRenderer,
} from '@handie/runtime-core';
import { ActionHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { getViewLibInstId } from '../../utils';
import { BaseStructuralWidget } from '../base';

@Component
class ActionStructuralWidget<
    S extends ActionWidgetState = ActionWidgetState,
    CT extends ActionWidgetConfig = ActionWidgetConfig
  >
  extends BaseStructuralWidget<IActionWidget<CT>, S, CT, ActionHeadlessWidget<CT>>
  implements IActionWidget<CT> {
  @Prop({ type: Object, default: () => ({}) })
  public readonly action!: ClientAction<CT>;

  /**
   * Access the injected view context
   *
   * @deprecated use `$$view` instead, will remove in next major release
   */
  protected readonly context = this.$$view;

  protected disabled: boolean = false;

  protected resolveClassNames(className?: string): string {
    return this.$$_h.resolveClassNames(className);
  }

  protected renderView(): VNode | null {
    const ViewRenderer = getRenderer('ViewRenderer');
    const viewRef = this.config.view;

    return viewRef && ViewRenderer
      ? this.$createElement(ViewRenderer, {
          props: { view: viewRef, params: [this.$$view] },
          key: `ViewRendererOfActionWidget-${getViewLibInstId(this)}`,
        })
      : null;
  }

  protected renderContent(): VNode[] | string {
    const h = this.$createElement;

    return this.$$_h.renderContent((iconRef, text, iconOnly) => {
      const children: VNode[] = [
        h(getControl('Icon'), { props: { refs: iconRef }, key: 'ButtonActionIcon' }),
      ];

      if (!iconOnly) {
        children.push(h('span', { key: 'ButtonActionText' }, text));
      }

      return children;
    });
  }

  protected onExecute(): void {
    this.$$_h.execute(this.$$view);
  }

  public created(): void {
    this.setHeadlessWidget(new ActionHeadlessWidget(this.$props as IActionWidget<CT>, this.$$view));

    const {
      disableWhenNoSelection = this.getCommonBehavior('action.disableWhenNoSelection', true),
    } = this.config;

    if (disableWhenNoSelection === false) {
      return;
    }

    const { context } = this.action;
    const batchOrBoth = context === 'batch' || context === 'both';

    this.disabled = batchOrBoth;

    if (batchOrBoth) {
      this.on(
        'change',
        value => (this.disabled = context === 'batch' ? value.length < 2 : value.length === 0),
      );
    }
  }
}

export { ActionStructuralWidget };
