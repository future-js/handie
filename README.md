# [Handie](https://handiejs.github.io/)

在运行时库/框架无关的核心 [`@handie/runtime-core`](packages/runtime-core) 的基础上针对不同的运行时视图库/框架进行适配封装的**渐进式配置驱动企业级中后台前端应用开发解决方案**。

## 动机

技术在发展，业务场景也在不断地变化，要在一家企业中始终如一地使用同一套技术几乎是不可能的。

在使用不同的技术开发了多个应用之后，让其他未接触过相关技术的人来接手开发时，不仅要熟悉业务，还要花时间去了解学习相关技术并理解原有代码。

熟悉业务是不可避免的，但在业务开发中由于切换技术栈所带来的成本是否能够尽可能地降低呢？答案必然是肯定的！这就是 Handie 所存在的意义！

Handie 的目标不是统一技术栈，更不是统一界面风格，而是——

- 为做业务开发的前端开发人员提供在任何技术栈中都一致的开发体验，减少切换技术栈的成本；
- 便捷、快速地开发页面，从枯燥、繁重的业务开发中解放出来。

为了达成目标，Handie 主要提供以下材料：

- 通用的工具方法；
- 通用的页面布局；
- 通用的 CSS 组件及以此在各技术栈中封装的组件；
- 大量的 Sass mixin；
- 自定义主题机制。

当前已适配 [Vue 2.x](https://v2.vuejs.org/) 和 [React](https://reactjs.org)，并且仅支持 class component 的写法；对 Vue 2.x 的 composition API、[Vue 3.x](https://v3.vuejs.org/)、[React Hooks](https://reactjs.org/docs/hooks-intro.html) 和其他运行时库/框架的支持以及各种酷炫实用的功能还在计划中。

## 使用

如果你想在体验中理解 Handie 的魅力，或想成为贡献者——

首先，将本仓库 clone 到本地，并确保 Node.js 的版本在 14，最好是 `14.15.3`。

在 `npm i` 安装好依赖后 `npm start` 会启动 Vue 应用（预览或调试 React 应用需输入 `npm start react`）。启动成功不会自动打开浏览器，要自己手动输入地址哦！

如果你想使用 Handie 帮助自己或团队便捷并快速地开发页面——

在业务项目中 `npm i handie-vue` 或 `npm i handie-react`。

更多请见[在线文档](https://handiejs.github.io/guides/intro/)。
