$( function () {
    let f = $("#get-data")[0];
    f.get = function ( file, y ) {
        $.getJSON(
            ["data", file].join("/"),
            function( data ) {
                setTimeout( function() { y = data } )
            }
        );
    };
});