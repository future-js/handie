import { ObjectViewContextDescriptor, ObjectViewContext } from '@/shared/types';
import { createView } from '@/shared/utils';

import context from '../../context';

import ViewSearchTreeActionWidget from './ViewSearchTreeAction';
import AnimationFormViewWidget from './AnimationForm';

export default createView(context, {
  name: 'AnimationFormView',
  category: 'object',
  // renderType: 'form',
  widget: AnimationFormViewWidget,
  config: {
    formControlLabelWidth: 80,
  },
  fields: [
    { name: 'title', hint: '哈哈', config: { prefix: 'holy', suffix: 'light' } },
    'description',
    'form',
    'episodes',
    {
      name: 'dateRange',
      renderType: 'date-time-range',
      readonly: '$value.form === "ova"',
      // config: { format: 'YYYY 年 MM 月 DD 日' /*, fromField: 'beginDate', toField: 'endDate' */ },
    },
    {
      name: 'startDate',
      label: '开始日期',
      dataType: 'date',
      // renderType: 'date-time',
      // config: { format: 'YYYY 年 MM 月 DD 日' },
    },
    { name: 'ss', label: '集数', dataType: 'integer', config: { prefix: 'holy', suffix: 'light' } },
    { name: 'homepage', renderType: 'url' },
    { name: 'rate', label: '评分', dataType: 'float', config: { prefix: '总共', suffix: '分' } },
    { name: 'ghost', label: '幽灵', hidden: true },
    { name: 'beginDate', label: 'holy', hidden: true },
    { name: 'endDate', label: 'light', hidden: true },
  ],
  actions: [
    { text: '保存', execute: (ctx: ObjectViewContext) => ctx.submit(), primary: true },
    { text: '查看搜索树', widget: ViewSearchTreeActionWidget },
    { text: '提示对话框', execute: (ctx: ObjectViewContext) => ctx.emit(`alert.${ctx.getId()}`) },
    { text: '确认对话框', execute: (ctx: ObjectViewContext) => ctx.emit(`confirm.${ctx.getId()}`) },
  ],
  validate: 'submit',
} as ObjectViewContextDescriptor);
