import { createApp } from 'handie-react-starter-umi';

import actions from '../../../common/actions';
import { setInterceptors } from '../../../common/aspects';
import { getTheme } from '../../../common/utils/theme';

import components from '@/shared/components';
import modules from '../domain';
import routes from './routes';

setInterceptors();

createApp({
  components,
  metadata: { actions, modules },
  theme: getTheme({ icon: { providers: { antd: { type: 'svg' } } } }),
  routes,
});
