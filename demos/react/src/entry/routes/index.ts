import otaku from './otaku';
import session from './session';

export default [
  otaku,
  session,
  {
    name: 'root',
    path: '/',
    redirect: '/session/login',
    meta: { hide: true },
  },
];
