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

gulp.task("compile-css-admin", resolveScssTask(`./src/stylesheets/admin/index.scss`, {renameTo: "admin.scss"}));

gulp.task("compile-css-theme-google-plus", resolveScssTask("./src/themes/google-plus/index.scss", {
  renameTo: "google-plus.scss",
  dest: `${CSS_DIST}/themes`
}));

gulp.task("compile-css-theme-antd-pro", resolveScssTask("./src/themes/antd-pro/index.scss", {
  renameTo: "antd-pro.scss",
  dest: `${CSS_DIST}/themes`
}));

gulp.task("compile-css", [
    "compile-css-admin",
    "compile-css-theme-google-plus",
    "compile-css-theme-antd-pro"
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

gulp.task("concat-js-admin", [
    "concat-js-vendors",
    "concat-js-utils"
  ], () => {
    return gulp
      .src([`${JS_DIST}/vendors.js`, `${JS_DIST}/utils.js`])
      .pipe(concat("admin.js"))
      .pipe(gulp.dest(JS_DIST));
});

gulp.task("concat-js-theme-google-plus", () => {
  return resolveRollupTask({
    input: "src/themes/google-plus/index.js",
    plugins: [
      rollupBabel({
        babelrc: false,
        presets: [["env", {"modules": false}]],
        plugins: ["external-helpers"]
      })
    ],
    file: `${JS_DIST}/themes/google-plus.js`,
    name: "google-plus"
  });
});

gulp.task("concat-js-theme-antd-pro", () => {
  return resolveRollupTask({
    input: "src/themes/antd-pro/index.js",
    plugins: [
      rollupBabel({
        babelrc: false,
        presets: [["env", {"modules": false}]],
        plugins: ["external-helpers"]
      })
    ],
    file: `${JS_DIST}/themes/antd-pro.js`,
    name: "antd-pro"
  });
});

gulp.task("compile-js", [
    "concat-js-admin",
    "concat-js-theme-google-plus",
    "concat-js-theme-antd-pro"
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
