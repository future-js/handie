"use strict";

const gulp = require("gulp");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");

gulp.task("compile", function() {
  ["sidebar-outside", "sidebar-inside"].forEach(function( f ) {
    gulp
      .src(`./src/layouts/${f}/_exports.scss`)
      .pipe(concat("index.scss"))
      .pipe(sass({outputStyle: "expanded", noLineComments: true}).on("error", sass.logError))
      .pipe(cssmin({keepSpecialComments: 0}))
      .pipe(rename(`themes/${f}-default.min.css`))
      .pipe(gulp.dest("./dist"));
  });
});

gulp.task("default", ["compile"]);
