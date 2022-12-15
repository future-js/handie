import {
  AppHelper,
  ResponseResult,
  ClientAction,
  ObjectViewContext,
  registerAction,
} from '../vendors/organik';

import { BuiltInClientAction } from '../types/action';

import { resolveRouteParams } from '../utils/action';

function deleteOne(ctx: ObjectViewContext, { success, error }: AppHelper): Promise<ResponseResult> {
  const parent = ctx.getParent()!;

  return parent.deleteOne(
    ctx.getValue(),
    () => {
      success('删除成功');
      parent.reload();
    },
    message => error(`删除记录错误：${message}`),
  );
}

([
  {
    name: BuiltInClientAction.Create,
    text: '新增',
    context: 'free',
    primary: true,
    execute: (ctx: ObjectViewContext, { history }) =>
      history.push({ name: `${ctx.getModuleContext().getModuleName()}CreateForm` }),
  },
  {
    name: BuiltInClientAction.Edit,
    text: '编辑',
    context: 'single',
    execute: (ctx: ObjectViewContext, { history }, { routeParamKeys = 'id' }) =>
      history.push({
        name: `${ctx.getModuleContext().getModuleName()}EditForm`,
        params: resolveRouteParams(ctx, routeParamKeys),
      }),
  },
  { name: BuiltInClientAction.Submit, text: '提交', context: 'single', primary: true },
  { name: BuiltInClientAction.Reset, text: '重置', context: 'single' },
  { name: BuiltInClientAction.Cancel, text: '取消', context: 'single' },
  {
    name: BuiltInClientAction.Delete,
    text: '删除',
    context: 'single',
    danger: true,
    confirm: '是否将该记录删除？',
    execute: deleteOne,
  },
] as ClientAction[]).forEach(action => registerAction(action));
