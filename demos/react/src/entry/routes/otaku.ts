export default {
  name: 'otaku',
  path: '/otaku',
  component: '@/entry/layouts/admin',
  meta: { text: '宅文化' },
  routes: [
    {
      path: '/otaku',
      redirect: '/otaku/animations',
    },
    {
      name: 'animationList',
      path: '/otaku/animations',
      component: '@/domain/animation/views/animation-list',
      meta: { text: '动画' },
    },
    {
      name: 'animationCreateForm',
      path: '/otaku/animations/new',
      component: '@/domain/animation/views/animation-form',
      meta: { hide: true },
    },
    {
      name: 'animationEditForm',
      path: '/otaku/animations/:id/edit',
      component: '@/domain/animation/views/animation-form',
      meta: { hide: true },
    },
    {
      name: 'animationDetail',
      path: '/otaku/animations/:id',
      component: '@/domain/animation/views/animation-detail',
      meta: { hide: true },
    },
  ],
};
