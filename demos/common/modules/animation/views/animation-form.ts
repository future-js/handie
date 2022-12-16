import type { ComponentCtor, ObjectViewContextDescriptor } from '@handie/runtime-core';

function getAnimationFormView<WidgetCtor extends ComponentCtor = ComponentCtor>(
  AnimationFormViewWidget: WidgetCtor,
): ObjectViewContextDescriptor {
  return {
    name: 'AnimationFormView',
    category: 'object',
    // widget: AnimationFormViewWidget,
    renderType: 'form',
    config: { submitActionText: '保存' },
    fields: [
      { name: 'title', hint: '哈哈' },
      'description',
      'form',
      'episodes',
      { name: 'ghost', label: '幽灵', hidden: true },
    ],
    validate: 'submit',
  };
}

export { getAnimationFormView };
