import type { ReactNode } from 'react';

import {
  ViewFieldDescriptor,
  ObjectViewWidgetConfig,
  ObjectViewWidgetState,
  getRenderer,
} from '@handie/runtime-core';

import type { ComponentCtor } from '../../../../types/component';
import { ObjectViewStructuralWidget } from '../object-view';

class FormViewStructuralWidget<
  S extends ObjectViewWidgetState = ObjectViewWidgetState,
  CT extends ObjectViewWidgetConfig = ObjectViewWidgetConfig
> extends ObjectViewStructuralWidget<S, CT> {
  protected isNewOne(): boolean {
    return this.$$_h.isNewOne();
  }

  protected fetchData(): void {
    this.$$_h.fetchData();
  }

  protected renderForm(
    options: {
      className?: string;
      readonly?: boolean;
      fields?: ViewFieldDescriptor[];
      children?: ReactNode;
    } = {},
  ): ReactNode {
    const { className, readonly = false, fields = this.fields, children = null } = options;
    const FormRenderer = getRenderer('FormRenderer') as ComponentCtor;

    return FormRenderer ? (
      <FormRenderer
        className={className}
        fields={fields}
        actions={this.$$view.getActions()}
        value={this.state.value}
        validation={this.state.validation}
        config={this.config}
        readonly={readonly}
        onChange={this.onFieldValueChange.bind(this)}
      >
        {children}
      </FormRenderer>
    ) : null;
  }

  public componentWillUnmount(): void {
    super.componentWillUnmount();
    this.$$view.reset();
  }
}

export { FormViewStructuralWidget };
