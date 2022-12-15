import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { getVueApp, setUserAuthorityGetter, createApp } from 'handie-vue';

import components from '@/components';
import modules from '../domain';
import plugins from './plugins';
import actions from './actions';
import { setInterceptors } from './aspects';
import routes from './routes';
import theme from './theme';

setUserAuthorityGetter(() => getVueApp()!.$store.state.session.authority.accessible);
setInterceptors();

createApp({
  plugins: [Vuex, ...plugins],
  creators: {
    router: routes => new VueRouter({ routes }),
    store: moduleTree => new Vuex.Store({ modules: moduleTree }),
  },
  components,
  metadata: { actions, modules },
  theme,
  el: '#app',
  routes,
});
