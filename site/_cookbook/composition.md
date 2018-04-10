---
title: 框架构成

flag:
  primary: guide
  secondary: composition
---

因 [jQuery](http://jquery.com){:target="_blank"}{:rel="nofollow external"} 和 [Bootstrap](https://getbootstrap.com/docs/3.3/){:target="_blank"}{:rel="nofollow external"} 简单易用、文档齐全，可以让后端工程师很容易上手，故选择它们作为本框架的底层。

## 构成 {#composition}

从功能性上来看，由 UI 组件和工具方法两部分构成。

### 依赖 {#dependencies}

总的来说，本框架是针对公司业务场景基于一些强大的开源库的进一步封装，它们分别为：

名字 | 版本 | 作用
--- | ---
[jQuery](http://jquery.com/){:target="_blank"}{:rel="nofollow external"} | 1.12.0 | DOM 操作、事件、AJAX 等
[Bootstrap](https://getbootstrap.com/docs/3.3/){:target="_blank"}{:rel="nofollow external"} | 3.3.7 | 常用组件的样式及交互
[Bootstrap Table](http://bootstrap-table.wenzhixin.net.cn/){:target="_blank"}{:rel="nofollow external"} | 1.11.1 | 复杂的数据表格
[Bootstrap 3 Date/Time Picker](http://eonasdan.github.io/bootstrap-datetimepicker/){:target="_blank"}{:rel="nofollow external"} | 4.17.47 | 精确到时分的日期时间拾取器
[Select2](http://select2.github.io/){:target="_blank"}{:rel="nofollow external"} ([Bootstrap Theme](https://select2.github.io/select2-bootstrap-theme/){:target="_blank"}{:rel="nofollow external"}) | 4.0.3 | 美化并增强下拉列表控件
[HTML5 Shiv](https://github.com/aFarkas/html5shiv){:target="_blank"}{:rel="nofollow external"} | 3.7.3 | 兼容 HTML5 标签
[Plupload](http://www.plupload.com/){:target="_blank"}{:rel="nofollow external"} | 2.1.1 | 上传文件
[Qiniu SDK](https://github.com/qiniu/js-sdk){:target="_blank"}{:rel="nofollow external"} | 1.0.19 | 上传文件到七牛
[H5Fx](https://ourai.github.io/H5Fx/){:target="_blank"}{:rel="nofollow external"} | 0.2.3 | 基于 [HTML Forms](https://www.w3.org/TR/html5/forms.html){:target="_blank"}{:rel="nofollow external"} 规范进行表单校验
[Moment.js](http://momentjs.com/){:target="_blank"}{:rel="nofollow external"} | 2.18.0 | 日期时间格式化
[Font Awesome](https://fontawesome.com/v4.7.0/){:target="_blank"}{:rel="nofollow external"} | 4.7.0 | 丰富的字体图标
{:.table.table-bordered}

### 结构 {#structure}

因为依赖的第三方库众多，如果不对它们加以控制，版本变更带来的未知因素危害还是蛮大的，所以将确定版本的第三方库直接打包到本框架中。

安装后的文件目录结构大致为——

{% highlight text %}
.
├── bootstrap/
├── bootstrap-datetimepicker/
├── bootstrap-table/
├── fontawesome/
├── handie/
│   ├── images/
│   │   ├── favicon.png
│   │   ├── logo-2x.png
│   │   └── logo.png
│   ├── javascripts/
│   │   ├── adaptor-admin-lte.js
│   │   ├── adaptor-admin-lte.min.js
│   │   ├── adaptor-h-ui-admin.js
│   │   ├── adaptor-h-ui-admin.min.js
│   │   ├── admin-lite.js
│   │   ├── admin-lite.min.js
│   │   ├── admin.js
│   │   ├── admin.min.js
│   │   ├── all.js
│   │   ├── all.min.js
│   │   ├── utils.js
│   │   ├── utils.min.js
│   │   ├── vendors.js
│   │   └── vendors.min.js
│   ├── maps/
│   │   ├── adaptor-admin-lte.min.css.map
│   │   ├── adaptor-admin-lte.min.js.map
│   │   ├── adaptor-h-ui-admin.min.css.map
│   │   ├── adaptor-h-ui-admin.min.js.map
│   │   ├── admin-lite.min.css.map
│   │   ├── admin-lite.min.js.map
│   │   ├── admin.min.css.map
│   │   ├── admin.min.js.map
│   │   ├── all.min.js.map
│   │   ├── utils.min.js.map
│   │   └── vendors.min.js.map
│   └── stylesheets/
│       ├── adaptors/
│       │   ├── _admin-lte.scss
│       │   └── _h-ui-admin.scss
│       ├── admin/
│       │   ├── _exports.scss
│       │   ├── _helper.scss
│       │   └── _lite.scss
│       ├── adaptor-admin-lte.css
│       ├── adaptor-admin-lte.min.css
│       ├── adaptor-h-ui-admin.css
│       ├── adaptor-h-ui-admin.min.css
│       ├── admin-lite.css
│       ├── admin-lite.min.css
│       ├── admin.css
│       └── admin.min.css
├── h5fx/
├── html5shiv/
├── jquery/
├── moment/
├── plupload/
├── qiniu/
├── select2/
└── select2-bootstrap-theme/
{% endhighlight %}

## 样式 {#classes}

除了第三方库所提供的样式之外，本框架也提供了一些适用于业务场景的样式。

### 命名方式 {#naming-conventions}

参见「[代码规范]({{ '/cookbook/spec/' | prepend: site.baseurl | prepend: site.url }})」中的「[命名方式]({{ '/cookbook/spec/' | prepend: site.baseurl | prepend: site.url }}#naming-conventions)」。

### 类别 {#categories}

参见「[组件]({{ '/cookbook/components/' | prepend: site.baseurl | prepend: site.url }})」和「[辅助样式]({{ '/cookbook/utilities/' | prepend: site.baseurl | prepend: site.url }})」。
