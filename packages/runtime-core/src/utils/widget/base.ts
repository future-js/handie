import type { EventWithNamespace, EventHandlers } from '@ntks/event-emitter';

import { isString, omit } from '../../vendors/toolbox';
import {
  ConfigType,
  ComponentRenderer,
  ComponentCtor,
  ModuleContext,
  isWidgetDependency,
  getWidget,
} from '../../vendors/organik';

function createBindEventResolver<ViewLibInstance>(
  eventNameGetter: (viewLibInst: ViewLibInstance, event?: string) => EventWithNamespace,
): (
  viewLibInst: ViewLibInstance,
  event: string | EventHandlers,
) => EventWithNamespace | EventHandlers {
  return (viewLibInst: ViewLibInstance, event: string | EventHandlers) => {
    let resolved: EventWithNamespace | EventHandlers;

    if (isString(event)) {
      resolved = eventNameGetter(viewLibInst, event as string);
    } else {
      resolved = {} as EventHandlers;

      Object.keys(event as EventHandlers).forEach(key => {
        resolved[eventNameGetter(viewLibInst, key)] = (event as EventHandlers)[key];
      });
    }

    return resolved;
  };
}

function resolveWidgetCtor<WidgetCtor extends ComponentCtor = ComponentCtor>(
  moduleContext: ModuleContext,
  widget: ComponentRenderer | undefined,
  widgetNameFromRenderTypeResolver: () => string,
): WidgetCtor | undefined {
  if (widget) {
    if (isString(widget)) {
      return isWidgetDependency(moduleContext.getModuleName(), widget as string)
        ? (moduleContext.getComponents()[widget as string] as WidgetCtor)
        : undefined;
    }

    return widget as WidgetCtor;
  }

  return getWidget(widgetNameFromRenderTypeResolver()) as WidgetCtor | undefined;
}

const commonUnsafeKeys = ['className', 'style', 'nativeStyle', 'tag', 'title'];

function resolveSafePropsFromConfig(config: ConfigType, specificUnsafeKeys: string[]) {
  return omit(config, [...commonUnsafeKeys, ...specificUnsafeKeys]);
}

export { createBindEventResolver, resolveWidgetCtor, resolveSafePropsFromConfig };
