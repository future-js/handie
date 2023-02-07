import type { VNode, VNodeChildren } from 'vue';
import { Component } from 'vue-property-decorator';

import {
  ViewFieldDescriptor,
  ObjectViewWidgetConfig,
  ObjectViewWidgetState,
  getRenderer,
} from '@handie/runtime-core';

import { ObjectViewStructuralWidget } from '../object-view';

@Component
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
      children?: VNodeChildren;
    } = {},
  ): VNode | null {
    const { className, readonly = false, fields = this.fields, children = null } = options;

    return this.$createElement(
      getRenderer('FormRenderer'),
      {
        props: {
          className,
          fields,
          actions: this.$$view.getActions(),
          value: this.value,
          validation: this.validation,
          config: this.config,
          readonly,
        },
        on: { change: this.onFieldValueChange },
      },
      children,
    );
  }

  public beforeDestroy(): void {
    this.$$view.reset();
  }
}

export { FormViewStructuralWidget };
