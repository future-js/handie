const gulp = require('gulp');
const scssimport = require('gulp-shopify-sass');
const rename = require('gulp-rename');

gulp.task('core-extract-scss', () => {
  return gulp
    .src('src/stylesheets/**/*.scss')
    .pipe(scssimport())
    .pipe(
      rename((p) => {
        p.basename = p.basename.replace('.cat.scss', '');
        p.extname = '.scss';
      }),
    )
    .pipe(gulp.dest('dist/stylesheets'));
});

module.exports = {
  CORE_TASKS: ['core-extract-scss'],
};
