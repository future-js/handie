import type { ReactNode } from 'react';

import {
  ActionWidgetState,
  ActionWidgetConfig,
  IActionWidget,
  getControl,
  getRenderer,
} from '@handie/runtime-core';
import { ActionHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import type { ComponentCtor } from '../../../types/component';
import { getViewLibInstId } from '../../../utils';
import { BaseStructuralWidget } from '../base';

class ActionStructuralWidget<
  S extends ActionWidgetState = ActionWidgetState,
  CT extends ActionWidgetConfig = ActionWidgetConfig
> extends BaseStructuralWidget<IActionWidget<CT>, S, CT, ActionHeadlessWidget<CT>> {
  public readonly state = { disabled: false } as S;

  protected resolveClassNames(className?: string): string {
    return this.$$_h.resolveClassNames(className);
  }

  protected renderView(): ReactNode {
    const ViewRenderer = getRenderer('ViewRenderer');
    const viewRef = this.config.view;

    return viewRef && ViewRenderer ? (
      <ViewRenderer
        key={`ViewRendererOfActionWidget-${getViewLibInstId(this)}`}
        view={viewRef}
        params={[this.$$view]}
      />
    ) : null;
  }

  protected renderContent(): ReactNode[] | string {
    return this.$$_h.renderContent((iconRef, text, iconOnly) => {
      const Icon = getControl('Icon') as ComponentCtor;
      const children: ReactNode[] = [<Icon key='ButtonActionIcon' refs={iconRef} />];

      if (!iconOnly) {
        children.push(<span key='ButtonActionText'>{text}</span>);
      }

      return children;
    });
  }

  protected onExecute(): void {
    if (this.config.view) {
      this.$$view.emit(`dialog-view-show.${this.$$view.getId()}`);
    } else {
      this.$$_h.execute(this.$$view);
    }
  }

  public componentWillMount(): void {
    this.setHeadlessWidget(new ActionHeadlessWidget(this.props, this.$$view));

    const {
      disableWhenNoSelection = this.getCommonBehavior('action.disableWhenNoSelection', true),
    } = this.config;

    if (disableWhenNoSelection === false) {
      return;
    }

    const { context } = this.props.action;
    const batchOrBoth = context === 'batch' || context === 'both';

    this.setState({ disabled: batchOrBoth });

    if (batchOrBoth) {
      this.on('change', value =>
        this.setState({ disabled: context === 'batch' ? value.length < 2 : value.length === 0 }),
      );
    }
  }
}

export { ActionStructuralWidget };
