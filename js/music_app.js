var videoMedia;
var videoTitle;
var volumeMinus;
var volumePlus;
var Previous;
var Play;
var Next;

var music_app = {
    video_list: {},
    template: {
        title: 'Music App',
        content: '',
        buttons: [],
        icon: "windows"
    }
};

function getMusicButtons () {
    var settings = {
        "volume-minus": 'setVolume("minus")',
        "volume-plus": 'setVolume("plus")',
        "previous": 'setVideoTo("previous")',
        "play": 'setPlayer(Play.className.replace("mif-", ""))',
        "next": 'setVideoTo("next")'
    };
    var button_ids = Object.keys(settings).reverse();
    for (var i = 0; i < button_ids.length; i++) {
        var button = {};
        button.html = '<span id="' + button_ids[i] + '" class="mif-' + button_ids[i] + '"></span>';
        button.onclick = settings[button_ids[i]];
        music_app.template.buttons.push(button);
    };
};


function getVideos () {
    const containers = 'abcdefghijklmnopqrstuvwxyz'.split('').map((c) => 'music_' +  c);
    for (var i = 0; i < containers.length; i++) {
        git_location = 'https://raw.githubusercontent.com/circuitalmynds/' + containers[i] + '/main/video_list.json';
        var getVideoList = $.get( git_location );
        getVideoList.done( function( data ) {
            var videos = JSON.parse(data).video_list;
            var names = Object.keys(videos);
            for (var j = 0; j < names.length; j++) {
                music_app.video_list[names[j]] = videos[names[j]];
            };
        });
    };
};

function getMusicTemplate () {
    git_location = 'https://raw.githubusercontent.com/CircuitalMinds/templates/main/applications/music_app.html';
    var getTemplate = $.get( git_location );
    getTemplate.done( function( data ) {
        music_app.template.content = data;
    });
    getMusicButtons();
};

function initMusicApp () {
    getVideos();
    getMusicTemplate();
    music_app.open_window = function () {
        openApp(music_app);
        volumeMinus = document.getElementById('volume-minus');
        volumePlus = document.getElementById('volume-plus');
        Previous = document.getElementById('previous');
        Play = document.getElementById('play');
        Next = document.getElementById('next');
        videoTitle = document.getElementById('video-title');
        videoMedia = document.getElementById('video-media');    	
        videos = music_app.video_list;
        title = Object.keys(videos)[0];
        url = videos[title];
    };
};


function setPlayer ( option ) {
    if ( option == 'stop' ) {
        Play.className = "mif-play";
        videoMedia.pause();
    } else if ( option == 'play' ) {
        Play.className = "mif-stop";
        videoMedia.play();
    }
};

function setVolume ( option ) {
    var volume = Math.round(videoMedia.volume * 100);
    var options = {up: function () {volume = volume + 10},
                   down: function () {volume = volume - 10}
                   };
    options[option]();
    volumePlus.disabled = false;
    volumeMinus.disabled = false;
    if ( volume == 100 ) {
        volumePlus.disabled = true;
    } else if ( volume == 0 ) {
        volumeMinus.disabled = true;
    };
    videoMedia.setAttribute('data-volume', volume / 100);
};

function setVideoFromList ( Index ) {
    videos = music_app.video_list;
    title = Object.keys(videos)[Index];
    url = videos[title];
    getVideo(title, url);
    videoTitle.innerHTML = title;
    videoMedia.setAttribute('src', url);
};

function setVideoTo ( option ) {
    video_list = Object.keys(music_app.video_list);
    Index = video_list.indexOf(videoTitle.textContent);
    if ( option == 'next' ) {
        Index = Index + 1;
    } else if ( option == 'previous' ) {
        Index = Index - 1;
    };
    title = video_list[Index];
    url = music_app.video_list[title];    
    videoTitle.innerHTML = title;
    videoMedia.setAttribute('src', url);
    setPlayer('play');
};

initMusicApp()
