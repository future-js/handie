---
title: 表单

flag:
  primary: api
  secondary: form
---

与表单及其相关字段的操作。

## 目录

* [默认配置项](#defaults)
  * [`form.filter(data, $field, arr)`](#defaults-filter)
  * [`form.serializer(arr)`](#defaults-serializer)
* 表单
  * [`.form.h5f($form)`](#form-h5f-default)
  * [`.form.fill($form, data)`](#form-fill-default)
  * [`.form.reset($form, callback)`](#form-reset-default)
  * [`.form.jsonify($form, callback)`](#form-jsonify-default)
  * [`.form.serialize($form, filter)`](#form-serialize-default)
  * [`.form.serialize(opts)`](#form-serialize-customizable)
* 字段
  * [`.field.fill($container, data, callback)`](#field-fill-default)
  * [`.field.datetimepicker(opts)`](#field-datetimepicker-default)
  * [`.field.datetimepicker($picker, opts)`](#field-datetimepicker-picker)
  * [`.field.datetimepicker($period, opts)`](#field-datetimepicker-period)
* 下拉列表
  * [`.select.change($sel)`](#select-change-default)
  * [`.select.change($sel, val, callback)`](#select-change-selected)

## 默认配置项 {#defaults}

{% highlight js %}
defaults.form = {
  filter: function( data, $field, arr ) {
    /* ... */
  },
  serializer: function( arr ) {
    /* ... */
  }
};
{% endhighlight %}

### `form.filter(data, $field, arr)` {#defaults-filter}

表单数据过滤器。默认行为是不对表单数据进行过滤。

#### 参数

1. `data`（Plain Object）：经 `$form.serializeArray()` 序列化后的 `{name: "", value: ""}` 形式的键值对；
2. `$field`（jQuery Object）：与 `data` 对应的表单字段的 jQuery 对象；
3. `arr`（Array）：所有序列化后的表单字段。

#### 返回值

（Boolean）：返回 `true` 保留当前数据，否则剔除。

### `form.serializer(arr)` {#defaults-serializer}

表单数据序列器。默认行为是不对表单数据进行序列化。

#### 参数

1. `arr`（Array）：要被序列化的数据，是 `{name: "", value: ""}` 形式的键值对数组。

#### 返回值

（\*）：将经 `$form.serializeArray()` 序列化并用 `defaults.form.filter()` 过滤后的数据再次序列化的结果。

## `.form.h5f()`

初始化由 [H5Fx](https://ourai.github.io/H5Fx/){:target="_blank"}{:rel="nofollow external"} 提供的表单校验功能。

### `.form.h5f($form)` {#form-h5f-default}

对指定表单的字段进行合法性校验。该功能的相关用法详见「[H5Fx 使用文档](https://github.com/ourai/H5Fx/wiki){:target="_blank"}{:rel="nofollow external"}」。

#### 参数

1. `$form`（jQuery Object）：表单 jQuery 对象。

#### 示例

{% include snippets/user-form-with-h5fx.md %}

{% highlight js %}
var $form = $(".js-savePersonInfo");

// 初始化校验功能
muu.form.h5f($form);

// 校验通过
$form.on("H5F:submit", function( evt, inst, submitEvt ) {
  /* ... */

  submitEvt.preventDefault();

  return false;
});
{% endhighlight %}

## `.form.fill()`

填充表单。

### `.form.fill($form, data)` {#form-fill-default}

用数据回填指定表单的字段。适用于「编辑」操作。

#### 参数

1. `$form`（jQuery Object）：表单 jQuery 对象；
2. `data`（Plain Object）：用于回填的数据。

#### 示例

{% include snippets/user-form-with-h5fx.md %}

{% highlight js %}
muu.form.fill($(".js-savePersonInfo"), {
  user: 1,
  name: "欧雷",
  gender: 1
});
{% endhighlight %}

## `.form.reset()`

重置表单。

### `.form.reset($form, callback)` {#form-reset-default}

真正地重置表单中的字段到初始值。

#### 参数

1. `$form`（jQuery Object）：表单 jQuery 对象；
2. `callback`（Function）：上下文为指定表单 DOM 的回调。

#### 示例

{% highlight js %}
muu.form.reset($(".js-savePersonInfo"));
{% endhighlight %}

## `.form.jsonify()`

JSON 化表单数据。

### `.form.jsonify($form, callback)` {#form-jsonify-default}

将表单的数据转换为 JSON 对象。接受多种传参方式。

#### 参数

1. `$form`（Array / String / HTML DOM / jQuery Object）：需要转换的数据，可以是序列化数组、序列化字符串、表单 DOM 或表单 jQuery 对象；
2. `callback`（Function）：做进一步操作的回调，会将初步处理的结果作为参数传递进去，必须将处理结果返回。

#### 示例

{% highlight js %}
var $form = $(".js-savePersonInfo");

// 传入 jQuery 对象
muu.form.jsonify($form);

// 传入 DOM
muu.form.jsonify($form.get(0));

// 传入序列化后的字符串
muu.form.jsonify($form.serialize());

// 传入序列化后的数组
muu.form.jsonify($form.serializeArray());
{% endhighlight %}

## `.form.serialize()`

序列化表单数据。

### `.form.serialize($form, filter)` {#form-serialize-default}

用默认序列器序列化过滤后的表单数据。

#### 参数

1. `$form`（jQuery Object）：表单 jQuery 对象；
2. `filter`（Function）：过滤器，不指定的话将使用默认的。

#### 示例

{% highlight js %}
muu.form.serialize($(".js-savePersonInfo"), function( data ) {
  return data.value != null;
});
{% endhighlight %}

### `.form.serialize(opts)` {#form-serialize-customizable}

可自定义序列器序列化过滤后的表单数据。

#### 参数

1. `opts`（Plain Object）：是一个包含表单 jQuery 对象（`$form`）、过滤器（`filter`）和序列器（`serializer`）的对象。

#### 示例

{% highlight js %}
muu.form.serializer({
  $form: $(".js-savePersonInfo"),
  filter: function( data ) {
    return data.value != null;
  },
  serializer: function( arr ) {
    return muu.form.jsonify(arr);
  }
});
{% endhighlight %}

## `.field.fill()`

数据回显。

### `.field.fill($container, data, callback)` {#field-fill-default}

用数据回填指定容器內具备 `data-field` 属性的元素。如果目标元素是 `<img>`，设置 `src` 属性为对应值，否则作为文本填充。适用于「查看」操作。

#### 参数

1. `$container`（jQuery Object）：包含具有 `data-field` 属性的元素的容器；
2. `data`（Plain Object）：用于回显的数据；
3. `callback`（Function）：对目标元素的进一步处理，该回调的上下文是目标元素的 DOM 对象，对应数据的键和值作为两个参数传入进去。

#### 示例

{% highlight html %}
<table class="js-viewPersonInfo">
  <thead>
    <tr>
      <th>头像</th>
      <th>姓名</th>
      <th>性别</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img data-field="avatar"></td>
      <td data-field="name"></td>
      <td data-field="gender"></td>
    </tr>
  </tbody>
</table>
{% endhighlight %}

{% highlight js %}
muu.field.fill($(".js-viewPersonInfo tbody"), {
  name: "欧雷",
  gender: 1,
  avatar: "oulei.jpg"
}, function( key, val ) {
  if ( key === "gender" ) {
    $(this).text(val === 1 ? "男" : "女");
  }
});
{% endhighlight %}

## `.field.datetimepicker()`

初始化由 [Bootstrap 3 Date/Time Picker](http://eonasdan.github.io/bootstrap-datetimepicker/){:target="_blank"}{:rel="nofollow external"} 提供的日期时间选择功能。

### `.field.datetimepicker(opts)` {#field-datetimepicker-default}

对带有 `.js-pickDateTime` 的文本框进行日期时间拾取器初始化。

#### 参数

1. `opts`（Plain Object）：要传入到 `$picker.datetimepicker()` 中的参数（详见[官方文档](http://eonasdan.github.io/bootstrap-datetimepicker/Options/){:target="_blank"}{:rel="nofollow external"}）。

#### 示例

{% highlight js %}
muu.field.datetimepicker({format: "L"});
{% endhighlight %}

### `.field.datetimepicker($picker, opts)` {#field-datetimepicker-picker}

对指定文本框进行日期时间拾取器初始化。

#### 参数

1. `$picker`（HTML DOM / jQuery Selector / jQuery Object）：文本框；
2. `opts`（Plain Object）：要传入到 `$picker.datetimepicker()` 中的参数（详见[官方文档](http://eonasdan.github.io/bootstrap-datetimepicker/Options/){:target="_blank"}{:rel="nofollow external"}）。

#### 示例

{% highlight js %}
muu.field.datetimepicker($(".js-customizedPicker"), {format: "L"});
{% endhighlight %}

### `.field.datetimepicker($period, opts)` {#field-datetimepicker-period}

初始化一组日期时间范围拾取器。**必须且只能包含两个文本框。**

#### 参数

1. `$period`（HTML DOM / jQuery Selector / jQuery Object）：文本框容器，**该元素必须包含 `.js-pickDatePeriod`**；
2. `opts`（Plain Object）：要传入到 `$picker.datetimepicker()` 中的参数（详见[官方文档](http://eonasdan.github.io/bootstrap-datetimepicker/Options/){:target="_blank"}{:rel="nofollow external"}）。

#### 示例

{% highlight html %}
<form>
  <div class="js-pickDatePeriod">
    <input type="text" data-to="startTime" placeholder="请选择开始时间">
    <span>至</span>
    <input type="text" data-to="endTime" placeholder="请选择结束时间">
  </div>
  <input type="hidden" name="startTime" value="">
  <input type="hidden" name="endTime" value="">
</form>
{% endhighlight %}

{% highlight js %}
muu.field.datetimepicker($(".js-pickDatePeriod"));
{% endhighlight %}

## `.select.change()`

选中下拉列表中的选项。

### `.select.change($sel)` {#select-change-default}

选中下拉列表中初始化时的默认选中项。

#### 参数

1. `$sel`（jQuery Object）：指定下拉列表。

#### 返回值

（jQuery Object）：下拉列表。

#### 示例

{% include snippets/gender-select-with-default.md %}

{% highlight js %}
var $sel = $(".js-selectGender");

// 选中「男」
$("option[value='1']", $sel).prop("selected", true);

// 选中「女」
muu.select.change($sel);
{% endhighlight %}

### `.select.change($sel, val, callback)` {#select-change-selected}

选中下拉列表中指定选项。

#### 参数

1. `$sel`（jQuery Object）：指定下拉列表；
2. `val`（String）：要选中选项的值；
3. `callback`：上下文为下拉列表 DOM 对象的回调。

#### 返回值

（jQuery Object）：下拉列表。

#### 示例

{% include snippets/gender-select-with-default.md %}

{% highlight js %}
// 选中「男」
muu.select.change($(".js-selectGender"), "1");
{% endhighlight %}
