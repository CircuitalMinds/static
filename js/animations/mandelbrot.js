function Mandelbrot () {
   var B = IsoGraff.Fig();
    B.createImg();
    var Lx = - B.width / 2;
    var Ly = - B.height / 2;
    var xp = 0; var yp = 0; var zp = 50;
    var r = 15; var g = 25; var b = 85;
    var iterMax = 250;
    var Palette = [];
    B.addEventListener("mousedown", onMouseDown);
    setPalette();
    setImage();
    init(0);
    function init( t ) {
        window.requestAnimationFrame( init );
        B.Ctx.putImageData( B.Img.obj, 0, 0 );
    };
    function setPalette() {
        for ( var i = 0; i < 256; i++ ) {
            Palette[i] = { r: r, g: g, b: b };
            if ( i < 256 ) {
                r += 3;
            } else if ( i < 195 ) {
                g += 3;
            } else if ( i < 182 ) {
                b += 3;
            };
        };
    };
    function setImage() {
        for ( var i = 0; i < B.height; i++ ) {
            for ( var j = 0; j < B.width; j++ ) {
                Iterate(j, i);
            };
        };
    };
    function Iterate(x, y) {
        x0 = (x + Lx + xp) / zp;
        y0 = (y + Ly + yp) / zp;
        a = 0;
        b = 0;
        rx = 0;
        ry = 0;
        iterations = 0;
        while (iterations < iterMax && (rx * rx + ry * ry <= 4)) {
            rx = a * a - b * b + x0;
            ry = 2 * a * b + y0;
            a = rx;
            b = ry;
            iterations++;
        };
        var color;
        if (iterations == iterMax) {
            color = { r: 0, g: 0, b: 0 };
        } else {
            n = Math.floor( ( iterations / (iterMax - 1) ) * 255 );
            color = Palette[n];
        };
        Index = (y * B.width + x) * 4;
        B.Img.set( Index, color.r );
        B.Img.set( Index + 1, color.g );
        B.Img.set( Index + 2, color.b );
        B.Img.set( Index + 3, 255 );
    };
    function zoomFractal(x, y, factor, zoomIn) {
        if (zoomIn) {
            zp *= factor;
            xp = factor * (x + Lx + xp);
            yp = factor * (y + Ly + yp);
        } else {
            zp /= factor;
            xp = (x + Lx + xp) / factor;
            yp = (y + Ly + yp) / factor;
        };
    };
    function onMouseDown( e ) {
        Pos = getPosition( e );
        zoomIn = true;
        if ( e.ctrlKey ) {
            zoomIn = false;
        };
        zoomFactor = 2;
        if (e.shiftKey) {
            zoomFactor = 1;
        };
        zoomFractal(Pos.x, Pos.y, zoomFactor, zoomIn);
        setImage();
    };
    function getPosition( e ) {
        rect = B.getBoundingClientRect();
        return {
            x: Math.round( (e.clientX - rect.left) / (rect.right - rect.left) * B.width ),
            y: Math.round( (e.clientY - rect.top) / (rect.bottom - rect.top) * B.height )
        };
    };
    return B;

}
