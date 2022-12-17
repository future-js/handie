import { getAnimationListView } from '@_/modules/animation/views';

import { createView } from '@/shared/utils';

import context from '../../context';
import EpisodesFieldWidget from './EpisodesField';

export default createView(context, getAnimationListView({ EpisodesFieldWidget }));
