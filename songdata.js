var insertTodo = function(order, id, name) {
    // 添加到 container 中
    var t =  `
    <h3 class="list-cells" data-id = ${id} data-order = ${order}>${order}、${name}</h3>
    `
    appendHtml(e('.player-list'), t)
}

// 定义一个函数， 用于把 数组 写入 localStorage
var save = function(array) {
    var s = JSON.stringify(array)
    localStorage.lists = s
}

// 定义一个函数， 读取 localStorage 中的数据并解析返回
var loadlist = function() {
    var s = localStorage.lists
    return JSON.parse(s)
}

// 定义一个函数， 把页面上所有的 todo 用 save 保存
var saveTodos = function() {
    // 1 先选出所有的 content 标签
    // 2 取出 todo
    // 3 添加到一个 数组中
    // 4 保存数组
    log('save lists')
    //保存文本内容
    var contents = document.querySelectorAll('.list-cells')
    var lists = []
    for (var i = 0; i < contents.length; i++) {
        var c = contents[i]
        var id = c.dataset.id
        var order = c.dataset.order
        var name = c.innerHTML.slice(2)
        console.log('name', name);
        var list = {
            order: order,
            id: id,
            name: name,
        }
        log(list)
        // 添加到数组中
        lists.push(list)
    }
    // 保存数组
    save(lists)
}
//读取保存数据并加载在页面上
var loadTodos = function() {
    var lists = loadlist()
    log('load lists', lists)
    // 添加到页面中
    for (var i = 0; i < lists.length; i++) {
        var list = lists[i]
        insertTodo(list.order, list.id,list.name)
    }
}
loadTodos()
