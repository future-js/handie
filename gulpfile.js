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
    resolveInitializerTask,
    resolveScssTask
  } = require("./build/tasks/functions");

const TMP_DIR = `.${LIB_NAME}-tmp`;
const COMPONENT_TMP = `${TMP_DIR}/components`;
const COMPONENT_SRC = path.join(__dirname, "src/components");

const compileComponentTasks = [];
const compiledComponentFiles = []

fs.readdirSync(COMPONENT_SRC)
  .filter(componentName => fs.statSync(path.join(COMPONENT_SRC, componentName)).isDirectory())
  .forEach(componentName => {
    const taskName = `compile-component-${componentName}`;
    const scssTaskName = `${taskName}-scss`;
    const jsTaskName = `${taskName}-js`;
    const componentDir = path.join(COMPONENT_SRC, componentName);

    compileComponentTasks.push(taskName);
    compiledComponentFiles.push(`${componentName}.html`);

    gulp.task(scssTaskName, resolveScssTask(`src/components/${componentName}/index.scss`, {
      dest: `${COMPONENT_TMP}/stylesheets/${componentName}`,
      hasBanner: false,
      minify: true
    }));

    gulp.task(taskName, [scssTaskName], () => {
      const charset = "UTF-8";
      const cssFile = path.resolve(`${COMPONENT_TMP}/stylesheets/${componentName}/index.css`);

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
          .pipe(gulp.dest(`${COMPONENT_TMP}/templates`));
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
          .pipe(gulp.dest(`${COMPONENT_TMP}/templates`));
      }
    });
});

gulp.task("compile-components", compileComponentTasks, () => {
  return gulp.src("build/templates/components.html")
    .pipe(template({
      files: compiledComponentFiles.map(componentPath => `<link rel="import" href="${componentPath}">`).join("\n")
    }))
    .pipe(rename({basename: "index"}))
    .pipe(gulp.dest(`${COMPONENT_TMP}/templates`));
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
    .stdout.on("data", data => {
      console.log(data.toString());
    });
});
});

gulp.task("convert-components", ["modulize-components"], () => {
  const JS_DIR = `${COMPONENT_TMP}/javascripts`;
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

gulp.task("concat-js-admin", resolveInitializerTask());

gulp.task("concat-js-all", [
    "concat-js-vendors",
    "concat-js-utils",
    "concat-js-admin"
  ], () => {
    return gulp
      .src(["vendors", "utils", "admin"].map(name => `${JS_DIST}/${name}.js`))
      .pipe(concat("all.js"))
      .pipe(gulp.dest(JS_DIST));
});

gulp.task("compile-js", [
    // "convert-components",
    "concat-js-all"
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
