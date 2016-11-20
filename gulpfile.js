"use strict";

const gulp = require("gulp");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
const umd = require("gulp-umd");

gulp.task("compile-css", function() {
  ["sidebar-outside", "sidebar-inside", "isomorphic"].forEach(function( f ) {
    gulp
      .src(`./src/stylesheets/layouts/${f}/_exports.scss`)
      .pipe(concat("index.scss"))
      .pipe(sass({outputStyle: "expanded", noLineComments: true}).on("error", sass.logError))
      .pipe(rename(`themes/${f}-default.css`))
      .pipe(gulp.dest("./dist/stylesheets"));
  });

  gulp
    .src("./examples/**/*.scss")
    .pipe(sass({outputStyle: "expanded", noLineComments: true}).on("error", sass.logError))
    .pipe(cssmin({keepSpecialComments: 0}))
    .pipe(gulp.dest("./examples"))
});

gulp.task("compile-js", function() {
  gulp
    .src("./src/javascripts/*.js")
    .pipe(babel({presets: ["es2015"]}))
    .pipe(gulp.dest("./dist/javascripts"));
});

gulp.task("watch", function() {
  gulp.watch("**/*.scss", ["compile-css"]);
  gulp.watch("./src/**/*.js", ["compile-js"]);
});

gulp.task("default", ["compile-css", "compile-js", "watch"]);
