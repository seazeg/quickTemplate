const src = 'src';  //开发目录
const dest = 'dist';  //输出目录

module.exports = {
    version: '1.0.0',
    src: src,
    dest: dest,
    js: {
        src: src + "/*.js",
        dest: dest
    },
    html: {
        src: src + "/*.html",
        dest: dest,
        ignore: ["!" + src + "/xxx/*.html"] //排除目录
    },
    img: {
        src: src + '/*.{png,jpg,gif,ico}',
        dest: dest
    },
    less: {
        all: src + "/*.less", // 所有 less
        src: src + "/*.less", // 需要编译的 less
        dest: dest, // 输出目录
        settings: { // 编译 less 过程需要的配置，可以为空
        }
    },
    copy: {
        // src: src + '/static/*',
        src: src + '/**',
        dest: dest
        // dest: dest + "/static"
    },
    rev: {
        revCss: {
            src: dest + "/*.css",
            dest: dest + "/css",
            revDest: dest + "/rev/css"
        },
        revJs: {
            src: dest + "/*.js",
            dest: dest + "/js",
            revDest: dest + "/rev/js"
        }
    }
};