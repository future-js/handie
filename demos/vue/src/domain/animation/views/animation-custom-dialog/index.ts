import type { ObjectViewContextDescriptor, ListViewContext, ObjectViewContext } from '@/types';

import DialogContent from './DialogContent.vue';

export default function getAnimationCustomDialogescriptor(
  opener: ListViewContext | ObjectViewContext,
): ObjectViewContextDescriptor {
  return {
    name: 'AnimationCustomDialogView',
    category: 'object',
    renderType: 'dialog',
    config: { title: '自定义对话框', $$child: DialogContent },
    actions: ['cancel'],
    opener,
  };
}
