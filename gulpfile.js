const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

gulp.task('sass', function() {
  return gulp.src("sass/style.scss")
      .pipe(sass())
      .pipe(postcss([
        autoprefixer(),
      ]))
      .pipe(gulp.dest("css"))
      .pipe(browserSync.stream());
});

gulp.task('server', gulp.series('sass', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("sass/*.scss", gulp.series('sass'));
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("js/*.js").on('change', browserSync.reload);
}));



gulp.task('default', gulp.series('server'));
