var browser = {
    versions: function() {
        var u = navigator.userAgent,
                        app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1,
                         /*IE内核*/               
            presto: u.indexOf('Presto') > -1,
                  /*opera内核*/               webKit: u.indexOf('AppleWebKit') > -1,
            /*苹果、谷歌内核*/
             gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
                 /*火狐内核*/                
            mobile: !!u.match(/AppleWebKit.*Mobile.*/),
                 /*是否为移动终端*/                
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            /*ios终端*/
              android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
            /*android终端或者uc浏览器*/
            iPhone: u.indexOf('iPhone') > -1,
                  /*是否为iPhone或者QQHD浏览器*/
            iPad: u.indexOf('iPad') > -1,
                /*是否iPad*/                
            webApp: u.indexOf('Safari') == -1,
                  /*是否web应该程序，没有头部与底部*/                souyue: u.indexOf('souyue') > -1,
                           superapp: u.indexOf('superapp') > -1,
                           weixin: u.toLowerCase().indexOf('micromessenger') > -1,
                           Safari: u.indexOf('Safari') > -1
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()

};
window.jsBbridge = function(callback) {
    if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge);
    } else {
        document.addEventListener(
            'WebViewJavascriptBridgeReady',
            function() {
                callback(WebViewJavascriptBridge)
            },
            false
        );
    }
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() {
        document.documentElement.removeChild(WVJBIframe)
    }, 0);
};
const share = getParameter("share");
const setypeId = getParameter("setypeId");
const url = window.location.href;
const ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
const isIos = browser.versions.ios;
const isAndroid = browser.versions.android;
const isIosQQ = (isIos && / QQ/i.test(navigator.userAgent));
const isAndroidQQ = (isAndroid && /MQQBrowser/i.test(navigator.userAgent) && /QQ/i.test((navigator.userAgent).split('MQQBrowser')));
function autoapplink() {
    if (share == 1) {
        let appDownload = document.getElementById('appDownload').value;
        let title = document.getElementById('title').value;
        let introduction = document.getElementById('introduction').value;
        if (ua.match(/MicroMessenger/i) == "micromessenger" || ua.match(/WeiBo/i) == "weibo" || isIosQQ || isAndroidQQ) {

        } else {
            // if (ua.match(/YESHF/i) == "yeshf") { //判断安卓原生打开，不执行唤醒
            //     return
            // }
            //判断是否传参数跳首页还是跳内页
            let param = {
                setitle: title,
                setypeId: setypeId,
                seturl: url,
                introduction: introduction
            }
            param = JSON.stringify(param);
            window.location.href = "shinyway://cn.igo.shinyway.shoppingDetail?textparam=" + param
            setTimeout(function() {
                !window.document.webkitHidden && setTimeout(function() {
                    //if (+new Date - clickedAt < 2000) {
                    if (isIos) {
                        window.location.href = "https://itunes.apple.com/cn/app/%E5%87%BA%E5%9B%BD%E7%95%99%E5%AD%A6%E9%80%9A/id1098076579?mt=8";
                    } else {
                        window.location.href = appDownload;
                    }

                    // }
                }, 100);
            }, 100)
        }
    }
}
function applink() {
    if (share == 1) {
        let rootpath = document.getElementById('detailUrl').value;
        let appDownload = document.getElementById('appDownload').value;
        let title = document.getElementById('title').value;
        let introduction = document.getElementById('introduction').value;
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
        } else if (isAndroid) {
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
    } else {
        const headPhoneno = document.getElementById('headPhoneno').value;
        const head = document.getElementById('head').value;
        if (isIos) { //ios
            jsBbridge(function(bridge) {
                bridge.callHandler(
                    'onClickSignUp', {
                        head,
                        headPhoneno
                    },
                    //回调函数
                    function(responseData) {

                    }
                )
            })
        } else { //android
            swapp.onClickSignUp(head, headPhoneno);
        }

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