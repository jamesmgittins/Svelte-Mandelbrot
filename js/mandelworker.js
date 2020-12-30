const B = 256 * 256;

function mandelIter(cx, cy, maxIter) {
    var x = 0.0;
    var y = 0.0;
    var xx = 0;
    var yy = 0;
    var xy = 0;

    var i = maxIter;
    while (i-- && xx + yy < B) {
        xy = x * y;
        xx = x * x;
        yy = y * y;
        x = xx - yy + cx;
        y = xy + xy + cy;
    }
    return maxIter - i - (Math.log2(Math.log2(xx + yy)) - 4);
}

function mandelbrot(width, height, xmin, xmax, ymin, ymax, iterations, stripe) {
    var iters = new Float64Array(width * height);
    var minIters = 3;

    for (var ix = 0; ix < width; ++ix) {
        for (var iy = 0; iy < height; ++iy) {
            var x = xmin + (xmax - xmin) * ix / (width - 1);
            var y = ymin + (ymax - ymin) * iy / (height - 1);
            var i = mandelIter(x, y, iterations);
            var ppos = width * iy + ix;

            if (i > iterations) {
                iters[ppos] = 3;
            } else {
                var c = 3 * Math.log(i) / Math.log(iterations - 1.0);
                iters[ppos] = c;
                if (c < minIters) minIters = c;
            }
        }
    }

    self.postMessage({ stripe: stripe, minIters: minIters, iters : iters }, [iters.buffer]);
}

self.onmessage = function (msg) {
    mandelbrot(msg.data.width, msg.data.height, msg.data.xmin, msg.data.xmax, msg.data.ymin, msg.data.ymax, msg.data.iterations, msg.data.stripe);
};