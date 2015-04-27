# FE-Gulp:Gulp前端项目自动化

> 之前项目开发一直用grunt，最近接触gulp，感觉gulp更好用，于是基于gulp开发了FE-Gulp 一套前端工作流程。也可以是说FF-Gulp采用nodejs+bower+sass+compass+gulp 构建中型(非异步)站点模板！



## 功能模块

> Gulp 插件

### Compass（gulp-compass）
一个Sass 框架，非常好用，谁用谁知道。

### 本地Web 服务器功能（browser-sync）
搭建本地server+自动刷新网页，适合多个浏览器同事刷新，不用每次F5，解放了双手！

### 打开chrome浏览器（opn）

### 文件重命名（gulp-rename）

### JS 文件合并（gulp-concat）

### JS 文件压缩（gulp-uglify）

### 图片无损压缩1（gulp-imagemin + imagemin-pngquant）
略有损失，但基本无碍。


## 项目目录
<pre>
bower_compents: ----------------通过bower下载下来的文件
css---------------------------------css
img--------------------------------img
scss--------------------------------scss
js
  lib  ------------------------------- 库文件 （通过bower安装下来的文件默认在bower_compents下面下）    
  plugin-----------------------------项目中用到的插件
  src---------------------------------未压缩源码
    component----------------------项目中组件
    core.js----------------------------核心主文件
    main.js----------------------------主入口文件
dist-----------------------------------js合并压缩
  app.js
  app.min.js-------------------------src目录下面的压缩合并成一个文件
</pre>


> 注：

> 1.因为CSS 代码主要是通过Compass 框架完成，所以直接交给compass处理就行了）。



## 使用方法
1.  请先确保已经安装ruby 
2.   在安装sass、compass(主体安装方法大家百度下)
3.   安装nodejs
4.  全局安装gulp
    $ npm install --global gulp 
5.  全局安装bower
    $ npm install --global bower 
6.  进到项目目录下面打开bower.json 里面配置你要安装的库文件，后执行bower install即可。
7.  打开package.json 配置你要安装的包文件后，执行npm install 即可。
8.  步骤6、7完成后，cmd 进入到你项目目录下面。执行gulp copyFile，它会自动将bower_componts下面的非压缩版文件复制到js/lib目录下。具体的文件列表，大家配置下即可
9. 然后gulp, 它会自动打开chrome浏览器并监听你的文件改动，并实时刷新网页。
10. 项目开发完毕，上线，执行gulp build, 它会压缩静态资源打包。

>##ps：
    当环境搭建好后，只需以下命令：
    1.  gulp copyFile : 通过bower安装下来的文件默认在bower_compents下面下,当执行gulp后，它会自动将bower_componts下面的非压缩版文件复制到js/lib目录下，具体的文件列表，大家配置下即可。（项目初始化的执行一次即可）
    
    2.  gulp: 开发调试阶段命令主要是解析scss,并实时刷新网页。
    
    3.  gulp build:  项目开发完成上线命令（压缩打包压缩合并静态资源） 
 






