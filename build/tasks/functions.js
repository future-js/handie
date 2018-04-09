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
const strip = require("gulp-strip-comments");
const banner = require("gulp-banner");

const rollup = require("rollup");

const BANNER_TEMPLATE = require("../partials/banner");
const { PACKAGE_INFO, CSS_DIST, JS_DIST } = require("./constants");

function snake2Camel( str ) {
  return str.split("-").map(part => `${part.charAt(0).toUpperCase()}${part.slice(1)}`).join("");
}

function resolveBanner() {
  return banner(BANNER_TEMPLATE, {pkg: PACKAGE_INFO});  
}

function resolveRollupTask( opts ) {
  return rollup
    .rollup({input: opts.input, plugins: opts.plugins})
    .then(bundle => bundle.write({file: opts.file, format: "umd", name: opts.name}));
}

function resolveInitializerTask( isLite ) {
  return () => {
    return gulp
      .src(["layout", "responsive", isLite ? "lite" : "initializer"].map(name => `src/adaptors/admin/${name}.js`))
      .pipe(concat(`${isLite ? "admin-lite" : "admin"}.js`))
      .pipe(babel({presets: ["es2015"]}))
      .pipe(strip())
      .pipe(wrap(`(function() {\n\n<%= contents %>\n\n})();`))
      .pipe(gulp.dest(JS_DIST));
  }
}

function resolveScssTask( src, opts ) {
  return () => {
    const { renameTo } = opts;

    let task = gulp.src(src);
    
    if ( renameTo ) {
      task = task.pipe(rename(renameTo));
    }

    task = task
      .pipe(sass({outputStyle: "expanded", noLineComments: true}).on("error", sass.logError))
      .pipe(stripCssComments({preserve: false}));
    
    if ( opts.minify ) {
      task = task.pipe(cssmin());
    }
    
    if ( opts.hasBanner !== false ) {
      task = task.pipe(resolveBanner());
    }

    return task.pipe(gulp.dest(opts.dest || CSS_DIST));
  }
}

module.exports = {
  snake2Camel,
  resolveBanner,
  resolveRollupTask,
  resolveInitializerTask,
  resolveScssTask
};
