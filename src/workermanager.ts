export class WorkerManager {
    private ctx: CanvasRenderingContext2D;
    private stripes: number;
    private workers: Worker[];

    private stripeWidth: number;
    private canvasHeight: number;

    private stripeIters : any[] = [];
    private minIters : any[] = [];
    private workerQueue : any[] = [];
    private workerProcessing = [];
    private drawingComplete = [];
    private animationFrame: number;

    private colors : string[];
    private colorsRgb : any[] = [];

    constructor(canvas: HTMLCanvasElement, stripes: number) {

        this.ctx = canvas.getContext('2d');
        this.canvasHeight = canvas.height;
        this.stripeWidth = canvas.width / stripes;
        this.stripes = stripes;
        this.workers = [];

        for (let i = 0; i < stripes; i++) {
            let worker = new Worker('./js/mandelworker.js');
            worker.addEventListener('message', (msg) => this.processMessage(msg));
            this.workers.push(worker);
        }
    }

    private processMessage(msg: { data: { stripe: number, iters : [], minIters : number } }) {
        this.stripeIters[msg.data.stripe] = msg.data.iters;
        this.minIters[msg.data.stripe] = msg.data.minIters;
         if (this.animationFrame)
            cancelAnimationFrame(this.animationFrame);
        this.animationFrame = requestAnimationFrame(() => this.drawWithColor());
        this.workerProcessing[msg.data.stripe] = false;
        this.processQueue(msg.data.stripe);
    }

    private drawWithColor() {
        let minIter = 3;
        for (let i = 0; i < this.stripes; i++) {
            if (this.minIters[i] && this.minIters[i] < minIter)
                minIter = this.minIters[i];
        }
        for (let i = 0; i < this.stripes; i++) {
            if (this.stripeIters[i]) {
                this.ctx.putImageData(this.getImageData(i, minIter), i * this.stripeWidth, 0);
                this.drawingComplete[i] = true;
            }
        }
    }

    private getImageData(stripe : number, minIter : number) : ImageData {
        let imgArr = new Uint8ClampedArray(4 * this.stripeWidth * this.canvasHeight);
        let iterScale = 3 / (3 - minIter);
        let mixedColor;

        for (let i = 0; i < this.stripeIters[stripe].length; i++) {
            let ppos = i * 4;
            let c = (this.stripeIters[stripe][i] - minIter) * iterScale;
            if (c < 1) {
                mixedColor = colorMix(this.colorsRgb[3], this.colorsRgb[2], c);
            } else if (c < 2) {
                mixedColor = colorMix(this.colorsRgb[2], this.colorsRgb[1], c - 1);
            } else {
                mixedColor = colorMix(this.colorsRgb[1], this.colorsRgb[0], c - 2);
            }
            imgArr[ppos] = mixedColor.r;
            imgArr[ppos + 1] = mixedColor.g;
            imgArr[ppos + 2] = mixedColor.b;
            imgArr[ppos + 3] = 255;

        }
        return new ImageData(imgArr, this.stripeWidth, this.canvasHeight);
    }

    public drawMandelbrot(xMin: number, xMax: number, yMin: number, yMax: number, iterations: number): void {

        let viewWidth = Math.abs(xMax - xMin);
        let viewSection = viewWidth / this.stripes;

        for (let i = 0; i < this.stripes; i++) {
            this.workerQueue[i] = {
                width: this.stripeWidth,
                height: this.canvasHeight,
                xmin: xMin + (i * viewSection),
                xmax: xMin + ((i + 1) * viewSection),
                ymin: yMin,
                ymax: yMax,
                iterations: iterations,
                stripe: i,
                colors : this.colors
            };
            this.processQueue(i);
        }
    }

    public processQueue(i : number) {
        if (!this.workerProcessing[i] && this.workerQueue[i]) {
            this.workers[i].postMessage(this.workerQueue[i]);
            this.workerQueue[i] = false;
            this.workerProcessing[i] = true;
        }
    }

    public isComplete() : boolean {
        for (let i = 0; i < this.stripes; i++) {
            if (!this.drawingComplete[i])
                return false;
        }
        return true;
    }

    public destroy() {
        for (let i = 0; i < this.stripes; i++) {
            this.workers[i].terminate();
        }
    }

    public setColors(colors : string[]) {
        this.colors = colors;

        this.colorsRgb = [];
        for (var i = 0; i < colors.length; i++) {
            this.colorsRgb.push(hexToRgb(colors[i]));
        }
    }
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