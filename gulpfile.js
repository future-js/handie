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
const stripCssComments = require("gulp-strip-css-comments");
const banner = require("gulp-banner");

const pkg = require("./package.json");
const bannerTemplet = require("./build/partials/banner");

const layoutSrc = "./src/stylesheets/layouts";
const layoutDist = `./dist/${pkg.name}/stylesheets/layouts`;
const tmpDir = `.${pkg.name}-tmp`;
const compileCssTasks = [];

function traverseLayouts( callback ) {
  fs.readdirSync(path.resolve(__dirname, layoutSrc)).forEach(callback);
}

function importLayoutTasks() {
  traverseLayouts(function( layout ) {
    gulp.task(`import-scss-${layout}`, function() {
      return gulp.src(`./build/partials/concat-${layout}.scss`)
        .pipe(scssimport())
        .pipe(rename(`${layout}.scss`))
        .pipe(gulp.dest(tmpDir));
    });
  });
}

function concatLayoutTasks() {
  traverseLayouts(function( layout ) {
    gulp.task(`concat-scss-${layout}`, [`import-scss-${layout}`], function() {
      return gulp.src([
          `${layoutSrc}/${layout}/_variables.scss`,
          "./build/partials/import-handie.scss",
          `${tmpDir}/${layout}.scss`
        ])
        .pipe(concat(`_${layout}.scss`))
        .pipe(gulp.dest(layoutDist));
    });
  });
}

function compileLayoutTasks() {
  traverseLayouts(function( layout ) {
    let taskName = `compile-scss-${layout}`;

    gulp.task(taskName, ["concat-scss-main", `concat-scss-${layout}`], function() {
      return gulp.src(`${layoutDist}/_${layout}.scss`)
        .pipe(rename(`${layout}-default.scss`))
        .pipe(sass({outputStyle: "expanded", noLineComments: true}).on("error", sass.logError))
        .pipe(gulp.dest(layoutDist));
    });

    compileCssTasks.push(taskName);
  });
}

gulp.task("concat-scss-helper", function() {
  return gulp.src("./src/stylesheets/utils/_helper.scss")
    .pipe(scssimport())
    .pipe(rename("_helper.scss"))
    .pipe(gulp.dest(`./dist/${pkg.name}/stylesheets`));
});

gulp.task("import-scss-main", function() {
  return gulp.src("./build/partials/concat-handie.scss")
    .pipe(scssimport())
    .pipe(rename(`${pkg.name}.scss`))
    .pipe(gulp.dest(tmpDir));
});

gulp.task("concat-scss-main", ["concat-scss-helper", "import-scss-main"], function() {
  return gulp.src([
      "build/partials/import-helper.scss",
      `${tmpDir}/${pkg.name}.scss`
    ])
    .pipe(concat(`_${pkg.name}.scss`))
    .pipe(gulp.dest(`./dist/${pkg.name}/stylesheets`));
});

importLayoutTasks();
concatLayoutTasks();
compileLayoutTasks();

gulp.task("compile-css", compileCssTasks, function() {
  return gulp.src(`${layoutDist}/*.css`)
    .pipe(stripCssComments({preserve: false}))
    .pipe(banner(bannerTemplet, {pkg}))
    .pipe(gulp.dest(layoutDist));
});

gulp.task("concat-js-main", function() {
  return gulp.src([
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
    .pipe(gulp.dest(`./dist/${pkg.name}/javascripts`));
});

gulp.task("compile-js", ["concat-js-main"], function() {
  return gulp.src("./src/javascripts/layouts/*.js")
    .pipe(babel({presets: ["es2015"]}))
    .pipe(wrap(`(function() {\n\n<%= contents %>\n\n})();`))
    .pipe(gulp.dest(`./dist/${pkg.name}/javascripts/layouts`));
});

gulp.task("compile", ["compile-css", "compile-js"], function() {
  return gulp.src(`./dist/${pkg.name}/javascripts/**/*.js`)
    .pipe(banner(bannerTemplet, {pkg}))
    .pipe(gulp.dest(`./dist/${pkg.name}/javascripts`));
});

gulp.task("watch", function() {
  gulp.watch("./src/**/*.scss", ["compile-css"]);
  gulp.watch("./src/**/*.js", ["compile-js"]);
});

gulp.task("default", ["compile", "watch"]);
