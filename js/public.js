    var share = getParameter("share");
   
    if (share == 1) {
        $(".top").show();
        $(".applinkbtn").show();
        $(".collection").hide();
        $(".detail_main").css({
            marginTop: 1.2 + "rem",
        });
        var detailsH = $('.details').height();
        if (detailsH <= 800) {
            $(".more").hide();
            $(".details").css({
                "height": "auto"
            })
        } else {
            $(".more").show();
            $(".details").css({
                "height": 800 + "px"
            })
        }
    } else {
    
        $(".top").hide();
        $(".applinkbtn").hide();
        $(".detail_main").css({
            marginTop: '0',
        });
    }
  
    $(".details").on("click", ".more", function() {
        $(this).closest(".details").css({
            "height": "auto"
        })
        $(this).hide();
    })

    // jQuery返回顶部插件 分享出去之后不需要
    $.fn.goToTop = function() {
        if(share!=1){
            return
        }
        // 判断如果窗口滚动距离小于0，隐藏按钮
        if ($(window).scrollTop() < 0) {
            $('#goToTop').hide();
        }
        // 窗口滚动时，判断当前窗口滚动距离
        $(window).scroll(function() {
            if ($(this).scrollTop() > 1) {
                $('#goToTop').show();
            } else {
                $('#goToTop').hide();
            }
        });

        // 给这个按钮绑定一个click事件
        this.bind('click', function() {
            $('html ,body').scrollTop(0)
            return false;
        });
    };
    $('#goToTop').goToTop();
    var setypeId = getParameter("setypeId");
    var url = window.location.href;
    var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
    var isIos = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1
    var isIosQQ = (isIos && / QQ/i.test(navigator.userAgent));
    var isAndroidQQ = (isAndroid && /MQQBrowser/i.test(navigator.userAgent) && /QQ/i.test((navigator.userAgent).split('MQQBrowser')));

    function applink() {
        alert(1111)
        var rootpath =$("#rootpath").val(),
        appDownload =$("#appDownload").val(),
        title =$("#title").val(),
        introduction =$("#introduction").val();
        if (isIos) {
            var regStr_saf = /os [\d._]*/gi;
            var verinfo = ua.match(regStr_saf);
            var version = (verinfo + "").replace(/[^0-9|_.]/ig, "").replace(/_/ig, ".");
            var version_str = version + "";
            if (version_str != "undefined" && version_str.length > 0) {
                version = version.substring(0, 2);
                if (parseInt(version) >= 9) {
                    var param = {
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
                        var param = {
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
            if (ua.match(/MicroMessenger/i) == "micromessenger" || ua.match(/WeiBo/i) == "weibo") {
                document.write("<img src=" + rootpath + "/resources/gen/image/download_default.png  alt='APP下载' width='100%'/>");
                return true;
            } else {
                var param = {
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

    function transmit(name, params) { //String name ,Object params
        alert(name)
        console.log(name, params)
        var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
        var isIos = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1
        if (isIos) { //ios
            jsBbridge(function(bridge) {
                bridge.callHandler(
                    name, params,
                    //回调函数
                    function(responseData) {

                    }
                )
            })
        } else { //android
            swapp.onClickSignUp(name, params);
        }
    }