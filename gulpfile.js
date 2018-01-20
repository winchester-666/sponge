'use strict';

var gulp = require('gulp'),
watch = require('gulp-watch'),
autoprefixer = require('autoprefixer'),
flexbugs = require('postcss-flexbugs-fixes'),
uglify = require('gulp-uglify'),
sass = require('gulp-sass'),
postcss    = require('gulp-postcss'),
sourcemaps = require('gulp-sourcemaps'),
rigger = require('gulp-rigger'),
cssmin = require('gulp-minify-css'),
imagemin = require('gulp-imagemin'),
rimraf = require('rimraf'),
browserSync = require("browser-sync"),
concat = require('gulp-concat'),
retina = require("gulp-img-retina"),
svgSprite = require('gulp-svg-sprite'),
svgmin = require('gulp-svgmin'),
cheerio = require('gulp-cheerio'),
replace = require('gulp-replace'),
reload = browserSync.reload;



var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        svg: 'build/img/svg/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/main.scss',
        style_path: 'src/style/',
        img: 'src/img/**/*.*',
        svg: 'src/img/**/*.svg',
        svg_path: 'src/img/sprite/',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        svg: 'src/img/**/*.svg',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};
var svgSymbol = {
  mode: {
    view: {
      bust: false
  },
  symbol: true,
  defs: true
}
};
var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(retina())
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
    });


gulp.task('js:build', function () {
    gulp.src(path.src.js) 
    .pipe(rigger()) 
    .pipe(concat('all.js'))
    .pipe(sourcemaps.init()) 
    .pipe(uglify()) 
    .pipe(sourcemaps.write()) 
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
});

var postCssProcessors = [
autoprefixer({
    browsers: ['last 5 versions'],
    remove: true,
}),
flexbugs()
];

gulp.task('style:build', function () {
    gulp.src(path.src.style) 
    .pipe(sourcemaps.init())
    .pipe(sass({
        sourceMap: true,
        errLogToConsole: true
    }))
    .pipe(postcss(postCssProcessors))
    .pipe(cssmin())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) 
    .pipe(imagemin({
        progressive: true,
        interlaced: true
    }))
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}));
});

gulp.task('svgSpriteBuild:build', function () {
  gulp.src(path.src.svg)
  .pipe(svgSprite(svgSymbol))
  .pipe(gulp.dest(path.build.svg))
  .pipe(reload({stream: true}));
});


gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
    .pipe(reload({stream: true}));
});

gulp.task('build', [
    'js:build',
    'style:build',
    'fonts:build',
    'svgSpriteBuild:build',
    'image:build'
    ]);


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('svgSpriteBuild:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});


gulp.task('default', ['build', 'webserver', 'watch']);