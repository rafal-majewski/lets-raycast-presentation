<script lang="ts" strictEvents>
	import * as appEnvironment from "$app/environment";
	import RaycastingExampleCameraCanvas from "$lib/raycasting-example/RaycastingExampleCameraCanvas.svelte";
	import RaycastingExampleSceneCanvas from "$lib/raycasting-example/RaycastingExampleSceneCanvas.svelte";
	import {Scene} from "$lib/raycasting-example/Scene.ts";
	import {drawScene} from "$lib/raycasting-example/drawScene.ts";
	import Article from "$lib/utils/Article.svelte";
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

<Article>
	<div class="raycasting-example__displays">
		{#if appEnvironment.browser}
			<RaycastingExampleSceneCanvas {drawnScene} on:click={handleSceneCanvasClick} />
		{/if}
		{#if appEnvironment.browser}
			<RaycastingExampleCameraCanvas {drawnRays} />
		{/if}
	</div>
	<br />
	<div>
		<button disabled={animationIntervalID !== null} on:click={handleStartButtonClick} type="button">
			Start
		</button>
		<button disabled={animationIntervalID === null} on:click={handleStopButtonClick} type="button">
			Stop
		</button>
		<button on:click={handleResetButtonClick} type="button"> Reset </button>
		<br />
		<label>
			<span>Simulation speed multiplier: {simulationSpeedMultiplier}</span>
			<input bind:value={simulationSpeedMultiplier} max="80" min="0" step="1" type="range" />
		</label>
		<br />
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
	<br /><br /><br /><br /><br /><br />
	<section>
		<h2>Code</h2>
		<br /><br />
		<div>
			<pre><code
					>{`type Point = {
	x: number;
	y: number;
};`}</code
				></pre>
			<br />
			<pre><code
					>{`type RGBColor = {
	blue: number;
	green: number;
	red: number;
};`}</code
				></pre>
			<br />
			<pre><code
					>{`type Ray = {
	speed: Point;
	hit: RGBColor | null;
	position: Point;
	ticksPassed: number;
};`}</code
				></pre>
			<br />
			<pre><code
					>{`class Scene {
	rays: Ray[];
	wallBoard: Board<null | RGBColor>;

	getHitAtPosition(position: Point): null | RGBColor {
		roundedPosition: Point = {
			x: Math.round(position.x),
			y: Math.round(position.y),
		};
		hit = this.wallBoard.getCell(roundedPosition);
		return hit;
	}
	resetRays(rayCount: number, viewAngleRadians: number): void {
		newRays: Ray[] = Array.ofSize(rayCount)
			.initEach((index) => {
				inViewPercentage = index / (rayCount - 1);
				ray: Ray = {
					speed: {
						x: Math.tan(
							viewAngleRadians * (
								inViewPercentage - 0.5
							)
						),
						y: -1,
					},
					hit: this.getHitAtPosition(position),
					position: {
						x: this.wallBoard.width / 2,
						y: this.wallBoard.height,
					},
					ticksPassed: 0,
				};
				return ray;
			});
		this.rays = newRays;
	}
	tickRay(ray: Ray, timeIncreaseSeconds: number): Ray {
		if (ray.hit !== null) {
			return ray;
		}
		newPosition: Point = {
			x: ray.position.x + ray.speed.x * timeIncreaseSeconds,
			y: ray.position.y + ray.speed.y * timeIncreaseSeconds,
		};
		hit = this.getHitAtPosition(newPosition);
		newRay: Ray = {
			speed: ray.speed,
			hit: hit,
			position: newPosition,
			ticksPassed: ray.ticksPassed + timeIncreaseSeconds,
		};
		return newRay;
	}
}`}</code
				></pre>
		</div>
	</section>
	<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
	<div>
		Go to <a href="/what-is-next">What is Next?</a>.
	</div>
</Article>

<style lang="scss">
	.raycasting-example__displays {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: min-content;
		margin: 0 auto;
	}
</style>
