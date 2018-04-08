---
title: 搭建页面

flag:
  primary: guide
  secondary: scaffolding
---

这里教你如何快速搭建一个常规的数据列表页面。

## 目录

* [整体布局](#page-layout)
  * [页头](#page-header)
  * [主体](#page-body)
* [数据列表](#list-of-data)
  * [初始化](#data-initialization)
  * [分页](#pagination)
  * [筛选](#querying-conditions)
* [数据操作](#data-operation)
  * [新增](#data-addition)
  * [修改](#data-modification)
  * [删除](#data-deletion)

## 整体布局 {#page-layout}

整个页面的布局大体上分为页头和主体两部分，它们都作为 `<body>` 的直接子元素存在：

{% highlight html %}
<body class="Page">
  <!-- 页头 -->
  <header class="Page-header">
    ...
  </header>
  <!-- 主体 -->
  <main class="Page-body">
    ...
  </main>
</body>
{% endhighlight %}

### 页头 {#page-header}

页头里主要包含以下几种元素：

1. 系统信息；
2. 操作入口。

{% highlight html %}
<header class="Page-header Header">
  <!-- 系统信息 -->
  <div class="Header-brand">
    ...
  </div>
  <!-- 其他信息 -->
  <div class="Header-extra">
    <!-- 操作入口 -->
    <div class="Header-operations">
      ...
    </div>
  </div>
</header>
{% endhighlight %}

#### 系统信息

系统信息包括公司 LOGO、系统名字及其链接。其中，**系统名字建议是能够突出这个系统主要功能的 2～4 个字，而不是全名。**

{% highlight html %}
<div class="Header-brand">
  <a href="/"><img src="logo.png" srcset="logo-2x.png 2x" alt="卖好车后台系统"><span>后台</span></a>
</div>
{% endhighlight %}

#### 操作入口 {#header-operations}

符合下述条件的操作可以放置到页头的操作区：

1. 全站通用操作；
2. 当前页主要操作。

页头中的操作入口一定要放在 `<div class="Header-operations">` 里面。

{% highlight html %}
<div class="Header-operations">
  <div class="Header-action Action"><button class="Action-trigger" type="button"></button>
    <div class="Action-content">
      ...
    </div>
  </div>
</div>
{% endhighlight %}

通常，操作触发器是以一个图标按钮来呈现，这需要在 `<button>` 的 `class` 属性中加上 `fa fa-*` 来实现（具体用哪个图标请参照 [Font Awesome 官网](https://fontawesome.com/v4.7.0/icons/){:target="_blank"}{:rel="nofollow external"}）。

{% highlight html %}
<!-- 查看通知操作 -->
<div class="Header-action Action"><button class="Action-trigger fa fa-bell" type="button" title="通知"><span class="sr-only">通知</span></button>
  <div class="Action-content">
    ...
  </div>
</div>
{% endhighlight %}

如果一个操作不需要在触发操作后直接出现弹出层，则可以忽略 `<div class="Action-content">`。

{% highlight html %}
<!-- 新增数据操作 -->
<div class="Header-action Action"><button class="Action-trigger fa fa-plus" type="button" title="新增"><span class="sr-only">新增</span></button></div>
{% endhighlight %}

用户信息是一个稍微特殊的操作，其触发器不是一个 `<button>` 也没有 `fa fa-*`，并且**要始终作为页头操作区中的最后一个操作存在**（显示在最右边）。

{% highlight html %}
<!-- 登录用户信息 -->
<div class="Header-action Action Action--avatar"><a class="Action-trigger" href="javascript:void(0);"><img src="ourai.jpg" alt="欧雷"></a>
  <div class="Action-content">
    ...
  </div>
</div>
{% endhighlight %}

若要用文本替代图片，建议**字数控制在 3 个以下的汉字或不多于 5 个英文字母**。

{% highlight html %}
<div class="Header-action Action Action--avatar"><a class="Action-trigger" href="javascript:void(0);"><span>欧雷</span></a>
  <div class="Action-content">
    ...
  </div>
</div>
{% endhighlight %}

### 主体 {#page-body}

页面主体又下分侧边栏和内容两个区域：

{% highlight html %}
<main class="Page-body">
  <!-- 侧边栏 -->
  <div class="Page-sidebar">
    ...
  </div>
  <!-- 内容 -->
  <div class="Page-content">
    ...
  </div>
</main>
{% endhighlight %}

#### 侧边栏 {#sidebar}

{% highlight html %}
<div class="Page-sidebar Sidebar">
  <!-- 导航菜单 -->
  <nav class="Sidebar-navs Navs">
    <ul>
      <!-- 无子菜单 -->
      <li data-flag="dashboard"><a href="/dashboard/"><i class="fa fa-dashboard"></i><span>工作台</span></a></li>
      <!-- 有子菜单 -->
      <li data-flag="transportation">
        <a href="javascript:void(0);"><i class="fa fa-truck"></i><span>运输管理</span></a>
        <div class="Navs">
          <ul>
            <li data-flag="routes"><a href="/routes/">路线</a></li>
            <li data-flag="orders"><a href="/orders/">运单</a></li>
          </ul>
        </div>
      </li>
      ...
    </ul>
  </nav>
</div>
{% endhighlight %}

#### 内容 {#content}

{% highlight html %}
<div class="Page-main">
  <div class="Content container-fluid">
    <!-- 内容头部 -->
    <div class="Content-header">
      <!-- 面包屑 -->
      <div class="Breadcrumb"><i class="fa fa-map-marker"></i><ul><li>工作台</li></ul></div>
      <!-- 页面标题 -->
      <h1>工作台</h1>
    </div>
    <!-- 其他内容 -->
    ...
  </div>
</div>
{% endhighlight %}

## 数据列表 {#list-of-data}

大部分后台页面的内容结构，是一个数据列表及其相关的筛选条件。

### 初始化 {#data-initialization}

页面中显示数据的表格，得作为 `<div class="Content">` 的后代元素存在；若要进行初始化，需要调用 `muu.table.init()` 方法。

#### 主数据列表

所谓的「主数据列表」，就是在访问一个页面时直接显示出来的那个占据大部分视觉空间的数据列表。

框架中默认的页面主数据列表的触发器是 `.js-showDataTable`，它的 HTML 结构如下：

{% highlight html %}
<div class="Area Area--table">
  <table class="js-showDataTable"></table>
</div>
{% endhighlight %}

如果它的数据是可筛选的，要放在筛选区域后面。

{% highlight html %}
<!-- 筛选区域 -->
<div class="Area Area--query">
  ...
</div>
<!-- 列表区域 -->
<div class="Area Area--table">
  ...
</div>
{% endhighlight %}

然后，在脚本中调用 `muu.table.init()` 并指定数据源和要显示的字段即可渲染。

{% highlight js %}
function initDataTable() {
  muu.table.init({
    url: "/remote/data/api.json",
    columns: [{
      title: "名字",
      field: "name"
    }]
  });
}

$(document).ready(function() {
  initDataTable();
});
{% endhighlight %}

若想更改默认的表格触发器，可以调用 `muu.setDefaults()` 来修改。

{% highlight js %}
muu.setDefaults({
  table: {
    selector: ".js-yourTriggerName"
  }
});
{% endhighlight %}

#### 其他数据列表

如果要初始化额外的表格，在调用 `muu.table.init()` 时指定目标表格就可以。

{% highlight js %}
muu.table.init($(".js-otherTable"), {
  url: "/remote/data/api.json",
  columns: [/* ... */]
});
{% endhighlight %}

#### 数据懒加载

不希望在初始化后直接发送请求渲染数据，而是在进行某个操作时再触发？没问题，只需传入 `{lazy: true}` 就能满足！

{% highlight js %}
muu.table.init($(".js-otherTable"), {
  url: "/remote/data/api.json",
  lazy: true,
  columns: [/* ... */]
});

// 点击按钮加载数据并渲染列表
$(".js-loadData").on("click", function() {
  muu.table.refresh($(".js-otherTable"), true);

  return false;
});
{% endhighlight %}

关于 `muu.table.init()` 的更多用法请看[相关 API 文档]({{ '/cookbook/table/' | prepend: site.baseurl | prepend: site.url }}#table-init)。

### 分页 {#pagination}

框架内部对几种常用的请求返回数据结构进行了兼容处理。具体支持哪些请看 [`defaults.table.responseHandler()`]({{ '/cookbook/table/' | prepend: site.baseurl | prepend: site.url }}#defaults-responseHandler)。

### 筛选 {#querying-conditions}

大多情况，数据列表需要根据不同的条件进行筛选。

因为筛选功能基本都是选完过滤条件后点击一个按钮重新加载列表，又因如果 `<form>` 中有一个 `submit` 类型的 `<button>` 的话，不用特意做 `click` 事件的绑定就能够触发 `submit` 事件，所以表单及其相关控件是实现筛选区域的最佳选择！

{% highlight html %}
<!-- 筛选区域 -->
<div class="Area Area--query">
  <form class="Card">
    <div class="Card-content">
      <div class="row">
        <!-- 筛选条件 -->
        ...
      </div>
    </div>
    <div class="Card-footer">
      <button type="submit" class="btn btn-primary btn-sm"><i class="fa fa-filter"></i><span>筛选</span></button>
      <button type="reset" class="btn btn-default btn-sm"><i class="fa fa-refresh"></i><span>重置</span></button>
    </div>
  </form>
</div>
<!-- 列表区域 -->
<div class="Area Area--table">
  ...
</div>
{% endhighlight %}

每个筛选条件都是由 `<div>`、`<label>` 和一个表单控件所组成的固定结构。

{% highlight html %}
<div class="form-group col-xs-6 col-sm-4 col-lg-3">
  <label>姓名</label>
  <input type="text" name="name" class="form-control input-sm" placeholder="请输入">
</div>
{% endhighlight %}

除了上面所示的文本输入框，还支持单选和多选的下拉列表。

{% highlight html %}
<!-- 单选下拉列表 -->
<div class="form-group col-xs-6 col-sm-4 col-lg-3">
  <label>性别</label>
  <select name="gender" class="form-control input-sm" data-placeholder="请选择">
    <option value="1">男</option>
    <option value="0">女</option>
  </select>
</div>
<!-- 多选下拉列表 -->
<div class="form-group col-xs-6 col-sm-4 col-lg-3">
  <label>职业</label>
  <select name="job" class="form-control input-sm" data-placeholder="请选择" multiple>
    <option value="1">程序员</option>
    <option value="2">公务员</option>
  </select>
</div>
{% endhighlight %}

## 数据操作 {#data-operation}

数据的常规操作就是增、删、改、查了。其中「查」就是上面所提到的[数据列表](#list-of-data)，接下来说说剩余的三种操作。

### 新增 {#data-addition}

数据的新增操作是在当前页面弹出一个内含表单的模态对话框，这里依赖于 Bootstrap 中提供的 [`.modal`](https://getbootstrap.com/docs/3.3/javascript/#modals){:target="_blank"}{:rel="nofollow external"} 组件。

{% highlight html %}
<div class="modal fade js-addNewData">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
        <h4 class="modal-title">填写信息</h4>
      </div>
      <div class="modal-body">
        <form>
          ...
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-primary js-saveNewData">保存</button>
      </div>
    </div>
  </div>
</div>
{% endhighlight %}

要想「零脚本」触发对话框的显示，需要在[页头操作区](#header-operations)中的新增按钮上添加适当的标识符。

{% highlight html %}
<div class="Header-action Action"><button class="Action-trigger fa fa-plus" type="button" title="新增" data-toggle="modal" data-target=".js-addNewData"><span class="sr-only">新增</span></button></div>
{% endhighlight %}

#### 填写表单

表单的展现形式大多是两列布局，左侧是字段名字，右侧为字段控件。这种形式的表单可以用 Bootstrap 中的 [`.form-horizontal`](https://getbootstrap.com/docs/3.3/css/#forms-horizontal){:target="_blank"}{:rel="nofollow external"} 及相关 class 快速实现。

{% highlight html %}
<form class="form-horizontal">
  <!-- 文本输入框 -->
  <div class="form-group">
    <label class="col-sm-3 control-label is-required">姓名</label>
    <div class="col-sm-9">
      <input type="text" class="form-control input-sm" name="name" placeholder="请输入" required>
    </div>
  </div>
  <!-- 单选框 -->
  <div class="form-group">
    <label class="col-sm-3 control-label">性别</label>
    <div class="col-sm-9">
      <label class="radio-inline"><input type="radio" name="gender" value="1" checked> 男</label>
      <label class="radio-inline"><input type="radio" name="gender" value="0"> 女</label>
    </div>
  </div>
  <!-- 多选下拉列表 -->
  <div class="form-group">
    <label class="col-sm-3 control-label">爱好</label>
    <div class="col-sm-9">
      <select class="form-control input-sm" name="hobby" multiple>
        <option value="1">动漫</option>
        <option value="2">游戏</option>
        <option value="3">狼人杀</option>
        <option value="4">桌上足球</option>
        <option value="5">徒步</option>
      </select>
    </div>
  </div>
  <!-- 多行文本域 -->
  <div class="form-group">
    <label class="control-label col-sm-3">备注</label>
    <div class="col-sm-9">
      <textarea class="form-control input-sm" name="remark" rows="3" placeholder="请填写"></textarea>
    </div>
  </div>
</form>
{% endhighlight %}

#### 提交表单

本框架已经对上述写法的对话框进行了简单处理，再写点脚本处理下表单校验通过及重置表单等操作就完成了新增数据的整个功能。

{% highlight js %}
function initNewDataDialog() {
  var $m = $(".js-addNewData");
  var $f = $("form", $m);

  // 字段全部校验通过
  $f.on("H5F:submit", function( evt, inst, submitEvt ) {
    // 在对话框中显示等待请求返回的提示
    muu.ajax.waiting($f);

    // 提交表单数据
    muu.ajax.post("/add.json", $f, function() {
      // 刷新数据列表
      muu.table.refresh();
      // 关闭对话框
      $m.modal("hide");
    });

    submitEvt.preventDefault();

    return false;
  });

  // 关闭对话框后重置表单
  $m.on("hidden.bs.modal", function() {
    $f.trigger("reset");
  });
}

$(document).ready(function() {
  initNewDataDialog();
});
{% endhighlight %}

### 修改 {#data-modification}

因修改数据时所要填写的信息与新增并无二致，所以要复用同一个对话框。但此时需要被修改数据的唯一标识符，应在对话框的表单中增加一个隐藏域。

{% highlight html %}
<form>
  ...
  <input type="hidden" name="id" value="">
</form>
{% endhighlight %}

#### 回填信息

在修改数据时打开对话框要显示已有信息，得调用 `muu.form.fill()` 进行数据回填。

这时，打开对话框的触发器不是页头中的「新增」按钮了，而是数据列表中「操作」那列里所显示的「编辑」按钮。

对已有数据的任何操作的入口，都在数据列表的「操作」那一列中。在初始化数据列表指定要显示的字段时，添加一个用于显示按钮的列。

{% highlight js %}
muu.table.init({
  url: "/remote/data/api.json",
  columns: [{/* ... */}, {
    title: "操作",
    field: "operation",
    width: 100,
    formatter: function( val, row ) {
      return muu.generate.action([{
        action: "edit",
        text: "编辑",
        icon: "edit"
      }]);
    },
    events: {
      "click .js-edit": function( evt, val, row ) {
        var $m = $(".js-addNewData");

        // 用已有数据回填表单字段
        muu.form.fill($("form", $m), row);

        // 打开对话框
        $m.addClass("is-editing").modal("show");
      }
    }
  }]
});
{% endhighlight %}

#### 保存信息

因为修改与新增数据用的是同一个对话框，相关的处理逻辑用的也是同一套，所以得把提交表单数据部分的代码稍微改一下。

{% highlight js %}
// 字段全部校验通过
$f.on("H5F:submit", function( evt, inst, submitEvt ) {
  // 在对话框中显示等待请求返回的提示
  muu.ajax.waiting($f);

  // 提交表单数据
  muu.ajax.post(($("[name='id']", $f).val() === "" ? "/add.json" : "/edit.json"), $f, function() {
    // 刷新数据列表
    muu.table.refresh();
    // 关闭对话框
    $m.modal("hide");
  });

  submitEvt.preventDefault();

  return false;
});
{% endhighlight %}

### 删除 {#data-deletion}

相较于其他三种操作，这个应该算是最最最最简单的了……只需略微修改初始化数据列表的相关代码。

{% highlight js %}
muu.table.init({
  url: "/remote/data/api.json",
  columns: [{/* ... */}, {
    title: "操作",
    field: "operation",
    width: 100,
    formatter: function( val, row ) {
      return muu.generate.action([{/* ... */}, {
        action: "delete",
        text: "删除",
        icon: "trash",
        isDelete: true
      }]);
    },
    events: {
      "click .js-edit": function( evt, val, row ) {
        /* ... */
      },
      "click .js-delete": function( evt, val, row ) {
        // 进行操作确认
        if ( confirm("确定要删除此条数据？") ) {
          muu.ajax.post("/delete.json", {id: row.id}, function() {
            muu.table.refresh();
          });
        }
      }
    }
  }]
});
{% endhighlight %}
