const path = require("path");
const { exec, execSync } = require("child_process");

const gulp = require("gulp");
const scssimport = require("gulp-shopify-sass");
const rename = require("gulp-rename");

const nodeResolver = require("rollup-plugin-node-resolve");
const babel = require("rollup-plugin-babel");
const cleanup = require("rollup-plugin-cleanup");

const { resolveRollupTask } = require("./functions");
const { TMP_DIR } = require("./constants");

const CORE_ROOT = "src/core";
const CORE_DIST = "dist/core";
const CORE_TMP = `${TMP_DIR}/core`;

gulp.task("core-extract-scss", () => {
  return gulp
    .src(`${CORE_ROOT}/stylesheets/**/*.scss`)
    .pipe(scssimport())
    .pipe(rename(p => {
      p.basename = p.basename.replace("\.cat\.scss", "");
      p.extname = ".scss";
    }))
    .pipe(gulp.dest(`${CORE_DIST}/stylesheets`));
});

gulp.task("core-compile-js", () => {
  return new Promise(( resolve, reject ) => {
    exec("npm run babel:core", {
      cwd: path.resolve(__dirname, "../.."),
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

gulp.task("core-extract-js", ["core-compile-js"], () => {
  const vendorRefs = [
      "calc/index",
      "common/helper",
      "is/index",
      "lbs/index",
      "url/helper",
      "url/index",
      "watermark/index"
    ];
  
  function resolveDistFile( dn ) {
    return `${CORE_DIST}/utils/${dn}.js`;
  }

  execSync(`rm -rf ${vendorRefs.map(resolveDistFile).join(" ")}`);

  return Promise.all(vendorRefs.map(dn => resolveRollupTask({
    input: `${CORE_ROOT}/utils/${dn}.js`,
    plugins: [
      nodeResolver(),
      babel({
        babelrc: false,
        presets: [["env", {"modules": false}]],
        plugins: ["external-helpers"]
      }),
      cleanup({
        comments: "none",
        maxEmptyLines: 1
      })
    ],
    format: "es",
    file: resolveDistFile(dn),
    name: dn
  })));
});

module.exports = {
  CORE_TASKS: [
    "core-extract-scss",
    "core-compile-js"
  ]
};
