<script lang="ts" strictEvents>
	import * as appEnvironment from "$app/environment";
	import RaycastingExampleSceneCanvas from "$lib/raycasting-example/RaycastingExampleSceneCanvas.svelte";
	import {Scene} from "$lib/raycasting-example/Scene.ts";
	import {drawScene} from "$lib/raycasting-example/drawScene.ts";
	import type {Circle} from "$lib/utils/Circle.ts";
	import type {Dimensions} from "$lib/utils/Dimensions.ts";
	import type {Point} from "$lib/utils/Point.ts";
	import {ArrayMutableBoard} from "$lib/utils/board/ArrayMutableBoard.ts";

	let simulationSpeedMultiplier = 1;

	const scene = (() => {
		const boardDimensions: Dimensions = {
			height: 100,
			width: 100,
		};
		const board = new ArrayMutableBoard(boardDimensions, null);
		const scene = new Scene(board);
		scene.resetRays(100, Math.PI / 2);
		return scene;
	})();
	let drawnScene = drawScene(scene);

	const handleSceneCanvasClick = (event: CustomEvent<Point>) => {
		const clickPosition = event.detail;
		const circle: Circle = {
			center: clickPosition,
			radius: 10,
		};
		scene.addWall(circle);
		drawnScene = drawScene(scene);
	};

	const animationIntervalSeconds = 0.02;

	const animate = () => {
		scene.tick(animationIntervalSeconds, simulationSpeedMultiplier);
		drawnScene = drawScene(scene);
	};

	let animationIntervalID: null | ReturnType<typeof setInterval> = null;

	const handleStartButtonClick = () => {
		if (animationIntervalID !== null) {
			clearInterval(animationIntervalID);
		}
		animationIntervalID = setInterval(animate, animationIntervalSeconds * 1000);
	};
</script>

<div class="raycasting-example">
	{#if appEnvironment.browser}
		<RaycastingExampleSceneCanvas {drawnScene} on:click={handleSceneCanvasClick} />
	{/if}
	<div>
		<button on:click={handleStartButtonClick} type="button">Start</button>
		<input bind:value={simulationSpeedMultiplier} max="20" min="0" step="0.1" type="range" />
	</div>
</div>

<style lang="scss">
	.raycasting-example {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
