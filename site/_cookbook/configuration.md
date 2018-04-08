---
title: 全局配置

flag:
  primary: api
  secondary: configuration
---

适用于各项目针对自身场景进行自定义。

## 目录

* 默认配置
  * [`.setDefaults(settings)`](#method-setDefaults-setter)
* 业务变量
  * [`.set(key, val)`](#method-set-default)
  * [`.get(key)`](#method-get-default)

## `.setDefaults()` {#method-setDefaults}

用新的配置项覆盖默认的全局配置。

### `.setDefaults(settings)` {#method-setDefaults-setter}

可以覆盖的配置项分为以下几类（具体参数请到对应页面查看）：

* [数据通信]({{ '/cookbook/communication/' | prepend: site.baseurl | prepend: site.url }}#defaults)
* [数据列表]({{ '/cookbook/table/' | prepend: site.baseurl | prepend: site.url }}#defaults)
* [表单]({{ '/cookbook/form/' | prepend: site.baseurl | prepend: site.url }}#defaults)
* [对话框]({{ '/cookbook/dialog/' | prepend: site.baseurl | prepend: site.url }}#defaults)
* [生成器]({{ '/cookbook/generator/' | prepend: site.baseurl | prepend: site.url }}#defaults)
* [上传器]({{ '/cookbook/uploader/' | prepend: site.baseurl | prepend: site.url }}#defaults)
* [加密]({{ '/cookbook/encryption/' | prepend: site.baseurl | prepend: site.url }}#defaults)
* [通知]({{ '/cookbook/notification/' | prepend: site.baseurl | prepend: site.url }}#defaults)
* [位置服务]({{ '/cookbook/lbs/' | prepend: site.baseurl | prepend: site.url }}#defaults)

#### 参数

1. `settings`（Plain Object）：要覆盖的全局配置项。

#### 示例

{% highlight js %}
muu.setDefaults({
  ajax: {
    // 设置 AJAX 请求的响应处理
    responseHandler: function( res, callback ) {
      /* ... */
    }
  },
  table: {
    // 设置数据列表接收请求后的处理
    responseHandler: function( res ) {
      /* ... */
    }
  }
});
{% endhighlight %}

## `.set()` {#method-set}

设置业务用全局变量。

### `.set(key, val)` {#method-set-default}

将变量维护在框架内部，避免普通的全局变量造成环境污染问题。

#### 参数

1. `key`（String）：用字母、数字和下划线命名的变量名，支持对象的访问属性形式的字符串；
2. `val`（\*）：想要保存的值。

#### 返回值

（\*）：已保存的值。

#### 示例

见 [`muu.get(key)`](#method-get-default) 的示例。

## `.get()` {#method-get}

获取业务用全局变量。

### `.get(key)` {#method-get-default}

获取通过 [`muu.set(key, val)`](#method-set-default) 保存的值。

#### 参数

1. `key`（String）：同 [`muu.set(key, val)`](#method-set-default)。

#### 返回值

（\*）：已保存的值。

#### 示例

{% highlight js %}
muu.get("a");       // 返回 undefined

muu.set("a", "Alice");

muu.get("a");       // 返回 "Alice"

muu.set("e.f.g.h", "Hello, world!");

muu.get("e");       // 返回 {f: {g: {h: "Hello, world!"}}}
{% endhighlight %}
