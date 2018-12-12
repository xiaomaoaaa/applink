window.jsBbridge = function (callback) {
    if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge);
    } else {
        document.addEventListener(
            'WebViewJavascriptBridgeReady',
            function () {
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
    setTimeout(function () {
        document.documentElement.removeChild(WVJBIframe)
    }, 0);
};

function transmit(name, params) { //String name ,Object params
    if (isIos) { //ios
        if (params) {
            jsBbridge(function (bridge) {
                bridge.callHandler(
                    name, params,
                    //回调函数
                    function (responseData) {
                    }
                )
            })
        } else {
            jsBbridge(function (bridge) {
                bridge.callHandler(
                    name, {},
                    //回调函数
                    function (responseData) {
                    }
                )
            })
        }
    } else { //android
        let temparams = JSON.stringify(params);
        if (params) {
            swapp[name](temparams);
        } else {
            swapp[name]();
        }
    }
}