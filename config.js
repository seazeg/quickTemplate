const src = './src'; //开发目录
const dest = './dist'; //输出目录

module.exports = {
    version: '1.0.0',
    serverPort: 8999,
    src: src,
    dest: dest,
    js: {
        src: src + "/assets/js/*.js",
        dest: dest + "/assets/js/"
    },
    html: {
        src: src + "*.{html,shtml}",
        dest: dest,
        ignore: ["!" + src + "/xxx/*.html"] //排除目录
    },
    img: {
        src: src + '/assets/images/*.{png,jpg,jpeg,gif,ico}',
        dest: dest + "/assets/images/"
    },
    less: {
        all: src + "/assets/less/*.less", // 所有 less
        src: src + "/assets/less/*.less", // 需要编译的 less
        dest: dest + "/assets/css/", // 输出目录
        settings: { // 编译 less 过程需要的配置，可以为空
        }
    },
    copy: {
        src: src + '/**',
        dest: dest

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