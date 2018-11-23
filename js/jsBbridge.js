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
function transmit(name,params) {//String name ,Object params
    console.log(name,params)
    const ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
    const isIos = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    const isAndroid =ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1
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