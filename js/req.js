function getRequest ( url ) {
    var req = new XMLHttpRequest();
    req.open( "GET", url );
    req.send();
    req.onreadystatechange = function ( data ) {
        setTimeout( function () {
            Print( data );
        }, 200 );
    };
};

};

const Http = new XMLHttpRequest();
const url='https://circuitalminds.github.io/search.';
Http.open("GET", url);
Http.send();

Http