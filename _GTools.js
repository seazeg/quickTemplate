window.GTools = (function () {

    //==========================字符串工具类 =========================//
    var StrUtils = function () {
        /******************************
        *功能：判断对象值是否为空
        *参数值：对象值{String}
        *返回值：bool
        ******************************/
        this.isEmpty = function (v) {
            return v != null && v != "" && v.length > 0 ? false : true
        },
        /******************************
        *功能：判断邮箱的正确性
        *参数值：对象值{String}
        *返回值：bool
        ******************************/
        this.isEmail = function (v) {
            var r = /^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+[_.0-9a-zA-Z-]*[0-9a-zA-Z]+))@([a-zA-Z0-9-]+[.])+(cn|net|NET|com|COM|gov|GOV|mil|MIL|org|ORG|edu|EDU|int|INT)$/;
            return r.test(v) ? true : false;
        },
        /******************************
        *功能：判断是否仅为英文
        *参数值：对象值{String}
        *返回值：bool
        ******************************/
        this.isEn = function (v) {
            var r = /^[A-Za-z]+$/;
            return r.test(v) ? true : false;
        },
        /******************************
        *功能：判断是否仅为中文
        *参数值：对象值{String}
        *返回值：bool
        ******************************/
        this.isChn = function (v) {
            var r = /^([\u4E00-\u9FA5]|[\uFE30-\uFFA0])*$/;
            return r.test(v) ? true : false;
        },
        /******************************
        *功能：判断是否仅为数字
        *参数值：对象值{String}
        *返回值：bool
        ******************************/
        this.isNum = function (v) {
            var r = /^\d*$/;
            return r.test(v) ? true : false;
        },
        /******************************
         *功能：判断格式是否为IP地址
         *参数值：对象值{String}
         *返回值：bool
         ******************************/
        this.isIP = function (v) {
            var r = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
            return r.test(v) ? true : false;
        },
        /******************************
         *功能：生成范围随机整数或小数
         *参数值：范围，生成类型(float/int)
         *返回值：num
         ******************************/
        this.getRandomNum = function (fig, type) {
            return type == "float" ? Math.random() * fig : Math.ceil(Math.random() * fig);
        },
        /******************************
         *功能：替换被截取字符串
         *参数值：起始位置，截止位置，替换前字符串，replace值
         *返回值：替换后的字符串
         ******************************/
        this.subStringAndReplace = function (start, end, s1, s2) {
            var t = s1.substring(start, end);
            return s = s1.replace(t, s2)
        },
        /******************************
         *功能：替换字符串中所有指定字符
         *参数值：被替换字符，替换字符
         *返回值：替换后字符串
         ******************************/
        this.replaceAll = function (str, s1, s2) {
            return str.replace(new RegExp(s1, "gm"), s2);
        },
        /******************************
         *功能：操作符转成html操作符
         *参数值：字符串
         *返回值：转换后字符串
         ******************************/
        this.toHtmlCode = function (v) {
            var arr = { "<": "&lt;", ">": "&gt", "&": "&amp;", "(": "&#40;", ")": "&#41;", " ": "&nbsp;", "|": "&quot;", "'": "&#39;" };
            return v.replace(/[<>&|() '"]/g, function (chr) {
                return arr[chr];
            });
        },
        /******************************
         *功能：将数字格式化成货币格式
         *参数值：num
         *返回值：货币格式num
         ******************************/
        this.numToCurrency = function (v) {
            return v.split('').reverse().join('').replace(/(\d{3}(?=\d)(?!\d+\.|$))/g, '$1,').split('').reverse().join('');
        },
        /******************************
         *功能：密码强度校验
         *参数值：string
         *返回值：level等级 /总3级
         ******************************/
        this.checkPasswordSth = function (v) {
            if (v.length >= 6) {
                if (this.isNum(v) || this.isEn(v)) { return 1; }
                if (/^[0-9a-zA-Z]*$/g.test(v)) { return 2; } else { return 3; }
            } else {
                return 1;
            }
        }

    },
    //==========================数组操作工具类 =====================//
    ArrUtils = function () {
        /******************************
        *功能：判断某个对象是否为数组
        *参数值：对象obj
        *返回值：bool
        ******************************/
        this.isArray = function (o) {
            return Object.prototype.toString.call(o) === "[object Array]";
        },
        /******************************
        *功能：数组元素去重
        *参数值：原数组
        *返回值：去重后数组
        ******************************/
        this.removeRepeatArray = function (arr) {
            var r = [];
            for (var i = 0; i < arr.length; i++) {
                if (r.indexOf(arr[i]) == -1) {
                    r.push(arr[i]);
                }
            }
            return r;
        },
        /******************************
        *功能：数组元素去重(Set)
        *参数值：原数组
        *返回值：去重后数组
        ******************************/
        this.removeRepeatArray = function (arr) {
            return Array.from(new Set(arr));
        }
        ,
        /******************************
         *功能：合并两个JSON对象
         *参数值：JSON对象
         *返回值：合并后JSON对象
         ******************************/
        this.mergeJSON = function (j1, j2) {
            var group = {};
            if (json1 && json2) {
                for (var p in json2) {
                    json1[p] = json2[p];
                }
                group = json1;
            }
            return group;
        },
        /******************************
         *功能：删除某个字段为某值的JSON对象
         *参数值：JSON集合&指定字段&参考值
         *返回值：删除后JSON集合
         ******************************/
        this.removeJsonField = function (obj, key, keyval) {
            for (var i = 0; i < obj.length; i++) {
                var cur = obj[i];
                if (cur[key] == keyval) {
                    obj.splice(i, 1);
                    i--;
                }
            }
            return obj;
        },
        /******************************
         *功能：批量替换某些字段的值
         *参数值：JSON对象&替换前的值&替换后的值
         *返回值：替换后的JSON
         ******************************/
        this.reaplceJsonValue = function (obj, s1, s2) {
            return JSON.parse(this.replaceAll(JSON.stringify(obj), s1, s2));
        }
    },
        //============================时间操作工具类 =====================//
    DateUtils = function () {
        /******************************
        *功能：获取当前时间
        *参数值：日期格式 yyyy/MM/dd 星期w hh:mm:ss 
        *返回值：当前时间
        ******************************/
        this.getNowTime = function (format) {
            var d = new Date(), s = format, W = ['日', '一', '二', '三', '四', '五', '六'];
            return s = s.replace(/yyyy|YYYY/, d.getFullYear()).replace(/yy|YY/, (d.getYear() % 100) > 9 ? (d.getYear() % 100).toString() : '0' + (d.getYear() % 100)).replace(/MM/, d.getMonth() + 1 > 9 ? (d.getMonth() + 1).toString() : '0' + (d.getMonth() + 1)).replace(/M/g, d.getMonth() + 1).replace(/w|W/g, W[d.getDay()]).replace(/dd|DD/, d.getDate() > 9 ? d.getDate().toString() : '0' + d.getDate()).replace(/d|D/g, d.getDate()).replace(/hh|HH/, d.getHours() > 9 ? d.getHours().toString() : '0' + d.getHours()).replace(/h|H/g, d.getHours()).replace(/mm/, d.getMinutes() > 9 ? d.getMinutes().toString() : '0' + d.getMinutes()).replace(/m/g, d.getMinutes()).replace(/ss|SS/, d.getSeconds() > 9 ? d.getSeconds().toString() : '0' + d.getSeconds()).replace(/s|S/g, d.getSeconds());
        },
        /******************************
        *功能：判断是否为为闰年
        *参数值：年份
        *返回值：bool
        ******************************/
        this.isLeapYear = function (v) {
            if (v % 100 == 0) {
                return v % 400 == 0 ? true : null;
            } else {
                return (v % 4) == 0 ? true : null;
            }
            return false;
        },
        /******************************
        *功能：获取两个日期差值
        *参数值：开始日期(startDate)&结束日期(stopDate)
        *返回值：差值string
        ******************************/
        this.getDayMinus = function (startDate, endDate) {
            return Math.floor((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
        }

    },
        //===========================功能工具类 ============================//
    FnUtils = function () {
        /******************************
        *功能：超出长度增加省略
        *参数值：obj对象，v最大长度
        *返回值：/
        ******************************/
        this.overflowPoint = function (obj, v) {
            for (var i = 0, l = obj.length; i < l; i++) {
                var str = obj[i].innerText.slice(0, v),
                    strLen = obj[i].innerText.length;
                if (strLen > v) {
                    obj[i].innerHTML = str + "...";
                }
            }
        },
        /******************************
        *功能：去除重复html标签
        *参数值：jQuery对象(需要去除的标签)
        *返回值：/
        ******************************/
        this.removeRepeatHtml = function (obj) {
            var tmpArr = [], resArr = [], obj = obj.children();
            for (var i = 0, il = obj.length; i < il; i++) {
                tmpArr.push(obj[i].outerHTML);
            }
            for (var j = 0, jl = tmpArr.length; j < jl; j++) {
                if (resArr.indexOf(tmpArr[j]) == -1) {
                    resArr.push(tmpArr[j]);
                }
            }

            var $p = obj.parent();
            $p.html("");
            for (var z = 0, zl = resArr.length; z < zl; z++) {
                $p.append(resArr[z]);
            }
        },
        /******************************
        *功能：获取URL中参数的值
        *参数值：url参数名
        *返回值：url参数值
        ******************************/
        this.getUrlParameterByName = function (v) {
            var m = RegExp('[?&]' + v + '=([^&]*)').exec(window.location.search);
            return m && decodeURIComponent(m[1].replace(/\+/g, ' '));
        },
        /******************************
        *功能：获取跳转前一个页面URL地址
        *参数值：/
        *返回值：前一个页面URL地址
        ******************************/
        this.getBeforePageUrl = function () {
            var s = document.referrer;
            return s;
        },
        /******************************
        *功能：随机色生成
        *参数值：/
        *返回值：/
        ******************************/
        this.getRandomColor = function () {
            return '#' +
                (function (color) {
                    return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
                        && (color.length == 6) ? color : arguments.callee(color);
                })('');
        }
        /******************************
        *功能：判断客户属于什么端
        *参数值：/
        *返回值：bool（true=pc）
        ******************************/
        this.isPcOrPhone = function () {
            var userAgentInfo = navigator.userAgent;
            var arr = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
            var flag = true;
            for (var i = 0, len = arr.length; i < len; i++) {
                if (userAgentInfo.indexOf(arr[i]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        },
        /******************************
       *功能：动态调用Javascript文件
       *参数值：js路径(数组)&回调函数
       *返回值：/
       ******************************/
        this.loadScript = function (pathArr, callback) {
            var fileMap = {};
            for (var i = 0; i < pathArr.length; i++) {
                var path = pathArr[i];

                if (!fileMap[path]) {
                    var head = document.getElementsByTagName('head')[0];
                    var node = document.createElement('script');
                    node.type = 'text/javascript';
                    node.async = 'true';
                    node.src = path + '.js';
                    node.onload = function () {
                        fileMap[path] = true;
                        head.removeChild(node);
                        checkAllFiles();
                    };
                    head.appendChild(node);
                }
            }

            function checkAllFiles() {
                var allLoaded = true;
                for (var i = 0; i < pathArr.length; i++) {
                    if (!fileMap[pathArr[i]]) {
                        allLoaded = false;
                        break;
                    }
                }
                if (allLoaded) {
                    callback();
                }
            }
        },
        /******************************
        *功能：原生ajax方法
        *参数值：options参数对象
        *返回值：/
        ******************************/
         this.ajax = function (options) {
             options = options || {};
             options.type = (options.type || "GET").toUpperCase();
             options.dataType = options.dataType || "json";
             var params, arr = [];
             for (var name in params) {
                 arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(params[name]));
             }
             arr.push(("v=" + Math.random()).replace(".", ""));
             params = arr.join("&");

             if (window.XMLHttpRequest) {
                 var xhr = new XMLHttpRequest();
             } else {
                 var xhr = new ActiveXObject('Microsoft.XMLHTTP');
             }

             xhr.onreadystatechange = function () {
                 if (xhr.readyState == 4) {
                     var status = xhr.status;
                     if (status >= 200 && status < 300) {
                         options.success && options.success(xhr.responseText, xhr.responseXML);
                     } else {
                         options.fail && options.fail(status);
                     }
                 }
             }

             if (options.type == "GET") {
                 xhr.open("GET", options.url + "?" + params, true);
                 xhr.send(null);
             } else if (options.type == "POST") {
                 xhr.open("POST", options.url, true);
                 xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                 xhr.send(params);
             }
         },
        /******************************
        *功能：ajax引用（头尾html引用）
        *参数值：url地址
        *返回值：/
        ******************************/
        this.includeShtml = function (url) {
            this.ajax({
                url: url,
                async: false,
                dataType: "html",
                cache: false,
                error: function (e) {
                    console.log("请求失败！errorInfo:" + e);
                },
                success: function (returnHtml) {
                    document.write(returnHtml);
                }
            });
        }
        /******************************
        *功能：深度拷贝对象，数组
        *参数值：对象，数组
        *返回值：copy后对象
        ******************************/
        this.deepCopy = function (obj) {
            var str, newobj = obj.constructor === Array ? [] : {};
            if (typeof obj !== 'object') {
                return;
            } else if (window.JSON) {
                str = JSON.stringify(obj), //系列化对象
                newobj = JSON.parse(str); //还原
            } else {
                for (var i in obj) {
                    newobj[i] = typeof obj[i] === 'object' ?
                    cloneObj(obj[i]) : obj[i];
                }
            }
            return newobj;
        },
        /******************************
        *功能：对象获得拖动功能
        *参数值：对象obj（是一个dom对象，而不是jQuery对象）
        *例：$(obj)[0] 或 document.getElementById(objId)
        *返回值：/
        ******************************/
        this.moveObj = function (o) {
            o.onmousedown = function (e) {
                var oe = e || window.event;
                var $this = this;
                var startX = oe.clientX - $this.offsetLeft;
                var startY = oe.clientY - $this.offsetTop;
                document.onmousemove = function (e) {
                    var oe = e || window.event;
                    $this.style.left = oe.clientX - startX + "px";
                    $this.style.top = oe.clientY - startY + "px";
                }
                document.onmouseup = function () {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    if ($this.releaseCapture) {
                        $this.releaseCapture();
                    }
                }
                if ($this.setCapture) {
                    $this.setCapture();
                }
                return false;
            }
        },
        /******************************
        *功能：屏蔽js错误
        *参数值:/
        *返回值：/
        ******************************/
        this.shieldJsError = function () {
            window.onerror = function () { return true }
        }

    }

    return {
        init: function (type) {
            var obj = [], extend = function (o, n) {
                if (o == undefined) { o = new Object() }
                for (var p in n) {
                    if (n.hasOwnProperty(p) && (!o.hasOwnProperty(p))) {
                        o[p] = n[p];
                    }
                }
            };
            if (type == undefined) {
                type = ["strUtils", "dateUtils", "ArrUtils","fnUtils"];
            }
            for (var i = 0, len = type.length; i < len; i++) {
                if (type[i] == "strUtils") {
                    obj[i] = new StrUtils();
                    extend(obj[0], obj[i]);
                } else if (type[i] == "dateUtils") {
                    obj[i] = new DateUtils();
                    extend(obj[0], obj[i]);
                } else if (type[i] == "ArrUtils") {
                    obj[i] = new ArrUtils();
                    extend(obj[0], obj[i]);
                } else if (type[i] == "fnUtils") {
                    obj[i] = new FnUtils();
                    extend(obj[0], obj[i]);
                }
            }
            return obj[0];
        }

    }
}());