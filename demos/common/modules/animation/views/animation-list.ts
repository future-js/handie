import type { ComponentCtor, ListViewContextDescriptor } from '@handie/runtime-core';

function getAnimationListView({
  TitleFieldWidget,
  EpisodesFieldWidget,
  PopoverButtonActionWidget,
}: Record<string, ComponentCtor> = {}): ListViewContextDescriptor {
  return {
    name: 'AnimationListView',
    category: 'list',
    renderType: 'table',
    config: { operationColumnWidth: 250 },
    fields: [
      { name: 'title', widget: TitleFieldWidget, config: { width: 300 } },
      'description',
      {
        name: 'episodes',
        label: '集数',
        widget: EpisodesFieldWidget,
        config: { width: 80, align: 'center' },
      },
    ],
    actions: [
      {
        name: 'create',
        text: '新增对话框',
        authority: 'animation:edit',
        config: { view: 'animation.views.AnimationBriefFormView' },
      },
      {
        name: 'create',
        text: '新增页面',
        authority: 'animation:edit',
        config: { outlined: true },
      },
      { name: 'deleteList', authority: 'animation:edit' },
      { text: '选择一条以上出现气泡提示', context: 'batch', widget: PopoverButtonActionWidget },
      { text: '选择一条及以上', context: 'both' },
      'gotoDetailView',
      {
        name: 'edit',
        text: '编辑对话框',
        config: { view: 'animation.views.AnimationBriefFormView' },
      },
      { text: '自定义对话框', config: { view: 'animation.views.AnimationCustomDialogView' } },
      { name: 'edit', authority: 'animation:edit' },
      { name: 'delete', authority: 'animation:edit' },
    ],
    search: {
      config: { shortcuts: ['title', 'form'], conditionPersists: true },
      filters: [
        { name: 'title', placeholder: '快输入标题啊，哈哈哈' },
        { name: 'form', config: { width: 100 } },
        'description',
        { name: 'dateRange', config: { fromField: 'beginDate', toField: 'endDate' } },
        { name: 'beginDate', hidden: true },
        { name: 'endDate', hidden: true },
      ],
    },
  } as ListViewContextDescriptor;
}

export { getAnimationListView };
