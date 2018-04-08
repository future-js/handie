---
title: 介绍

permalink: /cookbook/

flag:
  primary: introduction
---

英文名是「{{ site.data.lib.name.en }}」，缩写为「{{ site.data.lib.abbr }}」。顾名思义，是肩负统一卖好车后台类系统的界面及技术栈并提高开发效率等大任的 UI 框架。

需要事先说明的是：**这里仅仅是一个教程，基本只有文本和代码，想更直观地看到本框架所起到的作用，请[点此体验]({{ '/admin/dashboard/' | prepend: site.baseurl | prepend: site.url }}){:target="_blank"}。**

## 为什么要有这个

每个业务量多的公司中，或多或少的都有后台类系统；业务线越多，相应的后台也就越多。在没有一个统一规范或约定的情况下，各后台的开发人员很可能各自为政，用不同的框架去开发，形成了外观各异的界面风格……

然而，这并不是一家有所目标和追求的公司该有的做事风格，统一后台的 UI 样式和技术栈是必行之事！另外，这种面向内部的系统，独占或占用太多前端开发资源对公司来说并非明智之举，就前端工程师自身发展而言也绝非益事。

在这样的背景下，由前端工程师基于现有流行的前端框架封装开发出一套符合公司品牌形象并适合业务逻辑的后台类 UI 框架就显得十分必要！需要说明的是，**这种框架是给后端工程师用的。**

## 如何做技术选型

因为**这是一个给后端工程师用的 UI 框架**，在选择基础库/框架时要选那些不仅在前端工程师圈子里名声大噪并要简单易用的，所以**用 [jQuery](http://jquery.com){:target="_blank"}{:rel="nofollow external"} 和 [Bootstrap](https://getbootstrap.com/docs/3.3/){:target="_blank"}{:rel="nofollow external"} 作为底层库/框架**。

## 怎么反馈问题

如果你有问题要反馈或什么好的建议，可以提交 [issue]({{ site.data.lib.repo }}/issues){:target="_blank"}{:rel="nofollow external"} 或发送邮件到 <ourairyu@gmail.com>。
