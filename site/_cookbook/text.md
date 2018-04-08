---
title: 文本处理

flag:
  primary: api
  secondary: text
---

对文本进行一些处理。

## 目录

* 简单处理
  * [`text.copy(content)`](#text-copy-content)
  * [`text.copy($target)`](#text-copy-target)
  * [`text.copy($target, keepSelected)`](#text-copy-target-selected)

## `.text.copy()` {#text-copy}

复制指定内容到剪贴板。

### `.text.copy(content)` {#text-copy-content}

将指定文本复制到剪贴板。

#### 参数

1. `content`（String）：文本内容。

#### 返回值

（String）：被复制的文本内容。

#### 示例

{% highlight js %}
muu.text.copy("这段文本将要被复制到剪贴板中");
{% endhighlight %}

### `.text.copy($target)` {#text-copy-target}

将指定目标所包含的文本复制到剪贴板。

#### 参数

1. `$target`（jQuery Object）：要被复制文本内容的目标元素的 jQuery 对象。

#### 返回值

（String）：被复制的文本内容。

#### 示例

{% highlight html %}
<div id="target">这段文本将要被复制到剪贴板中</div>
{% endhighlight %}

{% highlight js %}
muu.text.copy($("#target"));
{% endhighlight %}

### `.text.copy($target, keepSelected)` {#text-copy-target-selected}

将指定文本类表单控件所包含的文本复制到剪贴板并使其处于选中状态。

#### 参数

1. `$target`（jQuery Object）：要被复制内容的文本类表单控件的 jQuery 对象；
2. `keepSelected`（Boolean）：若值为 `true` 则使控件处于选中状态。

#### 返回值

（String）：被复制的文本内容。

#### 示例

{% highlight html %}
<input id="target" type="text" value="这段文本将要被复制到剪贴板中">
{% endhighlight %}

{% highlight js %}
muu.text.copy($("#target"), true);
{% endhighlight %}
