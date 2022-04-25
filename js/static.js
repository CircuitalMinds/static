$( function () {
    let f = $("#get-data")[0];
    f.get = function ( file, g ) {
        $.getJSON(
            ["data", file].join("/"),
            function( data ) {
                setTimeout( function() { g(data) } )
            }
        );
    };
});