import { ViewDescriptor } from '@/types';

import EpisodesField from './EpisodesField.vue';
import DescriptionField from './DescriptionField.vue';

export default {
  name: 'AnimationDetailView',
  category: 'object',
  renderType: 'form',
  config: { readonly: true },
  fields: [
    'title',
    { name: 'description', widget: DescriptionField },
    'form',
    { name: 'episodes', widget: EpisodesField },
  ],
} as ViewDescriptor;
