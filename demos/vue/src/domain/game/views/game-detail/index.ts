import { createDetailViewGetter } from '@/utils/view';

import context from '../../context';

export default createDetailViewGetter(context, {
  name: 'GameDetailView',
  getOne: 'getOneById',
  fields: [
    { name: 'title', label: '标题' },
    { name: 'description', label: '简介' },
  ],
});
