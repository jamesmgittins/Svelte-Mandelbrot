import { WorkerManager } from "./workermanager";

export const resolutionOptions = ['1280x720','1600x900','1920x1080','2560x1440','3200x1800','3840x2160','5120x2880','7860x4320'];


export function downloadRender(center : {x:number, y:number}, xMin : number, xMax:number, iterations:number, resolution : string, colors : string[]) {
    let width = parseInt(resolution.split('x')[0]);
    let height = parseInt(resolution.split('x')[1]);
    let ratio = width / height;
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    let viewHeight = Math.abs(xMax - xMin) / (2 * ratio);
    let yMin = center.y - viewHeight;
    let yMax = center.y + viewHeight;

    let workerManager = new WorkerManager(canvas, 10);
    workerManager.setColors(colors);
    workerManager.drawMandelbrot(xMin, xMax, yMin, yMax, iterations);

    let interval = setInterval(() => {
        if (workerManager.isComplete()) {
            clearInterval(interval);
            workerManager.destroy();
            let imgData = canvas.toDataURL('image/png');
            imgData = imgData.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
            imgData = imgData.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=mandelbrot.png');
            let a = document.createElement('a');
            a.href = imgData;
            a.download = "mandelbrot.png";
            document.body.append(a);
            a.click();
            a.remove();
        }
    }, 100);
}