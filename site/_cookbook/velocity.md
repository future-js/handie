---
title: Velocity

flag:
  primary: templates
  secondary: velocity
---

讲述如何在 Velocity 模板中实现「[搭建页面]({{ '/cookbook/scaffolding/' | prepend: site.baseurl | prepend: site.url }})」里所说的 HTML 结构。

## 目录

* [布局模板](#layout-template)
  * [模板变量](#template-variables)
* [页面内容](#page-content)
  * [定义变量](#define-variables)

## 布局模板 {#layout-template}

建一个负责每个页面布局的 `admin.vm`。

### 模板变量 {#template-variables}

因为是服务端渲染，需要一些变量来保证页面模板的通用性和一致性。

#### 页面定位 {#locate-page}

标示当前页面基本信息及位置的变量。

* `primaryPage`：一级页面标识符；
* `secondaryPage`：二级页面标识符；
* `pageTitle`：页面标题；
* `breadcrumb`：面包屑。

{% highlight html %}
<!DOCTYPE html>
<html lang="zh-CN" dir="ltr" data-page="$!{primaryPage}-$!{secondaryPage}">
  <head>
    ...
    <!-- 页面标题 -->
    <title>$!{pageTitle} - 卖好车后台系统</title>
    ...
  </head>
  <body class="Page">
    <header class="Page-header Header">
      ...
    </header>
    <main class="Page-body">
      <div class="Page-sidebar Sidebar">
        ...
      </div>
      <div class="Page-content">
        <div class="Content container-fluid">
          <div class="Content-header">
            <!-- 面包屑 -->
            <div class="Breadcrumb"><i class="fa fa-map-marker"></i>$!breadcrumb</div>
            <!-- 页面标题 -->
            <h1>$!pageTitle</h1>
          </div>
          ...
        </div>
      </div>
    </main>
  </body>
</html>
{% endhighlight %}

#### 资源引用

用于具体页面所需要的静态资源文件的引用。

* `timestamp`：避免文件在浏览器中缓存的时间戳（暂行方案）；
* `headAssets`：在 `</head>` 前引用的文件；
* `bodyAssets`：在 `</body>` 前引用的文件。

{% highlight html %}
<head>
  #set($timestamp = $dateTool.get("yyyyMMddHH"))
  ...
  $!headAssets
  ...
</head>
<body class="Page">
  ...
  $!bodyAssets
</body>
{% endhighlight %}

#### 内容片段

用于同一个布局分区中根据具体页面显示不同的内容。

* `headerActions`：页头操作区中的触发器；
* `queryArea`：数据列表筛选区域；
* `dataTableList`：数据列表表格区域；
* `modal`：新增数据对话框。

{% highlight html %}
<body class="Page">
  <header class="Page-header Header">
    <div class="Header-brand">
      ...
    </div>
    <div class="Header-extra">
      <div class="Header-operations">
        <!-- 除了新增按钮外的其他触发器 -->
        $!headerActions
        <!-- 有新增数据对话框时显示新增数据按钮 -->
        #if($!modal)<div class="Header-action Action"><button class="Action-trigger fa fa-plus js-add--header" type="button" data-toggle="modal" data-target=".js-addNewData" title="新增"><span class="sr-only">新增</span></button></div>#end
      </div>
    </div>
  </header>
  <main class="Page-body">
    <div class="Page-sidebar Sidebar">
      ...
    </div>
    <div class="Page-content">
      <div class="Content container-fluid">
        <div class="Content-header">
          ...
        </div>
        <!-- 页面内容 -->
        $screen_content
        <!-- 数据列表筛选区域 -->
        $!queryArea
        <!-- 数据列表表格区域 -->
        <div class="Area Area--table">
          #if($!dataTableList)
            $dataTableList
          #else
            <table class="js-showDataTable"></table>
          #end
        </div>
      </div>
      <!-- 新增数据对话框 -->
      $!modal
    </div>
  </main>
</body>
{% endhighlight %}

## 页面内容 {#page-content}

在具体页面中如果定义了布局模板中所引用的内容片段，会在布局模板中的引用位置进行渲染，否则将渲染到 `$screen_content` 所在位置。

### 定义变量 {#define-variables}

在 Velocity 中定义变量，如果是简单的字符串之类，用 `#set()`。

{% highlight html %}
#set($pageTitle = "工作台")
{% endhighlight %}

但若是一段 HTML，则要用 `#define()` 了。

{% highlight html %}
#define($breadcrumb)
<ul>
  <li>$pageTitle</li>
</ul>
#end
{% endhighlight %}

一个具体页面中，**除了「[页面定位](#locate-page)」相关变量是必要的，其他都可以按情况决定是否要定义。**
