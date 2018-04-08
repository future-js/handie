---
title: 生成器

flag:
  primary: api
  secondary: generator
---

生成 HTML 代码。

## 目录

* [默认配置项](#defaults)
  * [`generator.imageColumnCount`](#defaults-imageColumnCount)
* 生成器
  * [`.generate.image(url, alt)`](#generate-image-default)
  * [`.generate.imageItem(opts)`](#generate-imageItem-default)
  * [`.generate.action(actions, wrapped)`](#generate-action-default)

## 默认配置项 {#defaults}

{% highlight js %}
defaults.generator = {
  imageColumnCount: 3
};
{% endhighlight %}

### `generator.imageColumnCount` {#defaults-imageColumnCount}

一个图片集合中每行显示的图片列个数。

## `.generate.image()` {#generate-image}

生成图片条目。

### `.generate.image(url, alt)` {#generate-image-default}

生成一个包含描述文本的图片条目。

#### 参数

1. `url`（String）：图片链接；
2. `alt`（String）：描述文本。

#### 返回值

（String）：图片条目的 HTML。

#### 示例

{% highlight js %}
muu.generate.image("oulei.jpg", "欧雷");
{% endhighlight %}

## `.generate.imageItem()` {#generate-imageItem}

生成图片列。

### `.generate.imageItem(opts)` {#generate-imageItem-default}

在上传图片按钮所在列之前插入图片列。

#### 参数

1. `opts`（Plain Object）：图片列相关的设置。

下面为 `opts` 的结构：

{% highlight js %}
{
  $btn: null,                                 // 上传图片按钮，必需
  $el: null,                                  // 图片集合的容器，必需
  url: "",                                    // 图片链接
  text: "",                                   // 图片文本
  removable: false,                           // 图片列是否可删除
  column: 3,                                  // 图片集合每行图片个数，默认值取决于 `defaults.generator.imageColumnCount`
  max: 0,                                     // 图片集合中图片的个数上限
  callback: function( $newCol, $btnCol ) {}   // 生成新图片列后的回调函数
}
{% endhighlight %}

#### 返回值

（jQuery Object）：新生成的图片列。

#### 示例

{% highlight html %}
<div id="transportationContracts">
  <h4>运输合同</h4>
  <div class="ImageList row">
    <div class="ImageList-item col-sm-4">
      <button class="ImageItem ImageItem--add js-uploadContract" type="button">
        <div><span><i class="fa fa-plus"></i><span>上传合同</span></span></div>
      </button>
    </div>
  </div>
</div>
{% endhighlight %}

{% highlight js %}
[
  "http://img.maihaoche.com/muu/demo/1.jpg",
  "http://img.maihaoche.com/muu/demo/2.jpg",
  "http://img.maihaoche.com/muu/demo/3.jpg"
]
.forEach(function( imgUrl ) {
  muu.generate.imageItem({
    $btn: $(".js-uploadContract"),
    $el: $("#transportationContracts"),
    url: imgUrl,
    max: 9,
    removable: true
  });
});
{% endhighlight %}

## `.generate.action()` {#generate-action}

生成数据列表的操作按钮。

### `.generate.action(actions, wrapped)` {#generate-action-default}

为数据列表的条目（行）生成操作按钮。

#### 参数

1. `actions`（Plain Object / Array）：按钮的描述对象；
2. `wrapped`（Boolean）：值为 `true` 时将按钮用 `<div class="OperationGroup">` 包裹起来，**仅当按钮数多于 1 个时起作用**。

#### 返回值

（String）：操作按钮的 HTML。

#### 示例

{% highlight js %}
// 生成一个纯文本按钮
// <button type="button" class="btn btn-default js-check" title="审核">审核</button>
muu.generate.action({
  action: "check",
  text: "审核"
});

// 生成一个「主要」的图标按钮
// <button type="button" class="btn btn-primary js-edit" title="编辑"><i class="fa fa-edit"></i><span class="sr-only">编辑</span></button>
muu.generate.action({
  action: "edit",
  text: "编辑",
  icon: "edit",
  isPrimary: true
});

// 生成一个「危险」的图标按钮
// <button type="button" class="btn btn-danger js-delete" title="删除"><i class="fa fa-trash"></i><span class="sr-only">删除</span></button>
muu.generate.action({
  action: "delete",
  text: "删除",
  icon: "trash",
  isDelete: true
});

// 生成一个按钮链接
// <a href="/u/oulei" class="btn btn-default js-view" title="查看">查看</a>
muu.generate.action({
  action: "view",
  text: "查看",
  url: "/u/oulei"
});

// 生成多个按钮并包裹起来
muu.generate.action([{
  action: "edit",
  text: "编辑",
  icon: "edit"
}, {
  action: "delete",
  text: "删除",
  icon: "trash",
  isDelete: true
}], true);
{% endhighlight %}
