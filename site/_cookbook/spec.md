---
title: 代码规范

flag:
  primary: principles
  secondary: spec
---

## 目录

* [命名方式](#naming-conventions)
  * [组件](#components)
  * [辅助](#utilities)
  * [操作](#actions)

## 命名方式 {#naming-conventions}

HTML 与 CSS 中的 class 的命名方式是一个经久不衰的论点。因为一个页面里的任何元素都可看作是「组件」的一部分，所以抛开各种立场观点和争论，本框架基于遵照 [BEM](https://en.bem.info/methodology/){:target="_blank"}{:rel="nofollow external"} 的 [SUIT CSS](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md){:target="_blank"}{:rel="nofollow external"} 的方式进行命名：

* [ComponentName](#component-name)
* [ComponentName--modifierName](#component-name-modifier-name)
* [ComponentName-descendentName](#component-name-descendent-name)
* [ComponentName.is-stateOfComponent](#component-name-is-state-of-component)
* [u-utilityName](#u-utility-name)
* [js-actionName](#js-action-name)

### 组件 {#components}

语法为 `[<namespace>-]<ComponentName>[-descendentName][--modifierName]`。

#### namespace {#namespace}

这部分不是必须的，但如果有必要，可以在自己的组件前面加上命名空间前缀，以避免潜在的与其他库中定义的 class 发生冲突。

{% highlight css %}
.mhc-Button {/* ... */}
.mhc-Tabs {/* ... */}
{% endhighlight %}

这样可以很清楚地辨别出哪些组件是自己项目中定义的。

#### ComponentName {#component-name}

组件的名字必须用[大驼峰式](https://zh.wikipedia.org/wiki/%E9%A7%9D%E5%B3%B0%E5%BC%8F%E5%A4%A7%E5%B0%8F%E5%AF%AB){:target="_blank"}{:rel="nofollow external"}（也叫「[Pascal Case](https://en.wikipedia.org/wiki/PascalCase){:target="_blank"}{:rel="nofollow external"}」）命名，其他不可用这种方式。

{% highlight css %}
.Page {/* ... */}
{% endhighlight %}

{% highlight html %}
<body class="Page">
  ...
</body>
{% endhighlight %}

#### ComponentName--modifierName {#component-name-modifier-name}

修饰符是一个改变组件基础样式的 class，必须用小驼峰式命名，并且要用两个连字符与组件名连接。**在写 HTML 时这个 class 应该附加在基础组件 class 的后面。**

{% highlight css %}
/* 按钮基础组件 */
.Button {/* ... */}
/* 按钮默认样式 */
.Button--default {/* ... */}
{% endhighlight %}

{% highlight html %}
<button class="Button Button--default" type="button">...</button>
{% endhighlight %}

#### ComponentName-descendentName {#component-name-descendent-name}

组件的后代是一个添加在组件后代节点上的 class，它负责特定组件的后代的外观显示，必须用小驼峰式命名。

{% highlight html %}
<body class="Page">
  <header class="Page-header">
    ...
  </header>
  <main class="Page-main">
    ...
  </main>
</body>
{% endhighlight %}

#### ComponentName.is-stateOfComponent {#component-name-is-state-of-component}

用 `is-stateName` 去反应组件状态的改变，状态的名字必须是小驼峰式命名。**绝不能直接给这些 class 编写样式，他们必须与其他 class 一同使用。**

这意味着同一种状态可被不同的上下文使用，每个组件必须为自己的状态定义样式（状态与组件强绑定）。

{% highlight css %}
.ImageItem {/* ... */}
.ImageItem.is-empty {/* ... */}
{% endhighlight %}

{% highlight html %}
<figure class="ImageItem is-empty">
  ...
</figure>
{% endhighlight %}

### 辅助 {#utilities}

辅助样式具备与结构和位置无甚牵连的特点，可以应用于任何元素而不依赖于组件。

语法为 `u-[sm-|md-|lg-]<utilityName>`。

#### u-utilityName {#u-utility-name}

辅助样式必须以小驼峰式命名。下面展示一下如何用多个辅助样式创建一个简单的结构。

{% highlight html %}
<div class="u-cf">
  <a class="u-floatLeft" href="javascript:void(0);">
    <img class="u-block" src="" alt="">
  </a>
  <p class="u-sizeFill u-textBreak">
    …
  </p>
</div>
{% endhighlight %}

### 操作 {#actions}

代表 DOM 元素的事件绑定触发器。（参考 Nicolas Gallagher 的《[About HTML semantics and front-end architecture](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/#javascript-specific-classes){:target="_blank"}{:rel="nofollow external"}》）

语法为 `js-<actionName>`。

#### js-actionName {#js-action-name}

此类 class 必须以小驼峰式命名，`js-` 后面跟一个能代表该动作的英文单词。

{% highlight html %}
<!-- 按钮 -->
<button type="button" class="js-openDialog">打开对话框</button>
<!-- 对话框 -->
<div class="Dialog">
  <div class="Dialog-header">
    <h3>...</h3>
    <button type="button" class="js-closeDialog">&times;</button>
  </div>
  <div class="Dialog-body">
    ...
  </div>
  <div class="Dialog-footer">
    <button class="Button Button--default js-closeDialog" type="button">关闭</button>
  </div>
</div>
{% endhighlight %}

{% highlight js %}
// 打开对话框
$(".js-openDialog").on("click", function() {
  $(".Dialog").addClass("is-shown");

  return false;
});

// 关闭对话框
$(".js-closeDialog").on("click", function() {
  $(this).closest(".Dialog").removeClass("is-shown");

  return false;
});
{% endhighlight %}
