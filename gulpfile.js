const fs = require("fs");
const path = require("path");
const exec = require("child_process").exec;

const gulp = require("gulp");
const concat = require("gulp-concat");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");
const template = require("gulp-template");
const strip = require("gulp-strip-comments");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");

const rollupBabel = require("rollup-plugin-babel");
const rollupNodeResolver = require("rollup-plugin-node-resolve");
const rollupCjsResolver = require("rollup-plugin-commonjs");

const {
    LIB_NAME,
    CSS_DIST,
    JS_DIST
  } = require("./build/tasks/constants");
const {
    snake2Camel,
    resolveBanner,
    resolveRollupTask,
    resolveScssTask
  } = require("./build/tasks/functions");

const TMP_DIR = `.${LIB_NAME}-tmp`;

gulp.task("compile-css-admin", resolveScssTask(`./src/stylesheets/admin/index.scss`, {
  renameTo: "admin.scss",
  dest: TMP_DIR
}));

gulp.task("compile-css-layout-header-first", resolveScssTask("./src/layouts/header-first/index.scss", {
  renameTo: "header-first.scss",
  dest: `${TMP_DIR}/layouts`
}));

gulp.task("compile-css-layout-sidebar-first", resolveScssTask("./src/layouts/sidebar-first/index.scss", {
  renameTo: "sidebar-first.scss",
  dest: `${TMP_DIR}/layouts`
}));

gulp.task("compile-css-admin-with-header-first", [
    "compile-css-admin",
    "compile-css-layout-header-first"
  ], () => {
    return gulp
      .src([`${TMP_DIR}/admin.css`, `${TMP_DIR}/layouts/header-first.css`])
      .pipe(concat("admin-hf.css"))
      .pipe(gulp.dest(CSS_DIST));
});

gulp.task("compile-css-admin-with-sidebar-first", [
    "compile-css-admin",
    "compile-css-layout-sidebar-first"
  ], () => {
    return gulp
      .src([`${TMP_DIR}/admin.css`, `${TMP_DIR}/layouts/sidebar-first.css`])
      .pipe(concat("admin-sf.css"))
      .pipe(gulp.dest(CSS_DIST));
});

gulp.task("compile-css", [
    "compile-css-admin-with-header-first",
    "compile-css-admin-with-sidebar-first"
  ], () => {
    return gulp
      .src(`${CSS_DIST}/**/*.css`, {base: CSS_DIST})
      .pipe(sourcemaps.init({largeFile: true, loadMaps: true}))
      .pipe(cssmin())
      .pipe(rename({suffix: ".min"}))
      .pipe(sourcemaps.write("../maps"))
      .pipe(gulp.dest(CSS_DIST));
});

gulp.task("concat-js-vendors", () => {
  return gulp
    .src([
        "jquery-1.12.0/dist/jquery",
        "bootstrap-sass-3.3.7/assets/javascripts/bootstrap",
        "bootstrap-table-1.11.1/dist/bootstrap-table",
        "bootstrap-table-1.11.1/dist/locale/bootstrap-table-zh-CN",
        "select2-4.0.3/dist/js/select2.full",
        "select2-4.0.3/dist/js/i18n/zh-CN",
        "h5fx-0.2.3/H5Fx"
      ].map(base => `bower_components/${base}.js`))
    .pipe(concat("vendors.js"))
    .pipe(strip())
    .pipe(gulp.dest(JS_DIST));
});

gulp.task("concat-js-utils", () => {
  return resolveRollupTask({
    input: "src/utils/index.js",
    plugins: [
      rollupNodeResolver(),
      rollupBabel({
        babelrc: false,
        presets: [["env", {"modules": false}]],
        plugins: ["external-helpers"]
      })
    ],
    file: `${JS_DIST}/utils.js`,
    name: "utils"
  });
});

gulp.task("concat-js-layout-header-first", () => {
  return resolveRollupTask({
    input: "src/layouts/header-first/index.js",
    plugins: [
      rollupBabel({
        babelrc: false,
        presets: [["env", {"modules": false}]],
        plugins: ["external-helpers"]
      })
    ],
    file: `${TMP_DIR}/layouts/header-first.js`,
    name: "header-first"
  });
});

gulp.task("concat-js-layout-sidebar-first", () => {
  return resolveRollupTask({
    input: "src/layouts/sidebar-first/index.js",
    plugins: [
      rollupBabel({
        babelrc: false,
        presets: [["env", {"modules": false}]],
        plugins: ["external-helpers"]
      })
    ],
    file: `${TMP_DIR}/layouts/sidebar-first.js`,
    name: "sidebar-first"
  });
});

gulp.task("concat-js-admin-with-header-first", [
    "concat-js-vendors",
    "concat-js-utils",
    "concat-js-layout-header-first"
  ], () => {
    return gulp
      .src([
        `${JS_DIST}/vendors.js`,
        `${JS_DIST}/utils.js`,
        `${TMP_DIR}/layouts/header-first.js`
      ])
      .pipe(concat("admin-hf.js"))
      .pipe(gulp.dest(JS_DIST));
});

gulp.task("concat-js-admin-with-sidebar-first", [
    "concat-js-vendors",
    "concat-js-utils",
    "concat-js-layout-sidebar-first"
  ], () => {
    return gulp
      .src([
        `${JS_DIST}/vendors.js`,
        `${JS_DIST}/utils.js`,
        `${TMP_DIR}/layouts/sidebar-first.js`
      ])
      .pipe(concat("admin-sf.js"))
      .pipe(gulp.dest(JS_DIST));
});

gulp.task("compile-js", [
    "concat-js-admin-with-header-first",
    "concat-js-admin-with-sidebar-first"
  ], () => {
    return gulp.src(`${JS_DIST}/*.js`)
      .pipe(resolveBanner())
      .pipe(gulp.dest(JS_DIST));
});

gulp.task("compile", ["compile-css", "compile-js"], () => {
  return gulp.src(`${JS_DIST}/**/*.js`, {base: JS_DIST})
    .pipe(sourcemaps.init({largeFile: true, loadMaps: true}))
    .pipe(uglify())
    .pipe(rename({suffix: ".min"}))
    .pipe(resolveBanner())
    .pipe(sourcemaps.write("../maps"))
    .pipe(gulp.dest(JS_DIST));
});

gulp.task("watch", () => {
  gulp.watch("./src/**/*.scss", ["compile-css"]);
  gulp.watch("./src/**/*.js", ["compile-js"]);
});

gulp.task("default", ["compile", "watch"]);
