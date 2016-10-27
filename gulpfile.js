"use strict";

const gulp = require("gulp");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");

gulp.task("compile", function() {
  ["reset", "layouts/dashboard"].forEach(function( f ) {
    gulp
      .src(`./src/${f}/index.scss`)
      .pipe(sass({outputStyle: "expanded", noLineComments: true}).on("error", sass.logError))
      .pipe(cssmin({keepSpecialComments: 0}))
      .pipe(rename(`${f}.min.css`))
      .pipe(gulp.dest("./dist"));
  });
});

gulp.task("default", ["compile"]);
