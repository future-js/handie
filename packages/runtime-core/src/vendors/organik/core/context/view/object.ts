import { ModuleContext, ObjectViewContextDescriptor, ObjectViewContext } from '../../typing';
import { createCreator } from '../../creator';

const [getObjectViewContextCreator, setObjectViewContextCreator] = createCreator(
  (moduleContext: ModuleContext, options: ObjectViewContextDescriptor) => ({} as ObjectViewContext), // eslint-disable-line @typescript-eslint/no-unused-vars
);

function createObjectViewContext<VT, CT>(
  moduleContext: ModuleContext,
  options: ObjectViewContextDescriptor<VT, CT>,
): ObjectViewContext<VT, CT> {
  return getObjectViewContextCreator()(moduleContext, options) as ObjectViewContext<VT, CT>;
}

export { setObjectViewContextCreator, createObjectViewContext };
