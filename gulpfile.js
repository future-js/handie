"use strict";

const gulp = require("gulp");
const compass = require("gulp-compass");

gulp.task("compile-sass", function() {
  gulp.src("src/**/*.scss").pipe(compass({
    project: __dirname,
    css: "dist",
    sass: "src"
  }));
});

gulp.task("default", ["compile-sass"]);
