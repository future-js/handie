import { RouteConfig } from '@/types';

import session from './session';
import otaku from './otaku';
import spreadsheet from './spreadsheet';

export default ([
  { name: 'root', path: '/', redirect: '/otaku' },
  otaku,
  spreadsheet,
] as RouteConfig[]).concat(session);
