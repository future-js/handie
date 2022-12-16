import { getAnimationListView } from '@_/modules/animation/views';

import TitleFieldWidget from './TitleField.vue';
import EpisodesFieldWidget from './EpisodesField.vue';
import PopoverButtonActionWidget from './PopoverButtonAction.vue';

export default getAnimationListView({
  TitleFieldWidget,
  EpisodesFieldWidget,
  PopoverButtonActionWidget,
});
