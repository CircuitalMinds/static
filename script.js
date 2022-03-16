function Print ( data ) {
    console.log(
        JSON.stringify( data )
    );
};
let Http = {};
Http.Url = function ( x ) {
    var host = "https://circuitalminds.github.io";
    var path = (
        typeof( x ) == "object"
    ) ? x.join("/") : x;
    return [host, path].join( "/" );
};

Http.Get = function ( Url, Handler ) {
    $.getJSON(
        Url,
        ( data ) => setTimeout( function() { Handler(data) }, 200 )
    );
};
Http.Post = function ( Url, Data, Handler ) {
    $.post(
        Url,
        Data,
        function ( data ) {
            Print(data);
            setTimeout(function() {Handler(data)}, 200);
        }
    );
};
function initPage () {
    let page = $("#page-data")[0];
    page.data = {};
    page.set = function ( key, value ) {
        this.data[key] = value
    };
    page.get = function ( key ) {
        return this.data[key];
    };
    page.set( "url", document.URL );
};

function setData () {
    let page = $("#page-data")[0];
}

$( function () {
   initPage();
   setData();
});