import { ComponentCtor } from '../component';
import { ModelDescriptor } from './model';
import { ServerAction } from './action';
import { ViewComponentRenderer } from './view';

type ModuleResourceType = 'services' | 'utils' | 'widgets';

type ModuleResources = Partial<Record<ModuleResourceType, any>>;

type ModuleDependencies = Record<string, ModuleResources>;

type ModuleComponentRefs = Record<string, boolean | string>;

type AsyncFunction = (...args: any[]) => Promise<any>;

type UnsureModuleActions<K extends string = string> = Record<K, ServerAction | AsyncFunction>;

type ModuleActions<K extends string = string> = Record<K, ServerAction>;

type ModuleViews = Record<string, ViewComponentRenderer>;

type ModuleDescriptor<K extends string = string> = {
  name: string;
  model?: ModelDescriptor;
  actions?: UnsureModuleActions<K>;
  views?: ModuleViews;
  imports?: string[];
  exports?: Partial<Record<ModuleResourceType, Record<string, any>>>;
  components?: ModuleComponentRefs;
};

type ModuleComponents = Record<string, ComponentCtor>;

type ResolvedModule = Required<Omit<ModuleDescriptor, 'name' | 'actions' | 'components'>> & {
  actions: ModuleActions;
  dependencies: Record<string, any>;
  componentRefs: ModuleComponentRefs;
  components: ModuleComponents;
};

export {
  AsyncFunction,
  ModuleResourceType,
  ModuleResources,
  ModuleDependencies,
  UnsureModuleActions,
  ModuleActions,
  ModuleViews,
  ModuleDescriptor,
  ModuleComponents,
  ResolvedModule,
};
