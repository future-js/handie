import type { ComponentCtor, ObjectViewContextDescriptor } from '@handie/runtime-core';

function getAnimationDetailView({
  DescriptionFieldWidget,
  EpisodesFieldWidget,
}: Record<string, ComponentCtor>): ObjectViewContextDescriptor {
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
    ],
  };
}

export { getAnimationDetailView };
