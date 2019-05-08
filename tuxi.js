var log = function() {
    console.log.apply(console, arguments)
}
//选择元素
var e = function(selector) {
    return document.querySelector(selector)
}
var es = function(selector) {
    return document.querySelectorAll(selector)
}
//绑定事件
var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}
//有class属性则删除，没有则加上
var toggleClass =function(element, className) {
    if(element.classList.contains(className))
    {
        element.classList.remove(className)
    }else{
        element.classList.add(className)
    }
}
//绑定所有事件
var bindAll = function(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for(var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}
//在标签结束前的地方假如指定元素
var appendHtml = function(element, html) {
	element.insertAdjacentHTML('beforeend', html)
}
// find 函数可以查找 element 的所有子元素
var find = function(element, selector) {
    return element.querySelector(selector)
}
//删除所有元素含有的classname属性
var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}
//获取当前时间
var now = function() {
    var d = new Date()
    var nm = d.getFullYear()
    var yt = d.getMonth() + 1
    var ri = d.getDate()
    var ui = d.getHours()
    var ff = d.getMinutes()
    var mc = d.getSeconds()

    return `${nm}/${yt}/${ri} ${ui}:${ff}:${mc}`
}
