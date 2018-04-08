---
title: 数据列表

flag:
  primary: api
  secondary: table
---

[bs-table]: http://bootstrap-table.wenzhixin.net.cn/
[bs-table-tables]: http://bootstrap-table.wenzhixin.net.cn/documentation/#table-options
[bs-table-columns]: http://bootstrap-table.wenzhixin.net.cn/documentation/#column-options

[muu-generate-action]: {{ '/cookbook/generator/' | prepend: site.baseurl | prepend: site.url }}#generate-action

初始化显示数据的表格以及其他操作。

## 目录

* [默认配置项](#defaults)
  * [`table.selector`](#defaults-selector)
  * [`table.responseHandler(res)`](#defaults-responseHandler)
  * [`table.keys`](#defaults-keys)
  * [`table.toolbarActions`](#defaults-toolbarActions)
  * [`table.showRowNumber`](#defaults-showRowNumber)
  * [`table.operationColumn`](#defaults-operationColumn)
  * [`table.rowActions`](#defaults-rowActions)
* 表格
  * [`.table.init(opts)`](#table-init-default)
  * [`.table.init($table, opts)`](#table-init-specified)
  * [`.table.refresh(resetTop)`](#table-refresh-default)
  * [`.table.refresh($table, resetTop)`](#table-refresh-specified)

## 默认配置项 {#defaults}

通过 [`muu.setDefaults(settings)`]({{ '/cookbook/configuration/' | prepend: site.baseurl | prepend: site.url }}#method-setDefaults-setter) 进行设置：

{% highlight js %}
muu.setDefaults({
  table: {
    /* ... */
  }
});
{% endhighlight %}

可用配置项如下——

### `table.selector` {#defaults-selector}

主数据列表的选择器。

#### 默认行为

在调用 [`muu.table.init(opts)`](#table-init-default) 时会查找符合这个条件的 `<table>`。默认值为 `.js-showDataTable`。

#### 示例

{% highlight html %}
<!-- 已使用默认 class 的表格 -->
<table class="js-showDataTable"></table>

<!-- 未使用默认 class 的表格 -->
<table class="js-hitTroubleMaker"></table>
{% endhighlight %}

{% highlight js %}
// 只会初始化 `<table class="js-showDataTable"></table>`
muu.table.init({
  url: "/remote/data/api.json",
  columns: [/* ... */]
});

// 可以通过手动指定来初始化 `<table class="js-hitTroubleMaker"></table>`
muu.table.init($(".js-hitTroubleMaker"), {
  url: "/remote/data/api.json",
  columns: [/* ... */]
});
{% endhighlight %}

### `table.responseHandler(res)` {#defaults-responseHandler}

[Bootstrap Table][bs-table]{:target="_blank"}{:rel="external nofollow"} 对请求返回数据的处理。

#### 默认行为

与 [`defaults.ajax.responseHandler(res, callback)`]({{ '/cookbook/communication/' | prepend: site.baseurl | prepend: site.url }}#defaults-responseHandler) 差不多。

#### 参数

1. `res`（Plain Object）：服务端返回的数据。

`res` 要符合一定结构——

直接返回数组，适用于数据列表不分页或本地进行分页的场景：

{% highlight json %}
[]
{% endhighlight %}

返回分页相关信息并将数据存到 `data` 中：

{% highlight json %}
{
  "pageNo": 1,
  "pageSize": 20,
  "data": [],
  "totalCount": 0,
  "totalPage": 0
}
{% endhighlight %}

返回分页相关信息并将数据存到 `result` 中：

{% highlight json %}
{
  "pageNo": 1,
  "pageSize": 20,
  "result": [],
  "totalCount": 0,
  "totalPage": 0
}
{% endhighlight %}

将分页信息嵌套在 `data` 中：

{% highlight json %}
{
  "data": {
    "pageNo": 1,
    "pageSize": 20,
    "result": [],
    "totalCount": 0,
    "totalPage": 0
  }
}
{% endhighlight %}

#### 返回值

（Plain Object）：返回数据的处理结果。

### `table.keys` {#defaults-keys}

用于筛选列表数据的查询参数。

#### 默认行为

会在发送获取列表数据请求时带上指定的参数。目前只支持 `sort` 和 `order` 两个参数，默认值为：

{% highlight js %}
{
  sort: "sortBy",       // 指定排序字段
  order: "orderBy"      // 升序或降序
}
{% endhighlight %}

只有设置列配置项为 `{sortable: true}` 时才起作用。

#### 示例

{% highlight js %}
muu.table.init({
  url: "/remote/data/api.json",
  columns: [{
    title: "更新时间",
    field: "updatedAt",
    sortable: true          // 使生成的列可点击表头排序
  }]
});
{% endhighlight %}

点击表头会用以下形式重新发送请求：

{% highlight text %}
/remote/data/api.json?pageSize=20&pageNo=1&sortBy=updatedAt&orderBy=desc
{% endhighlight %}

### `table.toolbarActions` {#defaults-toolbarActions}

工具栏的默认配置。

#### 默认行为

各配置项的默认值为：

{% highlight js %}
{
  // 新增数据按钮
  create: {
    text: "新增",
    isCoexisted: true
  },
  // 批量操作按钮
  batch: {
    text: "批量操作",
    action: "batchTable",
    isCoexisted: true
  },
  // 筛选数据相关
  search: {
    label: false,                           // 简单查询时是否显示文本标签
    width: "auto",                          // 简单查询区域宽度，可以为 `"auto"`、像素单位及纯数字，值为 `"auto"` 时会动态计算宽度
    // 复合查询相关
    filter: {
      selector: ".js-filterTableData",      // 查询条件集合的选择器
      mode: "dropdown",                     // 显示模式，可以为 `"dropdown"` 或 `"dialog"`
      // 复合查询为对话框模式时对话框相关配置
      dialog: {
        title: "筛选数据",
        size: "lg"                          // 对应 Bootstrap 中 `.modal` 的尺寸
      }
    }
  }
}
{% endhighlight %}

### `table.showRowNumber` {#defaults-showRowNumber}

是否在每行的第一列显示序号。

#### 默认行为

默认值为 `false`，不显示。可在初始化数据列表时通过传参覆盖。

#### 示例

{% highlight js %}
muu.table.init({
  url: "/remote/data/api.json",
  columns: [/* ... */],
  showRowNumber: true               // 显示行号
});
{% endhighlight %}

### `table.operationColumn` {#defaults-operationColumn}

数据列表操作列的默认配置。

#### 默认行为

各配置项的默认值为：

{% highlight js %}
{
  sticky: false,             // 是否固定在可视区域最右侧
  field: "operation",        // 列的字段名
  text: "\u64CD\u4F5C",      // 列的表头文本
  events: {                  // 操作按钮默认行为
    "click .js-edit": function( evt, val, row, idx ) {
      /* ... */
    },
    "click .js-delete": function( evt, val, row, idx ) {
      /* ... */
    }
  }
}
{% endhighlight %}

其中，`table.operationColumn.events` 中的 `click .js-edit` 指定了编辑按钮的默认行为，点击后会用当前行的数据回填数据列表相关联的编辑信息对话框中的表单，然后打开该对话框；`click .js-delete` 指定了删除按钮的默认行为，点击后会删除当前行的数据。

#### 示例

{% highlight js %}
muu.table.init({
  url: "/remote/data/api.json",
  columns: [/* ... */],
  operation: {
    // 操作按钮配置项
    actions: [{
      text: "编辑",
      action: "edit",
      icon: "edit"
    }, {
      text: "删除",
      action: "delete",
      icon: "trash",
      isDelete: true
    }],
    // 点击删除按钮发送 AJAX 请求的相关配置项
    ajax: {
      url: "/remote/data/api.json",
      // 请求参数
      // `row` 为当前行的数据
      params: function( row ) {
        return {id: row.id};
      }
    }
  }
});
{% endhighlight %}

### `table.rowActions` {#defaults-rowActions}

在调用 [`muu.generate.action()`][muu-generate-action] 生成数据列表操作列中的操作按钮时添加到最后的常用按钮。

#### 默认行为

默认值为 `[]`，不添加任何常用操作按钮。

#### 示例

{% highlight js %}
muu.setDefaults({
  table: {
    rowActions: [{
      text: "删除",
      action: "delete",
      icon: "trash",
      isDelete: true
    }]
  }
});

muu.generate.action([{
  text: "编辑",
  action: "edit",
  icon: "edit"
}, {
  text: "禁用",
  action: "disable",
  icon: "pause"
}]);
{% endhighlight %}

设置了常用按钮并调用生成操作按钮的方法后会生成：

{% highlight html %}
<div class="OperationGroup">
  <button type="button" title="编辑" class="Operation btn btn-default btn-xs js-edit">
    <i class="Operation-icon fa fa-edit fa-fw"></i>
    <span class="sr-only">编辑</span>
  </button>
  <button type="button" title="禁用" class="Operation btn btn-default btn-xs js-disable">
    <i class="Operation-icon fa fa-pause fa-fw"></i>
    <span class="sr-only">禁用</span>
  </button>
  <!-- 以下为设置 `defaults.table.rowActions` 后所生成的操作按钮 -->
  <button type="button" title="删除" class="Operation btn btn-danger btn-xs js-delete">
    <i class="Operation-icon fa fa-trash fa-fw"></i>
    <span class="sr-only">删除</span>
  </button>
</div>
{% endhighlight %}

## `.table.init()` {#table-init}

初始化由 Bootstrap Table 提供的数据列表功能。

### `.table.init(opts)` {#table-init-default}

初始化主数据列表。

#### 参数

1. `opts`（Plain Object）：要传入到 `$table.bootstrapTable()` 中的参数。

`opts` 的可用配置项以 [Bootstrap Table 表格配置项][bs-table-tables]{:target="_blank"}{:rel="external nofollow"}为基础进行了扩展：

* `url`（String / Function）：除了常规的字符串，还可以是一个能够动态生成 URL 的函数；
* `lazy`（Boolean）：延迟加载数据，设置 `true` 激活，需要手动调用 [`muu.table.refresh()`](#table-refresh) 触发数据加载；
* `columns`（Array）：表格中所要显示的常规列，每个元素与 [Bootstrap Table 列配置项][bs-table-columns]{:target="_blank"}{:rel="nofollow external"}中所定义的基本一致；
* `showRowNumber`（Boolean）：设置 `true` 会在表格的第一列显示序号，会覆盖 [`defaults.table.showRowNumber`](#defaults-showRowNumber) 的配置；
* `operation`（Plain Object）：指定操作列中所显示的按钮及其行为；
* `toolbar`（Plain Object）：指定工具栏中所显示的按钮及其行为。

其中，`opts.operation` 可包含：

* `sticky`（Boolean）：设置操作列是否固定在可视区域最右侧，会覆盖 [`table.operationColumn.sticky`](#defaults-operationColumn)；
* `title`（String）：设置操作列的表头文本，会覆盖 [`table.operationColumn.text`](#defaults-operationColumn)；
* `field`（String）：设置操作列的字段名，会覆盖 [`table.operationColumn.field`](#defaults-operationColumn)；
* `width`（Number）：设置操作列的宽度，等同于 [Bootstrap Table 列配置项][bs-table-columns]{:target="_blank"}{:rel="nofollow external"}中的 `width`；
* `actions`（Array / Function）：操作按钮配置项，将作为参数传入 [`muu.generate.action()`][muu-generate-action]；
* `events`（Plain Object）：定义操作按钮的行为，与 [Bootstrap Table 列配置项][bs-table-columns]{:target="_blank"}{:rel="nofollow external"}中的 `events` 一致，默认值为 [`defaults.table.operationColumn.events`](#defaults-operationColumn)；
* `ajax`（Plain Object）：点击操作列中按钮所产生的 AJAX 请求的相关参数。

当 `opts.operation.actions` 为函数时，要返回一个标准的作为 [`muu.generate.action()`][muu-generate-action] 参数的数组，按钮的行为只能由 `opts.operation.events` 指定。

而当其为数组时，每个按钮的配置项可多出一个 `handler` 属性来指定处理函数，并且 `text` 属性可以是个返回字符串的函数：

{% highlight js %}
{
  action: "edit",
  icon: "edit",
  text: function( row, idx ) {              // 动态生成按钮的提示文本
    return "编辑「" + row.name + "」";
  },
  handler: function( evt, row, idx ) {      // 动态生成按钮的处理函数
    /* ... */
  }
}
{% endhighlight %}

上面的代码中，`evt` 为事件对象实例，`row` 为当前行的数据，`idx` 为当前行的索引。

**目前 `opts.operation.ajax` 只用于框架默认的删除操作，即此配置项在自定义的操作中无用。**

它的可用配置项有：

* `url`（String / Function）：删除操作的请求地址，如果是函数则必须返回一个字符串，会传入当前行的数据和索引作为参数；
* `params`（Plain Object / Function）：请求参数，如果是函数则必须返回一个纯对象，会传入当前行的数据和索引作为参数；
* `extra`（Plain Object）：用于 `muu.ajax.XXX()` 的最后一个参数，如果是函数则必须返回一个纯对象，会传入当前行的数据和索引作为参数。

`opts.toolbar` 把 [Bootstrap Table 表格配置项][bs-table-tables]{:target="_blank"}{:rel="external nofollow"}中的 `toolbar` 进行了彻底的改造，能够通过子配置项设置工具栏中的每个功能区：

* `create`（Plain Object）：新增数据按钮；
* `batch`（Plain Object / Array）：批量操作按钮；
* `search`（Plain Object）：筛选数据相关。

`opts.toolbar.create` 中有 `button` 和 `dialog` 分别设置按钮本身及相关联的对话框。

`opts.toolbar.create.button` 的配置项如下：

* `text`（String）：按钮的文本，默认值为 [`defaults.table.toolbarActions.text`](#defaults-toolbarActions)；
* `url`（String）：如果设置了，则生成一个链接按钮；
* `isExternal`（Boolean）：在新窗口打开链接，需与 `url` 配合使用；
* `classes`（String）：自定义 class，多个用空格分割。

`opts.toolbar.create.dialog` 的配置项与 [`muu.dialog.init()`]({{ '/cookbook/dialog/' | prepend: site.baseurl | prepend: site.url }}#dialog-init) 的基本一致，只多了一个 `selector` 用来指定被关联的对话框，其默认值为 [`defaults.dialog.selector`]({{ '/cookbook/dialog/' | prepend: site.baseurl | prepend: site.url }}#defaults-selector)。

**当没明确指定 `opts.toolbar.create` 时，会把 `opts.toolbar` 当作 `opts.toolbar.create` 处理。**

`opts.toolbar.batch` 的配置项有：

* `actions`（Array / Plain Object）：下拉菜单中的操作；
* `handler`（Function）：主操作按钮的事件处理函数；
* `isPrimary`（Boolean）：是否给主操作按钮添加 `btn-primary` class，默认值为 `false`；
* `isSplit`（Boolean）：主操作按钮是否与下拉菜单分离，默认值为 `false`，但当指定了 `handler` 时强制设为 `true`。

`opts.toolbar.batch.actions` 的配置项与 [`muu.generate.action()`][muu-generate-action] 的基本一致，只是每个操作的配置项可多出一个 `handler` 用来指定相应操作的事件处理函数。与 `opts.toolbar.batch.handler` 相同，会向处理函数中传入事件对象实例、选中行的数据和数据列表 jQuery 对象作为参数：

{% highlight js %}
function( evt, selected, $table ) {
  /* ... */
}
{% endhighlight %}

当 `opts.toolbar.batch.actions` 只指定了一个操作时，将会成为主操作按钮。另外，若 `opts.toolbar.batch` 的值为数组则会被当作 `opts.toolbar.batch.actions` 处理。

`opts.toolbar.search` 的配置项有：

* `label`（Boolean）：是否显示简单查询的文本标签，默认值为 [`defaults.table.toolbarActions.search.label`](#defaults-toolbarActions)；
* `width`（String / Number）：简单查询区域宽度，默认值为 [`defaults.table.toolbarActions.search.width`](#defaults-toolbarActions)；
* `field`（Plain Object / Array）：简单查询的字段配置项；
* `filter`（String / Plain Object）：复合查询配置项。

`opts.toolbar.search.field` 中每个字段的配置项结构为：

{% highlight js %}
// 查询字段
{
  name: "",             // 字段名
  text: "",             // 显示在下拉菜单中的文本
  placeholder: ""       // 显示在输入框上的占位符
}

// 必传字段
{
  name: "",             // 字段名
  value: "",            // 字段值
  required: true        // 必传字段的标识
}
{% endhighlight %}

「查询字段」是可选择、可输入的，而「必传字段」会生成一个不变值的 `<input type="hidden">`。当查询字段只有一个时不会生成下拉菜单。

`opts.toolbar.search.filter` 的配置项与 [`defaults.table.toolbarActions.search.filter`](#defaults-toolbarActions) 一致。当值为字符串时则当作 `opts.toolbar.search.filter.selector` 处理。

#### 示例

简单地初始化数据列表，不绑定编辑信息的表单对话框，没有工具栏，也没有操作列：

{% highlight js %}
// 「名字」列中的文本只显示「姓名」
muu.table.init({
  url: "/remote/data/api.json",
  columns: [{
    title: "名字",
    field: "name"
  }]
});

// 「名字」列中的文本以「姓名（花名）」的形式显示
muu.table.init({
  url: "/remote/data/api.json",
  columns: [{
    title: "名字",
    field: "name",
    formatter: function( val, row ) {
      return val + "（" + row.nickname + "）";
    }
  }]
});
{% endhighlight %}

关联编辑信息对话框，并添加操作列：

{% highlight html %}
<!-- 员工信息数据列表 -->
<table class="js-showDataTable"></table>

<!-- 编辑员工信息对话框 -->
<div class="modal fade js-addNewData">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
        <h4 class="modal-title">填写员工信息</h4>
      </div>
      <div class="modal-body">
        <form class="form-horizontal">
          <div class="form-group">
            <label class="control-label col-sm-3 is-required">姓名</label>
            <div class="col-sm-9"><input type="text" class="form-control input-sm" name="name" required data-h5f-label="姓名" placeholder="请输入姓名" required></div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-3 is-required">花名</label>
            <div class="col-sm-9"><input type="text" class="form-control input-sm" name="nickname" required data-h5f-label="花名" placeholder="请输入花名"></div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-3">手机</label>
            <div class="col-sm-9"><input type="text" class="form-control input-sm" name="mobile" data-h5f-label="手机" placeholder="请输入手机"></div>
          </div>
          <input type="hidden" name="id" value="">
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-primary js-saveNewData">提交</button>
      </div>
    </div>
  </div>
</div>
{% endhighlight %}

{% highlight js %}
muu.table.init({
  url: "/remote/data/api.json",
  columns: [/* ... */],
  // 操作列
  operation: {
    width: 80,
    actions: [{
      action: "edit"
    }, {
      text: function( row ) {
        return "删除员工「" + row.name + "」";
      },
      isDelete: true
    }],
    // 删除操作的 AJAX 请求相关配置
    ajax: {
      url: "/remote/data/api.json",
      params: function( row ) {
        return {id: row.id};
      }
    }
  },
  // 关联对话框
  toolbar: {
    dialog: {
      // 保存数据时 AJAX 请求相关配置
      ajax: {
        url: "/remote/data/api.json",
        method: function( params ) {
          return params.id ? "put" : "post";
        },
        params: function( params ) {
          if ( !params.id ) {
            delete params.id;
          }

          return params;
        }
      }
    }
  }
});
{% endhighlight %}

添加批量操作功能，并支持筛选查询：

{% highlight html %}
<!-- 员工信息数据列表 -->
<table class="js-showDataTable"></table>

<!-- 编辑员工信息对话框 -->
<div class="modal fade js-addNewData">...</div>

<!-- 复合查询条件集合 -->
<form class="row js-filterTableData">
  <div class="form-group col-xs-6 col-sm-4 col-lg-3">
    <label>姓名</label>
    <input type="text" class="form-control input-sm" name="name" placeholder="请输入员工姓名">
  </div>
  <div class="form-group col-xs-6 col-sm-4 col-lg-3">
    <label>花名</label>
    <input type="text" class="form-control input-sm" name="nickname" placeholder="请输入员工花名">
  </div>
  <div class="form-group col-xs-6 col-sm-4 col-lg-3">
    <label>手机号</label>
    <input type="text" class="form-control input-sm" name="mobile" placeholder="请输入员工手机号">
  </div>
</form>
{% endhighlight %}

{% highlight js %}
muu.table.init({
  url: "/remote/data/api.json",
  columns: [/* ... */],
  operation: {/* ... */},
  toolbar: {
    // 关联对话框
    create: {/* ... */},
    // 批量操作
    batch: [{
      text: "批量删除",
      action: "delete",
      isDelete: true,
      handler: function( evt, selected, $table ) {
        /* ... */
      }
    }],
    // 筛选查询
    search: {
      field: {
        text: "姓名",
        name: "name",
        placeholder: "请输入员工姓名"
      }
    }
  }
});
{% endhighlight %}

### `.table.init($table, opts)` {#table-init-specified}

初始化指定数据列表。

#### 参数

1. `$table`（jQuery Object）：数据列表；
2. `opts`（Plain Object）：与 [`muu.table.init(opts)`](#table-init-default) 相同。

#### 示例

{% highlight html %}
<!-- 未使用默认 class 的表格 -->
<table class="js-hitTroubleMaker"></table>
{% endhighlight %}

{% highlight js %}
muu.table.init($(".js-hitTroubleMaker"), {
  url: "/remote/data/api.json",
  columns: [/* ... */]
});
{% endhighlight %}

## `.table.refresh()` {#table-refresh}

数据列表重新加载数据。

### `.table.refresh(resetTop)` {#table-refresh-default}

刷新主数据列表。

#### 参数

1. `resetTop`（Boolean）：如果是 `true`，则重置到列表的第一页。

#### 示例

{% highlight js %}
muu.table.refresh();

muu.table.refresh(true);
{% endhighlight %}

### `.table.refresh($table, resetTop)` {#table-refresh-specified}

刷新指定数据列表。

#### 参数

1. `$table`（jQuery Object）：数据列表；
2. `resetTop`（Boolean）：与 [`muu.table.refresh(resetTop)`](#table-refresh-default) 相同。

#### 示例

{% highlight js %}
muu.table.refresh($(".js-hitTroubleMaker"));

muu.table.refresh($(".js-hitTroubleMaker"), true);
{% endhighlight %}
