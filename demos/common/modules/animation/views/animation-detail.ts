import type { ComponentCtor, ObjectViewContextDescriptor } from '@handie/runtime-core';

function getAnimationDetailView({
  DescriptionFieldWidget,
  EpisodesFieldWidget,
}: Record<string, ComponentCtor> = {}): ObjectViewContextDescriptor {
  return {
    name: 'AnimationDetailView',
    category: 'object',
    renderType: 'form',
    config: { readonly: true },
    fields: [
      'title',
      { name: 'description', widget: DescriptionFieldWidget },
      'form',
      { name: 'episodes', widget: EpisodesFieldWidget },
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
  };
}

export { getAnimationDetailView };
