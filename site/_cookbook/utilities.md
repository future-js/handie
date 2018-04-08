---
title: 辅助样式

flag:
  primary: utilities
---

每个 class 都具备单一的功能，适用于与组件无关的场景的辅助。

## 目录

* [对齐](#alignment)
  * [`u-alignBaseline`](#alignment-baseLine)
  * [`u-alignBottom`](#alignment-bottom)
  * [`u-alignMiddle`](#alignment-middle)
  * [`u-alignTop`](#alignment-top)
* [显示](#display)
  * [`u-block`](#display-block)
  * [`u-hidden`](#display-hidden)
  * [`u-hiddenVisually`](#display-hiddenVisually)
  * [`u-inline`](#display-inline)
  * [`u-inlineBlock`](#display-inlineBlock)
  * [`u-table`](#display-table)
  * [`u-tableCell`](#display-tableCell)
  * [`u-tableRow`](#display-tableRow)
* [布局](#layout)
  * [`u-cf`](#layout-clearfix)
  * [`u-nbfc`](#layout-nbfc)
  * [`u-nbfcAlt`](#layout-nbfcAlt)
  * [`u-floatLeft`](#layout-floatLeft)
  * [`u-floatRight`](#layout-floatRight)
* [文本](#text)
  * [`u-textBreak`](#text-break)
  * [`u-textCenter`](#text-center)
  * [`u-textLeft`](#text-left)
  * [`u-textRight`](#text-right)
  * [`u-textInheritColor`](#text-inheritColor)
  * [`u-textKern`](#text-kern)
  * [`u-textNoWrap`](#text-noWrap)
  * [`u-textTruncate`](#text-truncate)
* [链接](#link)
  * [`u-linkClean`](#link-clean)
  * [`u-linkBlock`](#link-block)
  * [`u-linkComplex`](#link-complex)

## 对齐 {#alignment}

改变文本在垂直方向的对齐方式，

### `u-alignBaseline` {#alignment-baseLine}

以基线为准对齐。

#### 样式

{% highlight css %}
.u-alignBaseline {
  vertical-align: baseline !important;
}
{% endhighlight %}

### `u-alignBottom` {#alignment-bottom}

以行底为准对齐。

#### 样式

{% highlight css %}
.u-alignBottom {
  vertical-align: bottom !important;
}
{% endhighlight %}

### `u-alignMiddle` {#alignment-middle}

垂直居中对齐。

#### 样式

{% highlight css %}
.u-alignMiddle {
  vertical-align: middle !important;
}
{% endhighlight %}

### `u-alignTop` {#alignment-top}

以行顶为准对齐。

#### 样式

{% highlight css %}
.u-alignTop {
  vertical-align: top !important;
}
{% endhighlight %}

## 显示 {#display}

改变元素的显示形式。

### `u-block` {#display-block}

显示为块级元素。

#### 样式

{% highlight css %}
.u-block {
  display: block !important;
}
{% endhighlight %}

### `u-hidden` {#display-hidden}

不显示该元素。

#### 样式

{% highlight css %}
.u-hidden {
  display: none !important;
}
{% endhighlight %}

### `u-hiddenVisually` {#display-hiddenVisually}

视觉上完全隐藏却对读屏设备「可见」。

#### 样式

{% highlight css %}
.u-hiddenVisually {
  position: absolute !important;
  overflow: hidden !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
}
{% endhighlight %}

### `u-inline` {#display-inline}

显示为內联元素。

#### 样式

{% highlight css %}
.u-inline {
  display: inline !important;
}
{% endhighlight %}

### `u-inlineBlock` {#display-inlineBlock}

显示为行内块元素。

#### 样式

{% highlight css %}
.u-inlineBlock {
  display: -moz-inline-stack;
  display: inline-block;
  *vertical-align: auto;
  zoom: 1;
  *display: inline;
  max-width: 100%;
}
{% endhighlight %}

### `u-table` {#display-table}

具备表格特性。

#### 样式

{% highlight css %}
.u-table {
  display: table !important;
}
{% endhighlight %}

### `u-tableCell` {#display-tableCell}

具备单元格特性。

#### 样式

{% highlight css %}
.u-tableCell {
  display: table-cell !important;
}
{% endhighlight %}

### `u-tableRow` {#display-tableRow}

具备表格行特性。

#### 样式

{% highlight css %}
.u-tableRow {
  display: table-row !important;
}
{% endhighlight %}

## 布局 {#layout}

影响着页面布局。

### `u-cf` {#layout-clearfix}

修复所包含元素设置浮动造成的塌陷问题。

#### 样式

{% highlight css %}
.u-cf {
  *zoom: 1;
}

.u-cf:after {
  content: "";
  display: table;
  clear: both;
}
{% endhighlight %}

### `u-nbfc` {#layout-nbfc}

创建一个新的块级格式化上下文。会使溢出部分不可见。

#### 样式

{% highlight css %}
.u-nbfc {
  overflow: hidden !important;
}
{% endhighlight %}

### `u-nbfcAlt` {#layout-nbfcAlt}

创建一个新的块级格式化上下文。此为 `u-nbfc` 的替代方案。

#### 样式

{% highlight css %}
.u-nbfcAlt {
  display: table-cell !important;
  width: 10000px !important;
}
{% endhighlight %}

### `u-floatLeft` {#layout-floatLeft}

向左浮动。

#### 样式

{% highlight css %}
.u-floatLeft {
  float: left !important;
}
{% endhighlight %}

### `u-floatRight` {#layout-floatRight}

向右浮动。

#### 样式

{% highlight css %}
.u-floatRight {
  float: right !important;
}
{% endhighlight %}

## 文本 {#text}

处理文本排版相关问题。

### `u-textBreak` {#text-break}

当字符串长度超过容器宽度时折行。适用于修复一串连续拉丁字符引起的排版问题。

#### 样式

{% highlight css %}
.u-textBreak {
  word-wrap: break-word !important;
}
{% endhighlight %}

### `u-textCenter` {#text-center}

使文本居中显示。

#### 样式

{% highlight css %}
.u-textCenter {
  text-align: center !important;
}
{% endhighlight %}

### `u-textLeft` {#text-left}

使文本靠左对齐。

#### 样式

{% highlight css %}
.u-textLeft {
  text-align: left !important;
}
{% endhighlight %}

### `u-textRight` {#text-right}

使文本靠右对齐。

#### 样式

{% highlight css %}
.u-textRight {
  text-align: right !important;
}
{% endhighlight %}

### `u-textInheritColor` {#text-inheritColor}

文本颜色与父元素保持一致。

#### 样式

{% highlight css %}
.u-textInheritColor {
  color: inherit !important;
}
{% endhighlight %}

### `u-textKern` {#text-kern}

在支持的浏览器中支持 [kerning](https://blog.typekit.com/2014/02/05/kerning-on-the-web/)。

#### 样式

{% highlight css %}
.u-textKern {
  text-rendering: optimizeLegibility;
  font-feature-settings: "kern" 1;
  font-kerning: normal;
}
{% endhighlight %}

### `u-textNoWrap` {#text-noWrap}

去除空白符包装。

#### 样式

{% highlight css %}
.u-textNoWrap {
  white-space: nowrap !important;
}
{% endhighlight %}

### `u-textTruncate` {#text-truncate}

使文字显示在一行中，超出容器宽度部分显示省略号。

#### 样式

{% highlight css %}
.u-textTruncate {
  max-width: 100%;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  word-wrap: normal !important;
}
{% endhighlight %}

## 链接 {#link}

### `u-linkClean` {#link-clean}

无下划线的链接。

#### 样式

{% highlight css %}
.u-linkClean,
.u-linkClean:hover,
.u-linkClean:focus,
.u-linkClean:active {
  text-decoration: none !important;
}
{% endhighlight %}

### `u-linkBlock` {#link-block}

无下划线的块级链接。

#### 样式

{% highlight css %}
.u-linkBlock,
.u-linkBlock:hover,
.u-linkBlock:focus,
.u-linkBlock:active {
  text-decoration: none !important;
  display: block !important;
}
{% endhighlight %}

### `u-linkComplex` {#link-complex}

限制只在指定内容的交互上显示下划线。

#### 样式

{% highlight css %}
.u-linkComplex,
.u-linkComplex:hover,
.u-linkComplex:focus,
.u-linkComplex:active {
  text-decoration: none !important;
}

.u-linkComplex:hover .u-linkComplexTarget,
.u-linkComplex:focus .u-linkComplexTarget,
.u-linkComplex:active .u-linkComplexTarget {
  text-decoration: underline !important;
}
{% endhighlight %}

#### 示例

{% highlight html %}
<!-- 只有「兵」字显示下划线 -->
<a class="u-linkComplex" href="#">我是一个<span class="u-linkComplexTarget">兵</span></a>
{% endhighlight %}
