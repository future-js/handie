import type { ComponentCtor, ObjectViewContextDescriptor } from '@handie/runtime-core';

import type { ViewOpener } from '../../../types';

function getAnimationCustomDialogView<WidgetCtor extends ComponentCtor = ComponentCtor>(
  dialogContentWidget: WidgetCtor,
): (opener: ViewOpener) => ObjectViewContextDescriptor {
  return (opener: ViewOpener) => ({
    name: 'AnimationCustomDialogView',
    category: 'object',
    renderType: 'dialog',
    config: { title: '自定义对话框', $$child: dialogContentWidget },
    actions: ['cancel'],
    opener,
  });
}

export { getAnimationCustomDialogView };
