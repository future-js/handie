const fs = require("fs");
const path = require("path");
const exec = require("child_process").exec;

const gulp = require("gulp");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");
const template = require("gulp-template");
const babel = require("gulp-babel");
const umd = require("gulp-umd");
const wrap = require("gulp-wrap");
const scssimport = require("gulp-shopify-sass");
const stripCssComments = require("gulp-strip-css-comments");
const strip = require("gulp-strip-comments");
const banner = require("gulp-banner");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");

const rollup = require("rollup");
const rollupBabel = require("rollup-plugin-babel");
const rollupNodeResolver = require("rollup-plugin-node-resolve");
const rollupCjsResolver = require("rollup-plugin-commonjs");

const pkg = require("./package.json");
const libName = pkg.name.replace("@mhc/", "");
const bannerTemplate = require("./build/partials/banner");

const cssDistDir = `./dist/${libName}/stylesheets`;
const jsDistDir = `./dist/${libName}/javascripts`;
const tmpDir = `.${libName}-tmp`;
const componentTmpDir = `${tmpDir}/components`;
const COMPONENT_SRC = path.join(__dirname, "src/components");

const compileComponentTasks = [];
const compiledComponentFiles = []

function snake2Camel( str ) {
  return str.split("-").map(part => `${part.charAt(0).toUpperCase()}${part.slice(1)}`).join("");
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
      .pipe(gulp.dest(jsDistDir));
  }
}

fs.readdirSync(COMPONENT_SRC)
  .filter(componentName => fs.statSync(path.join(COMPONENT_SRC, componentName)).isDirectory())
  .forEach(componentName => {
    const taskName = `compile-component-${componentName}`;
    const scssTaskName = `${taskName}-scss`;
    const jsTaskName = `${taskName}-js`;
    const componentDir = path.join(COMPONENT_SRC, componentName);

    compileComponentTasks.push(taskName);
    compiledComponentFiles.push(`${componentName}.html`);

    gulp.task(scssTaskName, () => {
      return gulp.src(`src/components/${componentName}/index.scss`)
        .pipe(sass({outputStyle: "expanded", noLineComments: true}).on("error", sass.logError))
        .pipe(stripCssComments({preserve: false}))
        .pipe(cssmin())
        .pipe(gulp.dest(`${componentTmpDir}/stylesheets/${componentName}`));
      });

    gulp.task(taskName, [scssTaskName], () => {
      const charset = "UTF-8";
      const cssFile = path.resolve(`${componentTmpDir}/stylesheets/${componentName}/index.css`);

      let componentStyle = "";

      if ( fs.statSync(cssFile).isFile() ) {
        componentStyle = fs.readFileSync(cssFile, charset);
      }

      if ( componentName === "common-style" ) {
        return gulp.src("build/templates/polymer-style.html")
          .pipe(template({
            tagName: componentName,
            componentStyle
          }))
          .pipe(rename({basename: componentName}))
          .pipe(gulp.dest(`${componentTmpDir}/templates`));
      }
      else {
        const htmlFile = path.join(componentDir, "index.html");
        const jsFile = path.join(componentDir, "index.js");
        
        let templateHtml = "";
        let classDefinition = "";

        if ( fs.statSync(htmlFile).isFile() ) {
          templateHtml = fs.readFileSync(htmlFile, charset);
        }

        if ( fs.statSync(jsFile).isFile() ) {
          classDefinition = fs.readFileSync(jsFile, charset);
        }

        return gulp.src("build/templates/polymer-component.html")
          .pipe(template({
            tagName: `x-${componentName}`,
            className: `Muu${snake2Camel(componentName)}`,
            templateHtml,
            componentStyle,
            classDefinition
          }))
          .pipe(rename({basename: componentName}))
          .pipe(gulp.dest(`${componentTmpDir}/templates`));
      }
    })
});

gulp.task("compile-components", compileComponentTasks, () => {
  return gulp.src("build/templates/components.html")
    .pipe(template({
      files: compiledComponentFiles.map(componentPath => `<link rel="import" href="${componentPath}">`).join("\n")
    }))
    .pipe(rename({basename: "index"}))
    .pipe(gulp.dest(`${componentTmpDir}/templates`));
});

gulp.task("modulize-components", ["compile-components"], () => {
  return new Promise(( resolve, reject ) => {
    exec("npm run modulize", {
      maxBuffer: 5 * 1024 * 1024
    }, ( err, stdout, stderr ) => {
      if ( err ) {
        console.error(`exec error: ${err}`);
        reject(err);
        return;
      }
  
      if ( stderr ) {
        console.log(`stderr: ${stderr}`);
      }
      
      resolve();
    })
    .stdout.on("data", function( data ) {
      console.log(data.toString());
    });
});
});

gulp.task("convert-components", ["modulize-components"], () => {
  const JS_DIR = `${componentTmpDir}/javascripts`;
  const babelConf = {
    babelrc: false,
    presets: [
      ["env", {"modules": false}]
    ]
  };

  let tasks = fs.readdirSync(JS_DIR)
    .filter(componentName => fs.statSync(path.join(JS_DIR, componentName)).isFile() && /.+\.js$/.test(componentName))
    .map(componentName => resolveRollupTask({
      input: path.join(JS_DIR, componentName),
      plugins: [rollupBabel(Object.assign({}, babelConf, {exclude: "node_modules/**"}))],
      file: `./dist/handie/components/${componentName}`,
      name: componentName
    }));
  
  tasks = tasks.concat([/*"polymer", */"components"].map(filename => resolveRollupTask({
    input: `./build/partials/${filename}.js`,
    plugins: [
      rollupNodeResolver(),
      rollupCjsResolver(),
      rollupBabel(babelConf)
    ],
    file: `./dist/handie/javascripts/${filename}.js`,
    name: filename
  })));

  return Promise.all(tasks);
});

