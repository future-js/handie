---
title: 加密

flag:
  primary: api
  secondary: encryption
---

预防并防止数据泄漏。

## 目录

* [默认配置项](#defaults)
  * [`watermark.text`](#defaults-watermark-text)
  * [`watermark.font`](#defaults-watermark-font)
  * [`watermark.rotate`](#defaults-watermark-rotate)
  * [`watermark.translateX`](#defaults-watermark-translateX)
  * [`watermark.translateY`](#defaults-watermark-translateY)
  * [`watermark.width`](#defaults-watermark-width)
  * [`watermark.height`](#defaults-watermark-height)
  * [`watermark.style`](#defaults-watermark-style)
  * [`watermark.container`](#defaults-watermark-container)
  * [`watermark.mainOnly`](#defaults-watermark-mainOnly)
  * [`watermark.autoInit`](#defaults-watermark-autoInit)
* 页面水印
  * [`.encrypt.watermark(opts)`](#encrypt-watermark-default)

## 默认配置项 {#defaults}

{% highlight js %}
defaults.watermark = {
  text: "",
  font: "",
  rotate: 0,
  translateX: 0,
  translateY: 0,
  width: "auto",
  height: "auto",
  style: {},
  container: "",
  mainOnly: false,
  autoInit: true
};
{% endhighlight %}

### `watermark.text` {#defaults-watermark-text}

页面水印的文本。默认值为 `真实姓名（花名）`。

### `watermark.font` {#defaults-watermark-font}

页面水印的字体。默认值为 `300 16px Sans-serif`。

### `watermark.rotate` {#defaults-watermark-rotate}

页面水印的旋转角度。默认值为 `345 * Math.PI / 180`。

### `watermark.translateX` {#defaults-watermark-translateX}

页面水印的 X 轴偏移位置。默认值为 `-10`。

### `watermark.translateY` {#defaults-watermark-translateY}

页面水印的 Y 轴偏移位置。默认值为 `50`。

### `watermark.width` {#defaults-watermark-width}

页面水印背景图片宽度。默认值为 `200`。

### `watermark.height` {#defaults-watermark-height}

页面水印背景图片高度。默认值为 `100`。

### `watermark.style` {#defaults-watermark-style}

页面水印图层的样式。

### `watermark.container` {#defaults-watermark-container}

页面水印图层的父元素。默认值为：

{% highlight js %}
function() {
  return $(".js-watermark:not(.modal .js-watermark)").get(0);
}
{% endhighlight %}

### `watermark.mainOnly` {#defaults-watermark-mainOnly}

页面水印是否只加全局背景，即不包含对话框内。默认值为 `false`。

### `watermark.autoInit` {#defaults-watermark-autoInit}

页面水印是否自动初始化。默认值为 `false`。

## `.encrypt.watermark()` {#encrypt-watermark}

给页面加上水印图层。

### `.encrypt.watermark(opts)` {#encrypt-watermark-default}

初始化页面水印图层。

#### 参数

1. `opts`（Plain Object）：要传入到 `watermark.init()` 中的参数。

#### 示例

{% highlight js %}
muu.encrypt.watermark({
  text: "欧雷"
});
{% endhighlight %}
