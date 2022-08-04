function View ( z ) {
    z.innerHTML = '<canvas style="width: 100%; display: inline-block;"></canvas>';
    var fz = z.querySelector( "canvas" );
    fz.ctx = fz.getContext("2d");

    fz.setW = function ( w ) { this.width = w };
    fz.setH = function ( h ) { this.height = h };

    fz.clear = function () { this.ctx.clearRect(
        0, 0, this.width, this.height
    ) };

    fz.plot = function ( x, y ) {
        this.ctx.beginPath();
        this.ctx.moveTo( x, this.height - y );
        for ( var i = 0; i < x.length; i++ ) {
            this.ctx.lineTo( x[i], this.height - y[i] );
            this.ctx.stroke();
        };
    };

    fz.move = function ( x, y ) {
        this.ctx.beginPath();
        this.ctx.moveTo( x[0], x[1] );
        this.ctx.lineTo( y[0], y[1] );
        this.ctx.stroke();
    };

    fz.linearGrad = function () {
        var grd = this.ctx.createLinearGradient(
            0, 0, this.width, this.height
        );
        var wn = [
            0.1, 0.5, 0.7, 1
        ];
        var cn = [
            "sienna", "crimson", "indianred", "royalblue"
        ];
        for ( var i = 0; i < wn.length; i++ ) {
            grd.addColorStop( wn[i], cn[i] );
        };
        return grd;
    };

    fz.fillSty = function ( data ) {
        var grad = ( data ) ? data : this.linearGrad();
        this.ctx.fillStyle = grad;
        this.ctx.fillRect(
            0, 0, this.width, this.height
        );
    };
    fz.strokeSty = function ( data ) {
        var grad = ( data ) ? data : this.linearGrad();
        this.ctx.strokeStyle = grad;
    };
    fz.strokeTxt = function ( data, x, y ) {
        this.ctx.strokeText( data, x, y );
    };

    return fz;
};
