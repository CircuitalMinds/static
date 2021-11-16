function init_canvas () {
    var obj = document.createElement('canvas');
    obj.width = 505;
    obj.height = 660;
    obj.context = obj.getContext("2d");
    return obj;
};

function linear_gradient ( context ) {
    var gradient = context.createLinearGradient(300, 0, 0, 100);
    gradient.addColorStop(0.1, "sienna");
    gradient.addColorStop(0.5, "crimson");
    gradient.addColorStop(0.7, "indianred");
    gradient.addColorStop(1, "royalblue");
    return gradient;
};

function set_cantor ( m ) {
    cantor = document.getElementById("cantor");
    document.getElementById("cantor-partitions").innerHTML = m;        
    cantor.innerHTML = "";
    cantor_object = init_canvas();    
    cantor.appendChild(cantor_object);
    context = cantor_object.context;
    gradient = linear_gradient(context);
    x = 10;
    y = 10;
    l = cantor_object.width - 20;
    n = l * (1 / 3) ** m;
    animate(x, y, l, n);
    function animate (x, y, l, n) {
        if ( l >= n ) {
            context.strokeStyle = gradient;
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(x + l, y);
            context.lineWidth = 5;
            context.stroke();
            y += 20;
            animate(x, y, l / 3, n);
            animate(x + l * 2 / 3, y, l / 3, n);
        };
    };
};


function set_sieve_eratos ( n ) {
    sieve = document.getElementById("sieve");
    sieve.innerHTML = '';    
    sieve_object = init_canvas();
    sieve.appendChild(sieve_object);
    context = sieve_object.context;
    gradient = linear_gradient(context);
    primes = [];
    wi = sieve_object.width / 10;
    sieve_object.height = wi * n;
    context.beginPath();
    context.strokeStyle = gradient;
    context.stroke();
    context.font = "15px Arial";
    function condition_1 ( x ) {return [2, 3, 5, 7].indexOf(x) != -1};
    function condition_2 ( x ) {return [2, 3, 5, 7].map( y => x % y != 0 ).indexOf(false) == -1};
    counter = 1;
    for (var i = 0; i < n; i += 1) {
        for (var j = 0; j < 10; j += 1) {
            context.rect(j * n, i * n, n, n);
            if ( condition_1(counter) || condition_2(counter) ) {
                primes.push(counter);
                context.strokeText(counter, j * wn + wn / 4, i * wn + 3 * wn / 4);
            };            
            counter += 1;
        };
    };
    context.strokeStyle = gradient;
    context.stroke();
};

var Zeros = ( n ) => ( q=Array(n).fill(0) );

var Prod = ( x, y ) => (
    typeof(y) == 'object' 
) ? x.map( e => e * y[x.indexOf(e)] ) : x.map( e => e * y );

var Sum = ( x, y ) => (
    typeof(y) == 'object' 
) ? x.map( e => e + y[x.indexOf(e)] ) : x.map( e => e + y );

var LorenzAttractor = {
    params: {a: 10, b: 28, c: 8 / 3},
    model: function (t, [x, y, z], [a, b, c]=Object.values(this.params) ) {
        return [a * ( y - x ), x * ( b - z ) - y, x * y - c * z];
    }
};

function OdeInt ( f, initial_condition, time, dt=0.01, frames=10 ) {
    tn = [ time[0] ];
    yn = [ initial_condition ];    
    function Yt ( ti, yi ) {    
        ti += dt;
        Ft = f(ti, yi).map( fi => dt * fi );
        Xt = [ ti, yi.map( x => x + Ft[yi.indexOf(x)] ) ];        
        return Xt;    
    };
    i = 0;
    xt = [tn[0], yn[0]];
    while ( xt[0] < time[1] ) {
        xt = Yt(xt[0], xt[1]);
		if ( i % frames == 0 ) {
        	tn.push(xt[0]);
            yn.push(xt[1]);     
        };
        i += 1;
    };
    return [tn, yn];
};




var c = parseFloat(document.getElementById('c').value);
var h = 0.01;
var cx = 250;
var cy = 330;
var scale = 15;
var n = 8192;

function initLorenz() {
    var x, y, z;
    var canvasLorenz = document.createElement("canvas");
    
    canvasLorenz.setAttribute("width", "505px" );
    canvasLorenz.setAttribute("height", "660px" );
    canvasLorenz.setAttribute("style", "display: inline-block; max-width: 100%; max-height: 100%;");
    var divLorenz = document.getElementById('lorenz');
    divLorenz.innerHTML = "";
    divLorenz.appendChild(canvasLorenz);
	
    var x0 = parseFloat(document.getElementById('x0').value);
    var y0 = parseFloat(document.getElementById('y0').value);
    var z0 = parseFloat(document.getElementById('z0').value);

    document.getElementById("var-x0").innerHTML = x0;
    document.getElementById("var-y0").innerHTML = y0;
    document.getElementById("var-z0").innerHTML = z0;

    var a = parseFloat(document.getElementById('a').value);
    var b = parseFloat(document.getElementById('b').value);
    document.getElementById("var-a").innerHTML = a;
    document.getElementById("var-b").innerHTML = b;

    var i = 0;
    var objCanvas = canvasLorenz.getContext('2d');
    var interval = setInterval(function () {
	if (i < n) {
	    x = x0 + h * a * (x0 - y0);
	    y = y0 + h * (-x0 * z0 + b * x0 - y0);
	    z = z0 + h * (x0 * y0 - z0);
	    objCanvas.strokeStyle = "hsl(" + Math.abs(x) * 10 + "," + Math.abs(y) * 10 + "%," + Math.abs(z) * 2 + "%)";
	    objCanvas.beginPath();
	    objCanvas.moveTo(cx + x0 * scale, cy + y0 * scale);
	    objCanvas.lineTo(cx + x * scale, cy + y * scale);
	    objCanvas.stroke();
	    x0 = x;
	    y0 = y;
	    z0 = z;
	    i += 1;
	}
	else {
	    clearInterval(interval);
	}
    });
};
