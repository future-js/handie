import {
  ActionDescriptor,
  ListViewContext,
  ObjectViewContext,
  resolveAction,
} from '../../vendors/organik';
import { getAppHelperForInternalUse } from '../../vendors/organik/core/app';

import type { ObjectViewWidgetConfig } from '../../types/widget/view';

import { isPlainObject } from '../../utils';
import { getDefaultActionNames, resolveActionsFromView } from '../../utils/widget';

import { ViewHeadlessWidget } from './View';

class ObjectViewHeadlessWidget<
  CT extends ObjectViewWidgetConfig = ObjectViewWidgetConfig
> extends ViewHeadlessWidget<CT> {
  public getDefaultActions(): (string | ActionDescriptor)[] {
    return this.getCommonBehavior('view.objectViewDefaultActions');
  }

  public resolveActionNodes<NodeType>(
    defaultActionsGetter: (readonly?: boolean) => (string | ActionDescriptor)[],
    nodeCreator: (action: ActionDescriptor) => NodeType,
    executors: Record<string, (...args: any[]) => any> = {},
    actionText: Record<string, string> = {},
    readonly?: boolean,
  ): NodeType[] {
    const context = this.getViewContext<ObjectViewContext>();
    const config = this.getConfig();

    const certainActions = resolveActionsFromView(context);
    const defaultExecutors: Record<string, (...args: any[]) => any> = {};
    const resolvedActionText: Record<string, string> = {};

    getDefaultActionNames('submitAction').forEach(actionName => {
      defaultExecutors[actionName] = () => context.submit();

      if (config.submitActionText) {
        resolvedActionText[actionName] = config.submitActionText;
      } else if (actionText.submitActionText) {
        resolvedActionText[actionName] = actionText.submitActionText;
      }
    });

    getDefaultActionNames('resetAction').forEach(actionName => {
      defaultExecutors[actionName] = () => context.reset();

      if (config.resetActionText) {
        resolvedActionText[actionName] = config.resetActionText;
      } else if (actionText.resetActionText) {
        resolvedActionText[actionName] = actionText.resetActionText;
      }
    });

    getDefaultActionNames('cancelAction').forEach(actionName => {
      if (config.cancelActionText) {
        resolvedActionText[actionName] = config.cancelActionText;
      } else if (actionText.cancelActionText) {
        resolvedActionText[actionName] = actionText.cancelActionText;
      }
    });

    const resolvedExecutors = { ...defaultExecutors, ...executors };
    const actionNodes: NodeType[] = [];

    const resolvedActions = context.getActions();

    if (resolvedActions.length === 0) {
      defaultActionsGetter(readonly).forEach(refOrDescriptor => {
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

        actionNodes.push(nodeCreator(resolvedAction));
      }
    });

    return actionNodes;
  }

  private getRecordParams(): string | Record<string, any> | undefined {
    const { recordGetterRouteParams = 'id' } = this.getConfig();
    const routeParams = getAppHelperForInternalUse().history.getLocation().params;

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

  public isNewOne(): boolean {
    return !this.getRecordParams() || !this.getViewContext<ObjectViewContext>().getOne;
  }

  public fetchData(opener?: ListViewContext | ObjectViewContext): void {
    if (opener ? opener.getView().category !== 'object' : this.isNewOne()) {
      return;
    }

    const context = this.getViewContext<ObjectViewContext>();

    context.setBusy(true);

    context
      .getOne(opener ? (opener as ObjectViewContext).getValue() : this.getRecordParams()!, data =>
        context.setDataSource(data),
      )
      .finally(() => context.setBusy(false));
  }
}

export { ObjectViewHeadlessWidget };
