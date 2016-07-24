var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var gulify = require('gulp-uglify');
var paths = {
  sass: ['./scss/**/*.scss'],
  customsass:['./customsass/**/*.scss'],
  appConfig:['./www/js/']
};
gulp.task('default', ['sass']);
gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});




//编译自定义的样式
gulp.task('barterstyle',function(){
    gulp.src('./customsass/main.scss')
      .pipe(sass())
      .on('error',sass.logError)
      .pipe(gulp.dest('./www/css/'))
      .pipe(minifyCss({
        keepSpecialComments: 0,
        advanced: true,
      }))
      .pipe(rename({ extname: '.min.css' }))
      .pipe(gulp.dest('./www/css/'))
});
gulp.task('buildStyle',function(){
  gulp.watch(paths.customsass, ['barterstyle']);
});


//开发环境合并js  代码
gulp.task('dev_appconfig',function(){
  gulp.src('./www/js/modular/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./www/js'))
});


gulp.task('dev_buildJs',function(){
  gulp.watch('./www/js/modular/**/*.js',['dev_appconfig']);
});



//生产压缩js代码
gulp.task('pdc_appconfig',function(){
  gulp.src('./www/js/modular/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulify())
    .pipe(gulp.dest('./www/js'))
});

gulp.task('pdc_buildJs',function(){
  gulp.watch('./www/js/modular/**/*.js',['pdc_appconfig']);
});






gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});
gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});
gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
