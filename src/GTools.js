"use strict";
var GTools;
(function (GTools) {
    /**
     * @description 校验工具类
     * @class VerifyUtils
     */
    var VerifyUtils = /** @class */ (function () {
        function VerifyUtils() {
        }
        VerifyUtils.init = function () {
            return new this;
        };
        /**
         * @description 校验表单字段公用方法
         * @param {*} str 字符串
         * @param {string} type 字段类型
         * @returns {boolean}
         */
        VerifyUtils.prototype.checkStr = function (str, type) {
            switch (type) {
                case 'num': //数字
                    return /^[0-9]$/.test(str);
                case 'en': //英文
                    return /^[a-zA-Z]+$/.test(str);
                case 'chn': //中文
                    return /^[\u4E00-\u9FA5]+$/.test(str);
                case 'lower': //小写
                    return /^[a-z]+$/.test(str);
                case 'upper': //大写
                    return /^[A-Z]+$/.test(str);
                case 'phone': //手机号码
                    return /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$/.test(str);
                case 'tel': //座机
                    return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
                case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
                    return /^[a-zA-Z]\w{5,17}$/.test(str);
                case 'url': //网址
                    return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str);
                case 'ip': //IP
                    return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
                case 'date': //日期时间
                    return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str);
                case 'html': //是否含有HTML标记
                    return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
                case 'postal': //邮政编码
                    return /[1-9]\d{5}(?!\d)/.test(str);
                case 'email': //邮箱
                    return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
                default:
                    return false;
            }
        };
        /**
         * @description 校验是否为空
         * @param {*} str 字符串
         * @returns {boolean}
         */
        VerifyUtils.prototype.isEmpty = function (str) {
            return str != null && str != "" && str.length > 0 ? true : false;
        };
        /**
         * @description 校验密码强度(通用)
         * @param {*} str 字符串
         * @returns {number}
         */
        VerifyUtils.prototype.checkPwd = function (str) {
            var level = 0;
            if (str.length < 6) {
                return level;
            }
            if (/[0-9]/.test(str)) {
                level++;
            }
            if (/[a-z]/.test(str)) {
                level++;
            }
            if (/[A-Z]/.test(str)) {
                level++;
            }
            if (/[\.|-|_]/.test(str)) {
                level++;
            }
            return level;
        };
        /**
         * @description 校验身份证信息
         * @param {*} cardId
         * @returns {boolean}
         */
        VerifyUtils.prototype.isCardID = function (cardId) {
            var format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
            if (typeof cardId == 'number') {
                cardId = new String(cardId);
            }
            ;
            //初步校验-号码规则校验
            if (!format.test(cardId)) {
                return false;
            }
            //二级校验-区位码校验
            var year = cardId.substr(6, 4), //身份证年
            month = cardId.substr(10, 2), //身份证月
            day = cardId.substr(12, 2), //身份证日
            time = Date.parse(month + '-' + day + '-' + year), //身份证日期时间戳
            nowtime = Date.parse(new Date().toString()), //当前时间戳
            nowday = (new Date(year, month, 0)).getDate(); //身份证当月天数
            if (time > nowtime || day > nowday) {
                return false;
            }
            //三级校验-校验码判断 {https://jingyan.baidu.com/article/7f41ececff944a593d095c8c.html}
            var c = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; //系数
            var b = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']; //校验码对照表
            var idArr = cardId.split("");
            var sum = 0;
            for (var i = 0; i < 17; i++) {
                sum += parseInt(idArr[i]) * c[i];
            }
            if (idArr[17].toUpperCase() != b[sum % 11].toUpperCase()) {
                return false;
            }
            return true;
        };
        return VerifyUtils;
    }());
    GTools.VerifyUtils = VerifyUtils;
    /**
     * @description 字符串处理工具类
     * @class StrUtils
     */
    var StrUtils = /** @class */ (function () {
        function StrUtils() {
        }
        StrUtils.init = function () {
            return new this;
        };
        /**
         * @description 去字符串空格
         * @param {string} str 字符串
         * @param {number} type 1-所有空格  2-前后空格  3-前空格 4-后空格
         * @returns {string}
         */
        StrUtils.prototype.trim = function (str, type) {
            type = type || 1;
            switch (type) {
                case 1:
                    return str.replace(/\s+/g, "");
                case 2:
                    return str.replace(/(^\s*)|(\s*$)/g, "");
                case 3:
                    return str.replace(/(^\s*)/g, "");
                case 4:
                    return str.replace(/(\s*$)/g, "");
                default:
                    return str;
            }
        };
        /**
         * @description 替换字符串中所有指定字符
         * @param {string} str 内容
         * @param {string} beforeStr 需要替换字符
         * @param {string} afterStr 替换成的字符
         * @returns {(string)}
         */
        StrUtils.prototype.replaceAll = function (str, beforeStr, afterStr) {
            return str.replace(new RegExp(beforeStr, 'gm'), afterStr);
        };
        /**
         * @description 替换被截取字符串
         * @param {string} str 内容
         * @param {number} subStart 截取开始位置
         * @param {number} subEnd 截取结束位置
         * @param {string} beforeStr 需要替换字符
         * @param {string} afterStr 替换成的字符
         * @returns {(string)}
         */
        StrUtils.prototype.subStringAndReplace = function (str, subStart, subEnd, beforeStr, afterStr) {
            var temp = str.substring(subStart, subEnd);
            return temp.replace(beforeStr, afterStr);
        };
        /**
         * @description 过滤html操作符
         * @param {string} value
         * @returns {string}
         */
        StrUtils.prototype.filterHtmlCode = function (str) {
            var temp = {
                '<': '&lt;',
                '>': '&gt',
                '&': '&amp;',
                '(': '&#40;',
                ')': '&#41;',
                ' ': '&nbsp;',
                '"': '&quot;',
                '\'': "&#39;"
            };
            return str.replace(/[<>&|() '"]/g, function (chr) {
                return temp[chr];
            });
        };
        /**
         * @description 超出长度范围增加省略
         * @param {*} str 字符串
         * @param {number} maxlen 最大长度
         */
        StrUtils.prototype.overflowPoint = function (str, maxlen) {
            for (var i = 0, l = str.length; i < l; i++) {
                var temp = str[i].innerText.slice(0, maxlen), strLen = str[i].innerText.length;
                if (strLen > maxlen) {
                    str[i].innerHTML = temp + "...";
                }
            }
        };
        return StrUtils;
    }());
    GTools.StrUtils = StrUtils;
    /**
     * @description 数字处理工具类
     * @class NumUtils
     */
    var NumUtils = /** @class */ (function () {
        function NumUtils() {
        }
        NumUtils.init = function () {
            return new this;
        };
        /**
         * @description 生成指定位数的随机数
         * @param {number} placeRange 位数
         * @param {string} returnType
         * @returns {number}
         */
        NumUtils.prototype.getPlaceRandomNum = function (placeRange, returnType) {
            return returnType == "float" ? Math.random() * placeRange : Math.ceil(Math.random() * placeRange);
        };
        /**
         * @description 生成指定范围的随机数
         * @param {number} min 最小值
         * @param {number} max 最大值
         * @returns {number}
         */
        NumUtils.prototype.getRangeRandomNum = function (min, max) {
            return Math.floor(min + Math.random() * ((max + 1) - min));
        };
        /**
         * @description 格式化成货币格式
         * @param {string} value
         * @returns {string}
         */
        NumUtils.prototype.formatCurrency = function (value) {
            return value.split('').reverse().join('').replace(/(\d{3}(?=\d)(?!\d+\.|$))/g, '$1,').split('').reverse().join('');
        };
        /**
         * @description 转换成大写货币格式
         * @param {*} value 货币金额
         * @returns {string}
         */
        NumUtils.prototype.changeToChnCurrency = function (value) {
            if (typeof value == 'number') {
                value = new String(value);
            }
            ;
            //过滤传入值的无用字符
            value = value.replace(/,/g, "").replace(/ /g, "").replace(/￥/g, "");
            //验证输入的字符是否为数字
            if (isNaN(value)) {
                return "";
            }
            ;
            //字符处理完毕后开始转换
            var part = String(value).split(".");
            var newchar = "";
            //小数点前进行转化
            for (var i = part[0].length - 1; i >= 0; i--) {
                if (part[0].length > 10) {
                    return "";
                }
                var tempchar = "";
                var oldchar = part[0].charAt(i);
                switch (oldchar) {
                    case "0":
                        tempchar = "零" + tempchar;
                        break;
                    case "1":
                        tempchar = "壹" + tempchar;
                        break;
                    case "2":
                        tempchar = "贰" + tempchar;
                        break;
                    case "3":
                        tempchar = "叁" + tempchar;
                        break;
                    case "4":
                        tempchar = "肆" + tempchar;
                        break;
                    case "5":
                        tempchar = "伍" + tempchar;
                        break;
                    case "6":
                        tempchar = "陆" + tempchar;
                        break;
                    case "7":
                        tempchar = "柒" + tempchar;
                        break;
                    case "8":
                        tempchar = "捌" + tempchar;
                        break;
                    case "9":
                        tempchar = "玖" + tempchar;
                        break;
                }
                switch (part[0].length - i - 1) {
                    case 0:
                        tempchar = tempchar + "元";
                        break;
                    case 1:
                        if (oldchar != 0)
                            tempchar = tempchar + "拾";
                        break;
                    case 2:
                        if (oldchar != 0)
                            tempchar = tempchar + "佰";
                        break;
                    case 3:
                        if (oldchar != 0)
                            tempchar = tempchar + "仟";
                        break;
                    case 4:
                        tempchar = tempchar + "万";
                        break;
                    case 5:
                        if (oldchar != 0)
                            tempchar = tempchar + "拾";
                        break;
                    case 6:
                        if (oldchar != 0)
                            tempchar = tempchar + "佰";
                        break;
                    case 7:
                        if (oldchar != 0)
                            tempchar = tempchar + "仟";
                        break;
                    case 8:
                        tempchar = tempchar + "亿";
                        break;
                    case 9:
                        tempchar = tempchar + "拾";
                        break;
                }
                newchar = tempchar + newchar;
            }
            //小数点之后进行转化
            if (value.indexOf(".") != -1) {
                if (part[1].length > 2) {
                    //保留两位小数
                    part[1] = part[1].substr(0, 2);
                }
                for (var i = 0; i < part[1].length; i++) {
                    var tempchar = "";
                    var perchar = part[1].charAt(i);
                    switch (perchar) {
                        case "0":
                            tempchar = "零" + tempchar;
                            break;
                        case "1":
                            tempchar = "壹" + tempchar;
                            break;
                        case "2":
                            tempchar = "贰" + tempchar;
                            break;
                        case "3":
                            tempchar = "叁" + tempchar;
                            break;
                        case "4":
                            tempchar = "肆" + tempchar;
                            break;
                        case "5":
                            tempchar = "伍" + tempchar;
                            break;
                        case "6":
                            tempchar = "陆" + tempchar;
                            break;
                        case "7":
                            tempchar = "柒" + tempchar;
                            break;
                        case "8":
                            tempchar = "捌" + tempchar;
                            break;
                        case "9":
                            tempchar = "玖" + tempchar;
                            break;
                    }
                    if (i == 0)
                        tempchar = tempchar + "角";
                    if (i == 1)
                        tempchar = tempchar + "分";
                    newchar = newchar + tempchar;
                }
            }
            //替换所有无用汉字
            while (newchar.search("零零") != -1) {
                newchar = newchar.replace("零零", "零").replace("零亿", "亿").replace("亿万", "亿").replace("零万", "万").replace("零元", "元").replace("零角", "").replace("零分", "");
            }
            if (newchar.charAt(newchar.length - 1) == "元") {
                newchar = newchar + "整";
            }
            return newchar;
        };
        return NumUtils;
    }());
    GTools.NumUtils = NumUtils;
    /**
     * @description 日期处理工具类
     * @class DateUtils
     */
    var DateUtils = /** @class */ (function () {
        function DateUtils() {
        }
        DateUtils.init = function () {
            return new this;
        };
        /**
         * @description 格式化日期
         * @param {any} date 时间戳或日期
         * @param {string} type 默认：yyyy-MM-dd hh:mm:ss
         * @returns {any}
         */
        DateUtils.prototype.formatDate = function (date, type) {
            if (arguments.length === 0)
                return null;
            if ((date + '').length === 10) {
                date = +date * 1000;
            }
            var format = type || 'yyyy-MM-dd hh:mm:ss', tempdate;
            if (typeof date === 'object') {
                tempdate = date;
            }
            else {
                tempdate = new Date(date);
            }
            var formatObj = {
                yyyy: tempdate.getFullYear(),
                MM: tempdate.getMonth() + 1,
                dd: tempdate.getDate(),
                hh: tempdate.getHours(),
                mm: tempdate.getMinutes(),
                ss: tempdate.getSeconds()
            };
            return format.replace(/(yyyy|MM|dd|hh|mm|ss)+/g, function (result, key) {
                var value = formatObj[key];
                if (result.length > 0 && value < 10) {
                    value = '0' + value;
                }
                return value || 0;
            });
        };
        /**
         * @description 格式化时分秒
         * @param {any} date 时间戳
         * @returns {string}
         */
        DateUtils.prototype.formatTime = function (time) {
            var temp = '';
            if (time >= 3600) {
                temp = Math.floor(time / 3600) + '小时' + Math.floor(time % 3600 / 60) + '分' + time % 60 + '秒';
            }
            else if (time >= 60) {
                temp = Math.floor(time / 60) + '分' + time % 60 + '秒';
            }
            else {
                temp = time % 60 + '秒';
            }
            return temp;
        };
        /**
         * @description 判断是否为闰年
         * @param {*} year 年份
         * @returns {boolean}
         */
        DateUtils.prototype.isLeapYear = function (year) {
            return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
        };
        /**
         * @description 获取两个日期间差值
         * @param {*} startDate
         * @param {*} endDate
         * @returns {number}
         */
        DateUtils.prototype.getDayMinus = function (startDate, endDate) {
            return Math.floor((Number(new Date(endDate)) - Number(new Date(startDate))) / (1000 * 60 * 60 * 24));
        };
        /**
         * @description 获取某年有多少天
         * @param {*} year 1999
         * @returns {number}
         */
        DateUtils.prototype.getYearDays = function (year) {
            var days = 365;
            this.getMonthDays(year + '-2') == 29 ? days = 366 : days;
            return days;
        };
        /**
         * @description 获取某年某月有多少天
         * @param {*} date 1999-1
         * @returns {number}
         */
        DateUtils.prototype.getMonthDays = function (date) {
            var temp = new Date(date);
            var year = temp.getFullYear();
            var month = temp.getMonth();
            return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (this.isLeapYear(year) ? 29 : 28);
        };
        /**
         * @description 获取某年某天是第几周
         * @param {*} date 1999-1-1
         * @returns {number}
         */
        DateUtils.prototype.getWhichWeek = function (date) {
            var temp = new Date(date), year = temp.getFullYear(), month = temp.getMonth(), days = temp.getDate();
            var yearFirstDay = new Date(year, 0, 1).getDay() || 7;
            var week = null;
            for (var m = 0; m < month; m++) {
                days += this.getMonthDays(year + '-' + m);
            }
            if (yearFirstDay == 1) {
                week = Math.ceil(days / yearFirstDay);
            }
            else {
                days -= (7 - yearFirstDay + 1);
                week = Math.ceil(days / 7) + 1;
            }
            return week;
        };
        return DateUtils;
    }());
    GTools.DateUtils = DateUtils;
    /**
     * @description 数组与对象处理工具类
     * @class ArrayUtils
     */
    var ArrayUtils = /** @class */ (function () {
        function ArrayUtils() {
        }
        ArrayUtils.init = function () {
            return new this;
        };
        /**
         * @description 数组元素去重
         * @param {Array < any >} arr
         * @returns {Array < any >}
         */
        ArrayUtils.prototype.unique = function (arr) {
            var temp = [];
            for (var i = 0; i < arr.length; i++) {
                if (temp.indexOf(arr[i]) == -1) {
                    temp.push(arr[i]);
                }
            }
            return temp;
        };
        /**
         * @description 数组元素排序
         * @param {*} arr 数组
         * @param {number} type 1-降序  2-升序  3-随机
         * @returns {Array < any >}
         */
        ArrayUtils.prototype.sort = function (arr, type) {
            return arr.sort(function (a, b) {
                switch (type) {
                    case 1:
                        return b - a;
                    case 2:
                        return a - b;
                    case 3:
                        return Math.random() - 0.5;
                    default:
                        return arr;
                }
            });
        };
        /**
         * @description 删除指定的数组元素
         * @param {Array < any >} arr
         * @param {*} ele
         * @returns {Array < any >}
         */
        ArrayUtils.prototype.remove = function (arr, ele) {
            var i = arr.indexOf(ele);
            i > -1 ? arr.splice(i, 1) : null;
            return arr;
        };
        /**
         * @description 获得两个数组的并集
         * @param {Array < any >} a
         * @param {Array < any >} b
         * @returns {Array < any >}
         */
        ArrayUtils.prototype.union = function (a, b) {
            return this.unique(a.concat(b));
        };
        /**
         * @description 获得两个数组的交集
         * @param {Array < any >} a
         * @param {Array < any >} b
         * @returns {Array < any >}
         */
        ArrayUtils.prototype.intersect = function (a, b) {
            return b.filter(function (v) {
                return a.indexOf(v) !== -1;
            });
        };
        /**
         * @description 数组元素最大值（number）
         * @param {Array < number >} arr
         * @returns {number}
         */
        ArrayUtils.prototype.max = function (arr) {
            return Math.max.apply(null, arr);
        };
        /**
         * @description 数组元素最小值（number）
         * @param {Array < number >} arr
         * @returns {number}
         */
        ArrayUtils.prototype.min = function (arr) {
            return Math.min.apply(null, arr);
        };
        /**
         * @description 数组元素求和（number）
         * @param {Array < number >} arr
         * @returns {number}
         */
        ArrayUtils.prototype.sum = function (arr) {
            return arr.reduce(function (pre, cur) {
                return pre + cur;
            });
        };
        /**
         * @description 数组元素平均值（number）
         * @param {Array < number >} arr
         * @returns {number}
         */
        ArrayUtils.prototype.average = function (arr) {
            return this.sum(arr) / arr.length;
        };
        /**
         * @description 合并两个对象
         * @param {*} a 对象
         * @param {*} b 对象
         * @returns {Object}
         */
        ArrayUtils.prototype.mergeJSON = function (a, b) {
            var temp = {};
            if (a && b) {
                for (var i in b) {
                    a[i] = b[i];
                }
                temp = a;
            }
            return temp;
        };
        /**
         * @description 深拷贝数组或对象
         * @param {(object | Array < any >)} o 数组或对象
         * @returns {(object | Array < any >)}
         */
        ArrayUtils.prototype.deepCopy = function (o) {
            return JSON.parse(JSON.stringify(o));
        };
        return ArrayUtils;
    }());
    GTools.ArrayUtils = ArrayUtils;
    /**
     * @description 杂项处理工具类
     * @class OtherUtils
     */
    var OtherUtils = /** @class */ (function () {
        function OtherUtils() {
        }
        OtherUtils.init = function () {
            return new this;
        };
        /**
         * @description html转成字符串
         * @param {*} htmlDOM htmlDOM
         * @returns {string}
         */
        OtherUtils.prototype.htmlToStirng = function (htmlDOM) {
            var div = document.createElement("div");
            div.appendChild(htmlDOM);
            return div.innerHTML;
        };
        /**
         * @description 字符串转html
         * @param {*} htmlString html字符串
         * @returns {*}
         */
        OtherUtils.prototype.stringToHtml = function (htmlString) {
            var div = document.createElement("div");
            div.innerHTML = htmlString;
            return div.children[0];
        };
        /**
         * @description 获取url中指定参数值
         * @param {string} param 参数名称
         * @returns {(string | null)}
         */
        OtherUtils.prototype.getQueryParam = function (param) {
            var r = window.location.search.substr(1).match(new RegExp("(^|&)" + param + "=([^&]*)(&|$)")); //search,查询？后面的参数，并匹配正则
            if (r != null) {
                return decodeURIComponent(r[2]);
            }
            else {
                return null;
            }
        };
        /**
         * @description 随机生成色值
         * @returns {string}
         */
        OtherUtils.prototype.getRandomColor = function () {
            return '#' +
                (function (color) {
                    return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)]) &&
                        (color.length == 6) ? color : arguments.callee(color);
                })('');
        };
        /**
         * @description 获取当前浏览器版本
         * @returns {*}
         */
        OtherUtils.prototype.getBrowserType = function () {
            var userAgent = navigator.userAgent;
            var isOpera = userAgent.indexOf("Opera") > -1;
            var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera;
            var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
            var isEdge = userAgent.indexOf("Edge") > -1 && !isIE;
            var isFF = userAgent.indexOf("Firefox") > -1;
            var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1;
            var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1;
            if (isIE) {
                var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                var fIEVersion = parseFloat(RegExp["$1"]);
                if (fIEVersion == 7)
                    return "IE7";
                else if (fIEVersion == 8)
                    return "IE8";
                else if (fIEVersion == 9)
                    return "IE9";
                else if (fIEVersion == 10)
                    return "IE10";
                else
                    return "IE7以下";
            }
            if (isIE11)
                return 'IE11';
            if (isEdge)
                return "Edge";
            if (isFF)
                return "FF";
            if (isOpera)
                return "Opera";
            if (isSafari)
                return "Safari";
            if (isChrome)
                return "Chrome";
        };
        return OtherUtils;
    }());
    GTools.OtherUtils = OtherUtils;
})(GTools || (GTools = {}));
