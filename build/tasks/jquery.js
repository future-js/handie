const gulp = require("gulp");
const concat = require("gulp-concat");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");
const scssimport = require("gulp-shopify-sass");
const strip = require("gulp-strip-comments");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");

const rollupBabel = require("rollup-plugin-babel");
const rollupNodeResolver = require("rollup-plugin-node-resolve");
const cleanup = require("rollup-plugin-cleanup");

const { CSS_DIST, JS_DIST } = require("./constants");
const { THEME_CSS_TASKS, THEME_JS_TASKS } = require("./theme");
const {
    resolveBanner,
    resolveScssTask,
    resolveRollupTask
  } = require("./functions");

const JQUERY_ROOT = "src/jquery";
const JQUERY_CSS_SRC = `${JQUERY_ROOT}/stylesheets`;

gulp.task("jquery-export-scss-helper", () => {
  return gulp
    .src(`${JQUERY_CSS_SRC}/admin/_helper.scss`)
    .pipe(scssimport())
    .pipe(rename("_helper.scss"))
    .pipe(gulp.dest(`${CSS_DIST}/admin`));
});

gulp.task("jquery-concat-scss-main", () => {
  return gulp
    .src(["helper", "exports"].map(name => `${JQUERY_CSS_SRC}/admin/_${name}.scss`))
    .pipe(scssimport())
    .pipe(concat("_exports.scss"))
    .pipe(gulp.dest(`${CSS_DIST}/admin`));
});

gulp.task("jquery-compile-css-main", ["jquery-concat-scss-main"], resolveScssTask(`${CSS_DIST}/admin/_exports.scss`, "admin.scss"));

gulp.task("jquery-compile-css-t1", ["jquery-compile-css-main"], resolveScssTask([`${CSS_DIST}/admin/_exports.scss`, `${JQUERY_ROOT}/themes/v1/index.scss`], {imported: true, renameTo: "admin-t1.scss"}));

gulp.task("jquery-compile-css-t2", ["jquery-compile-css-main"], resolveScssTask([`${CSS_DIST}/admin/_exports.scss`, `${JQUERY_ROOT}/themes/v2/index.scss`], {imported: true, renameTo: "admin-t2.scss"}));

gulp.task("jquery-compile-css", THEME_CSS_TASKS.concat([
    "jquery-export-scss-helper",
    "jquery-compile-css-t1",
    "jquery-compile-css-t2"
  ]), () => {
    return gulp
      .src(`${CSS_DIST}/**/*.css`, {base: CSS_DIST})
      .pipe(sourcemaps.init({largeFile: true, loadMaps: true}))
      .pipe(cssmin())
      .pipe(rename({suffix: ".min"}))
      .pipe(sourcemaps.write("../maps"))
      .pipe(gulp.dest(CSS_DIST));
});

gulp.task("jquery-concat-js-vendors", () => {
  return gulp
    .src([
        "jquery-1.12.0/dist/jquery",
        "bootstrap-3.3.7/assets/javascripts/bootstrap",
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

gulp.task("jquery-extract-js-utils", () => {
  return resolveRollupTask({
    input: `${JQUERY_ROOT}/utils/index.js`,
    plugins: [
      rollupNodeResolver(),
      rollupBabel({
        babelrc: false,
        presets: [["env", {"modules": false}]],
        plugins: ["external-helpers"]
      }),
      cleanup({
        comments: "none",
        maxEmptyLines: 1
      })
    ],
    file: `${JS_DIST}/utils.js`,
    name: "utils"
  });
});

gulp.task("jquery-extract-js-utils-lite", () => {
  return resolveRollupTask({
    input: `${JQUERY_ROOT}/utils/lite.js`,
    plugins: [
      rollupNodeResolver(),
      rollupBabel({
        babelrc: false,
        presets: [["env", {"modules": false}]],
        plugins: ["external-helpers"]
      }),
      cleanup({
        comments: "none",
        maxEmptyLines: 1
      })
    ],
    file: `${JS_DIST}/utils-lite.js`,
    name: "utils-lite"
  });
});

gulp.task("jquery-concat-js-admin", THEME_JS_TASKS.concat([
  "jquery-concat-js-vendors",
  "jquery-extract-js-utils",
  "jquery-extract-js-utils-lite"]), () => {
  return gulp
    .src(["vendors", "utils", "utils-lite"].map(name => `${JS_DIST}/${name}.js`).concat(`${JS_DIST}/themes/v1/main.js`))
    .pipe(concat("admin.js"))
    .pipe(gulp.dest(JS_DIST));
});

gulp.task("jquery-compile-js", [/*"convert-components", */"jquery-concat-js-admin"], () => {
  return gulp
    .src(`${JS_DIST}/**/*.js`)
    .pipe(resolveBanner())
    .pipe(gulp.dest(JS_DIST));
});

gulp.task("jquery-compile", ["jquery-compile-css", "jquery-compile-js"], () => {
  return gulp
    .src(`${JS_DIST}/**/*.js`, {base: JS_DIST})
    .pipe(sourcemaps.init({largeFile: true, loadMaps: true}))
    .pipe(uglify())
    .pipe(rename({suffix: ".min"}))
    .pipe(resolveBanner())
    .pipe(sourcemaps.write("../maps"))
    .pipe(gulp.dest(JS_DIST));
});

module.exports = {
  JQUERY_TASKS: [
    "jquery-compile"
  ]
};
