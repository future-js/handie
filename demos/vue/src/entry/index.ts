import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { getVueApp, setUserAuthorityGetter, createApp } from 'handie-vue';

import actions from '../../../common/actions';
import { setInterceptors } from '../../../common/aspects';
import { getTheme } from '../../../common/utils/theme';

import httpClient from '@/utils/http';
import components from '@/components';
import modules from '../domain';
import plugins from './plugins';
import routes from './routes';

setUserAuthorityGetter(() => getVueApp()!.$store.state.session.authority.accessible);
setInterceptors(httpClient);

createApp({
  plugins: [Vuex, ...plugins],
  creators: {
    router: routes => new VueRouter({ routes }),
    store: moduleTree => new Vuex.Store({ modules: moduleTree }),
  },
  components,
  metadata: { actions, modules },
  theme: getTheme({
    icon: {
      providers: {
        el: { type: 'font', resolve: ref => `el-icon-${ref}` },
        ivu: { type: 'font' },
      },
    },
    behavior: {
      common: { field: { hintIcon: 'el:question' } },
    },
  }),
  el: '#app',
  routes,
});
