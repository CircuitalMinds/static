function print ( x ) {
    var f = console.log;
    var y = ( typeof(x) == "object" ) ? JSON.stringify( x ) : x;
    return f(y);
};

function searchQuery( input, output, dataset ) {
    SimpleJekyllSearch({
        searchInput: $( "#" + input )[0],
        resultsContainer: $( "#" + output )[0],
        noResultsText: "<li class='search-no-item'>No results found</li>",
        searchResultTemplate: [
            "<li class='search-item bg-cover'>",
            "<a class='search-link' href='{image}'><p class='tag'>{title}<p></a>",
            "</li>"
        ].join("\n"),
        json: dataset
    });
};


function getVideos() {
    $.getJSON( "/videos/metadata/", function( data ) {
        setTimeout( function () {
            jsonData = Object.values( data );
            searchQuery( "jkl-query", "jkl-result", jsonData);
        }, 500 );
    });
};


let Http = {};
Http.get = function ( Url, Handler=Print ) {
    $.getJSON(
        Url, (data) => setTimeout( () => Handler(data), 200 )
    );
};
Http.post = function ( Url, Data, Handler=Print ) {
    $.post(
        Url, Data, (data) => setTimeout( () => Handler(data), 200 )
    );
};

$( function () { getVideos() });