import { setUserAuthorityGetter, createApp } from 'handie-react-starter-umi';

import actions from '@_/actions';
import { setInterceptors } from '@_/aspects';
import { getTheme } from '@_/utils/theme';

import components from '@/shared/components';
import modules from '../domain';
import routes from './routes';

setUserAuthorityGetter(() => ({ 'animation:edit': true }));
setInterceptors();

createApp({
  components,
  metadata: { actions, modules },
  theme: getTheme({ icon: { providers: { antd: { type: 'svg' } } } }),
  routes,
});
