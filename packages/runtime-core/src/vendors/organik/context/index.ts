import {
  setSearchContextCreator,
  setObjectViewContextCreator,
  setListViewContextCreator,
} from '../core';
import { SearchContext } from './search';
import { ObjectViewContext } from './view/object';
import { ListViewContext } from './view/list';

setSearchContextCreator(descriptor => new SearchContext(descriptor));
setObjectViewContextCreator(
  (moduleContext, options) => new ObjectViewContext(moduleContext, options),
);
setListViewContextCreator((moduleContext, options) => new ListViewContext(moduleContext, options));
