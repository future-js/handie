const { exec, execSync } = require("child_process");

const gulp = require("gulp");
const scssimport = require("gulp-shopify-sass");
const rename = require("gulp-rename");

const rollupBabel = require("rollup-plugin-babel");
const nodeResolver = require("rollup-plugin-node-resolve");
const cleanup = require("rollup-plugin-cleanup");

const { resolveScssTask, resolveRollupTask } = require("./functions");

const VUE_ROOT = "src/vue";
const VUE_DIST = "dist/vue";

gulp.task("vue-extract-scss", () => {
  return gulp
    .src([`${VUE_ROOT}/**/*.scss`, `!${VUE_ROOT}/node_modules/**/*.scss`])
    .pipe(scssimport())
    .pipe(rename(p => {
      p.basename = p.basename.replace("\.cat\.scss", "");
      p.extname = ".scss";
    }))
    .pipe(gulp.dest(`${VUE_DIST}`));
});

gulp.task("vue-extract-js-utils", () => {
  function resolveDistFile( dn ) {
    return `${VUE_DIST}/utils/${dn}.js`;
  }

  return Promise.all([
    "common/helper",
    "url/helper",
    "url/index"
  ].map(dn => resolveRollupTask({
    input: `${VUE_ROOT}/utils/${dn}.js`,
    plugins: [
      nodeResolver(),
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
    format: "es",
    file: resolveDistFile(dn),
    name: dn
  })));
});

module.exports = {
  VUE_TASKS: [
    "vue-extract-scss"/*,
    "vue-extract-js-utils"*/
  ]
};
