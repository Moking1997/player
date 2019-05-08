//AJAX
var ajax = function(method, path, headers, data, status, reseponseCallback) {
    var r = new XMLHttpRequest()
    // 设置请求方法和请求地址
    r.open(method, path, status)
    // 设置发送的数据的格式
    console.log(data)
    r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
    // 注册响应函数
    r.onreadystatechange = function() {
        if (r.readyState === 4) {
            reseponseCallback(r)
        }
    }
    r.send(data)
}

//解析歌词
function parseLyric(lrc) {
    var lyrics = lrc.split("\n");
    var lrcObj = {};
    for(var i=0;i<lyrics.length;i++){
        var lyric = decodeURIComponent(lyrics[i]);
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        var timeRegExpArr = lyric.match(timeReg);
        if(!timeRegExpArr)continue;
        var clause = lyric.replace(timeReg,'');
        for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
            var t = timeRegExpArr[k];
            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                sec = Number(String(t.match(/\:\d*/i)).slice(1));
            var time = min * 60 + sec;
            lrcObj[time] = clause;
        }
    }
    // console.log('lrcObj-----', lrcObj)
    for(key in lrcObj){
        //console.log(lrcObj[key])
        if(lrcObj[key] === "")
        {
            delete lrcObj[key]
        }
    }
    return lrcObj;
}



//34614664
//167916
//189435

//获取歌词
var Getlyrics = function(id){
    var url = 'http://45.76.202.5:3000/lyric?id=' + id
    var text = ""
    //Promise用来获取异步函数的值
    ajax('GET', url, null, '', false, function(r){
        var lyricsObj = JSON.parse(r.response)
        text = lyricsObj.lrc.lyric
        // console.log(typeof parseLyric(text))
        window.lyric = parseLyric(text)
    })
    console.log()
    return window.lyric
}

//获取歌的链接
var GetSongUrl = function(id){
    var url = 'https://music.163.com/song/media/outer/url?id=' + id  + '.mp3'
    return url
}
//获取歌名
var GetSongName = function(id){
    var url = 'http://45.76.202.5:3000/song/detail?ids=' + id
    let mark = window.songname
    ajax('GET', url, null, '', false, function(r){
        var songname = JSON.parse(r.response)
        text = songname.songs[0].name
        window.songname = text
    })

    return window.songname
}
