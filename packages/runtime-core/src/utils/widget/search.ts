import { isFunction } from '../../vendors/toolbox';
import { ComponentCtor, ListViewContext, getWidget } from '../../vendors/organik';

function resolveSearchWidgetCtor<WidgetCtor extends ComponentCtor = ComponentCtor>(
  viewContext: ListViewContext,
): WidgetCtor | undefined {
  const search = viewContext.getSearch();

  let widgetCtor: WidgetCtor;

  if (isFunction(search)) {
    widgetCtor = search as WidgetCtor;
  } else {
    const { widget = 'FormSearchWidget' } = search as any;

    widgetCtor = isFunction(widget) ? widget : getWidget(widget);
  }

  return widgetCtor;
}

export { resolveSearchWidgetCtor };
