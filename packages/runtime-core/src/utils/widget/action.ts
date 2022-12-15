import type { ButtonProps } from 'petals-ui/dist/button';

import { isString, toPascalCase } from '../../vendors/toolbox';
import {
  ConfigType,
  ComponentCtor,
  ClientAction,
  ModuleContext,
  ViewContext,
  ObjectViewContext,
  getAppHelper,
} from '../../vendors/organik';
import { getAppHelperForInternalUse } from '../../vendors/organik/core/app';

import type { ActionRendererProps } from '../../types/renderer';
import type { ActionWidgetConfig, ActionConfigKeyHandlers } from '../../types/widget';

import { resolveRouteParams } from '../action';
import { getBehaviorByKey } from '../theme';
import { resolveWidgetCtor, resolveSafePropsFromConfig } from './base';

function resolveActionWidgetCtor<WidgetCtor extends ComponentCtor = ComponentCtor>(
  moduleContext: ModuleContext,
  { action }: ActionRendererProps,
): WidgetCtor | undefined {
  return resolveWidgetCtor(
    moduleContext,
    action.widget,
    () =>
      `${toPascalCase(
        action.renderType || getBehaviorByKey('common.action.renderType') || '',
      )}ActionWidget`,
  );
}

function gotoRoutableView<CT extends ActionWidgetConfig>(
  goto: string,
  viewContext: ViewContext,
  { routeParamKeys }: CT,
): void {
  getAppHelperForInternalUse().history.push({
    name: goto,
    params:
      routeParamKeys && viewContext.getView().category === 'object'
        ? resolveRouteParams(viewContext as ObjectViewContext, routeParamKeys)
        : {},
  });
}

function showPopUpView(popUpView: string, viewContext: ViewContext): void {
  const [moduleName, _, viewName] = popUpView.split('.');

  viewContext.emit(`dialog-view-show.${viewContext.getId()}:${moduleName}-${viewName}`);
}

function executeClientAction<CT extends ActionWidgetConfig = ActionWidgetConfig>(
  viewContext: ViewContext,
  action: ClientAction<CT>,
  config?: CT,
  configKeyHandlers: ActionConfigKeyHandlers<CT> = {},
): void {
  const resolvedConfig: CT = config || action.config || ({} as CT);

  if (resolvedConfig.goto) {
    return (configKeyHandlers.goto || gotoRoutableView)(
      resolvedConfig.goto,
      viewContext,
      resolvedConfig,
    );
  }

  if (resolvedConfig.view) {
    return (configKeyHandlers.view || showPopUpView)(
      resolvedConfig.view,
      viewContext,
      resolvedConfig,
    );
  }

  const { danger, confirm, text, execute } = action;

  let beforeExecute: ((callback: () => Promise<void>) => void) | undefined;
  let needConfirm: boolean;

  if (danger) {
    needConfirm = confirm !== false;
  } else {
    needConfirm = !!confirm;
  }

  const appHelper = getAppHelper();

  if (needConfirm) {
    beforeExecute = callback =>
      appHelper.confirm(
        isString(confirm) ? (confirm as string) : `确定要${text || '执行此操作'}？`,
        {
          title: '提示',
          type: 'warning',
          affirmButton: callback,
        },
      );
  }

  const executeAction = async () => {
    if (execute) {
      await Promise.resolve(execute(viewContext, appHelper, resolvedConfig));
    }
  };

  if (beforeExecute) {
    beforeExecute(executeAction);
  } else {
    executeAction();
  }
}

function resolveButtonProps<CT extends ConfigType>(
  { primary, danger }: ClientAction<CT>,
  config: CT,
  disabled: boolean,
): Partial<ButtonProps> {
  const props: Partial<ButtonProps> = { disabled };

  if (primary) {
    props.color = 'primary';
  }

  if (danger) {
    props.color = 'danger';
  }

  return {
    ...props,
    ...resolveSafePropsFromConfig(config, ['text', 'disabled', 'onClick']),
  };
}

function resolveIconProps({ icon }: ConfigType): Record<string, any> {
  const props: Record<string, any> = {};

  if (icon) {
    props.refs = icon;
  }

  return props;
}

function resolveLinkProps(config: ConfigType): Record<string, any> {
  return resolveSafePropsFromConfig(config, ['showIcon', 'iconOnly', 'icon']);
}

function resolveControlPropsAndEvents(
  props: Record<string, any>,
  options: Record<string, any>,
): { props: Record<string, any>; events: Record<string, any> } {
  const { className, ...events } = options;
  const resolved: Record<string, any> = { ...props };

  if (className) {
    resolved.className = className;
  }

  return { props: resolved, events };
}

export {
  resolveActionWidgetCtor,
  executeClientAction,
  resolveButtonProps,
  resolveIconProps,
  resolveLinkProps,
  resolveControlPropsAndEvents,
};
