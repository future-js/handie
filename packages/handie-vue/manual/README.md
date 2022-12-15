# 使用手册

## 注册模块

在按领域/业务划分好的模块文件夹下创建一个 `index.ts` 文件：

```ts
import { ModuleDescriptor } from 'handie-vue';

import { MODULE_NAME } from './helper';
import * as widgets from './widgets';

export default {
  name: MODULE_NAME,
  exports: { widgets },
  components: {
    OlButton: true,
    DataTable: true,
  },
} as ModuleDescriptor;
```

在入口类文件中引入模块并注册：

```ts
import { registerModules } from 'handie-vue';

import common from './common';
import animation from './animation';
import comic from './comic';
import game from './game';
import novel from './novel';

registerModules([common, animation, comic, game, novel]);
```

## 创建视图

```ts
import { createView } from 'handie-vue';

import context from '../../context';

import TitleField from './TitleField.vue';
import EpisodesField from './EpisodesField.vue';

export default createView(context, {
  name: 'AnimationListView',
  type: 'list',
  render: 'TableView',
  config: { operationColumnWidth: 250 },
  fields: [
    { name: 'title', label: '标题', render: TitleField, config: { width: '300' } },
    { name: 'description', label: '简介' },
    {
      name: 'episodes',
      label: '集数',
      render: EpisodesField,
      config: { width: '60', align: 'center' },
    },
  ],
  actions: [
    { name: 'gotoCreateFormView', authority: 'animation:edit', primary: true },
    { name: 'deleteList', authority: 'animation:edit' },
    'gotoDetailView',
    { name: 'gotoEditFormView', authority: 'animation:edit' },
    { name: 'deleteOne', authority: 'animation:edit' },
  ],
  search: {
    filters: [
      { name: 'title', label: '标题' },
      { name: 'description', label: '简介' },
    ],
  },
});
```
