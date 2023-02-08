import { getAnimationListView } from '@_/modules/animation/views';

import { createView } from '@/shared/utils';

import context from '../../context';

import TitleFieldWidget from './TitleField';
import EpisodesFieldWidget from './EpisodesField';

export default createView(context, getAnimationListView({ TitleFieldWidget, EpisodesFieldWidget }));
