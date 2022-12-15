import { ObjectViewContextDescriptor } from '@/shared/types';
import { createView } from '@/shared/utils';

import context from '../../context';

// import EpisodesField from './EpisodesField.vue';
// import DescriptionField from './DescriptionField.vue';

export default createView(context, {
  name: 'AnimationDetailView',
  category: 'object',
  renderType: 'detail',
  fields: [
    'title',
    { name: 'description' /*, widget: DescriptionField */ },
    'form',
    { name: 'episodes' /*, widget: EpisodesField */ },
    {
      name: 'startDate',
      label: '开始日期',
      dataType: 'date',
      renderType: 'date-time',
      config: { format: 'YYYY 年 MM 月 DD 日 HH 时 mm 分 ss 秒' },
    },
    {
      name: 'dateRange',
      renderType: 'date-time-range',
      config: {
        format:
          'YYYY 年 MM 月 DD 日 HH 时 mm 分 ss 秒' /*, fromField: 'beginDate', toField: 'endDate' */,
      },
    },
    'homepage',
  ],
} as ObjectViewContextDescriptor);
