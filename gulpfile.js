const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const rename = require("gulp-rename");
const concat = require("gulp-concat");

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
        sprite: "../sprite.svg"
      }
    },
  }))
  .pipe(gulp.dest("build/img"));
}

exports.sprite = sprite;

const copy = (done) => {
  gulp.src([
      "source/fonts/*.{woff2,woff}",
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;


const concatJsript = () => {
  return gulp.src("source/js/modules/*.js")
    .pipe(concat("script.js"))
    .pipe(gulp.dest("build/js"));
}

exports.concatJsript = concatJsript;

const concatJsvendor = () => {
  return gulp.src("source/js/vendor/*.js")
  .pipe(concat("vendor.js"))
  .pipe(gulp.dest("build/js"));
}

exports.concatJsvendor = concatJsvendor;

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

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(stylesMin));
  gulp.watch("source/js/**/*.js", gulp.series(concatJsript, reload));
  gulp.watch("source/*.html", gulp.series(html, reload));
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
    concatJsript,
    concatJsvendor,
  ),
  gulp.series(
    images,
    sprite,
  ));

exports.build = build;


exports.default = gulp.series(
  clean,
  gulp.parallel(
    stylesMin,
    html,
    copy,
    concatJsript,
    concatJsvendor,
  ),
  gulp.series(
    images,
    sprite,
    server,
    watcher,
  ));
