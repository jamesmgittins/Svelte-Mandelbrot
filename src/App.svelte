<script lang="ts">
    import { onMount } from "svelte";
    import { downloadRender, resolutionOptions, downloading } from "./downloader";
    import { WorkerManager } from "./workermanager";

    let colors = ['#000000','#6200FF','#FFE100','#FF0000'];
    let canvas: HTMLCanvasElement;
    let workerManager: WorkerManager;
    let xMin = -2;
    let xMax = 1;
    let yMin = -1;
    let yMax = 1;
    let center = { x: (xMax + xMin) / 2, y: (yMax + yMin) / 2 };
    let iterations = 500;
    let resolution : string = '1920x1080';
    let canvasWidth = 900;
    let canvasHeight = canvasWidth / 1.5;

    function drawMandelbrot() {
        workerManager.setColors(colors);
        workerManager.drawMandelbrot(xMin, xMax, yMin, yMax, iterations);
    }

    onMount(() => {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        workerManager = new WorkerManager(canvas, 10);
        drawMandelbrot();
    });

    function reCenter(e: MouseEvent) {
        let xChange = (e.offsetX - canvas.clientWidth / 2) / canvas.clientWidth;
        let yChange = (e.offsetY - canvas.clientHeight / 2) / canvas.clientHeight;
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

    function download() {
        downloading.set(true);
        downloadRender(center, xMin, xMax, iterations, resolution, colors);
    }
</script>

<div>
    <label for="colors">Colors</label>
    {#each colors as color}
        <input type="color" bind:value={color} on:change={drawMandelbrot}/>
    {/each}
</div>

<div>
    <label for="iterations">Iterations</label>
    <input type="number" name="iterations" bind:value={iterations} on:change={drawMandelbrot}/>
    <span class="divider"></span>
    <select bind:value={resolution}>
        {#each resolutionOptions as option}
			<option value={option}>
				{option}
			</option>
		{/each}
    </select>
    {#if $downloading}
        <button on:click={download} disabled>Download</button>
        <span>Please wait...</span>
    {:else}
        <button on:click={download}>Download</button>
    {/if}
    
</div>

<div>
    <span>Click image to re-center</span>
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
        min-width: 60%;
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

    span.divider {
        width: 2px;
        height: 2em;
        background-color: #ddd;
        border-radius: 5px;
        display: inline-block;
        vertical-align: middle;
        margin: 0 0.5em;
    }
</style>