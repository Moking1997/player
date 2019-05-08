var a = e('#id-audio-player')
var load = e('progress')
var lyric = {}
var currentID = 0
var control = function(){
    //播放 上一首 下一首
    bindAll('.player-content', 'click', function(event){
        var self = event.target
        log(self)
        log(self.innerHTML)
        if(self.classList.contains('songplay-btn'))
        {
            a.play()
            self.classList.add('playhide')
            e('.songpause-btn').classList.remove('playhide')
        }else if (self.classList.contains('songpause-btn')) {
            a.pause()
            self.classList.add('playhide')
            e('.songplay-btn').classList.remove('playhide')
        }else if (self.classList.contains('songdown-btn')) {
            currentID = currentID + 1
            songUpdate()
        }else if (self.classList.contains('songup-btn')) {
            currentID = currentID - 1
            songUpdate()
        }
    })
    //列表按钮
    bindAll('.footer', 'click', function(event){
        var self = event.target
        if (self.classList.contains('song-list')) {
            //列表显示隐藏
            toggleClass(e('.player-list'), 'playhide')
        }
    })
    //声音按钮
    bindAll('.header', 'click', function(event){
        var self = event.target
        if (self.classList.contains('song-volume')) {
            //列表显示隐藏
            toggleClass(e('.progress'), 'playhide')
        }
    })
    //双击播放音乐
    bindAll('.player-list', 'dblclick', function(event){
        var self = event.target
        if (self.classList.contains('list-cells')) {
            currentID = event.target.dataset.order - 1
            songUpdate()
        }
    })
    //添加歌曲
    bindAll('.player-list', 'click', function(event){
        var self = event.target
        if (self.classList.contains('songadd-btn')) {
            var addid = e('.songadd-content').value
            var order = es('.list-cells').length + 1
            var addname = GetSongName(addid)
            let t = `
            <h3 class="list-cells" data-id = ${addid} data-order = ${order}>${order}、${addname}</h3>
            `
            appendHtml(e('.player-list'), t)
            saveTodos()
        }
    })
    let btnlocation = (document.querySelector('body').offsetWidth -760) / 2 + document.querySelector('.progress').offsetLeft

    //音量调节
    var tag = false
    bindEvent(e('.progress_btn'), 'mousedown', function(event){
        tag = true
        log(tag)
    })
    addEventListener('mouseup', function(){
        tag = false
        log(tag)
    })
    bindEvent(e('.progress'), 'mousemove', function(event){
        var self = event.target
        if (tag) {
            let l = event.pageX - btnlocation
            if(event.pageX < btnlocation)
            {
                l = 0
            }else if(l > 70){
                l = 70
            }
            log('l', l)
            e('.progress_btn').style.left = l.toString() + "px"
            e('.progress_bar').style.width = l.toString()  + "px"
            a.volume = l / 70
            localStorage.volume = l / 70
        }
    })
    bindEvent(e('.progress_bg'), 'click', function(event){
        if (!tag) {
            let l = event.pageX - btnlocation
            if(event.pageX < btnlocation)
            {
                l = 0
            }else if(l > 70){
                l = 70
            }
            log('l', l)
            e('.progress_btn').style.left = l.toString() + "px"
            e('.progress_bar').style.width = l.toString()  + "px"
            a.volume = l / 70
            localStorage.volume = l / 70
        }
    })

    //音乐进度调节
    var songtag = false
    let songlocation = (document.querySelector('body').offsetWidth -760) / 2 + document.querySelector('.songprogress').offsetLeft
    bindEvent(e('.songprogress_btn'), 'mousedown', function(event){
        songtag = true
        log(songtag)
    })
    addEventListener('mouseup', function(){
        songtag = false
        log(songtag)
    })
    bindEvent(e('.songprogress'), 'mousemove', function(event){
        var self = event.target
        if (songtag) {
            let l = event.pageX - songlocation
            if(event.pageX < songlocation)
            {
                l = 0
            }else if(l > 70){
                l = 760
            }
            log('l', l)
            e('.songprogress_btn').style.left = l.toString() + "px"
            e('.songprogress_bar').style.width = l.toString()  + "px"

        }
    })
    bindEvent(e('.songprogress_bg'), 'click', function(event){
        if (!songtag) {
            log('songtag',songtag)
            let l = event.pageX - songlocation
            log('event.pageX',event.pageX)
            if(event.pageX < songlocation)
            {
                l = 0
            }else if(l > 760){
                l = 760
            }
            log('l', l)
            e('.songprogress_btn').style.left = l.toString() + "px"
            e('.songprogress_bar').style.width = l.toString()  + "px"
            a.currentTime = l / 760 * a.duration
        }
    })
}
//歌曲信息更新
var songUpdate = function()
{
    var s = localStorage.lists
    var lists = JSON.parse(s)
    if(currentID > lists.length - 1)
    {
        currentID = 0
    }else if(currentID < 0)
    {
        currentID = lists.length - 1
    }
    let id = lists[currentID].id
    log('currentID',currentID)
    log('id',id)
    a.pause()
    loadMusic(id)
    lyric = Getlyrics(id)
    a.play()

    e('.songplay-btn').classList.add('playhide')
    e('.songpause-btn').classList.remove('playhide')
    document.querySelector('#line-1').innerHTML = lyric[Object.keys(lyric)[0]]
    document.querySelector('#line-2').innerHTML = lyric[Object.keys(lyric)[1]]
    document.querySelector('#line-3').innerHTML = lyric[Object.keys(lyric)[2]]
    localStorage.currentID = currentID
}


