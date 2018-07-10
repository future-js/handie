const fs = require("fs");
const path = require("path");
const exec = require("child_process").exec;

const gulp = require("gulp");
const rename = require("gulp-rename");
const template = require("gulp-template");

const rollup = require("rollup");
const rollupBabel = require("rollup-plugin-babel");
const rollupNodeResolver = require("rollup-plugin-node-resolve");
const rollupCjsResolver = require("rollup-plugin-commonjs");

const tmpDir = `.${LIB_NAME}-tmp`;
const componentTmpDir = `${tmpDir}/components`;
const COMPONENT_SRC = path.join(__dirname, "src/components");
const compileComponentTasks = [];
const compiledComponentFiles = []

fs.readdirSync(COMPONENT_SRC)
  .filter(componentName => {
    return fs.statSync(path.join(COMPONENT_SRC, componentName)).isDirectory();
  })
  .forEach(componentName => {
    const taskName = `compile-component-${componentName}`;
    const scssTaskName = `${taskName}-scss`;
    const jsTaskName = `${taskName}-js`;
    const componentDir = path.join(COMPONENT_SRC, componentName);

    compileComponentTasks.push(taskName);
    compiledComponentFiles.push(`${componentName}.html`);

    gulp.task(scssTaskName, () => {
      return resolveScssTask(`src/components/${componentName}/index.scss`, {
        minify: true,
        hasBanner: false,
        dest: `${componentTmpDir}/stylesheets/${componentName}`
      });
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
            className: `Handie${snake2Camel(componentName)}`,
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
    .filter(componentName => {
      return fs.statSync(path.join(JS_DIR, componentName)).isFile() && /.+\.js$/.test(componentName);
    })
    .map(componentName => {
      return rollup
        .rollup({
          input: path.join(JS_DIR, componentName),
          plugins: [
            rollupBabel(Object.assign({}, babelConf, {exclude: "node_modules/**"}))
          ]
        })
        .then(bundle => {
          return bundle.write({
            file: `./dist/handie/components/${componentName}`,
            format: "umd",
            name: componentName
          });
        });
    });
  
  tasks = tasks.concat([/*"polymer", */"components"].map(filename => {
    return rollup
      .rollup({
        input: `./build/partials/${filename}.js`,
        plugins: [
          rollupNodeResolver(),
          rollupCjsResolver(),
          rollupBabel(babelConf)
        ]
      })
      .then(bundle => {
        return bundle.write({
          file: `./dist/handie/javascripts/${filename}.js`,
          format: "umd",
          name: filename
        });
      });
  }));

  return Promise.all(tasks);
});
