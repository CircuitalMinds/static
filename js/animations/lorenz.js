function Lorenz () {
    var x, y, z;
    var B = IsoGraff.Fig();
    var h = 0.01; var cx = B.width / 2; var cy = B.height / 2;
    var scale = 2.5; var N = 8192;
    var x0 = 0.0; var y0 = 1.0; var z0 = 10.0;
    var a = -6.0; var b = 28.0; var c = 0.0;
    var i = 0;
    var interval = setInterval(function () {
        if (i < N) {
            x = x0 + h * a * (x0 - y0);
            y = y0 + h * (-x0 * z0 + b * x0 - y0);
            z = z0 + h * (x0 * y0 - z0);
            B.Ctx.strokeStyle = "hsl(" + Math.abs(x) * 10 + "," + Math.abs(y) * 10 + "%," + Math.abs(z) * 2 + "%)";
            B.Move(
                [cx + x0 * scale, cy + y0 * scale], [cx + x * scale, cy + y * scale]
            );
            x0 = x;
            y0 = y;
            z0 = z;
            i += 1;
        } else {
            clearInterval(interval);
        }
    });
    return B;
}
