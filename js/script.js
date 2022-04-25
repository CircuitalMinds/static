function getType ( y ) {
    var name = typeof( y );
    if ( name == "object" ) {
        if ( y.length != undefined ) {
            return "array";
        } else { return name };
    } else { return name };
};

function Http ( url ) {
    return {
        url: url, getPage: function ( x ) {
            if ( x != undefined ) {
                return [url, ( getType( x ) == "array" ) ? x.join("/") : x].join("/");
            } else {
                return url;
            };
        },
        get: function ( path, handler=console.log ) {
            $.getJSON(
                this.getPage( path ), (data) => setTimeout( () => handler(data), 200 )
            );
        }
    };
};

var site = {
    get: Http("https://circuitalminds.github.io").get,
    dataset: {},
    getStorage: function () {
        this.get( "static/data/storage.json", function ( data ) { Site.dataset["storage"] = data } );
    }
};

getStorage ()




function getForm () {
    var formObject = $( "form.contact" )[0];
    form = {};
    [
        "name", "email", "subject", "message", "send"
    ].map(
        i => form[i] = formObject.querySelector( `input[name=${i}]` )
    );
    return form;
};

let Site = {
    get: HttpRequest().get
};
Site.getStorage = function () {
    this.get( 'static/data/storage.json' );
};
Site.getVideos = function () {
    let x = {videos: {}, metadata: {}};
    var req = HttpRequest();
    req.get(
        "static/data/videos/all.json",
        function ( data ) {
            for ( i of getKeys( data ) ) { x.videos[i] = data[i] }
        }
    );
    req.get(
        "static/data/videos/metadata.json",
        function ( data ) {
            for ( i of getKeys( data ) ) { x.metadata[i] = data[i] }
        }
    );
    function videoUrl ( v, id ) {
        return [
            "https://raw.githubusercontent.com/circuitalmynds",
            "music_" + v.id.replace("-" + id, ""), "main/videos", v.name
        ].join("/");
    };
    function videoId ( v ) {
        return v.id.replace(v.id.split("-")[0] + "-", "");
    };
    x.get = function ( i ) {
        var y = {index: i};
        var video = this.videos[i];
        y.id = videoId( video );
        y.url = videoUrl( video, y.id );
        var meta = this.metadata[y.id];
        for ( key of getKeys(meta) ) {
            y[ Replace(key, ["og:", "twitter:"]) ] = meta[key];
        };
        return y;
    };
    return x;
};
Site.getNbs = function () {
    return
};
$( function () {
    let api = $( "#api-root" )[0];
    api.Site = {url: "https://circuitalminds.github.io"};
    var http = HttpRequest( api.Site.url );
    api.Site.get = http.get
    api.User = {route: "/user"};
    api.User.queryAll = function () {
        return http.get( "user/query_all" );
    };
    api.User.add = function ( user ) {
        return http.get( "user/add", user );
    };
    function App ( name ) {
        this.name = name;
        this.id = "app-" + name;
        var app = document.createElement( "div" );
        app.setAttribute( "id", this.id );
        api.append( app );
        this.data = $( "#" + app.id )[0];
    };
    App.prototype.get = function ( q ) {
        return this.data[q];
    };
    class createApp extends App {
        addContent ( x ) {
            this.data.innerHTML = x;
        }
    };
    api.createApp = function (name) {
        var app = new createApp(name);
        return app;
    };
});
