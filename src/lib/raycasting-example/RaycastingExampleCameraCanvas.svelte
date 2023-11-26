<script lang="ts" strictEvents>
	import type {RGBColor} from "$lib/utils/RGBColor.ts";
	import type {Board} from "$lib/utils/board/Board.ts";
	import {convertRGBBoardToImageData} from "$lib/utils/convertRGBBoardToImageData.ts";
	import {putImageDataInCanvas} from "$lib/utils/putImageDataInCanvas.ts";

	export let drawnRays: Board<RGBColor>;

	$: canvasImageData = convertRGBBoardToImageData(drawnRays);

	const updateCanvas = (canvasElement: HTMLCanvasElement, imageData: ImageData) => {
		putImageDataInCanvas(canvasElement, imageData);
		return {
			update: (newImageData: ImageData) => {
				putImageDataInCanvas(canvasElement, newImageData);
			},
		};
	};
</script>

<canvas
	class="camera-canvas"
	height={drawnRays.getDimensions().height}
	use:updateCanvas={canvasImageData}
	width={drawnRays.getDimensions().width}
/>

<style lang="scss">
	.camera-canvas {
		border: 1px solid black;
	}
</style>