//进度条滚动
var timer = setInterval(function(e){
    let time =  a.currentTime
    let maxtime =  a.duration
    var minute = parseInt(time / 60)
    var second = parseInt(time % 60)
    if(second < 10)
    {
        document.querySelector('.song-time').innerText = '0' + minute + ":0" + second
    }else {
        document.querySelector('.song-time').innerText = '0' + minute + ":" + second
    }
    //进度
    document.querySelector('.songprogress_btn').style.left = ( time / maxtime) * 760 + "px"
    document.querySelector('.songprogress_bar').style.width = ( time / maxtime) * 760  + "px"

 },1);

//歌词滚动
var loadMusic = function(id){
    lyric = Getlyrics(id)
    console.log('lyric',lyric)
    //监听ontimeupdate事件
    p  = 1
    a.src = GetSongUrl(id)
    document.querySelector('.song-title').innerHTML = GetSongName(id)
    // document.querySelector('.player-form').appendHtml(music)
    a.ontimeupdate = function(e) {

        //遍历所有歌词，看哪句歌词的时间与当然时间吻合
        let array = Object.keys(lyric)
        let mintime = 100
        let minindex = 0
        for (var i = 0; i < array.length; i++) {
            let t = Math.abs(this.currentTime - array[i])
            if(t < mintime)
            {
                mintime = t
                minindex = i
            }
        }
        //log('minindex', minindex)
        p = minindex
        if (this.currentTime > array[p] && lyric[Object.keys(lyric)[p]] && lyric[Object.keys(lyric)[p-1]] && lyric[Object.keys(lyric)[p+1]]) {
            //显示到页面
            document.querySelector('#line-1').innerHTML = lyric[Object.keys(lyric)[p-1]]
            document.querySelector('#line-2').innerHTML = lyric[Object.keys(lyric)[p]]
            document.querySelector('#line-3').innerHTML = lyric[Object.keys(lyric)[p+1]]
            console.log(lyric[Object.keys(lyric)[p]])
        }
    }
}


//初始化
var initialization = function()
{
    if(localStorage.volume)
    {
        e('.progress_btn').style.left = localStorage.volume * 70 + "px"
        e('.progress_bar').style.width = localStorage.volume * 70  + "px"
        a.volume = localStorage.volume
    }else {
        e('.progress_btn').style.left = 50 + "px"
        e('.progress_bar').style.width = 50  + "px"
        a.volume = 5/7
    }
    if(!localStorage.lists){
        localStorage.lists = JSON.stringify([{"order":"1","id":"34614664","name":"找到你是我最伟大的成功"},{"order":"2","id":"32046764","name":"空っぽの空に潰される"},{"order":"3","id":"167916","name":"梦一场"}])
        localStorage.currentID = 0
    }
    var s = localStorage.lists
    var lists = JSON.parse(s)
    let id = lists[localStorage.currentID].id
    currentID = localStorage.currentID
    songUpdate()
    a.pause()
    e('.songpause-btn').classList.add('playhide')
    e('.songplay-btn').classList.remove('playhide')
}


var main = function()
{
    initialization()
    control()
}


main()
