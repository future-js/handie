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
  isPlainObject,
  includes,
  resolveAction,
  getRenderer,
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

  private getDefaultActionNames(behaviorKey: string): string[] {
    return ([] as string[]).concat(this.getCommonBehavior(`action.${behaviorKey}`));
  }

  /**
   * Default actions for object view widgets
   *
   * @param readonly whether the object view is read-only, used for filtering actions according to this status
   * @returns list of action's ref or descriptor
   */
  protected getDefaultActions(readonly = false): (string | ActionDescriptor)[] {
    const actions = this.$$_h.getDefaultActions();

    if (!readonly) {
      return actions;
    }

    const submitActionNames = this.getDefaultActionNames('submitAction');

    return actions.filter(refOrDescriptor => {
      const actionName = isString(refOrDescriptor)
        ? (refOrDescriptor as string)
        : (refOrDescriptor as ActionDescriptor).name;

      return !actionName || !includes(actionName, submitActionNames);
    });
  }

  private resolveActionsFromView(): Record<string, true> {
    return (this.$$view.getView().actions || []).reduce((acc, cur) => {
      let actionName: string | undefined;

      if (isString(cur)) {
        actionName = cur as string;
      } else if (isPlainObject(cur)) {
        actionName = (cur as ActionDescriptor).name;
      }

      return actionName ? { ...acc, [actionName]: true } : acc;
    }, {} as Record<string, true>);
  }

  protected renderActions({
    executors = {},
    actionText = {},
    readonly,
  }: Pick<ActionBarRendererOptions, 'executors' | 'actionText' | 'readonly'>): VNode[] {
    const certainActions = this.resolveActionsFromView();
    const defaultExecutors: ActionExecutors = {};
    const resolvedActionText: ActionText = {};

    this.getDefaultActionNames('submitAction').forEach(actionName => {
      defaultExecutors[actionName] = () => this.$$view.submit();

      if (this.config.submitActionText) {
        resolvedActionText[actionName] = this.config.submitActionText;
      } else if (actionText.submitActionText) {
        resolvedActionText[actionName] = actionText.submitActionText;
      }
    });

    this.getDefaultActionNames('resetAction').forEach(actionName => {
      defaultExecutors[actionName] = () => this.$$view.reset();

      if (this.config.resetActionText) {
        resolvedActionText[actionName] = this.config.resetActionText;
      } else if (actionText.resetActionText) {
        resolvedActionText[actionName] = actionText.resetActionText;
      }
    });

    this.getDefaultActionNames('cancelAction').forEach(actionName => {
      if (this.config.cancelActionText) {
        resolvedActionText[actionName] = this.config.cancelActionText;
      } else if (actionText.cancelActionText) {
        resolvedActionText[actionName] = actionText.cancelActionText;
      }
    });

    const resolvedExecutors = { ...defaultExecutors, ...executors };
    const actionNodes: VNode[] = [];

    const resolvedActions = this.$$view.getActions();

    if (resolvedActions.length === 0) {
      this.getDefaultActions(readonly).forEach(refOrDescriptor => {
        const action = resolveAction(refOrDescriptor);

        if (action) {
          resolvedActions.push(action);
        }
      });
    }

    resolvedActions.forEach(action => {
      if (!action.context || action.context === 'single') {
        const resolvedAction = { ...action };

        if (action.name) {
          const defaultExecutor = resolvedExecutors[action.name];

          if (!resolvedAction.execute && defaultExecutor) {
            resolvedAction.execute = defaultExecutor;
          }

          const textFromConfig = resolvedActionText[action.name];

          if (!certainActions[action.name] && textFromConfig) {
            resolvedAction.text = textFromConfig;
          }
        }

        actionNodes.push(
          this.$createElement(getRenderer('ActionRenderer'), {
            key: resolvedAction.name || resolvedAction.text,
            props: { action: resolvedAction },
          }),
        );
      }
    });

    return actionNodes;
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
