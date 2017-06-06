var qcdn = require('@q/qcdn');
var loaderUtils = require("loader-utils");
var mime = require("mime");

var CLC = require('cli-color');
var CLC_NOTICE = CLC.cyanBright;
var CLC_WARN = CLC.yellow;
var CLC_ERROR = CLC.red.bold;

module.exports = function (content) {
    /**************** from https://github.com/webpack-contrib/url-loader ****************/
    this.cacheable && this.cacheable();
    var query = loaderUtils.getOptions(this) || {};
    var limit = this.options && this.options.url && this.options.url.dataUrlLimit || 0;
    if (query.limit) {
        limit = parseInt(query.limit, 10);
    }
    var mimetype = query.mimetype || query.minetype || mime.lookup(this.resourcePath);
    if (limit <= 0 || content.length < limit) {
        return "module.exports = " + JSON.stringify("data:" + (mimetype ? mimetype + ";" : "") + "base64," + content.toString("base64"));
    } else {

        //1）上传的静床
        if (typeof query.qcdnOptions === 'object') {
            var opts = query.qcdnOptions;
            var resourcePath = this.resourcePath;
            var callback = this.async();
            qcdn.upload(resourcePath, opts).then(function (res) {
                var content = "module.exports = " + JSON.stringify(res[resourcePath]) + ";";
                console.log(CLC_NOTICE('\r\n 😎 ============ qcdn 上传' + resourcePath +' 到 ' + content + ' ============ 😎\r\n'));
                callback(null, content);
            }, function (err) {
                console.log(CLC_WARN('\r\n 😎 ============ qcdn 上传失败:' + resourcePath + '\n' + err + ' ============ 😎\r\n'));
                process.exit();
            });
        }

        //2）如果小于limit的，仍然走file-loader, 主要避免cdn上传不成功，web服务器上也保持一份图片，增加健壮性
        var fileLoader = require("file-loader");
        return fileLoader.call(this, content);
    }
}

module.exports.raw = true;
