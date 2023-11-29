<script lang="ts" strictEvents>
	import * as appEnvironment from "$app/environment";
	import RaycastingExampleCameraCanvas from "$lib/raycasting-example/RaycastingExampleCameraCanvas.svelte";
	import RaycastingExampleSceneCanvas from "$lib/raycasting-example/RaycastingExampleSceneCanvas.svelte";
	import {Scene} from "$lib/raycasting-example/Scene.ts";
	import {drawScene} from "$lib/raycasting-example/drawScene.ts";
	import type {Circle} from "$lib/utils/Circle.ts";
	import type {Dimensions} from "$lib/utils/Dimensions.ts";
	import type {Point} from "$lib/utils/Point.ts";
	import {ArrayMutableBoard} from "$lib/utils/board/ArrayMutableBoard.ts";
	import {drawRays} from "./drawRays";

	let simulationSpeedMultiplier = 1;
	let rayCount = 300;
	const simulatedVerticalViewAngle = Math.PI / 2;
	const horizontalViewAngle = Math.PI / 2;
	const wallHeight = 8000;

	const scene = (() => {
		const boardDimensions: Dimensions = {
			height: 300,
			width: 300,
		};
		const board = new ArrayMutableBoard(boardDimensions, null);
		const scene = new Scene(board);
		return scene;
	})();

	$: scene.resetRays(rayCount, Math.PI / 2);

	let drawnScene = drawScene(scene);
	$: drawnRays = drawRays(scene.getRays(), rayCount, simulatedVerticalViewAngle, wallHeight);

	const handleSceneCanvasClick = (event: CustomEvent<Point>) => {
		const clickPosition = event.detail;
		const circle: Circle = {
			center: clickPosition,
			radius: 10,
		};
		scene.addWall(circle);
		drawnScene = drawScene(scene);
		drawnRays = drawRays(scene.getRays(), rayCount, simulatedVerticalViewAngle, wallHeight);
	};

	const animationIntervalSeconds = 0.1;

	const animate = () => {
		scene.tick(animationIntervalSeconds, simulationSpeedMultiplier);
		drawnScene = drawScene(scene);
		drawnRays = drawRays(scene.getRays(), rayCount, simulatedVerticalViewAngle, wallHeight);
	};

	let animationIntervalID: null | ReturnType<typeof setInterval> = null;

	const handleStartButtonClick = () => {
		if (animationIntervalID !== null) {
			clearInterval(animationIntervalID);
		}
		animationIntervalID = setInterval(animate, animationIntervalSeconds * 1000);
	};

	const handleStopButtonClick = () => {
		if (animationIntervalID !== null) {
			clearInterval(animationIntervalID);
			animationIntervalID = null;
		}
	};

	const handleResetButtonClick = () => {
		scene.resetRays(rayCount, horizontalViewAngle);
		drawnScene = drawScene(scene);
		drawnRays = drawRays(scene.getRays(), rayCount, simulatedVerticalViewAngle, wallHeight);
	};
</script>

<div class="raycasting-example">
	<div class="raycasting-example__displays">
		{#if appEnvironment.browser}
			<RaycastingExampleSceneCanvas {drawnScene} on:click={handleSceneCanvasClick} />
		{/if}
		{#if appEnvironment.browser}
			<RaycastingExampleCameraCanvas {drawnRays} />
		{/if}
	</div>
	<div>
		<button disabled={animationIntervalID !== null} on:click={handleStartButtonClick} type="button">
			Start
		</button>
		<button disabled={animationIntervalID === null} on:click={handleStopButtonClick} type="button">
			Stop
		</button>
		<button on:click={handleResetButtonClick} type="button"> Reset </button>
		<label>
			<span>Simulation speed multiplier: {simulationSpeedMultiplier}</span>
			<input bind:value={simulationSpeedMultiplier} max="80" min="0" step="1" type="range" />
		</label>
		<label>
			<span>Ray count: {rayCount}</span>
			<input
				bind:value={rayCount}
				disabled={animationIntervalID !== null}
				max={scene.getDimensions().width}
				min="2"
				step="1"
				type="range"
			/>
		</label>
	</div>
</div>

<style lang="scss">
	.raycasting-example {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.raycasting-example__displays {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
