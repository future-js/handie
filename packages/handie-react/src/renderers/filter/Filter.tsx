import type { ReactNode } from 'react';

import {
  DataValue,
  FilterRendererProps,
  IFilterWidget,
  resolveFilterWidgetCtor,
} from '@handie/runtime-core';

import type { ComponentCtor } from '../../types/component';
import BaseRenderer from '../base';

export default class FilterRenderer extends BaseRenderer<FilterRendererProps> {
  private handleFilterChange(value: any): void {
    this.props.onChange!(this.props.filter.name, value);
  }

  public render(): ReactNode {
    const FilterWidget = resolveFilterWidgetCtor<ComponentCtor<IFilterWidget<DataValue>>>(
      this.$$view.getModuleContext(),
      this.props,
    );

    return FilterWidget ? (
      <FilterWidget
        filter={this.props.filter}
        value={this.props.value}
        onChange={value => this.handleFilterChange(value)}
      />
    ) : null;
  }
}
