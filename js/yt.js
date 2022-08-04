function fullScroll() {
  	var ymax = window.scrollMaxY;
    window.scrollTo( 0, ymax );
  	var loop = setInterval(
    		function () {
          	if ( ymax != window.scrollMaxY ) {
        				ymax = window.scrollMaxY;
              	window.scrollTo(0, ymax);
            } else {
            		clearInterval( loop );
            };
    }, 1e3 );
};
function getVideosById () {
    var data = {};
    var links = Object.values(
        document.querySelectorAll( 'a[id="video-title"]' )
    );
    for ( link of links ) {
        var videoId = link.href.split( "&" )[0].split( "/watch?v=" )[1];
        data[videoId] = {
            url: link.href, title: link.title
        };
    };
    return data;
};


