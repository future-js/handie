import type { ReactNode } from 'react';

import {
  DataValue,
  ActionDescriptor,
  ObjectValue,
  ClientAction,
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

class ObjectViewStructuralWidget<
  S extends ObjectViewWidgetState = ObjectViewWidgetState,
  CT extends ObjectViewWidgetConfig = ObjectViewWidgetConfig,
  VT extends ObjectValue = ObjectValue
> extends ViewStructuralWidget<ObjectViewContext<VT, CT>, S, CT, ObjectViewHeadlessWidget<CT>> {
  public readonly state = {
    loading: false,
    topActions: [] as ClientAction[],
    itemActions: [] as ClientAction[],
    dataSource: {},
    value: {},
    validation: {},
  } as S;

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
  }: Pick<ActionBarRendererOptions, 'executors' | 'actionText' | 'readonly'>): ReactNode[] {
    return this.$$_h.resolveActionNodes(
      this.getDefaultActions.bind(this),
      action => {
        const ActionRenderer = getRenderer('ActionRenderer');

        return ActionRenderer ? (
          <ActionRenderer key={action.name || action.text} action={action} />
        ) : null;
      },
      executors,
      actionText,
      readonly,
    );
  }

  protected renderActionBar(classNameOrOptions?: string | ActionBarRendererOptions): ReactNode {
    if (this.config.hideActionBar === true) {
      return null;
    }

    const { className, ...others } = isString(classNameOrOptions)
      ? { className: classNameOrOptions as string }
      : ((classNameOrOptions || {}) as ActionBarRendererOptions);
    const actionNodes = this.renderActions(others);

    if (actionNodes.length === 0) {
      return null;
    }

    return (
      <div key='ActionBarOfObjectViewStructuralWidget' className={className}>
        {actionNodes}
      </div>
    );
  }

  public componentWillMount(): void {
    super.componentWillMount();

    this.setHeadlessWidget(new ObjectViewHeadlessWidget(this.props, this.$$view));
    this.setState({ value: this.$$view.getValue() });

    this.on({
      dataChange: dataSource => {
        this.setState({ dataSource: dataSource });
        this.$$view.setValue(dataSource);
      },
      fieldValidate: ({ name, result }) =>
        this.setState(state => ({ validation: { ...state.validation, [name]: result } })),
      change: value => this.setState({ value }),
    });
  }
}

export { ObjectViewStructuralWidget };
