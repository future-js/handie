import type { ReactNode } from 'react';

import type { AnimationEntity } from '@_/modules/animation/typing';

import { RelationFieldStructuralWidget } from '@/shared/components/widget/base';

export default class AnimationListEpisodesFieldWidget extends RelationFieldStructuralWidget<
  AnimationEntity[]
> {
  public render(): ReactNode {
    return <span>{(this.props.value || []).length}</span>;
  }
}
