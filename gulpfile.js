/**
* @descript: gulp (中型非异步站点)配置模板（2个js文件即可）
* @author: wutianzhi@bianfeng.com
* @date: 2015-4-23
**/

var gulp = require('gulp'),
    // gulpLoadPlugins = require('gulp-load-plugins'),
    // plugins = gulpLoadPlugins();

    browserSync = require('browser-sync').create(),
    opn = require('opn'),
    compass        = require('gulp-compass'),
    path = require('path'),
    reload      = browserSync.reload,

    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),//png图片压缩插件

    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename');



// 静态资源路径配置
 var staticConfig = {
      bowerCom: './bower_components/',
      js: './js/',
      css: './css/',
      img: './img/'
}   



// 从最外面的bower_compontents中解析。复制库.min文件到static/js/lib目录下面的.即可
// js(除库文件外，其他的文件合并成一个的总的文件并压缩)
gulp.task('transferMinFile', function () {
    gulp.src([staticConfig['bowerCom'] + 'jquery/jquery.min.js',
                   staticConfig['bowerCom'] + 'underscore/underscore-min.js'
              ])
      .pipe(gulp.dest( staticConfig['js'] + '/lib/' )); 
      gulp.src([staticConfig['bowerCom'] + 'requirejs/require.js',
                   staticConfig['bowerCom'] + 'backbone/backbone.js'
              ])
      .pipe(uglify())
      .pipe(gulp.dest( staticConfig['js'] + '/lib/' )); 
})

//压缩图片
gulp.task('imagemin', function () {
    return gulp.src(staticConfig['img'] + '*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(staticConfig['img']));
});

// 合并js 压缩&
gulp.task('concat', function() {
  return gulp.src([
                      staticConfig['js']+'src/core.js',
                      staticConfig['js']+'src/component/utils.js',
                      staticConfig['js']+'src/component/banner.js',
                      staticConfig['js']+'src/component/form.js',
                      staticConfig['js']+'src/main.js',
                    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(staticConfig['js'] + 'dist'));
});

gulp.task('minify', function () {
   gulp.src(staticConfig['js'] + 'dist/app.js')
      .pipe(uglify())
      .pipe(rename('app.min.js'))
      .pipe(gulp.dest(staticConfig['js'] + 'dist'));
});


// develop compass
gulp.task('compass', function() {
    return gulp.src("./scss/**/*.scss")
        .pipe(compass({
          project: path.join(__dirname, './'),
          style:'nested',
          relative:true,
          css: staticConfig['css'],
          image: staticConfig['img'],
          sass: './scss/',
          javascript: staticConfig['js'],
          comments:true
          // task:'watch'// task 这个选项不能加，加上就代表是compass watch 了。不能自动更新
        }));
});
// dist cssmin
gulp.task('cssmin', function() {
    return gulp.src(staticConfig['css'] + 'style.css')
        .pipe(cssmin())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(staticConfig['css']))
});


//默认任务--开发阶段(编译sass、浏览器自动刷新)
gulp.task('serve', ['compass'], function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch("./scss/**/*.scss", ['compass']);
    gulp.watch(["./*.html","css/*.css","js/**/*.js"]).on('change', reload);
});

//项目完成提交任务（压缩静态资源、删除无用资源）
gulp.task('dist', ['compass'], function() {
      // gulp.run('imagemin');
      gulp.run('cssmin');
      gulp.run('concat');
      gulp.run('minify');
});

// 
// 1 将bower_componentes下面的文件放到js/lib下面。只执行一次就可以了。
// 具体的文件大家可以自己配置下。通过bower下载下来的库文件有的有压缩版本，有的没有压缩版本。
gulp.task('copyFile', ['transferMinFile']);
// 2 开发调试模式
gulp.task('default', ['serve']);
// 上线模式
gulp.task('build', ['dist']);


