---
title: 对话框

flag:
  primary: api
  secondary: dialog
---

模态对话框相关操作。

## 目录

* [默认配置项](#defaults)
  * [`dialog.selector`](#defaults-selector)
  * [`dialog.button`](#defaults-button)
  * [`dialog.backdrop`](#defaults-backdrop)
  * [`dialog.closeOnEsc`](#defaults-closeOnEsc)
* 对话框
  * [`.dialog.init(opts)`](#dialog-init-default)
  * [`.dialog.init($dlg, opts)`](#dialog-init-specified)

## 默认配置项 {#defaults}

通过 [`muu.setDefaults(settings)`]({{ '/cookbook/configuration/' | prepend: site.baseurl | prepend: site.url }}#method-setDefaults-setter) 进行设置：

{% highlight js %}
muu.setDefaults({
  dialog: {
    /* ... */
  }
});
{% endhighlight %}

可用配置项如下——

### `dialog.selector` {#defaults-selector}

主对话框的选择器。

#### 默认行为

在调用 [`muu.dialog.init(opts)`](#dialog-init-default) 时会查找符合这个条件的 `<div class="modal">`。默认值为 `.js-addNewData`。

### `dialog.button` {#defaults-button}

「提交」按钮的选择器。

#### 默认行为

点击符合这个条件的 `<button>` 会触发对话框中的表单的提交事件。默认值为 `.js-saveNewData`。

### `dialog.backdrop` {#defaults-backdrop}

在打开对话框时是否显示背景遮罩层。

#### 默认行为

默认值为 `true`，显示。可选值请看 [Bootstrap 模态框配置项](https://getbootstrap.com/docs/3.3/javascript/#modals-options){:target="_blank"}{:rel="nofollow external"}。

### `dialog.closeOnEsc` {#defaults-closeOnEsc}

是否可按 <kbd>esc</kbd> 键关闭对话框。

#### 默认行为

默认值为 `true`，可关闭。

## `.dialog.init()` {#dialog-init}

初始化带表单的对话框。

### `.dialog.init(opts)` {#dialog-init-default}

初始化默认的新增/修改数据对话框。

#### 参数

1. `opts`（Plain Object）：表单及对话框相关配置项。

`opts` 可包含以下配置项：

* `$button`（jQuery Object）：触发对话框內表单提交事件的按钮的 jQuery 对象，当没指定此配置项且对话框是主对话框时会自动查找有 [`defaults.dialog.button`](#defaults-button) 的 `<button>`；
* `$table`（jQuery Object）：保存数据成功后被刷新的数据列表，当没指定此配置项且对话框是主对话框时会自动查找有 [`defaults.table.selector`]({{ '/cookbook/table/' | prepend: site.baseurl | prepend: site.url }}#defaults-selector) 的 `<table>`；
* `$form`（jQuery Object）：被触发提交事件的表单，默认为对话框中的第一个表单；
* `onFormSubmit`（Function）：表单提交事件的处理函数，会传入 `H5F:submit` 事件实例、JSON 形式的表单数据、[H5Fx](https://ourai.github.io/H5Fx/){:target="_blank"}{:rel="nofollow external"} 实例和原生提交事件实例作为参数；
* `onFormReset`（Function）：表单重置事件的处理函数；
* `onDialogClose`（Function）：对话框关闭事件的处理函数；
* `ajax`（Plain Object）：用来构造表单提交事件处理函数，不能与 `onFormSubmit` 共存。

`opts.ajax` 以 `muu.ajax.METHOD()` 的配置项为基础进行了扩展：

* `url`（String / Function）：除了常规的字符串，还可以是一个能够动态生成 URL 的函数，会将 JSON 形式的表单数据作为参数传入；
* `method`（String / Function）：AJAX 请求的方法，默认为 `"post"`，可选 `"put"`，还可以是一个以 JSON 化的表单数据为参数的返回 `"post"` 或 `"put"` 的函数；
* `params`（Function）：对已经 JSON 化的表单数据进行进一步的处理；
* `callback`（Function）：保存数据成功后的回调函数。

**若已指定 `opts.onFormSubmit`，则 `opts.ajax` 会被忽略。**

#### 示例

假如有如下 HTML 代码：

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

能够保证对话框及其相关联数据列表正常运作的最小配置项：

{% highlight js %}
muu.dialog.init({
  ajax: {
    url: "/remote/data/api.json"
  }
});
{% endhighlight %}

动态获取 AJAX 请求的方法及参数：

{% highlight js %}
muu.dialog.init({
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
});
{% endhighlight %}

### `.dialog.init($dlg, opts)` {#dialog-init-specified}

初始化指定的带表单的对话框。

#### 参数

1. `$dlg`（jQuery Object）：对话框；
2. `opts`（Plain Object）：与 [`muu.dialog.init(opts)`](#dialog-init-default) 相同。

#### 示例

{% highlight js %}
muu.dialog.init($("js-showDemoDialog"));
{% endhighlight %}
