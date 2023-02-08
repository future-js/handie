import { getAnimationFormView } from '@_/modules/animation/views';

import { createView } from '@/shared/utils';

import context from '../../context';

import ViewSearchTreeActionWidget from './ViewSearchTreeAction';
import AnimationFormViewWidget from './AnimationForm';

export default createView(
  context,
  getAnimationFormView(/* { ViewSearchTreeActionWidget, AnimationFormViewWidget } */),
);
