const gulp = require('gulp');

const { CORE_TASKS } = require('./build/tasks/core');

gulp.task('compile', CORE_TASKS);

gulp.task('watch', () => {});
gulp.task('default', ['compile', 'watch']);
