---
title: 上传器

flag:
  primary: api
  secondary: uploader
---

上传文件。

## 目录

* [默认配置项](#defaults)
  * [`uploader.selector`](#defaults-selector)
  * [`uploader.limit`](#defaults-limit)
  * [`uploader.draggable`](#defaults-draggable)
* 上传器
  * [`.upload.image($btn, opts)`](#upload-image-default)

## 默认配置项 {#defaults}

{% highlight js %}
defaults.uploader = {
  selector: ".js-uploadImage",
  limit: 0,
  draggable: true
};
{% endhighlight %}

### `uploader.selector` {#defaults-selector}

上传按钮的 jQuery 选择器。默认值为 `.js-uploadImage`。

### `uploader.limit` {#defaults-limit}

一个上传文件集合的个数上限。默认值为 `0`。

### `uploader.draggable` {#defaults-draggable}

是否支持拖拽文件。默认值为 `true`。

## `.upload.image()` {#upload-image}

上传图片。

### `.upload.image($btn, opts)` {#upload-image-default}

上传图片文件。支持纯 [Plupload](http://www.plupload.com/){:rel="external nofollow"}{:target="_blank"} 和[七牛上传插件](https://github.com/qiniu/js-sdk){:rel="external nofollow"}{:target="_blank"}。

#### 参数

1. `$btn`（jQuery Object）：上传按钮；
2. `opts`（Plain Object）：上传器及上传插件配置。

下面为 `opts` 的结构：

{% highlight js %}
{
  settings: null,                                     // 上传插件的配置
  limit: 0,                                           // 图片集合中图片的个数上限
  column: 3,                                          // 图片集合每行图片个数
  draggable: true,                                    // 是否支持拖拽文件
  getImageUrl: function( res ) {},                    // 从请求返回值中获取图片链接
  imageItemAdded: function( $newCol, $btnCol ) {}     // 生成新图片列后的回调函数
}
{% endhighlight %}

其中，`opts.settings` 为必需（可用选项请看 [Plupload 官方文档](http://www.plupload.com/docs/v2/Options){:rel="external nofollow"}{:target="_blank"} 或 [Qiniu JavaScript SDK](https://github.com/qiniu/js-sdk){:rel="external nofollow"}{:target="_blank"}），`opts.getImageUrl()` 在使用纯 Plupload 方式时必需。

#### 返回值

（Plain Object）：Plupload 初始化后的实例（可用的方法及事件请看[官方文档](http://www.plupload.com/docs/v2/Uploader){:rel="external nofollow"}{:target="_blank"}）。

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

纯 Plupload 方式：

{% highlight js %}
$(document).ready(function() {
  var uploader = muu.upload.image($(".js-uploadContract"), {
    limit: 9,
    getImageUrl: function( res ) {
      var url;

      /* ... */

      return url;
    },
    settings: {
      url: "/uploadImage.json"
    }
  });

  /* ... */
});
{% endhighlight %}

七牛上传插件方式：

{% highlight js %}
$(document).ready(function() {
  muu.ajax.get("/qiniuToken.json", function( uptoken ) {
    var uploader = muu.upload.image($(".js-uploadContract"), {
      limit: 9,
      settings: {
        multi_selection: true,
        uptoken: uptoken,
        domain: "http://img.maihaoche.com/",
        auto_start: true,
        init: {
          Key: function( up, file ) {
            return file.id + "-" + file.name;
          }
        }
      }
    });

    /* ... */
  });
});
{% endhighlight %}
