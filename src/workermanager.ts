export class WorkerManager {
    private ctx: CanvasRenderingContext2D;
    private stripes: number;
    private workers: Worker[];

    private stripeWidth: number;
    private canvasHeight: number;

    private stripeData: any[] = [];
    private workerQueue : any[] = [];
    private workerProcessing = [];
    private animationFrame: number;

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

    private processMessage(msg: { data: { stripe: number, data: [] } }) {
        this.stripeData[msg.data.stripe] = msg.data.data;
        if (this.animationFrame)
            cancelAnimationFrame(this.animationFrame);
        this.animationFrame = requestAnimationFrame(() => this.draw());
        this.workerProcessing[msg.data.stripe] = false;
        this.processQueue(msg.data.stripe);
    }

    private draw() {
        for (let i = 0; i < this.stripes; i++) {
            if (this.stripeData[i])
                this.ctx.putImageData(new ImageData(this.stripeData[i], this.stripeWidth, this.canvasHeight), i * this.stripeWidth, 0);
        }
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
                stripe: i
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
}