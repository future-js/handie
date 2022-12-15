import type { ComponentCtor } from '../component';
import type { DataValue } from '../value';
import type { RequestParams, ResponseResult, ResponseSuccess, ResponseFail } from '../http';
import type {
  ModelDescriptor,
  ModuleResources,
  ModuleDependencies,
  UnsureModuleActions,
} from '../metadata';

interface ModuleContextDescriptor<K extends string = string> {
  moduleName: string;
  actions: UnsureModuleActions<K>;
  model?: ModelDescriptor;
}

type ServerActionExecutor<ActionName extends string = string, VT extends DataValue = DataValue> = {
  (actionName: ActionName, success?: ResponseSuccess<VT>, fail?: ResponseFail<VT>): Promise<
    ResponseResult<VT>
  >;
  (
    actionName: ActionName,
    params: RequestParams,
    success?: ResponseSuccess<VT>,
    fail?: ResponseFail<VT>,
  ): Promise<ResponseResult<VT>>;
};

interface ModuleContext<K extends string = string> {
  getModuleName: () => string;
  getModel: () => ModelDescriptor | undefined;
  getDependencies: (refPath?: string) => ModuleDependencies | ModuleResources | undefined;
  getComponents: (newComponents?: {
    [key: string]: ComponentCtor;
  }) => Record<string, ComponentCtor>;
  execute: ServerActionExecutor<K>;
}

export type { ModuleContextDescriptor, ServerActionExecutor, ModuleContext };
