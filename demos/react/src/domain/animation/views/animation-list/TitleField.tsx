import type { ReactNode } from 'react';

import { StringFieldStructuralWidget } from '@/shared/components/widget/base';

export default class AnimationListTitleFieldWidget extends StringFieldStructuralWidget {
  public render(): ReactNode {
    return (
      <a
        href={`https://otaku-ism.com/animations/${this.$$view.getFieldValue('id')}/`}
        target='_blank'
        rel='noreferrer'
      >
        {this.props.value}
      </a>
    );
  }
}
