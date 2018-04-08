---
title: 下载安装

flag:
  primary: guide
  secondary: installation
---

在开始搭建后台页面框架之前，必做的一件事当然就是引入所需要的文件啦！

## 安装 {#installation}

所有文件均已上传到 CDN，所以可以通过以下方式直接引用：

{% capture ver %}{% project_version %}{% endcapture %}

{% highlight text %}
//img.maihaoche.com/mhc-fe/muu/{{ ver | split: "-" | first | split: "v" | last }}/要引入的文件路径
{% endhighlight %}

`要引入的文件路径` 部分可以参考本项目所在 GitLab 仓库的 `dist` 分支。

另外，还能够通过 npm 从私有仓库（需要事先在本地进行配置）下载：

{% highlight sh %}
npm install --save @mhc/muu
{% endhighlight %}

## 引入 {#including}

一般来说，按照老规矩样式文件和脚本文件各应放在 `</head>` 和 `</body>` 前。

{% highlight html %}
<head>
  <link rel="stylesheet" href="/select2/dist/css/select2.min.css">
  <link rel="stylesheet" href="/muu/stylesheets/admin.min.css">
  <link rel="stylesheet" href="/bootstrap-table/dist/bootstrap-table.min.css">
  ...
</head>
<body>
  ...
  <script src="/muu/javascripts/all.min.js"></script>
  ...
</body>
{% endhighlight %}

但，视情况脚本文件也可放在 `</head>` 前。

{% highlight html %}
<head>
  ...
  <script src="/muu/javascripts/all.min.js"></script>
</head>
{% endhighlight %}
