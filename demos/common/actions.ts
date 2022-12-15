import type { ActionDescriptor, ListViewContext, ObjectViewContext } from '@handie/runtime-core';

export default [
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
    name: 'deleteList',
    context: 'batch',
    text: '批量删除',
    danger: true,
    execute: (context: ListViewContext) =>
      context.deleteList && context.deleteList(context.getValue(), () => context.reload()),
  },
] as ActionDescriptor[];
