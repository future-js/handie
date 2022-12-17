import type {
  ComponentCtor,
  ObjectViewContextDescriptor,
  ObjectViewContext,
} from '@handie/runtime-core';

function getAnimationFormView<WidgetCtor extends ComponentCtor = ComponentCtor>({
  AnimationFormViewWidget,
  ViewSearchTreeActionWidget,
}: Record<string, WidgetCtor> = {}): ObjectViewContextDescriptor {
  const view = {
    name: 'AnimationFormView',
    category: 'object',
    config: { formControlLabelWidth: 80 },
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
      {
        name: 'ss',
        label: '集数',
        dataType: 'integer',
        config: { prefix: 'holy', suffix: 'light' },
      },
      { name: 'homepage', renderType: 'url' },
      { name: 'rate', label: '评分', dataType: 'float', config: { prefix: '总共', suffix: '分' } },
      { name: 'ghost', label: '幽灵', hidden: true },
      { name: 'beginDate', label: 'holy', hidden: true },
      { name: 'endDate', label: 'light', hidden: true },
    ],
    actions: [
      { text: '查看搜索树', widget: ViewSearchTreeActionWidget },
      { text: '提示对话框', execute: (ctx: ObjectViewContext) => ctx.emit(`alert.${ctx.getId()}`) },
      {
        text: '确认对话框',
        execute: (ctx: ObjectViewContext) => ctx.emit(`confirm.${ctx.getId()}`),
      },
      'cancel',
      { name: 'submit', text: '保存' },
    ],
    validate: 'submit',
  } as ObjectViewContextDescriptor;

  if (AnimationFormViewWidget) {
    view.widget = AnimationFormViewWidget;
  } else {
    view.renderType = 'form';
  }

  return view;
}

export { getAnimationFormView };
