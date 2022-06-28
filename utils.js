
  function getType ( y ) {
var name = typeof( y );
if ( name == "object" ) {
    if ( y.length != undefined ) {
        return "array";
    } else { return name };
} else { return name };
};

function print ( y ) {
console.log(
    ( getType( y ) == "object" ) ? JSON.stringify( y ) : y
);
};

function Replace ( y, w ) {
if ( getType( w ) == "array" ) {
    w.map( wi => y=y.replaceAll( wi, "" ) );
    return y;
} else {
    return y.replaceAll( w, "" );
};
};

function Abs ( x ) {
return Math.abs( x );
};
function Round ( x ) {
return Math.round( x );
};
function Tf ( name ) {
return Math[ name.toLowerCase() ];
};
function Ct ( name ) {
return Math[ name.toUpperCase() ];
};
function Precision ( x, n ) {
var xn = Tf( "trunc" )( x );
var yn = Tf( "trunc" )( ( xn - n ) * 10 ** n );
return parseFloat( xn + "." + yn );
};
function Prod ( y ) {
return y.reduce( function ( i, j ) { return i * j }, 1.0 );
};
function Sum ( y ) {
return y.reduce( function ( i, j ) { return i + j }, 0.0 );
};
function Fact ( n ) {
return Prod( Range(1, n + 1) );
};
function RandInt ( start, stop ) {
var L = Abs( stop - start );
var Xr = Round( Math.random() * L );
return start + Xr;
};
function getSample ( y, size ) {
if ( size > y.length) {
    size = y.length;
};
var ys = [];
var yi = y[RandInt( 0, y.length - 1)];
ys.push(yi);
while ( ys.length < size ) {
    yi = y[RandInt( 0, y.length - 1)];
    if ( ys.indexOf(yi) == -1 ) {
        ys.push(yi);
    };
};
return ys;
};
function getKeys ( y ) {
return Object.keys( y );
};
function getValues ( y ) {
return Object.values( y );
};
function getItems ( y ) {
return Object.entries( y );
};
function Dict ( y ) {
let dict = {};
dict.isDict = function ( x ) {
    return getType( x ) == "object";
};
dict.data = ( dict.isDict( y ) ) ? y : {};
[
    ["keys", getKeys],
    ["values", getValues],
    ["items", getItems]
].map(
    v => dict[v[0]] = function ( x ) {
        var t = ( x ) ? x : this.data;
        return v[1]( t );
    }
);
dict.get = function ( q ) {
    return this.data[q];
};
dict.set = function ( k, v ) {
    this.data[k] = v;
};
dict.update = function ( x ) {
    if ( this.isDict( x ) ) {
        for ( v of this.items( x ) ) {
            this.set( v[0], v[1] );
        };
    };
};
dict.len = function ( x ) {
    return this.keys( x ).length;
};
dict.pop = function ( key ) {
    delete this.data[key];
};
dict.clear = function () {
    this.data = {};
};
return dict;
};
function List ( y ) {
let list = {};
list.isArray = function ( x ) {
    return getType( x ) == "array";
};
list.data = ( list.isArray( y ) ) ? y : [];
list.len = function ( x ) {
    return ( x ) ? x.length : this.data.length;
};
list.index = function ( x ) {
    return this.data.indexOf( x );
};
list.append = function ( x ) {
    this.data.push(x);
};
list.extend = function ( x ) {
    if ( this.isArray( x ) ) {
        for ( i of x ) {
            this.append( i );
        };
    };
};
list.pop = function ( i ) {
    var z = [];
    for ( n of Range(this.len()) ) {
        if ( n != i ) {
            z.push(this.data[n]);
        };
    };
    this.data = z;
};
list.remove = function ( x ) {
    var i = this.index(x);
    if ( i != -1 ) {
        this.pop( i );
    };
};
list.get = function ( i, j ) {
    if ( i != undefined && j == undefined ) {
        if ( i < 0 ) {
            return this.data.slice(i);
        } else {
            return this.data[i];
        };
    } else if ( i != undefined && j != undefined ) {
        return this.data.slice( i, j );
    };
};
list.clear = function () {
    this.data = [];
};
return list;
};
function Merge ( x, y ) {
if ( isType( x, "object" ) && isType( y, "object" ) ) {
    var xy = { ...x, ...y };
    return xy;
} else if ( isType( x, "array" ) && isType( y, "array" ) ) {
    var xy = [ ...x, ...y ];
    return xy.sort();
};
};
function getUrl ( host, path ) {
return [
    host, ( getType(path) == "array" )
    ? path.join( "/" ) : path
].join( "/" );
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

function bodySize ( scale=1.0 ) {
var y = document.body;
return {
    w: Round( y.clientWidth * scale ) + "px",
    h: Round( y.clientHeight * scale ) + "px"
};
};

let El = {};
El.queryID = function ( Id ) {
var obj = $( "#" + Id )[0];
this.setObject( obj );
return obj;
};
El.queryCls = function ( Cls, all=false ) {
var objs = $( "." + Cls );
for ( var i = 0; i < objs.length; i++ ) {
    var obj = objs[i];
    this.setObject( obj );
    objs[i] = obj;
};
return ( all ) ? objs : objs[0];
};
El.queryTag = function ( Tag, all=false ) {
var objs = $( Tag );
for ( var i = 0; i < objs.length; i++ ) {
    var obj = objs[i];
    this.setObject( obj );
    objs[i] = obj;
};
return ( all ) ? objs : objs[0];
};
El.create = function ( name, content ) {
var el = document.createElement( name );
el.innerHTML = content;
return el;
};
El.setObject = function ( obj ) {
obj.getSize = function () {
    var S = this.getBoundingClientRect();
    return {"w": S.width, "h": S.height, x: S.x, y: S.y};
};
obj.setStyle = function ( key, value ) {
    this.style[key] = value;
};
obj.hide = function () {
    this.setStyle( "display", "none" );
};
obj.show = function () {
    this.setStyle( "display", "block" );
};
obj.copy = function () {
    return this.cloneNode(true);
};
obj.iterNodes = function ( cls, func ) {
    getValues(
        this.querySelector( cls ).childNodes
    ).map( func );
};
obj.iterAll = function ( cls, func ) {
    getValues(
        this.querySelectorAll( cls )
    ).map( func );
};
obj.addClass = function ( cls ) {
    this.addClass( cls );
};
obj.pos = function () {
    var P = this.getBoundingClientRect();
    return {x: [P.left, P.right], y: [P.bottom, P.top], w: P.width, h: P.height};
};
obj.setX = function ( x ) {
    var dx = this.Pos().w;
    this.style.left = x + "px";
    this.style.width = dx + "px";
};
obj.setY = function ( y ) {
    var dy = this.Pos().h;
    this.style.bottom = y + "px";
    this.style.height = dy + "px";
};
obj.setW = function ( w ) {
    this.style.width = w + "px";
};
obj.setH = function ( h ) {
    this.style.height = h + "px";
};
};

getClock = function () {
var clock = El.queryID( "clock-time" );
setInterval( function () {
    var t = new Date();
    clock.innerHTML = t.toLocaleTimeString();
}, 1e3);
};
getDateTime = function () {
var d = new Date();
El.queryID( "date-time" ).innerHTML = d.toLocaleDateString();
};

function iter ( x, g ) {
var k, v;
var w = {};
for ( key of getKeys( x ) ) {
    k, v = g( key , x[key] );
    w[k] = v;
};
return w;
};

function filter ( x, g ) {
var w = ( getType == "array" ) ? [] : {};
for ( i of getKeys( x ) ) {
    if ( g( i, x[i] ) ) {
        w[i] = x[i];
    };
};
return w;
};


function All ( x ) {
return x.reduce( ( xi, yi ) => xi + yi, 0 ) == x.length;
};
function Any ( x ) {
return x.reduce( ( xi, yi ) => xi + yi, 0 ) != 0;
};


function setattr( x, k, v ) {
if ( All([k, v].map( i => getType( i ) == "array" )) ) {
    Range( k.length ).map( i => x[k[i]] = v[i] );
} else {
    x[k] = v
};
};

function getattr( x, k ) {
if ( getType( k ) == "array" ) {
    return k.map( ki => x[ki] );
} else {
    return x[k];
};
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

function getData ( name ) {
var x = {};
getRequest( x, {
    search: "https://circuitalminds.github.io"
}[name] );
return x;
};
 </script>
 <script>
  // Import Modules
/*
==================================================
Built-Module and Include
==================================================
Search-Register
==================================================
*/
let Tasks = {
list: [],
add: function( i ) {
    this.list.push(i); this.load()
},
load: function () {
    if ( $( "body" )[0].onload == undefined ) {
        $( "body" )[0].onload = function() {
            var tasks = Tasks.list;
            for ( var i = 0; i < tasks.length; i++ ) { tasks[i]() }
        }
    }
}
};

function getSearchQuery () {
let Config = {
    noResultsText: "<li class='search-no-item'>No results found</li>",
    searchInput: $( "#js-search-input" )[0],
    resultsContainer: $( "#js-results-container" )[0],
    searchResultTemplate: [
        "<li class='search-item bg-cover' style='background-image: url( {image} );'>",
        "<a class='search-link' href='{url}'><p class='tag'>{title}<p></a>",
        "</li>"
    ].join("\n"),
    json: "/search.json"
};
Tasks.add( function(){SimpleJekyllSearch( Config )} );
};
/*
==================================================
Built-Timer
==================================================
*/
function Timer() {
return {
    counter: {
        value: 0,
        next: function () { this.value += 1 },
        back: function () { this.value -= 1 },
        reset: function () { this.value = 0 }
    },
    init: function ( n, delay=1e3, new_counter=true ) {
        var log = console.log;
        var counter = this.counter;
        if ( new_counter ) {
            counter.reset();
        };
        log( "starting to count" )
        var interval = setInterval( function () {
            if ( counter.value < n ) {
                counter.next();
                log( "i="+counter.value );
            } else {
                clearInterval( interval );
                log( "count terminated" );
            };
        }, delay );
    },
    sleep: function ( t ) {
        var log = console.log;
        log( "start sleeping..." );
        this.init( t );
        setTimeout( function () { log( "wake up !!!" ) }, ( t + 1 ) * 1e3 );
    },
    clock: function () {
        var t = new Date();
        var tdata = {};
        tdata.full = t.toLocaleTimeString();
        [ ["Hours","hr"], ["Minutes", "min"], ["Seconds", "sec"] ].map(
            s => tdata[ s[1] ] = t[ "get" + s[0] ]()
        );
        return tdata;
    },
    date: function () {
        var d = new Date();
        return d.toLocaleDateString();
    }
};
};

function Http ( url ) {
return {
    url: url, getUrl: function ( x ) {
        if ( x != undefined ) {
            return [
                url, ( getType( x ) == "array" ) ? x.join("/") : x
            ].join("/");
        } else {
            return url;
        };
    },
    get: function ( path, handler=print, dtype="json" ) {
        if ( dtype == "json" ) {
            $.getJSON(
                this.getUrl( path ),
                (data) => setTimeout( () => handler(data), 200 )
            );
        } else if ( dtype == "text" ) {
            getRequest(
                this.getUrl( path ),
                (data) => setTimeout( () => handler(data.responseText), 200 )
            );
        };
    }
};
};

function range ( a, b, dx=1 ) {
if ( b == undefined ) {
    b = a; a = 0;
};
return Array.from(
    {length: (b - a - 1) / dx + 1}, ( _, i ) => a + ( i * dx )
);
};
function grid ( a, b, n ) {
var dx = (b - a) / n;
return range(0, n + 1).map( i => a + i * dx );
};