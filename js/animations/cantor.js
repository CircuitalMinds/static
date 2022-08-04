var Citation = {
    "georg-cantor": {
        "text": "En matemáticas, el arte de proponer una pregunta debe considerarse de mayor valor que resolverlo.",
        "author": "Georg Cantor",
        "period": "1845-1918"
    },
    "david-hilbert": {
        "text": "Nadie nos expulsará del paraíso que Cantor ha creado para nosotros. El producto más asombroso del pensamiento matemático, y una de las realizaciones más bellas de la actividad humana en el dominio de lo puramente inteligible.",
        "author": "David Hilbert",
        "period": "1862-1943"
    }
};

function Cantor () {
    var Cn = $( "#cantor" )[0];
    var fig = View( Cn.querySelector( ".cn-draw" ) );
    fig.ctx.lineWidth = 5;
    var cx = 10; var cy = 10;
    var hx = fig.width - 20;

    function draw ( x, y, l, m ) {
        if ( l >= m ) {
            fig.strokeSty();
            fig.move( [x, y], [x + l, y] );
            y += 20;
            draw( x, y, l / 3, m );
            draw( x + l * 2 / 3, y, l / 3, m );
        };
    };

    Cn.querySelector( ".cn-value" ).oninput = function () {
        fig.clear();
        Cn.querySelector( ".cn-text" ).innerHTML = String( this.value );
        draw( cx, cy, hx, hx * (1 / 3) ** Number( this.value ) );
    };

};

function Sierpinski () {
    var Sn = $( "#sierpinski" )[0];
    var fig = View( Sn.querySelector( ".sn-draw" ) );
    var Tn = new init();

    function init() {
        var w = Number( fig.width );
        this.w = w;
        this.h = Math.sqrt(3) / 2 * this.w;
        this.maxDepth = 10;
    };

    init.prototype.drawSierpinskiTriangle = function( steps ) {
        fig.clear();
        var x0 = 0, y0 = this.h - 1;
        var x1 = this.w, y1 = this.h - 1;
        var x2 = this.w / 2, y2 = 0;
        fig.strokeSty();
        this.drawTriangle(x0, y0, x1, y1, x2, y2);
        this.removeCenterTriangle(x0, y0, x1, y1, x2, y2, steps);
    };
    init.prototype.drawTriangle = function(x0, y0, x1, y1, x2, y2) {
        fig.ctx.beginPath();
        fig.ctx.moveTo(x0, y0);
        fig.ctx.lineTo(x1, y1);
        fig.ctx.lineTo(x2, y2);
        fig.ctx.lineTo(x0, y0);
        fig.ctx.fill();
    };
    init.prototype.removeCenterTriangle = function(x0, y0, x1, y1, x2, y2, steps) {
        if (steps > 0) {
            var x01 = (x0 + x1)/2, y01 = (y0 + y1)/2;
            var x02 = (x0 + x2)/2, y02 = (y0 + y2)/2;
            var x12 = (x1 + x2)/2, y12 = (y1 + y2)/2;
            this.drawTriangle(x01, y01, x02, y02, x12, y12);
            if (steps > 1) {
                this.removeCenterTriangle(x0, y0, x01, y01, x02, y02, steps - 1);
                this.removeCenterTriangle(x01, y01, x1, y1, x12, y12, steps - 1);
                this.removeCenterTriangle(x02, y02, x12, y12, x2, y2, steps - 1);
            };
        };
    };

    function draw ( steps ) {
        Tn.drawSierpinskiTriangle( steps );
    };

    Sn.querySelector( ".sn-value" ).oninput = function () {
        Sn.querySelector( ".sn-text" ).innerHTML = String( this.value );
        draw( Number(this.value) );
    };

};


$( function () {
    for ( xi of Object.entries({ cantor: Cantor, sierpinski: Sierpinski }) ) {
        var zi = $( "#" + xi[0] )[0];
        if ( zi != undefined ) {
            xi[1]();
        };
    };
} );