"use strict";

const fs = require("fs");
const path = require("path");

const gulp = require("gulp");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
const umd = require("gulp-umd");
const wrap = require("gulp-wrap");
const scssimport = require("gulp-shopify-sass");

const pkg = require("./bower.json");

const compileCssTasks = [];

function concatLayoutTasks() {
  let layoutDir = "./src/stylesheets/layouts";
  let exportFile = "_exports.scss";
  let dir = path.resolve(__dirname, layoutDir);

  fs.readdirSync(dir).forEach(function( d ) {
    let p = path.resolve(dir, d);

    if ( d.charAt(0) !== "." && fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, exportFile)) ) {
      gulp.task(`concat-layout-${d}`, function() {
        return gulp.src(`${layoutDir}/${d}/${exportFile}`)
          .pipe(scssimport())
          .pipe(rename(`_${d}.scss`))
          .pipe(gulp.dest("./dist/stylesheets/layouts"));
      });
    }
  });
}

function compileLayoutTasks() {
  let layoutDir = "./dist/stylesheets/layouts";
  let dir = path.resolve(__dirname, layoutDir);

  fs.readdirSync(path.resolve(__dirname, "./src/stylesheets/layouts")).forEach(function( d ) {
    let taskName = `compile-layout-${d}`;

    gulp.task(taskName, [`concat-layout-${d}`], function() {
      return gulp.src(`${layoutDir}/_${d}.scss`)
        .pipe(rename(`${d}-default.scss`))
        .pipe(sass({outputStyle: "expanded", noLineComments: true}).on("error", sass.logError))
        .pipe(gulp.dest(layoutDir));
    });

    compileCssTasks.push(taskName);
  });
}

concatLayoutTasks();
compileLayoutTasks();

gulp.task("concat-scss-helper", function() {
  return gulp.src("./src/stylesheets/utils/_helper.scss")
    .pipe(scssimport())
    .pipe(rename("_helper.scss"))
    .pipe(gulp.dest("./dist/stylesheets"));
});

gulp.task("import-scss-main", function() {
  return gulp.src("./build/import-styles.scss")
    .pipe(scssimport())
    .pipe(rename(`${pkg.name}.scss`))
    .pipe(gulp.dest(`.${pkg.name}-tmp`));
});

gulp.task("concat-scss-main", ["import-scss-main"], function() {
  return gulp.src([
      "build/import-helper.scss",
      `.${pkg.name}-tmp/${pkg.name}.scss`
    ])
    .pipe(concat(`_${pkg.name}.scss`))
    .pipe(gulp.dest("./dist/stylesheets"));
});

gulp.task("compile-css", ["concat-scss-helper", "concat-scss-main"].concat(compileCssTasks));

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
    .src("./src/javascripts/layouts/*.js")
    .pipe(babel({presets: ["es2015"]}))
    .pipe(wrap(`(function() {\n\n<%= contents %>\n\n})();`))
    .pipe(gulp.dest("./dist/javascripts/layouts"));
});

gulp.task("compile", ["compile-css", "compile-js"]);

gulp.task("watch", function() {
  gulp.watch("./src/**/*.scss", ["compile-css"]);
  gulp.watch("./src/**/*.js", ["compile-js"]);
});

gulp.task("default", ["compile", "watch"]);
