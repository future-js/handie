import type { ReactNode } from 'react';

import {
  DataValue,
  FieldRendererProps,
  IFieldWidget,
  resolveFieldWidgetCtor,
} from '@handie/runtime-core';

import type { ComponentCtor } from '../../types/component';
import BaseRenderer from '../base';

export default class FieldRenderer extends BaseRenderer<FieldRendererProps> {
  private handleFieldChange(value: DataValue): void {
    this.props.onChange!(this.props.field.name, value);
  }

  public render(): ReactNode {
    const FieldWidget = resolveFieldWidgetCtor<ComponentCtor<IFieldWidget<DataValue>>>(
      this.$$view.getModuleContext(),
      this.props,
    );

    return FieldWidget ? (
      <FieldWidget
        field={this.props.field}
        value={this.props.value}
        onChange={value => this.handleFieldChange(value)}
      />
    ) : null;
  }
}
