import type {
  ViewFieldDescriptor,
  ViewContext,
  ViewWidgetConfig,
  ViewWidgetState,
  IViewWidget,
} from '@handie/runtime-core';
import { ViewHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { BaseStructuralWidget } from '../../base';

class ViewStructuralWidget<
  ViewContextType extends ViewContext = ViewContext,
  S extends ViewWidgetState = ViewWidgetState,
  CT extends ViewWidgetConfig = ViewWidgetConfig,
  HW extends ViewHeadlessWidget<CT> = ViewHeadlessWidget<CT>
> extends BaseStructuralWidget<IViewWidget, S, CT, HW, ViewContextType> {
  public readonly state = { loading: false } as S;

  protected get fields(): ViewFieldDescriptor[] {
    return this.$$view.getFields();
  }

  public componentWillMount(): void {
    this.on('busyChange', busy => this.setState({ loading: busy }));
  }
}

export { ViewStructuralWidget };
