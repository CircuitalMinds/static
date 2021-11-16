function range (start, stop, step=1) {
    return Array.from(
    	  {length: (stop - start - 1) / step + 1}, (_, i) => start + (i * step)
    );
};
function Tf ( Data={} ) {
    [name, cte, scalar, w, uv] = ["name", "cte", "scalar", "w", "uv"].map(
        i => ( Data[i] != undefined ) ? Data[i] : ""
    );
    if ( cte != ""  ) {
        return Math[cte.toUpperCase()];
    } else if ( name != "" ) {
        if ( name == "+" || name == "*" && uv.length == 2 ) {
            f = {
                "+": (x, y) => x + y, "*": (x, y) => x * y
            }[name];
            u = uv[0]; v = uv[1];
            if ( typeof(u) == "object" && typeof(v) == "object" ) {
                return range(0, u.length).map( i => f(u[i], v[i]) );
            } else if ( typeof(u) != "object" && typeof(v) == "object" ) {
                return range(0, v.length).map( i => f(u, v[i]) );
            } else if ( typeof(u) == "object" && typeof(v) != "object" ) {
                return range(0, u.length).map( i => f(u[i], v) );
            };
        } else {
            f = Math[name.toLowerCase()];
            if ( f != undefined && w != "" ) {
                return range(0, w.length).map( i => f(w[i]) );
            } else if ( f != undefined && scalar != "" ) {
                return f(scalar);
            };
        };
    };
};

function randInt( a, b ) {
    return a + Math["round"]( (Math["random"]() * (b - a)) );
};
function randList( a, b ) {
    Y = [];
    range(a, b + 1).map( i => (
        function () {
            y = randInt(a, b);
            while( Y.indexOf(y) != -1 ) { y = randInt(a, b) };
            Y.push(y);
        }
    )());
    return Y;
};
function Factorial ( n ) {
    return range(1, n + 1).reduce( function (x, y) { return x * y }, 1 );
};

var Vector = {
    zeros: ( n ) => range(0, n).map( i => 0.0 ),
    prod: ( u, v ) => Tf( {"name": "*", "uv": [u, v]} ),
    sum: ( u, v ) => Tf( {"name": "+", "uv": [u, v]} ),
    dot: ( u, v ) => Vector.prod(u, v).reduce( (x, y) => x + y ),
    norm: ( u ) => Math["sqrt"]( Math["abs"]( Vector.dot(u, u) ) ),
    unitary: ( u ) => Vector.prod( 1.0 / Vector.norm(u), u ),
    grid: ( a, b, n=10 ) => Vector.sum( a, Vector.prod( (b - a) / n, range(0, n + 1) )),
    eval: ( f_name, w ) => Tf( {"name": f_name, "w": w} )
};

var DiffEq = {
    system: function ( Fn, CI ) {
        return ( t, v ) => [t, v.map( vn => fn( t, vn ) )];
    }
};