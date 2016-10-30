"use strict";

const gulp = require("gulp");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");

gulp.task("compile", function() {
  [{
    src: "layouts/sidebar-outside",
    dist: "themes/sidebar-outside-gray"
  }, {
    src: "layouts/sidebar-inside",
    dist: "themes/sidebar-inside-yellow"
  }].forEach(function( f ) {
    gulp
      .src(`./src/${f.src}/_exports.scss`)
      .pipe(concat("index.scss"))
      .pipe(sass({outputStyle: "expanded", noLineComments: true}).on("error", sass.logError))
      .pipe(cssmin({keepSpecialComments: 0}))
      .pipe(rename(`${f.dist}.min.css`))
      .pipe(gulp.dest("./dist"));
  });
});

gulp.task("default", ["compile"]);
