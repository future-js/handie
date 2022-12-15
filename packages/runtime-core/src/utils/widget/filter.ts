import { capitalize } from '../../vendors/toolbox';
import { ComponentCtor, ModuleContext } from '../../vendors/organik';

import type { FilterRendererProps } from '../../types/renderer';
import { resolveFilterRenderType } from '../renderer';
import { resolveWidgetCtor } from './base';

function resolveFilterWidgetCtor<WidgetCtor extends ComponentCtor = ComponentCtor>(
  moduleContext: ModuleContext,
  { filter }: FilterRendererProps,
): WidgetCtor | undefined {
  return resolveWidgetCtor(
    moduleContext,
    filter.widget,
    () =>
      `${resolveFilterRenderType(filter)
        .split('-')
        .map(part => capitalize(part))
        .join('')}${(filter.dataType || '')
        .split('-')
        .map(part => capitalize(part))
        .join('')}FilterWidget`,
  );
}

export { resolveFilterWidgetCtor };
