import { ViewDescriptor } from '@/shared/types';
import { createView } from '@/shared/utils';

import context from '../../context';
import AnimationListEpisodesFieldWidget from './EpisodesField';

export default createView(context, {
  name: 'AnimationListView',
  category: 'list',
  renderType: 'table',
  config: { operationColumnWidth: 250 },
  fields: [
    { name: 'title', config: { width: '300' } },
    'description',
    {
      name: 'episodes',
      label: '集数',
      widget: AnimationListEpisodesFieldWidget,
      config: { width: '80', align: 'center' },
    },
  ],
  actions: [
    { name: 'gotoCreateFormView' /*, authority: 'animation:edit' */, primary: true },
    { name: 'deleteList' /*, authority: 'animation:edit' */ },
    { text: '选择一条以上出现气泡提示', context: 'batch' },
    { text: '选择一条及以上', context: 'both' },
    'gotoDetailView',
    { name: 'gotoEditFormView' /*, authority: 'animation:edit' */ },
    { name: 'deleteOne' /*, authority: 'animation:edit' */ },
  ],
  search: {
    filters: [
      { name: 'title', placeholder: '快输入标题啊，哈哈哈' },
      { name: 'form', config: { width: 100 } },
      'description',
      { name: 'dateRange', config: { fromField: 'beginDate', toField: 'endDate' } },
      { name: 'beginDate', hidden: true },
      { name: 'endDate', hidden: true },
    ],
  },
} as ViewDescriptor);
