export default {
  name: 'session',
  path: '/session',
  component: '@/entry/layouts/BlankLayout',
  meta: { hide: true },
  routes: [
    {
      name: 'login',
      path: '/session/login',
      component: '@/domain/session/views/login-form',
    },
  ],
};
