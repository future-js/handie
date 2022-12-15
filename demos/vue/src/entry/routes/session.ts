import { RouteConfig } from '@/types';

import { NotFound } from '../../domain/session/views';

export default [{ path: '*', component: NotFound }] as RouteConfig[];
