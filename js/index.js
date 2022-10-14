let GitHub = {};
GitHub.Url = "https://github.com";

GitHub.getPage = function ( Path ) {
    window.location = [this.Url, Path].join("/");
};

GitHub.createRepo = function ( Name ) {
    if ( document.URL == [this.Url, "new"].join("/") ) {
        createBtn = document.querySelector('button.btn-primary');
        createBtn.disabled = false;
        ["name", "description"].map( e => document.getElementById("repository_" + e).value = Name );
        ["visibility_public", "auto_init"].map( e => document.getElementById("repository_" + e).checked = "checked" );
    } else {
        this.getPage("new");
    };
};

function createSocket ( id ) {
  	var socket = {
      	id: id,
      	connected: true,
      	task: null,
      	connect: function () { this.connected = true },
      	disconnect: function () { this.connected = false }
    };

  	socket.do_task = function () {
        console.log( id );
    };

  	socket.init = function () {
    		socket.task = setInterval( function () {
          if ( socket.connected ) {
            socket.do();
          } else {
            clearInterval( socket.task );
            console.log( "socket " + id + " disconnected" );
          };
    		}, 1e3 );
    };

    return socket;
};


function getRequest ( object, url, datatype ) {
    object.data = {};
    object.get = function () {
        var req = new XMLHttpRequest();
        req.open( "GET", url );
        req.send();
        req.onreadystatechange = function () {
            setTimeout( function () {
                object.data = (
                    datatype == "json"
                ) ? JSON.parse( req.response ) : req.response;
            }, 200 );
        };
    };
};


function HttpRequest ( url ) {
    let Req = {};
    if ( url == undefined ) {
        Req.url = "https://circuitalminds.github.io";
    } else {
        Req.url = url;
    };
    Req.get = function ( path, handler=print ) {
        $.getJSON(
            getUrl( Req.url, path ),
            (data) => setTimeout( () => handler(data), 200 )
        );
    };
    Req.post = function ( path, req, handler=print ) {
        $.post(
            getUrl( Req.url, path ), req,
            (data) => setTimeout( () => handler(data), 200 )
        );
    };
    return Req;
};


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

