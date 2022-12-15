import { mixin } from '@ntks/toolbox';

import type {
  ModelDescriptor,
  ViewFieldDescriptor,
  ListViewContext,
  ObjectViewContext,
  ExpressionContext,
} from '../../typing';
import { resolveFieldMap } from '../../model';

type MixedViewContext = ListViewContext | ObjectViewContext;

const viewContextMap = new Map<string, MixedViewContext>();

function getViewContext(id: string): MixedViewContext | undefined {
  return viewContextMap.get(id);
}

function setViewContext(viewContext: MixedViewContext): void {
  const id = viewContext.getId();

  if (viewContextMap.has(id)) {
    return;
  }

  viewContextMap.set(id, viewContext);
}

function resolveFields(
  fields: ViewFieldDescriptor[],
  model?: ModelDescriptor,
): ViewFieldDescriptor[] {
  if (!model) {
    return fields;
  }

  const fieldMap = resolveFieldMap(model.fields);

  return fields.map(field =>
    fieldMap[field.name]
      ? (mixin(true, {}, fieldMap[field.name], field) as ViewFieldDescriptor)
      : field,
  );
}

function runExpression(
  { dataSource, value }: ExpressionContext,
  expression: string,
  defaultReturnValue?: any,
): any {
  const func = new Function('$dataSource', '$value', `return ${expression}`); // eslint-disable-line no-new-func

  let result: boolean;

  try {
    result = func.call(null, dataSource, value); // eslint-disable-line no-useless-call
  } catch (err) {
    console.error(err);
    result = defaultReturnValue;
  }

  return result;
}

export { resolveFields, runExpression, getViewContext, setViewContext };
