---
title: 阅读指导

flag:
  primary: guide
  secondary: usage
---

本框架提供了一些从业务中提炼出的 API，熟练掌握并运用它们能够少写很多代码，大大提高开发效率！

下面教你阅读本框架 API 文档的正确姿势。(⁎⁍̴̛ᴗ⁍̴̛⁎)

## 数据类型 {#data-types}

文档中所标示的数据类型并不与 ES 规范中的完全一致，在那基础上进行了一些扩展。

| 类型 | 释义 | 说明 |
| --- | --- | --- |
| Boolean | 布尔型 | `true` 或 `false` |
| String | 字符串 | `""` |
| Number | 数字 |  |
| Function | 函数 |  |
| Array | 数组 |  |
| Array-like Object | 类数组对象 | 具备 `length` 属性且可按索引访问的非数组对象 |
| Plain Object | 纯对象 | 普通的键值对 |
| HTML DOM | HTML DOM 对象 |  |
| jQuery Selector | jQuery 选择器 |  |
| jQuery Object | jQuery 对象 | 经过 jQuery 封装的 DOM 对象 |
| jQuery Event | jQuery 事件对象 | 经过 jQuery 封装的事件对象 |
| jQuery XHR | jQuery XHR 对象 | 经过 jQuery 封装的 XHR 对象 |
{:.table.table-bordered}

## 描述方式 {#describing-patterns}

{% highlight text %}
## 名称

API 的简要说明。

### 调用方式

API 调用方式相关说明。

#### 参数

1. `params`（参数类型）：参数说明。

#### 返回值

（返回值类型）：返回值说明。

#### 示例

示例代码。
{% endhighlight %}
