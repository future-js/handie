import { ActionDescriptor, ViewContext, ListViewContext, ObjectViewContext } from '@/shared/types';

export default [
  {
    name: 'gotoCreateFormView',
    context: 'free',
    text: '新增',
    execute: (context: ViewContext, { history }) =>
      history.push({ name: `${context.getModuleContext().getModuleName()}CreateForm` }),
  },
  {
    name: 'gotoEditFormView',
    context: 'single',
    text: '编辑',
    execute: (context: ObjectViewContext, { history }) =>
      history.push({
        name: `${context.getModuleContext().getModuleName()}EditForm`,
        params: { id: context.getFieldValue('id') },
      }),
  },
  {
    name: 'gotoDetailView',
    context: 'single',
    text: '查看',
    execute: (context: ObjectViewContext, { history }) =>
      history.push({
        name: `${context.getModuleContext().getModuleName()}Detail`,
        params: { id: context.getFieldValue('id') },
      }),
  },
  {
    name: 'deleteOne',
    context: 'single',
    text: '删除',
    danger: true,
    execute: (context: ObjectViewContext) => {
      const parent = context.getParent()!;

      if (parent.deleteOne) {
        parent.deleteOne(context.getValue(), () => parent.reload());
      }
    },
  },
  {
    name: 'deleteList',
    context: 'batch',
    text: '批量删除',
    danger: true,
    execute: (context: ListViewContext) =>
      context.deleteList && context.deleteList(context.getValue(), () => context.reload()),
  },
] as ActionDescriptor[];
