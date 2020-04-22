// 随时为 onload 添加事件的辅助函数
function addLoadEvent(func) {
  var oldonload = window.onload
  if (typeof oldonload !== 'function') {
    window.onload = func
  } else {
    window.onload = function () {
      oldonload
      func()
    }
  }
}