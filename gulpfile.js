const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const rename = require("gulp-rename");
const concat = require('gulp-concat');

const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const csso = require("postcss-csso");
const del = require("del");
const imagemin = require("gulp-imagemin");
const svgsprite = require("gulp-svg-sprite");

//sass to css

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(browserSync.stream());
};

exports.styles = styles;

//Server & watcher

const server = (done) => {
  browserSync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Reload

const reload = done => {
  browserSync.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(stylesMin));
  gulp.watch("source/js/*.js");
  gulp.watch("source/*.html", gulp.series(html, reload));
}


//BUILD

const images = () => {
  return gulp.src("source/img/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
}

exports.images = images;

const sprite = () => {
  return gulp.src("source/img/*.svg")
  .pipe(svgsprite({
    mode: {
      stack: {
        sprite: "../sprite.svg"  //sprite file name
      }
    },
  }))
  .pipe(gulp.dest("build/img"));
}

exports.sprite = sprite;

const copy = (done) => {
  gulp.src([
      "source/fonts/*.{woff2,woff}",
      "source/js/vendor.js",
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;


const concatJs = () => {
  return gulp.src(["source/js/*.js", "!source/js/vendor.js"])
    .pipe(concat("script.js"))
    .pipe(gulp.dest("build/js"));
}

exports.concatJs = concatJs;

const stylesMin = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(browserSync.stream());
}

exports.stylesMin = stylesMin;

const html = () => {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build"));
}


const clean = () => {
  return del("build");
};

const build = gulp.series(
  clean,
  gulp.parallel(
    stylesMin,
    html,
    copy,
    images,
    sprite,
    concatJs,
  ));

exports.build = build;


exports.default = gulp.series(
  clean,
  gulp.parallel(
    stylesMin,
    html,
    copy,
    images,
    sprite,
    concatJs,
  ),
  gulp.series(
    server,
    watcher,
  ));
