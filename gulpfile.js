var gulp         =  require('gulp'),
    sass         =  require('gulp-sass'),
    pug          =  require('gulp-pug'),
    browserSync  =  require('browser-sync'),
    del          =  require('del'),
    cache        =  require('gulp-cache'),
    autoprefixer =  require('gulp-autoprefixer'),
    notify       =  require('gulp-notify'),
    plumber      =  require('gulp-plumber'),
    sourcemaps   =  require('gulp-sourcemaps');


gulp.task('sass', function(){
  return gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(plumber())
    .pipe(autoprefixer(['last 2 versions', '> 1%'], { cascade: true }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({stream: true}))
    .pipe(notify({ message: "SCSS completed", onLast: true }));
});

gulp.task('sass-production', function(){
  return gulp.src('src/scss/**/*.scss')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(plumber())
    .pipe(autoprefixer(['last 2 versions', '> 1%'], { cascade: true }))
    .pipe(gulp.dest('docs/css'))
    .pipe(notify({ message: "SCSS completed", onLast: true }));
});

gulp.task('pug', function buildHTML() {
  return gulp.src(['src/views/**/*.pug', '!src/views/**/_*.pug'])
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(pug({
    basedir: 'src',
    pretty: true
  }))
  .pipe(plumber())
  .pipe(gulp.dest("src"))
  .pipe(browserSync.reload({stream: true}))
  .pipe(notify({ message: "PUG completed", onLast: true }));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'src'
    },
    notify: false
  });
});

gulp.task('watch', ['browser-sync', 'pug', 'sass'], function() {
  gulp.watch('src/views/**/*.pug', ['pug']);
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.js', browserSync.reload);
});


gulp.task('clean', function() {
  return del.sync('app');
});


gulp.task('build', ['clean', 'sass-production'], function() {

  var buildCss = gulp.src([
    'src/css/**/*.css'
  ])
  .pipe(gulp.dest('docs/css'))

  var buildJs = gulp.src('src/js/**/*')
  .pipe(gulp.dest('docs/js'))

  var buildImg = gulp.src('src/images/**/*')
  .pipe(gulp.dest('docs/images'))

  var buildHtml = gulp.src('src/**/*.html')
  .pipe(gulp.dest('docs'));

});

gulp.task('clear', function () {
  return cache.clearAll();
})

gulp.task('default', ['watch']);
