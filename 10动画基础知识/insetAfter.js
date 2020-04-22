  // insetAfter 在某个元素后面添加一个元素
  function insetAfter(newElement, targetElement) {
    var parent = targetElement.parentNode
    if (targetElement === parent.lastChild) {
      parent.appendChild(targetElement)
    } else {
      parent.insertBefore(newElement, targetElement.nextSibling)
    }
  }