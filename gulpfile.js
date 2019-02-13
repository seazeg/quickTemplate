let gulp = require('gulp'),
    browserSync = require('browser-sync').create(), // 创建Browsersync实例
    watch = require('gulp-watch'),
    concat = require('gulp-concat'), //文件合并
    rename = require("gulp-rename"), //文件重命名
    uglify = require('gulp-uglify'), //js压缩
    cssmin = require('gulp-csso'), //css压缩
    autoprefixer = require('gulp-autoprefixer'), //css前缀自动补全
    less = require('gulp-less'), //less编译
    htmlminify = require('gulp-html-minify'), //html压缩
    htmlreplace = require('gulp-html-replace'), //html块替换
    imagemin = require('gulp-imagemin'), //图片压缩
    pngquant = require('imagemin-pngquant'), //深入压缩
    rev = require('gulp-rev'), //加入文件hash码
    revCollector = require('gulp-rev-collector'),
    plumber = require('gulp-plumber'), //异常抛出，防止任务中断
    notify = require('gulp-notify'), // 当发生异常时提示错误
    fileinclude = require('gulp-file-include'), //include文件
    zip = require('gulp-zip'), //zip文件
    del = require('del'), //文件清理
    runSequence = require('run-sequence').use(gulp), // 同步执行任务
    babel = require('gulp-babel') //es6=>es5

let config = require('./config');

// BrowserSync 监听 dist 目录
gulp.task('watch', function () {
    browserSync.init({
        port: config.serverPort,
        server: {
            port: config.serverPort,
            baseDir: [config.outDir],
            // middleware: SSI({
            //     baseDir: config.outDir,
            //     ext: '.shtml',
            //     version: '2.10.0'
            // })
        }
    });
    // watch -- 将文件编译到 dist 目录下, 触发 BrowserSync
    watch(config.less.all, ['less']);
    watch(config.js.src, ['js']);
    watch(config.html.src, ['html']);
    watch(config.img.src, ['img']);
    watch(config.copy.src, ['copy']);
    // browserSync.reload -- 浏览器重载
    watch(config.html.outDir).on("change", browserSync.reload);
});

// less文件处理
gulp.task('less', function () {
    return gulp.src(config.less.all)
        .pipe(plumber({
            errorHandler: notify.onError('Error:<%=error.message%>')
        }))
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 50 version', '> 0.1%'],
            cascade: true, // 是否美化属性值 默认：true 像这样：
            // -webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
        }))
        .pipe(cssmin())
        // 兼容 IE7 及 以下需设置 compatibility 属性
        // .pipe(cssmin({compatibility: 'ie7'}))
        .pipe(rename({
            prefix: "", // 前缀
            suffix: ".min", // 后缀
            extname: ".css" // 扩展名
        }))
        .pipe(gulp.dest(config.less.outDir))
        .pipe(browserSync.stream());
});

// js文件处理
gulp.task('js', function () {
    return gulp.src(config.js.src)
        .pipe(plumber({
            errorHandler: notify.onError('Error:<%=error.message%>')
        }))
        .pipe(babel({ // 将 let 和 const 转为了 
            presets: ['@babel/env']
        }))
        .pipe(uglify({
            mangle: false
            // mangle: true,// 类型：Boolean 默认：true 是否修改变量名  
            // mangle: {except:['require','exports','module','$']} // 排除混淆关键字
            // compress:true, // 类型：Boolean 默认：true 是否完全压缩  
            // preserveComments:'all' // 保留所有注释  
        })) // 压缩，丑化代码
        .pipe(rename({
            prefix: "", // 前缀
            suffix: ".min", // 后缀
            extname: ".js" // 扩展名
        }))
        .pipe(gulp.dest(config.js.outDir))
        .pipe(browserSync.stream());
});

// html文件处理
gulp.task('html', function () {
    return gulp.src([config.html.src].concat(config.html.ignore))
        .pipe(plumber({
            errorHandler: notify.onError('Error:<%=error.message%>')
        }))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }))
        .pipe(htmlminify())
        .pipe(gulp.dest(config.html.outDir))
        .pipe(browserSync.stream());
});

// 图片文件处理
gulp.task('img', function () {
    return gulp.src(config.img.src)
        .pipe(plumber({
            errorHandler: notify.onError('Error:<%=error.message%>')
        }))
        .pipe(imagemin({
            optimizationLevel: 0,
            progressive: false,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant({
                quality: '100'
            })]
        }))
        .pipe(gulp.dest(config.img.outDir));
});

// 复制静态文件 -- 同时排除配置ignore目录
gulp.task('copy', function () {
    // gulp.src(config.copy.src)
    return gulp.src([config.copy.src].concat(config.copy.ignore))
        .pipe(plumber({
            errorHandler: notify.onError('Error:<%=error.message%>')
        }))
        .pipe(gulp.dest(config.copy.outDir))
});

// CSS生成文件hash编码 并 生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function () {
    return gulp.src(config.rev.revCss.src)
        .pipe(plumber({
            errorHandler: notify.onError('Error:<%=error.message%>')
        }))
        .pipe(rev()) // 设置 hash 值
        .pipe(rev.manifest()) // 生产 hash 值得 json 文件
        .pipe(gulp.dest(config.rev.revCss.revoutDir)); // 保存 hash 值得 json 文件
});

// js生成文件hash编码 并 生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function () {
    return gulp.src(config.rev.revJs.src)
        .pipe(plumber({
            errorHandler: notify.onError('Error:<%=error.message%>')
        }))
        .pipe(rev()) // 设置 hash 值
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.rev.revJs.revoutDir));
});

//Html替换css、js文件版本
gulp.task('revHtml', function () {
    return gulp.src([config.outDir + "/rev/**/*.json", config.outDir + "/*.html"])
        .pipe(plumber({
            errorHandler: notify.onError('Error:<%=error.message%>')
        }))
        .pipe(revCollector({ // Html -- 替换 css、js文件版本
            replaceReved: true
        }))
        .pipe(gulp.dest(config.outDir));
});

// 清空目标文件
gulp.task('clean', function () {
    return del([config.outDir]);
});

// publish -- 打包发布目标文件
gulp.task('publish', function () {
    return gulp.src(config.outDir + '/**/*')
        .pipe(plumber({
            errorHandler: notify.onError('Error:<%=error.message%>')
        }))
        .pipe(zip('push.' + config.version + '.zip'))
        .pipe(gulp.dest('release'))
});

// build 构建
gulp.task('build', function (done) {
    runSequence(
        ['revCss'],
        ['revJs'],
        ['revHtml'],
        ['publish'],
        done);
});

// 开发 dev 构建
gulp.task('dev', function (done) {
    runSequence(
        ['clean'],
        ['copy'],
        ['img', 'html', 'js', 'less'],
        ['watch'],
        done);
});

// 编辑默认任务
gulp.task('default', ['dev']);

// 帮助
gulp.task('help', function () {
    console.log('gulp dev ---本地调试');
    console.log('gulp build ---生产打包构建');
});