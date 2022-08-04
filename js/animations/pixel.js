function Pixel () {
    var fig = $( "#pixel" )[0];
    var B = IsoGraff.Fig();
    B.createImg();
    init(0);
    function setFrame ( n ) {
        for ( var i = 0; i < B.width; i++ ) {
            for ( var j = 0; j < B.height; j++ ) {
                Index = (j * B.width + i) * 4;
                r = ( (i + n) % 256 ) ^ ( (j + n) % 256 );
                g = ( (2 * i + n) % 256 ) ^ ( (2 * j + n) % 256 );
                b = 50 + Math.floor( Math.random() * 100 );
                b = (b + n) % 256;
                B.Img.set( Index, r );
                B.Img.set( Index + 1, g );
                B.Img.set( Index + 2, b );
                B.Img.set( Index + 3, 255 );
            };
        };
    };
    function init( t ) {
        window.requestAnimationFrame( init );
        setFrame( Math.floor( t / 10 ) );
        B.Ctx.putImageData( B.Img.obj, 0, 0 );
    };
    return B;
};
