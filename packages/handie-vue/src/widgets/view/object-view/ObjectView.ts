import type { VNode, VNodeData } from 'vue';
import { Component } from 'vue-property-decorator';

import {
  DataValue,
  ActionDescriptor,
  ObjectValue,
  ObjectViewContext,
  ObjectViewWidgetConfig,
  ObjectViewWidgetState,
  isString,
  getRenderer,
  resolveDefaultActions,
} from '@handie/runtime-core';
import { ObjectViewHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { ViewStructuralWidget } from '../view';
import type { ActionExecutors, ActionText, ActionBarRendererOptions } from './typing';

@Component
class ObjectViewStructuralWidget<
  S extends ObjectViewWidgetState = ObjectViewWidgetState,
  CT extends ObjectViewWidgetConfig = ObjectViewWidgetConfig,
  VT extends ObjectValue = ObjectValue
> extends ViewStructuralWidget<ObjectViewContext<VT, CT>, S, CT, ObjectViewHeadlessWidget<CT>> {
  protected dataSource: Pick<ObjectViewWidgetState, 'dataSource'>['dataSource'] = {};
  protected value: Pick<ObjectViewWidgetState, 'value'>['value'] = {};
  protected validation: Pick<ObjectViewWidgetState, 'validation'>['validation'] = {};

  protected onFieldValueChange(fieldName: string, value: DataValue): void {
    this.$$view.setFieldValue(fieldName, value);
  }

  /**
   * Default actions for object view widgets
   *
   * @param readonly whether the object view is read-only, used for filtering actions according to this status
   * @returns list of action's ref or descriptor
   */
  protected getDefaultActions(readonly = false): (string | ActionDescriptor)[] {
    return resolveDefaultActions(this.$$_h.getDefaultActions(), readonly);
  }

  protected renderActions({
    executors = {},
    actionText = {},
    readonly,
  }: Pick<ActionBarRendererOptions, 'executors' | 'actionText' | 'readonly'>): VNode[] {
    return this.$$_h.resolveActionNodes(
      this.getDefaultActions,
      action =>
        this.$createElement(getRenderer('ActionRenderer'), {
          key: action.name || action.text,
          props: { action },
        }),
      executors,
      actionText,
      readonly,
    );
  }

  protected renderActionBar(classNameOrOptions?: string | ActionBarRendererOptions): VNode | null {
    if (this.config.hideActionBar === true) {
      return null;
    }

    const { className, slotName = undefined, ...others } = isString(classNameOrOptions)
      ? { className: classNameOrOptions as string }
      : ((classNameOrOptions || {}) as ActionBarRendererOptions);
    const actionNodes = this.renderActions(others);

    if (actionNodes.length === 0) {
      return null;
    }

    const opts: VNodeData = {
      staticClass: className,
      key: 'ActionBarOfObjectViewStructuralWidget',
    };

    if (slotName) {
      opts.slot = slotName;
    }

    return this.$createElement('div', opts, actionNodes);
  }

  public created(): void {
    this.setHeadlessWidget(new ObjectViewHeadlessWidget(this.$props, this.$$view));

    this.value = this.$$view.getValue();

    this.on({
      dataChange: dataSource => {
        this.dataSource = dataSource;
        this.$$view.setValue(dataSource);
      },
      fieldValidate: ({ name, result }) =>
        (this.validation = { ...this.validation, [name]: result }),
      change: value => (this.value = value),
    });
  }
}

export { ObjectViewStructuralWidget };
