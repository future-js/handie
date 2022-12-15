import { ViewDescriptor } from '@/types';

import TitleField from './TitleField.vue';
import EpisodesField from './EpisodesField.vue';
import PopoverButtonAction from './PopoverButtonAction.vue';

export default {
  name: 'AnimationListView',
  category: 'list',
  renderType: 'table',
  config: { operationColumnWidth: 250 },
  fields: [
    { name: 'title', widget: TitleField, config: { width: '300' } },
    'description',
    {
      name: 'episodes',
      label: '集数',
      widget: EpisodesField,
      config: { width: '60', align: 'center' },
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
    { text: '选择一条以上出现气泡提示', context: 'batch', widget: PopoverButtonAction },
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
    filters: [{ name: 'title', placeholder: '快输入标题啊，哈哈哈' }, 'form', 'description'],
  },
} as ViewDescriptor;
