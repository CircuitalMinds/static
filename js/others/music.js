function youtubeSearch() {
    searchList.innerHTML = '<li><div data-role="progress" data-type="line"></div></li>';
    search = document.getElementById("yt-search").value;
    var searchData = $.get("/search_list_template", {"video_title": search});
    searchData.done( function( data )  {
           searchList.innerHTML = data;
        });
};

function endSong() {
    nameSong = listNames[listNames.indexOf(currentSong.textContent) + 1];
    playMedia.setAttribute("src", playList[nameSong]);
    currentSong.innerHTML = nameSong;
    playMedia.play();
};

function songFromList( song ) {
    playMedia.setAttribute("src", playList[song]);
    currentSong.innerHTML = song;
    playMedia.play();
};

function youtubeDownloader(Id) {
    title = document.getElementById(Id).getElementsByTagName("p")[0].textContent;
    image = document.getElementById(Id).getElementsByTagName("img")[0].src;
    url = document.getElementById(Id).getElementsByTagName("button")[0].value;
    var urlData = $.get("/api/query", {"video_title": title, "video_url": url, "video_image": image, "status": "waiting", "book": "select_songs", "option": "add"});
};

function shareVideo() {
    var el = document.createElement('textarea');
    song = encodeURI(listNames[listNames.indexOf(currentSong.textContent)]);
    shareURL = "/music?play_song=" + song;
    el.value = shareURL;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    alert("Link Copied: " + el.value);
    document.body.removeChild(el);
};
