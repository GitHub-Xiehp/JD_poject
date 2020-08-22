const gulp = require('gulp');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

// ? html文件
gulp.task('html', done => {
    gulp.src('src/html/*html')
        .pipe(gulp.dest('dist/html'))
        .pipe(connect.reload());
    done();
})

// ? sass
gulp.task('sass', done => {
    gulp.src('src/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compact' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
    done();
})

// ? img图片
gulp.task('imgs', done => {
    gulp.src('src/img/**')
        .pipe(gulp.dest('dist/img'));
    done();
})

// ? font
gulp.task('font', done => {
    gulp.src('src/font/**')
        .pipe(gulp.dest('dist/font'));
    done();
})

// ? es6转es5
gulp.task('babel', done => {
    gulp.src('src/js/*.js')
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
    done();
})

// ? 实时刷新
gulp.task('server', done => {
    connect.server({
        root: 'dist',
        livereload: true
    })
    done();
})

// 监听
gulp.task('watch', done => {
    gulp.watch(['src/html/**', 'src/sass/**', 'src/js/**', 'src/img/**', 'src/font/**'],
        gulp.series('html', 'sass', 'imgs', 'font', 'babel')
    )
    done();
})

gulp.task('default', gulp.parallel('server', 'watch'));