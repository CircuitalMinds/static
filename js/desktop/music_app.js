var videoMedia;
var videoTitle;
var volumeMinus;
var volumePlus;
var Previous;
var Play;
var Next;
var song_list;

function searchList ( word ) {
    const songs = Object.keys(Apps.music_app.song_data);
    const filterItems = query => {
      return songs.filter((el) =>
        el.toLowerCase().indexOf(query.toLowerCase()) > -1
      );
    };
    buildRows(filterItems(word));
};


function buildRows ( data_list ) {
    var Rows = '<ul class="feed-list bg-darkTeal fg-light">LIST</ul>';
    var Row = '<li class="button card-content bg-darkTeal bg-dark-hover fg-light" onclick="SRC" >';
    Row += 'CONTENT</li>';
    var songList = '<li class="title">Video Playlist</li>';
    for ( var s = 0; s < data_list.length; s++ ) {
        Preview = '<img class="avatar" src="">';
        Src = 'setVideoFromList(' + Object.keys(Apps.music_app.song_data).indexOf(data_list[s]).toString() + ')';
        Title = '<span class=label>' + data_list[s] + '</span>';
        Duration = '<span class=second-label>10 min</span>';
        content = Row.replace('CONTENT', Preview + Title + Duration);
        songList += content.replace('SRC', Src);
    };
    song_list = Rows.replace('LIST', songList);
    document.getElementById('song_list').innerHTML = song_list;
}

function openMusicApp () {
    var getApp = $.get( "/music_app" );
    getApp.done( function( data ) {
            Apps.music_app.template = data['template'];
            Apps.music_app.song_data = data['song_data'];

            var w = Desktop.createWindow({
                resizeable: true,
                draggable: true,
                customButtons: Apps.music_app.buttons,
                width: "100%",
                icon: "<span class='mif-" + Apps.music_app.icon + "'></span>",
                title: Apps.music_app.title,
                content: "<div class='p-2'>" + Apps.music_app.template + "</div>",
                clsContent: "bg-dark fg-teal"
            });
            volumeMinus = document.getElementById('volume-minus');
            volumePlus = document.getElementById('volume-plus');
            Previous = document.getElementById('previous');
            Play = document.getElementById('play');
            Next = document.getElementById('next');

            var data_list = Object.keys(Apps.music_app.song_data);

            videoTitle = document.getElementById('video-title');
            videoMedia = document.getElementById('video-media');
            video_title = data_list[0];
            video_url = Apps.music_app.song_data[video_title];
            videoTitle.innerHTML = video_title;
            videoMedia.setAttribute('data-src', video_url);
            buildRows(data_list);
      });
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

function setVideoFromList ( Id ) {
    Apps.music_app.current_song = Id - 1;
    setVideo('next');
};

function setVideo( option ) {
    if ( option == 'back' ) {
        Apps.music_app.current_song -= 1;
    } else if ( option == 'next' ) {
        Apps.music_app.current_song += 1;
    };
    if ( Apps.music_app.current_song < 0 ) {
        Apps.music_app.current_song = 0;
    } else if ( Apps.music_app.current_song > Object.keys(Apps.music_app.song_data).length - 1) {
        Apps.music_app.current_song = Object.keys(Apps.music_app.song_data).length - 1;
    };
    var video_title = Object.keys(Apps.music_app.song_data)[Apps.music_app.current_song];
    var video_url = Apps.music_app.song_data[video_title];
    videoTitle.innerHTML = video_title;
    videoMedia.setAttribute('src', video_url);
    Play.className = "mif-stop";
    videoMedia.play();
};
