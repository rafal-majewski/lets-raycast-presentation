<script lang="ts" strictEvents>
	import type {Point} from "$lib/utils/Point.ts";
	import type {RGBColor} from "$lib/utils/RGBColor.ts";
	import type {Board} from "$lib/utils/board/Board.ts";
	import {convertRGBBoardToImageData} from "$lib/utils/convertRGBBoardToImageData.ts";
	import {putImageDataInCanvas} from "$lib/utils/putImageDataInCanvas.ts";
	import {createEventDispatcher} from "svelte";

	const dispatchEvent = createEventDispatcher<{
		click: Point;
	}>();

	export let drawnScene: Board<RGBColor>;

	$: sceneCanvasImageData = convertRGBBoardToImageData(drawnScene);

	const handleClick = (event: MouseEvent) => {
		const clickPosition: Point = {
			x: event.offsetX,
			y: event.offsetY,
		};
		dispatchEvent("click", clickPosition);
	};

	const updateSceneCanvas = (canvasElement: HTMLCanvasElement, imageData: ImageData) => {
		putImageDataInCanvas(canvasElement, imageData);
		const ctx = canvasElement.getContext("2d");
		if (ctx !== null) {
			ctx.strokeStyle = "gray";
			ctx.moveTo(150, 299);
			ctx.lineTo(150 - 30, 299 - 30);
			ctx.stroke();
			ctx.moveTo(150, 299);
			ctx.lineTo(150 + 30, 299 - 30);
			ctx.stroke();
		}
		return {
			update: (newImageData: ImageData) => {
				putImageDataInCanvas(canvasElement, newImageData);
				const newCtx = canvasElement.getContext("2d");
				if (newCtx !== null) {
					newCtx.strokeStyle = "gray";
					newCtx.moveTo(150, 299);
					newCtx.lineTo(150 - 30, 299 - 30);
					newCtx.stroke();
					newCtx.moveTo(150, 299);
					newCtx.lineTo(150 + 30, 299 - 30);
					newCtx.stroke();
				}
			},
		};
	};
</script>

<canvas
	class="scene-canvas"
	height={drawnScene.getDimensions().height}
	on:click={handleClick}
	use:updateSceneCanvas={sceneCanvasImageData}
	width={drawnScene.getDimensions().width}
/>

<style lang="scss">
	.scene-canvas {
		border: 1px solid black;
	}
</style>
