import type { ReactNode } from 'react';

import {
  ViewFieldDescriptor,
  ViewWidgetConfig,
  ObjectViewWidgetState,
  getRenderer,
} from '@handie/runtime-core';

import type { ComponentCtor } from '../../../../types/component';
import { ObjectViewStructuralWidget } from '../object-view';

class FormViewStructuralWidget<
  S extends ObjectViewWidgetState = ObjectViewWidgetState,
  CT extends ViewWidgetConfig = ViewWidgetConfig
> extends ObjectViewStructuralWidget<S, CT> {
  protected getRecordId(): string {
    return this.$$app.history.getLocation().params.id || '';
  }

  protected fetchData(): void {
    const ctx = this.$$view;
    const id = this.getRecordId();

    if (id && ctx.getOne) {
      this.$$view.setBusy(true);

      ctx.getOne(id, data => ctx.setDataSource(data)).finally(() => this.$$view.setBusy(false));
    }
  }

  protected renderActionBar(className?: string): ReactNode {
    return (
      <div className={className} key='ActionBarOfFormViewStructuralWidget'>
        {this.$$view.getActions().map(action => {
          const ActionRenderer = getRenderer('ActionRenderer') as ComponentCtor;

          return ActionRenderer ? (
            <ActionRenderer key={action.name || action.text} action={action} />
          ) : null;
        })}
      </div>
    );
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