gulp.task("export-scss-helper", function() {
  return gulp.src("./build/partials/export-helper.scss")
    .pipe(scssimport())
    .pipe(rename("_helper.scss"))
    .pipe(gulp.dest(`${cssDistDir}/admin`));
});

gulp.task("export-scss-main", function() {
  return gulp.src("./build/partials/export-main.scss")
    .pipe(scssimport())
    .pipe(rename(`_main.scss`))
    .pipe(gulp.dest(tmpDir));
});

gulp.task("concat-scss-main", ["export-scss-helper", "export-scss-main"], function() {
  return gulp.src([
      "./build/partials/import-helper-main.scss",
      `${tmpDir}/_main.scss`
    ])
    .pipe(concat("_exports.scss"))
    .pipe(gulp.dest(`${cssDistDir}/admin`));
});

gulp.task("compile-css-main", ["concat-scss-main"], function() {
  return gulp.src(`${cssDistDir}/admin/_exports.scss`)
    .pipe(rename("admin.scss"))
    .pipe(sass({outputStyle: "expanded", noLineComments: true}).on("error", sass.logError))
    .pipe(stripCssComments({preserve: false}))
    .pipe(banner(bannerTemplate, {pkg}))
    .pipe(gulp.dest(cssDistDir));
});

gulp.task("compile-css-layout-headerfirst", () => {
  return gulp
    .src("./src/layouts/header-first/index.scss")
    .pipe(rename("layout.header-first.scss"))
    .pipe(sass({outputStyle: "expanded", noLineComments: true}).on("error", sass.logError))
    .pipe(stripCssComments({preserve: false}))
    .pipe(banner(bannerTemplate, {pkg}))
    .pipe(gulp.dest(cssDistDir));
});

gulp.task("compile-css-layout-sidebarfirst", () => {
  return gulp
    .src("./src/layouts/sidebar-first/index.scss")
    .pipe(rename("layout.sidebar-first.scss"))
    .pipe(sass({outputStyle: "expanded", noLineComments: true}).on("error", sass.logError))
    .pipe(stripCssComments({preserve: false}))
    .pipe(banner(bannerTemplate, {pkg}))
    .pipe(gulp.dest(cssDistDir));
});

gulp.task("compile-css", [
    "compile-css-main",
    "compile-css-layout-headerfirst",
    "compile-css-layout-sidebarfirst"
  ], function() {
    return gulp.src(`${cssDistDir}/**/*.css`, {base: cssDistDir})
      .pipe(sourcemaps.init({largeFile: true, loadMaps: true}))
      .pipe(cssmin())
      .pipe(rename({suffix: ".min"}))
      .pipe(sourcemaps.write("../maps"))
      .pipe(gulp.dest(cssDistDir));
});

gulp.task("concat-js-vendors", function() {
  return gulp.src([
    "jquery-1.12.0/dist/jquery",
    "bootstrap-sass-3.3.7/assets/javascripts/bootstrap",
    "bootstrap-table-1.11.1/dist/bootstrap-table",
    "bootstrap-table-1.11.1/dist/locale/bootstrap-table-zh-CN",
    "select2-4.0.3/dist/js/select2.full",
    "select2-4.0.3/dist/js/i18n/zh-CN",
    "h5fx-0.2.3/H5Fx"
  ].map(function( base ) {
    return `bower_components/${base}.js`;
  }))
    .pipe(concat("vendors.js"))
    .pipe(strip())
    .pipe(gulp.dest(jsDistDir));
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
    file: `${jsDistDir}/utils.js`,
    name: "utils"
  });
});

gulp.task("concat-js-admin", resolveInitializerTask());

gulp.task("concat-js-admin-lite", resolveInitializerTask(true));

gulp.task("concat-js-all", [
    "concat-js-vendors",
    "concat-js-utils",
    "concat-js-admin"
  ], function() {
    return gulp.src([
        "vendors",
        "utils",
        "admin"
      ].map(function( name ) {
        return `${jsDistDir}/${name}.js`;
      }))
      .pipe(concat("all.js"))
      .pipe(gulp.dest(jsDistDir));
});

gulp.task("compile-js", [
    // "convert-components",
    "concat-js-all",
    "concat-js-admin-lite"
  ], function() {
    return gulp.src(`${jsDistDir}/*.js`)
      .pipe(banner(bannerTemplate, {pkg}))
      .pipe(gulp.dest(jsDistDir));
});

gulp.task("compile", ["compile-css", "compile-js"], function() {
  return gulp.src(`${jsDistDir}/**/*.js`, {base: jsDistDir})
    .pipe(sourcemaps.init({largeFile: true, loadMaps: true}))
    .pipe(uglify())
    .pipe(rename({suffix: ".min"}))
    .pipe(banner(bannerTemplate, {pkg}))
    .pipe(sourcemaps.write("../maps"))
    .pipe(gulp.dest(jsDistDir));
});

gulp.task("watch", function() {
  gulp.watch("./src/**/*.scss", ["compile-css"]);
  gulp.watch("./src/**/*.js", ["compile-js"]);
});

gulp.task("default", ["compile", "watch"]);
