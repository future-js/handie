# Handie

[![NPM version][npm-ver]][npm-url]
[![NPM download][npm-dm]][npm-url]

[npm-ver]: https://img.shields.io/npm/v/handie.svg?style=flat-square
[npm-dm]: https://img.shields.io/npm/dm/handie.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/handie

UI stuffs for the dashboard of a website.

## Introduction

Handie depends on a number of other frameworks and libraries. I copied dependencies into `/dist` folder as a part of Handie in order to make versions controllable and include them handily.

## Usage

First, you must type command in terminal with `bower install --save handie` or `npm install --save handie` to install it.

Then include assets which you need:

```html
<html lang="zh-CN" dir="ltr" data-page="dashboard-tasks">
  <head>
    <meta charset="UTF-8">
    <title>Isomorphic layout of Handie</title>
    <!-- Global and layout-specific CSS rules -->
    <link rel="stylesheet" href="/handie/dist/handie/stylesheets/layouts/isomorphic-default.css">
  </head>
  <body class="Page">
    ...
    <!-- Dependencies for Handie -->
    <script src="/handie/dist/jquery/dist/jquery.min.js"></script>
    <script src="/handie/dist/bootstrap-sass/assets/javascripts/bootstrap.min.js"></script>
    <!-- Utils of Handie -->
    <script src="/handie/dist/handie/javascripts/handie.js"></script>
    <!-- Layout-specific Logic -->
    <script src="/handie/dist/handie/javascripts/layouts/Isomorphic.js"></script>
  </body>
</html>
```
