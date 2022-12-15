import { isString, isFunction, noop } from '@ntks/toolbox';

import {
  RequestParams,
  ResponseResult,
  ResponseSuccess,
  ResponseFail,
  ModuleActions,
  ModuleContextDescriptor,
  ServerActionExecutor,
  ModuleContext,
} from '../typing';
import {
  convertAsyncFunctionMapToServerActionMap,
  ensureModuleExists,
  getDependencies,
  getComponents,
} from '../module';

const moduleContextMap = new Map<string, ModuleContext<any>>();

function isResultLogicallySuccessful(result: ResponseResult): boolean {
  return result.success === true;
}

function createServerActionExecutor<K extends string = string>(
  actions: ModuleActions<K>,
  resultAsserter: (result: ResponseResult, actionName: K) => boolean = isResultLogicallySuccessful,
): ServerActionExecutor<K> {
  return async function (
    actionName: K,
    params?: RequestParams | ResponseSuccess,
    success?: ResponseSuccess | ResponseFail,
    fail?: ResponseFail,
  ): Promise<ResponseResult> {
    if (!(actionName in actions)) {
      return { success: false, message: `不存在 \`${actionName}\` 这个请求资源` } as ResponseResult;
    }

    let resolvedParams: RequestParams;
    let resolvedSuccessCallback: ResponseSuccess;
    let resolvedFailCallback: ResponseFail;

    if (params && isFunction(params)) {
      resolvedParams = undefined;
      resolvedSuccessCallback = (params || noop) as ResponseSuccess;
      resolvedFailCallback = (success || noop) as ResponseFail;
    } else {
      resolvedParams = params;
      resolvedSuccessCallback = (success || noop) as ResponseSuccess;
      resolvedFailCallback = fail || noop;
    }

    const result: ResponseResult = await actions[actionName].execute(resolvedParams);

    if (resultAsserter(result, actionName)) {
      resolvedSuccessCallback(result.data, result.extra, result);
    } else {
      resolvedFailCallback(result.message, result);
    }

    return result;
  };
}

function constructModuleContextDescriptor(moduleName: string): ModuleContextDescriptor<any> {
  const module = ensureModuleExists(moduleName);
  const descriptor = { moduleName, actions: module.actions } as ModuleContextDescriptor<any>;

  if (module.model) {
    descriptor.model = module.model;
  }

  return descriptor;
}

function createModuleContext<K extends string = string>(
  descriptor: ModuleContextDescriptor<K> | string,
): ModuleContext<K> {
  const { moduleName, model, actions } = isString(descriptor)
    ? constructModuleContextDescriptor(descriptor as string)
    : (descriptor as ModuleContextDescriptor<K>);

  if (moduleContextMap.has(moduleName)) {
    return moduleContextMap.get(moduleName) as ModuleContext<K>;
  }

  const ctx = {
    getModuleName: () => moduleName,
    getModel: () => model,
    getDependencies: getDependencies.bind(null, moduleName),
    getComponents: getComponents.bind(null, moduleName),
    execute: createServerActionExecutor(convertAsyncFunctionMapToServerActionMap(actions)),
  } as ModuleContext<K>;

  moduleContextMap.set(moduleName, ctx);

  return ctx;
}

export { createModuleContext };
