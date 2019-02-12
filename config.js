const src = './src'; //开发目录
const outDir = './dist'; //输出目录

module.exports = {
    version: '1.0.0',
    serverPort: 8999,
    src: src,
    outDir: outDir,
    js: {
        src: src + "/assets/js/*.js",
        outDir: outDir + "/assets/js/"
    },
    html: {
        src: src + "/*.{html,shtml}",
        outDir: outDir,
        ignore: ["!" + src + "/xxxx/*.html"] //排除目录
    },
    img: {
        src: src + '/assets/images/*.{png,jpg,jpeg,gif,ico}',
        outDir: outDir + "/assets/images/"
    },
    less: {
        all: src + "/assets/less/*.less", // 所有 less
        src: src + "/assets/less/*.less", // 需要编译的 less
        outDir: outDir + "/assets/css/", // 输出目录
        settings: { // 编译 less 过程需要的配置，可以为空
        }
    },
    copy: {
        src: src + '/**',
        outDir: outDir,
        ignore: ["!" + src + "/xxxx/*.html"] //排除目录
    },
    rev: {
        revCss: {
            src: outDir + "/assets/css/*.css",
            outDir: outDir + "/css",
            revoutDir: outDir + "/rev/css"
        },
        revJs: {
            src: outDir + "/assets/js/*.js",
            outDir: outDir + "/js",
            revoutDir: outDir + "/rev/js"
        }
    }
};