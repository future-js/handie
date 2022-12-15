import Vue from 'vue';

import { setViewCreator } from '@handie/runtime-core';

setViewCreator((context, provider, renderer) =>
  Vue.extend({
    name: context.getView().name,
    components: context.getComponents(),
    provide: provider,
    render: h => h(renderer),
  }),
);
