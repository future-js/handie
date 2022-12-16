import type { ObjectViewContextDescriptor } from '@handie/runtime-core';

import type { ViewOpener } from '../../../types';

function getAnimationBriefFormView(): (opener: ViewOpener) => ObjectViewContextDescriptor {
  return (opener: ViewOpener) => ({
    name: 'AnimationBriefFormView',
    category: 'object',
    renderType: 'form-dialog',
    config: { moduleLabel: '动画' },
    fields: ['title', 'description', 'form'],
    opener,
    validate: 'submit',
  });
}

export { getAnimationBriefFormView };
