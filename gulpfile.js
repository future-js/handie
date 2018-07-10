const gulp = require('gulp');

const { CORE_TASKS } = require('./build/tasks/core');
const { JQUERY_TASKS } = require('./build/tasks/jquery');
const { VUE_TASKS } = require('./build/tasks/vue');

gulp.task('compile-core', CORE_TASKS);
gulp.task('compile-jquery', JQUERY_TASKS);
gulp.task('compile-vue', VUE_TASKS);

gulp.task('compile', [
  'compile-core',
  'compile-jquery',
  'compile-vue'
]);

gulp.task('watch', () => {});
gulp.task('default', ['compile', 'watch']);
