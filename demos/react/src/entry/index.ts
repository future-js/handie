import { createApp } from 'handie-react-starter-umi';

import components from '@/shared/components';
import modules from '../domain';
import actions from './actions';
import { setInterceptors } from './aspects';
import routes from './routes';
import theme from './theme';

setInterceptors();

createApp({
  components,
  metadata: { actions, modules },
  theme,
  routes,
});
