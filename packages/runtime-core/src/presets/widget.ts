import {
  ComponentCtor,
  ComponentRenderer,
  getWidget,
  setViewWidgetResolver,
} from '../vendors/organik';

import { isFunction, toPascalCase } from '../utils';

setViewWidgetResolver(view => {
  let renderer: ComponentRenderer;

  const { renderType, widget } = view;

  if (widget) {
    if (isFunction(widget)) {
      renderer = widget as ComponentCtor;
    } else {
      renderer = getWidget(widget as string) || widget;
    }
  } else {
    renderer = getWidget(`${toPascalCase(renderType || '')}ViewWidget`) || '';
  }

  return renderer;
});
