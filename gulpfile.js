
const { src, dest, task, series, watch, parallel } = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');



task('clean', () => {
  return src('dist/**/*', { read: false })
    .pipe(rm());
});


task('copy:html', () => {
  return src('src/*.html').pipe(dest('dist'))
  .pipe(reload({stream:true}));
});

const styles = [
  'node_modules/normalize.css/normalize.css',
  'src/css/main.scss'
];

task('styles', () => {
  return src([...styles])
  // .pipe(sourcemaps.init())
  .pipe(concat('main.min.scss'))
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  // .pipe(px2rem())
  .pipe(
    autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  })
  )
  .pipe(gcmq())
  .pipe(cleanCSS())
  // .pipe(sourcemaps.write())
  .pipe(dest('dist'))
  .pipe(reload({stream: true}));
});

const libs = [
  'node_modules/jquery/dist/jquery.js',
  'src/scripts/*.js'
]

task('scripts', () => {
  return src([...libs])
  .pipe(sourcemaps.init())
  .pipe(concat('main.min.js', { newLine: ";" }))
  .pipe(
    babel({
      presets: ['@babel/env']
    })
  )
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(dest('dist'))
  .pipe(reload({stream: true}));
});

// task('icons', () => {
//   return src('src/icons/*.svg').pipe(dest('dist/svg'))
// });

const image = [
  'src/img/*.png',
  'src/img/*.jpeg',
  'src/img/*.svg',
  'src/img/*.jpg'

]
task('img', () => {
  return src([...image]).pipe(dest('dist/img'))
});

task('video', () => {
  return src('src/video/*.mp4').pipe(dest('dist/video'))
});

task('server', () => {
 browserSync.init({
     server: {
         baseDir: "./dist"
     },
     open: false
 });
});

watch('./src/css/**/*.scss', series('styles'));
watch('./src/*.html', series('copy:html'));
watch('./src/scripts/.js', series('scripts'));
watch('./src/image', series('img'));
watch('./src/video/*.mp4', series('video'));

task('default',
 series('clean', parallel('copy:html', 'styles', 'scripts', 'img', 'video'),  'server'));

