import type { ObjectViewContextDescriptor, ListViewContext, ObjectViewContext } from '@/types';

export default function getAnimationBriefFormDescriptor(
  opener: ListViewContext | ObjectViewContext,
): ObjectViewContextDescriptor {
  return {
    name: 'AnimationBriefFormView',
    category: 'object',
    renderType: 'form-dialog',
    config: { moduleLabel: '动画' },
    fields: ['title', 'description', 'form'],
    opener,
    validate: 'submit',
  };
}
