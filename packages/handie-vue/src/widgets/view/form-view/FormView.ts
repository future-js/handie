import type { VNode, VNodeChildren } from 'vue';
import { Component } from 'vue-property-decorator';

import {
  ViewFieldDescriptor,
  ObjectViewWidgetConfig,
  ObjectViewWidgetState,
  isPlainObject,
  getRenderer,
} from '@handie/runtime-core';

import { ObjectViewStructuralWidget } from '../object-view';

@Component
class FormViewStructuralWidget<
  S extends ObjectViewWidgetState = ObjectViewWidgetState,
  CT extends ObjectViewWidgetConfig = ObjectViewWidgetConfig
> extends ObjectViewStructuralWidget<S, CT> {
  private getRecordParams(): string | Record<string, any> | undefined {
    const { recordGetterRouteParams = 'id' } = this.config;
    const routeParams = this.$$route.params;

    if (isPlainObject(recordGetterRouteParams)) {
      return Object.entries(recordGetterRouteParams as Record<string, string>).reduce(
        (params, [recordParamKey, routeParamKey]) => ({
          ...params,
          [recordParamKey]: routeParams[routeParamKey],
        }),
        {},
      );
    }

    const keys = ([] as string[]).concat(recordGetterRouteParams as string | string[]);

    return keys.length > 1
      ? keys.reduce((params, key) => ({ ...params, [key]: routeParams[key] }), {})
      : routeParams[keys[0]];
  }

  protected isNewOne(): boolean {
    return !this.getRecordParams() || !this.$$view.getOne;
  }

  protected fetchData(): void {
    if (this.isNewOne()) {
      return;
    }

    this.$$view.setBusy(true);

    const ctx = this.$$view;

    ctx
      .getOne(this.getRecordParams()!, data => ctx.setDataSource(data))
      .finally(() => this.$$view.setBusy(false));
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
