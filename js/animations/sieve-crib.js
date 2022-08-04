function SieveCrib () {
    var sieve = $( "#sieve-crib" )[0];
    sieve.get = function ( q ) {
        return this.querySelector( ".sieve-" + q );
    };
    sieve.phi = sieve.get( "phi" );
    sieve.pi = sieve.get( "pi" );
    sieve.n = sieve.get( "n" );
    sieve.slide = sieve.get( "slide" );
    sieve.fig = View( sieve.get( "fig" ) );

    sieve.slide.onchange = function () {
        var w = sieve.fig.width / 10;
        sieve.fig.setH( w + w * ( this.value / 10 ) );
        sieve.table.iter( this.value );
    };
    sieve.table = {
        generator: [2, 3, 5, 7],
        isPrime: function ( i ) {
            if ( i <= 7 ) {
                return this.generator.indexOf( i ) != -1;
            } else {
                return this.generator.filter(
                    e => i % e != 0
                ).length == 4;
            };
        },
        iter: function ( n ) {
            var xn = 1;
            var w = sieve.fig.width / 10;
            sieve.fig.ctx.beginPath();
            sieve.fig.ctx.stroke();
            for ( var i = 0; i < n / 10; i++ ) {
                for (var j = 0; j < 10; j++ ) {
                    if ( this.isPrime( xn ) ) {
                        sieve.fig.strokeTxt( xn, j * w + w / 4, i * w + 3 * w / 4 );
                    };
                    sieve.fig.ctx.rect(j * w, i * w, w, w);
                    xn += 1;
                };
            };
            sieve.fig.ctx.stroke();
        }
    };
    sieve.fig.ctx.font = "15px Arial";
    return sieve;
}
