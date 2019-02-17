/*
 * @Author: ZXY 
 * @Date: 2019-02-17 19:33:07 
 * @Last Modified by: ZXY
 * @Last Modified time: 2019-02-17 19:58:55
 */

var gulp = require('gulp'),
    scss = require('gulp-sass'),
    minCss = require('gulp-clean-css'),
    minJs = require('gulp-uglify'),
    server = require('gulp-webserver');

var url = require('url'),
    path = require('path'),
    fs = require('fs');

var listdata = require('./mock/mock.json');
//5.使用gulp实现css压缩和js压缩；
gulp.task('devScss', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(scss())
        .pipe(minCss())
        .pipe(gulp.dest('./src/css'))
});
gulp.task('devJs', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(minJs())
        .pipe(gulp.dest('./src/js'))
});
// 3. 基于gulp搭建项目开发脚手架， 配置server， 并实现watch自动刷新；
gulp.task('watch', function() {
    return gulp.watch('./src/scss/**/**.scss', gulp.series('devScss'))
});

// 4.使用gulp进行接口的开发，并实现模拟数据；
gulp.task('devServer', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8080,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname == '/favicon.ico') {
                    res.end('');
                    return;
                }
                if (pathname == '/api/list') {
                    res.end(JSON.stringify({ code: 1, data: listdata }))
                } else {
                    pathname = pathname == '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
});



gulp.task('default', gulp.series('devScss', 'devJs', 'devServer', 'watch'));