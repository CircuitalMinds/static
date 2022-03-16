function Print ( data ) {
    console.log(
        JSON.stringify( data )
    );
};
function InvalidEvent ( x ) {
    var y  = $( x );
    y.addClass( "ani-ring" );
    setTimeout( function () {
        y.removeClass( "ani-ring" );
    }, 1e3);
};
let Http = $("#http-data")[0];
Http.Url = function () {
    return document.URL;
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

function Login () {
    Http.Post(
        Http.Url(),
        {
            email: $( 'input[placeholder="Email"]' )[0].value,
            password: $( 'input[placeholder="Password"]' )[0].value
        },
        Print
    );
};