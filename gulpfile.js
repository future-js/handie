"use strict";

const gulp = require("gulp");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
const umd = require("gulp-umd");
const scssimport = require("gulp-shopify-sass");

const pkg = require("./package.json");

gulp.task("compile-css", function() {
  ["sidebar-outside", "sidebar-inside", "isomorphic"].forEach(function( f ) {
    gulp
      .src(`./src/stylesheets/layouts/${f}/_exports.scss`)
      .pipe(concat("index.scss"))
      .pipe(sass({outputStyle: "expanded", noLineComments: true}).on("error", sass.logError))
      .pipe(rename(`themes/${f}-default.css`))
      .pipe(gulp.dest("./dist/stylesheets"));

    gulp
      .src(`./src/stylesheets/layouts/${f}/_exports.scss`)
      .pipe(scssimport())
      .pipe(rename(`themes/_${f}.scss`))
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
    .src([
      "variables",
      "other",
      "ajax",
      "calculation",
      "dialog",
      "form",
      "generator",
      "table",
      "initializer"
    ].map(function( name ) {
      return `./src/javascripts/utils/${name}.js`;
    }))
    .pipe(concat(`${pkg.name}.js`))
    .pipe(babel({presets: ["es2015"]}))
    .pipe(umd({
      exports: function() {
        return "utils";
      },
      namespace: function() {
        return pkg.name;
      }
    }))
    .pipe(gulp.dest("./dist/javascripts"));

  gulp
    .src("./src/javascripts/themes/*.js")
    .pipe(babel({presets: ["es2015"]}))
    .pipe(gulp.dest("./dist/javascripts/themes"));
});

gulp.task("watch", function() {
  gulp.watch("./src/**/*.scss", ["compile-css"]);
  gulp.watch("./src/**/*.js", ["compile-js"]);
});

gulp.task("default", ["compile-css", "compile-js", "watch"]);
