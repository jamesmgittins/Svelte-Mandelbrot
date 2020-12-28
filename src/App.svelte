<script lang="ts">
    import { onMount } from "svelte";
    import { WorkerManager } from "./workermanager";

    let canvas: HTMLCanvasElement;
    let workerManager: WorkerManager;
    let xMin = -2;
    let xMax = 1;
    let yMin = -1;
    let yMax = 1;
    let center = { x: (xMax + xMin) / 2, y: (yMax + yMin) / 2 };
    let iterations = 500;

    let canvasWidth = 900;
    let canvasHeight = canvasWidth / 1.5;
    let canvasHalfWidth = canvasWidth / 2;
    let canvasHalfHeight = canvasHeight / 2;

    function drawMandelbrot() {
        workerManager.drawMandelbrot(xMin, xMax, yMin, yMax, iterations);
    }

    onMount(() => {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        workerManager = new WorkerManager(canvas, 10);
        drawMandelbrot();
    });

    function reCenter(e: MouseEvent) {
        let xChange = (e.offsetX - canvasHalfWidth) / canvas.width;
        let yChange = (e.offsetY - canvasHalfHeight) / canvas.height;
        let width = Math.abs(xMax - xMin);
        let height = Math.abs(yMax - yMin);
        xMin += xChange * width;
        xMax += xChange * width;
        yMin += yChange * height;
        yMax += yChange * height;
        center = { x: (xMax + xMin) / 2, y: (yMax + yMin) / 2 };
        drawMandelbrot();
    }

    function zoom(isIn: boolean) {
        let multi = isIn ? 0.9 : 1.1;
        let width = Math.abs(xMax - xMin) / 2;
        let height = Math.abs(yMax - yMin) / 2;
        xMin = center.x - width * multi;
        xMax = center.x + width * multi;
        yMin = center.y - height * multi;
        yMax = center.y + height * multi;
        drawMandelbrot();
    }
</script>

<div>
    <label for="iterations">Iterations</label>
    <input type="number" name="iterations" bind:value={iterations} />
    <button on:click={drawMandelbrot}>Redraw</button>
</div>

<div>
    <button on:click={(e) => zoom(false)}>Zoom -</button>
    <button on:click={(e) => zoom(true)}>Zoom +</button>
</div>

<canvas bind:this={canvas} on:click={(e) => reCenter(e)} />

<style>
    :global(body) {
        font-family: sans-serif;
    }
    canvas {
        margin: auto;
        display: block;
        max-width: 100%;
    }

    div {
        text-align: center;
        margin-bottom: 15px;
    }

    button {
        padding: 1em;
        border: none;
        border-radius: 0.5em;
        cursor: pointer;
    }

    button:hover {
        background-color: rgb(209, 255, 139);
    }
</style>