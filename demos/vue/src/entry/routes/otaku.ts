import { RouteConfig } from '@/types';

import { ComicList } from '../../domain/comic/views';
import { NovelList } from '../../domain/novel/views';

import AdminLayout from '../layouts/admin';

export default {
  name: 'otaku',
  path: '/otaku',
  component: AdminLayout,
  meta: { text: '宅文化', auth: 'otaku' },
  redirect: '/otaku/animations',
  children: [
    {
      name: 'animationList',
      path: 'animations',
      component: 'animation.views.AnimationList',
      meta: { text: '动画', auth: 'animation:read' },
    },
    {
      name: 'animationCreateForm',
      path: 'animations/new',
      component: 'animation.views.AnimationForm',
      meta: { text: '新建动画', auth: 'animation:edit', show: false },
    },
    {
      name: 'animationDetail',
      path: 'animations/:id',
      component: 'animation.views.AnimationDetail',
      meta: { text: '动画详情', auth: 'animation:read', show: false },
    },
    {
      name: 'animationEditForm',
      path: 'animations/:id/edit',
      component: 'animation.views.AnimationForm',
      meta: { text: '编辑动画', auth: 'animation:edit', show: false },
    },
    {
      name: 'comicList',
      path: 'comics',
      component: ComicList,
      meta: { text: '漫画', auth: 'comic:read' },
    },
    {
      name: 'gameList',
      path: 'games',
      component: 'game.views.GameList',
      meta: { text: '游戏', auth: 'game:read' },
    },
    {
      name: 'gameDetail',
      path: 'games/:id',
      component: 'game.views.GameDetail',
      meta: { text: '游戏详情', auth: 'game:read', show: false },
    },
    {
      name: 'novelList',
      path: 'novels',
      component: NovelList,
      meta: { text: '小说', auth: 'novel:read' },
    },
  ],
} as RouteConfig;
