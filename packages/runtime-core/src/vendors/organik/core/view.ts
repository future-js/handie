import { isFunction, noop } from '@ntks/toolbox';

import {
  ComponentCtor,
  DataValue,
  ConfigType,
  ModuleContext,
  ComponentRenderer,
  ViewDescriptor,
  ListViewContextDescriptor,
  ObjectViewContextDescriptor,
  ListViewContext,
  ObjectViewContext,
} from './typing';
import { createCreator } from './creator';
import { createViewContext } from './context';

type ViewWidgetResolver = (view: ViewDescriptor) => ComponentRenderer;
type MixedViewContext<VT, CT extends ConfigType> =
  | ListViewContext<VT, CT>
  | ObjectViewContext<VT, CT>;
type ViewProvider = { [key: string]: any };

let viewWidgetResolver: ViewWidgetResolver = (() => noop) as ViewWidgetResolver;

function setViewWidgetResolver(resolver: ViewWidgetResolver): void {
  viewWidgetResolver = resolver;
}

const [getViewCreator, setViewCreator] = createCreator(
  (
    context: MixedViewContext<DataValue, ConfigType>, // eslint-disable-line @typescript-eslint/no-unused-vars
    provider: ViewProvider, // eslint-disable-line @typescript-eslint/no-unused-vars
    renderer: ComponentRenderer, // eslint-disable-line @typescript-eslint/no-unused-vars
  ) => function () {} as ComponentCtor, // eslint-disable-line @typescript-eslint/no-empty-function
);

function createView<VT, CT extends ConfigType>(
  context: ModuleContext | MixedViewContext<VT, CT>,
  options?: ListViewContextDescriptor<VT, CT> | ObjectViewContextDescriptor<VT, CT>,
  providerGetter?: () => ViewProvider,
): ComponentCtor {
  const resolved = options
    ? createViewContext(context as ModuleContext, options)
    : (context as MixedViewContext<VT, CT>);
  const view = resolved.getView();

  let provider = { viewContext: resolved } as ViewProvider;

  if ((options as ListViewContextDescriptor<VT, CT>).search) {
    provider.searchContext = (resolved as ListViewContext<VT, CT>).getSearchContext();
  }

  if (isFunction(providerGetter)) {
    provider = { ...provider, ...providerGetter!() };
  }

  return getViewCreator()(resolved, provider, viewWidgetResolver(view));
}

export { setViewWidgetResolver, setViewCreator, createView };
