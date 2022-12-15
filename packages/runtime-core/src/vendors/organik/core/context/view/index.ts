import {
  ModuleContext,
  ListViewContextDescriptor,
  ListViewContext,
  ObjectViewContextDescriptor,
  ObjectViewContext,
} from '../../typing';
import { resolveFields, runExpression, getViewContext, setViewContext } from './base';
import { setListViewContextCreator, resolveListRequestParams, createListViewContext } from './list';
import { setObjectViewContextCreator, createObjectViewContext } from './object';

function createViewContext<VT, CT>(
  moduleContext: ModuleContext,
  options: ListViewContextDescriptor<VT, CT> | ObjectViewContextDescriptor<VT, CT>,
): ListViewContext<VT, CT> | ObjectViewContext<VT, CT> {
  return options.category === 'object'
    ? (createObjectViewContext<VT, CT>(
        moduleContext,
        options as ObjectViewContextDescriptor<VT, CT>,
      ) as ObjectViewContext<VT, CT>)
    : (createListViewContext<VT, CT>(
        moduleContext,
        options as ListViewContextDescriptor<VT, CT>,
      ) as ListViewContext<VT, CT>);
}

export {
  resolveFields,
  runExpression,
  getViewContext,
  setViewContext,
  setListViewContextCreator,
  resolveListRequestParams,
  setObjectViewContextCreator,
  createViewContext,
};
