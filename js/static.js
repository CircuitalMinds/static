$( function () {
    let http = $("#http-data")[0];
    http.get = function ( path, func ) {
        $.getJSON(
            path, data => setTimeout(
                function () { func ( data ) }
            )
        );
    };


});