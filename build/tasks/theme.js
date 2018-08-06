const gulp = require("gulp");
const rollupBabel = require("rollup-plugin-babel");

const { CSS_DIST, JS_DIST } = require("./constants");
const { resolveRollupTask, resolveScssTask, resolveJsTask } = require("./functions");

const THEME_SRC = "src/jquery/themes";
const THEME_CSS_TASKS = [];
const THEME_JS_TASKS = [];

function resolveThemeCssTask( fileName, renameTo, version ) {
  const opts = {dest: `${CSS_DIST}/themes/${version}`};

  if ( renameTo ) {
    opts.renameTo = `${renameTo}.scss`;
  }

  return resolveScssTask(`${THEME_SRC}/${version}/${fileName}.scss`, opts);
}

function resolveThemeJsTask( fileName, renameTo, version ) {
  if ( !renameTo ) {
    renameTo = fileName;
  }

  return () => {
    return resolveRollupTask({
      input: `${THEME_SRC}/${version}/${fileName}.js`,
      plugins: [
        rollupBabel({
          babelrc: false,
          presets: [["env", {"modules": false}]],
          plugins: ["external-helpers"]
        })
      ],
      file: `${JS_DIST}/themes/${version}/${renameTo}.js`,
      name: renameTo
    });
  }
}

function resolveThemeTasks( type, version ) {
  const files = version === "v1" ? ["index", "lite"] : ["index"];

  files.forEach(fileName => {
    const taskPrefix = `compile-${type}-theme-${version}`;

    let taskName, renameTo,
        tasks, resolver;

    if ( fileName === "index" ) {
      taskName = taskPrefix;
      renameTo = "main";
    }
    else {
      taskName = `${taskPrefix}-${fileName}`;
    }

    if ( type === "js" ) {
      tasks = THEME_JS_TASKS;
      resolver = resolveThemeJsTask;
    }
    else {
      tasks = THEME_CSS_TASKS;
      resolver = resolveThemeCssTask;
    }

    tasks.push(taskName);

    gulp.task(taskName, resolver(fileName, renameTo, version));
  });
}

["js", "css"].forEach(type => {
  resolveThemeTasks(type, "v1");
  resolveThemeTasks(type, "v2");
});

module.exports = {
  THEME_CSS_TASKS,
  THEME_JS_TASKS
};
