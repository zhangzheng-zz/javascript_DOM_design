## javascript DOM 编程艺术第五版学习笔记 

### 04 javascript 图片库
#### childNodes: 获取某个元素的所有子节点数组
#### nodeType: 标识节点类型的数字
#### nodeValue: 节点的值
#### 节点类型：元素节点（nodeType为1），属性节点（nodeType为2），文本节点（nodeType为3）
#### firstChild/lastChild: 第一/最后一个子节点

### 06 不使用 onkeypress 事件处理函数
#### 大部分浏览器会在 onclick 事件处理时候自动处理 onkeypress

### 07 DOM 方法
#### 7.1 嵌入HTML：document.write('str') 和 innerHtml()
#### document.write('str') : 会导致页面被重写。
#### 推荐使用 innerHtml :DOM页面元素的一个属性，代表该元素的html内容,精确控制：document.documentElement.innerElement。

#### 7.2 动态创建DOM：createElement创建元素节点 createTextNode创建文本节点 （setAttribute创建属性节点）
#### 7.3 添加DOM方法：
#### parentElement.appendChild 在元素最后面添加子节点 
#### parentElement.insertBefore(newElement,targetElement)在元素前添加兄弟节点

#### 7.3 封装 insertAfter
function insertAfter(newElement,targetElement){
  var parent = targetElement.parentNode
  if(parent.lastChild === targetElement){
    parent.appendChild(newElement)
  }else{
    parent.insinsertBefore(newElement,targetElement.nextSibling)
  }
}

### 09 CSS-DOM
#### 通过style访问属性 : 最大的限制是不支持获取外部CSS设置的样式
#### 推荐更新 className 改变样式
#### 1、根据元素在节点树的位置改变样式
function styleHeaderSibings() {
      if (!document.getElementsByTagName) return false
      var headers = document.getElementsByTagName('h1')
      var elem
      for (var i = 0; i < headers.length; i++) {
        elem = getNextElement(headers[i].nextSibling)
        addClass(elem, 'intro')
      }
    }
#### 2、遍历一个节点集合设置有关样式
function striptTables() {
      if (!document.getElementsByTagName) return false
      var tables = document.getElementsByTagName('table')
      var odd, rows
      for (var i = 0; i < tables.length; i++) {
        odd = false
        rows = tables[i].getElementsByTagName('tr')
        for (var j = 0; j < rows.length; j++) {
          if (odd === true) {
            // rows[j].style.backgroundColor = '#ffc'
            addClass(rows[j], 'odd')
            odd = false
          } else {
            odd = true
          }
        }
      }
    }
#### 3、事件发生时设置有关样式
 function highlightRows() {
      if (!document.getElementsByTagName) return false
      var rows = document.getElementsByTagName('tr')
      for (var i = 0; i < rows.length; i++) {

        rows[i].onmouseover = function () {
          this.style.fontWeight = 'bold'

        }
        rows[i].onmouseout = function () {
          this.style.fontWeight = 'normal'
        }
      }
    }


### 10 js动画
#### 根据当前位置 变动 到传入位置的动画
#### 注意使用定时器时候，容易受到全局变量的影响，动画应该设置在某一个具体元素上
#### elem.movement 并在每次动画开始之前要清除之前的动画
    function moveElement(elementId, final_x, final_y, interval) {
      if (!document.getElementById) return false
      if (!document.getElementById(elementId)) return false
      var elem = document.getElementById(elementId)
      // 如果上一个动画还存在那么直接清除掉
      if (elem.movement) {
        clearTimeout(elem.movement)
      }
      if (!elem.style.left) {
        elem.style.left = '0px'
      }
      if (!elem.style.top) {
        elem.style.top = '0px'
      }
      var xpos = parseInt(elem.style.left)
      var ypos = parseInt(elem.style.top)
      if (xpos === 200 && ypos === 100) {
        return true
      }

      // 步进 1px 均速
      // (xpos < final_x) && xpos++
      // (xpos > final_x) && xpos--
      // (ypos < final_y) && ypos++
      // (ypos > final_y) && ypos--

      // 改进 步进为距离的十分之一最小为1
      var dist = 0
      if (xpos < final_x) {
        dist = Math.ceil((final_x - xpos) / 10)
        xpos = xpos + dist
      }
      if (xpos > final_x) {
        dist = Math.ceil((xpos - final_x) / 10)
        xpos = xpos - dist
      }
      if (ypos < final_y) {
        dist = Math.ceil((final_y - ypos) / 10)
        ypos = ypos + dist
      }
      if (ypos > final_y) {
        dist = Math.ceil((ypos > final_y) / 10)
        ypos = ypos - dist
      }
      elem.style.left = xpos + 'px'
      elem.style.top = ypos + 'px'
      // var repeat = "moveElement('" + elementId + "'," + final_x + "," + final_y + "," + interval + ")"
      var repeat = `moveElement('${elementId}',${final_x},${final_y},${interval})`
      elem.movement = setTimeout(repeat, interval)
    }