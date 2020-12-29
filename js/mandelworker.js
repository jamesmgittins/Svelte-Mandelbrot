function mandelIter(cx, cy, maxIter) {
    var x = 0.0;
    var y = 0.0;
    var xx = 0;
    var yy = 0;
    var xy = 0;

    var i = maxIter;
    while (i-- && xx + yy <= 4) {
        xy = x * y;
        xx = x * x;
        yy = y * y;
        x = xx - yy + cx;
        y = xy + xy + cy;
    }
    return maxIter - i;
}

function mandelbrot(width, height, xmin, xmax, ymin, ymax, iterations, stripe, colors) {
    var pix = new Uint8ClampedArray(4 * width * height);
    var mixedColor;

    for (var ix = 0; ix < width; ++ix) {
        for (var iy = 0; iy < height; ++iy) {
            var x = xmin + (xmax - xmin) * ix / (width - 1);
            var y = ymin + (ymax - ymin) * iy / (height - 1);
            var i = mandelIter(x, y, iterations);
            var ppos = 4 * (width * iy + ix);

            if (i > iterations) {
                pix[ppos] = colors[0].r;
                pix[ppos + 1] = colors[0].g;
                pix[ppos + 2] = colors[0].b;
            } else {
                var c = 3 * Math.log(i) / Math.log(iterations - 1.0);

                if (c < 1) {
                    mixedColor = colorMix(colors[3], colors[2], c);
                } else if (c < 2) {
                    mixedColor = colorMix(colors[2], colors[1], c - 1);
                } else {
                    mixedColor = colorMix(colors[1], colors[0], c - 2);
                }
                pix[ppos] = mixedColor.r;
                pix[ppos + 1] = mixedColor.g;
                pix[ppos + 2] = mixedColor.b;
            }
            pix[ppos + 3] = 255;
        }
    }

    self.postMessage({ stripe: stripe, data: pix }, [pix.buffer]);
}

function colorMix(color1, color2, mix) {
    return {
        r : color1.r + (color2.r - color1.r) * mix,
        g : color1.g + (color2.g - color1.g) * mix,
        b : color1.b + (color2.b - color1.b) * mix
    }
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

self.onmessage = function (msg) {
    let colors = [];
    for (var i = 0; i < msg.data.colors.length; i++) {
        colors.push(hexToRgb(msg.data.colors[i]));
    }
    mandelbrot(msg.data.width, msg.data.height, msg.data.xmin, msg.data.xmax, msg.data.ymin, msg.data.ymax, msg.data.iterations, msg.data.stripe, colors);
};