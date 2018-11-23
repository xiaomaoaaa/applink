  //自适应代码
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {

            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 750) {
                docEl.style.fontSize = '100px';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);

    doc.addEventListener('DOMContentLoaded', recalc, false);
    /*DOMContentLoaded文档加载完成不包含图片资源 onload包含图片资源*/
})(document, window);

  function showtip(str) {
    $(".showClass").show('400').find("p").html(str)
    setTimeout(function() {
      $(".showClass").hide('400')
    }, 2000)
  }

  function showtip2(str) {
    $(".tip").show('400').html(str)
    setTimeout(function() {
      $(".tip").hide('400')
    }, 2000)
  }