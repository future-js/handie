# Handie

[![NPM version](https://badge.fury.io/js/handie.svg)](https://www.npmjs.com/package/handie)
[![Bower version](https://badge.fury.io/bo/handie.svg)](https://github.com/packagent/handie)

Handie is a collection of UI stuffs for admin dashboard websites.

It depends on a number of other libraries and frameworks. I included dependencies as parts of Handie in order to make versions controllable and import them handily.

## Usage

At first, you should type command in terminal with `bower install --save handie` or `npm install --save handie` to download Handie.

Then import assets which you need:

```html
<html>
  <head>
    <meta charset="UTF-8">
    <title>Handie</title>
    <!-- Global and layout-specific CSS rules -->
    <link rel="stylesheet" href="/handie-latest/handie/stylesheets/layouts/isomorphic-default.css">
  </head>
  <body class="Page">
    ...
    <!-- Dependencies for Handie -->
    <script src="/handie-latest/jquery/dist/jquery.min.js"></script>
    <script src="/handie-latest/bootstrap-sass/assets/javascripts/bootstrap.min.js"></script>
    <!-- Utils of Handie -->
    <script src="/handie-latest/handie/javascripts/handie.js"></script>
    <!-- Layout-specific Logic -->
    <script src="/handie-latest/handie/javascripts/layouts/Isomorphic.js"></script>
  </body>
</html>
```

Please visit the [cookbook](https://ourai.github.io/handie/cookbook/) to learn more advanced features. ;-)

## Feedback

If you have any good suggestions, you could create an [issue](https://github.com/ourai/handie/issues) or send [E-mail](mailto:ourairyu@gmail.com) to me.

Thank you. ;-)
