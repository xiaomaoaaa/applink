const share = getParameter("share");
const setypeId = getParameter("setypeId");
const url = window.location.href;
const ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
const isIos = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
const isAndroid =ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1
const isIosQQ = (isIos && / QQ/i.test(navigator.userAgent));
const isAndroidQQ = (isAndroid && /MQQBrowser/i.test(navigator.userAgent) && /QQ/i.test((navigator.userAgent).split('MQQBrowser')));
function applink(rootpath,appDownload,title,introduction) {
    if (share == 1) {
        // let rootpath = document.getElementById('rootpath').value;
        // let appDownload = document.getElementById('appDownload').value;
        // let title = document.getElementById('title').value;
        // let introduction = document.getElementById('introduction').value;
        if (isIos) {
            let regStr_saf = /os [\d._]*/gi;
            let verinfo = ua.match(regStr_saf);
            var version = (verinfo + "").replace(/[^0-9|_.]/ig, "").replace(/_/ig, ".");
            let version_str = version + "";
            if (version_str != "undefined" && version_str.length > 0) {
                version = version.substring(0, 2);
                if (parseInt(version) >= 9) {
                    let param = {
                        'setitle': title,
                        'setypeId': setypeId,
                        'seturl': url,
                        'introduction': introduction
                    }
                    param = JSON.stringify(param);
                    param = encodeURI(param);
                    window.location.href = `https://ssl2.xt.cn/appcg/downloadlx/download.html?textparam=${param}`;
                    // window.location.href = `https://ssl2.xt.cn/appcg/downloadlx/download.html?setitle=${title}&setypeId=${setypeId}&introduction=${introduction}&seturl=${url}`;
                } else {
                    if (ua.match(/MicroMessenger/i) == "micromessenger" || ua.match(/WeiBo/i) == "weibo" || isIosQQ) {
                        document.write("<img src=" + rootpath + "/resources/gen/image/download_default.png  alt='APP下载' width='100%'/>");
                        return true;
                    } else {
                        let param = {
                            setitle: title,
                            setypeId: setypeId,
                            seturl: url,
                            introduction: introduction
                        }
                        param = JSON.stringify(param);
                        window.location.href = "shinyway://cn.igo.shinyway.shoppingDetail?textparam=" + param
                        var clickedAt = +new Date;
                        setTimeout(function() {
                            !window.document.webkitHidden && setTimeout(function() {
                                if ((+new Date - clickedAt) < 2000) {
                                    window.location.href = "https://itunes.apple.com/cn/app/%E5%87%BA%E5%9B%BD%E7%95%99%E5%AD%A6%E9%80%9A/id1098076579?mt=8";
                                }
                            }, 500);
                        }, 500)
                    }
                }
            }
        } else if (isAndroid) { //安卓
            if(ua.match(/MicroMessenger/i) == "micromessenger" || ua.match(/WeiBo/i) == "weibo") {
                document.write("<img src=" + rootpath + "/resources/gen/image/download_default.png  alt='APP下载' width='100%'/>");
                return true; 
            } else {
                let param = {
                    setitle: title,
                    setypeId: setypeId,
                    seturl: url,
                    introduction: introduction
                }
                param = JSON.stringify(param);
                window.location.href = "shinyway://cn.igo.shinyway.shoppingDetail?textparam=" + param
                var clickedAt = +new Date;
                setTimeout(function() {
                    !window.document.webkitHidden && setTimeout(function() {
                        if ((+new Date - clickedAt) < 2000) {
                            window.location.href = appDownload;
                        }
                    }, 500);

                }, 500)
            }
        }
        return false
    } else {
        return true //原生中打开就传参数给原生app 用jsBbridge.js的transmit 方法
    }

}
//获取URL参数
function getParameter(param) {
    var query = window.location.search;
    var iLen = param.length;
    var iStart = query.indexOf(param);
    if (iStart == -1)
        return "";
    iStart += iLen + 1;
    var iEnd = query.indexOf("&", iStart);
    if (iEnd == -1) {
        return query.substring(iStart);
    }

    return query.substring(iStart, iEnd);
}