import { isBoolean, isString, isFunction, includes } from '@ntks/toolbox';

import {
  ComponentCtor,
  ServerAction,
  ModuleResources,
  ModuleDependencies,
  ModuleActions,
  ModuleViews,
  ModuleDescriptor,
  ModuleComponents,
  ResolvedModule,
} from './typing';
import { getControl } from './component';

const moduleMap = new Map<string, ResolvedModule>();

function convertAsyncFunctionMapToServerActionMap<R>(funcMap: R): Record<keyof R, ServerAction> {
  const actionMap = {} as Record<keyof R, ServerAction>;

  Object.keys(funcMap).forEach(funcName => {
    const funcOrAction = funcMap[funcName];

    actionMap[funcName] = isFunction(funcOrAction)
      ? ({
          name: funcName,
          type: 'server',
          execute: funcOrAction,
        } as ServerAction)
      : (funcOrAction as ServerAction);
  });

  return actionMap;
}

function ensureModuleExists(name: string): ResolvedModule {
  if (!moduleMap.has(name)) {
    moduleMap.set(name, {
      model: undefined as any,
      actions: {},
      views: {},
      imports: [],
      exports: {},
      dependencies: {},
      componentRefs: {},
      components: {},
    });
  }

  return moduleMap.get(name)!;
}

function registerModule({
  name,
  model = undefined as any,
  actions = {},
  views = {},
  imports = [],
  exports = {},
  components = {},
}: ModuleDescriptor): void {
  moduleMap.set(name, {
    model,
    actions: convertAsyncFunctionMapToServerActionMap(actions),
    views,
    imports,
    exports,
    dependencies: {},
    componentRefs: components,
    components: ensureModuleExists(name).components, // 必须保证 `components` 这个属性的引用地址不变，否则在模块未注册时在部件和页面中使用会找不到依赖组件
  });
}

function getDependencyByRef(ref: string) {
  const [moduleName, resourceType, resourceName] = ref.split('.');
  const module = ensureModuleExists(moduleName);

  return module.exports[resourceType] && module.exports[resourceType][resourceName];
}

function resolveDependencies(): void {
  moduleMap.forEach((module, name) =>
    moduleMap.set(name, {
      ...module,
      dependencies: module.imports.reduce(
        (prev, ref) => ({ ...prev, [ref]: getDependencyByRef(ref) }),
        {},
      ),
    }),
  );
}

function getDependencies(
  moduleName: string,
  refPath?: string,
): ModuleDependencies | ModuleResources | undefined {
  const module = ensureModuleExists(moduleName);
  const dependencies: ModuleDependencies = {};

  module.imports.forEach(ref => {
    const [dependencyModule, resourceType, resourceName] = ref.split('.');

    if (!dependencies[dependencyModule]) {
      dependencies[dependencyModule] = {};
    }

    if (!dependencies[dependencyModule][resourceType]) {
      dependencies[dependencyModule][resourceType] = {};
    }

    dependencies[dependencyModule][resourceType][resourceName] = module.dependencies[ref];
  });

  if (!refPath || !isString(refPath)) {
    return dependencies;
  }

  const [refModule, refResourceType] = refPath.split('.').slice(0, 2);
  const dependency = dependencies[refModule];

  if (!dependency) {
    return;
  }

  return refResourceType ? dependency[refResourceType] : (dependency as ModuleResources);
}

function resolveComponents(): void {
  moduleMap.forEach((module, name) => {
    const refs = module.componentRefs;

    let dependencies: ModuleDependencies;

    Object.keys(refs).forEach(id => {
      const ref = refs[id];
      const useIdDirectly = isBoolean(ref);
      const refParts = isString(ref) ? (ref as string).split('.') : [];

      let resolvedComponent: ComponentCtor | undefined;

      if (useIdDirectly || refParts.length === 1) {
        resolvedComponent = getControl(useIdDirectly ? id : (ref as string));
      } else if (refParts.length === 3) {
        if (!dependencies) {
          dependencies = getDependencies(name) as ModuleDependencies;
        }

        const [refModule, _, widgetName] = refParts;
        const { widgets } = dependencies[refModule];

        resolvedComponent = widgets && widgets[widgetName];
      }

      if (resolvedComponent) {
        module.components[id] = resolvedComponent;
      }
    });
  });
}

function registerModules(descriptors: ModuleDescriptor[]): void {
  descriptors.forEach(registerModule);
  resolveDependencies();
  resolveComponents();
}

function getActions(moduleName: string): ModuleActions {
  return ensureModuleExists(moduleName).actions;
}

function getViews(moduleName: string): ModuleViews {
  return ensureModuleExists(moduleName).views;
}

function getComponents(
  moduleName: string,
  newComponents: { [key: string]: ComponentCtor } = {},
): ModuleComponents {
  const { components } = ensureModuleExists(moduleName);

  Object.keys(newComponents).forEach(name => (components[name] = newComponents[name]));

  return components;
}

function isWidgetDependency(moduleName: string, widgetName: string): boolean {
  const module = moduleMap.get(moduleName);

  if (!module || (module.imports || []).length === 0 || !module.componentRefs[widgetName]) {
    return false;
  }

  return includes(module.componentRefs[widgetName], module.imports);
}

export {
  convertAsyncFunctionMapToServerActionMap,
  ensureModuleExists,
  registerModules,
  getActions,
  getViews,
  getDependencies,
  getComponents,
  isWidgetDependency,
};
