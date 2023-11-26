import type {Circle} from "$lib/utils/Circle.ts";
import type {Dimensions} from "$lib/utils/Dimensions.ts";
import type {Point} from "$lib/utils/Point.ts";
import type {RGBColor} from "$lib/utils/RGBColor.ts";
import type {MutableBoard} from "$lib/utils/board/MutableBoard.ts";
import {calculateRainbowGradient} from "$lib/utils/calculateRainbowGradient.ts";
import type {Ray} from "./Ray.ts";
import {paintCircleInMutableBoard} from "./paintCircleInMutableBoard.ts";

export class Scene {
	public addWall(circle: Circle): void {
		const paint = (position: Point): RGBColor => {
			const rainbowGradientPercentage = (position.x + position.y) / 20;
			const wallColor: RGBColor = calculateRainbowGradient(rainbowGradientPercentage);
			return wallColor;
		};
		paintCircleInMutableBoard(this.wallBoard, circle, paint);
	}
	public constructor(wallBoard: MutableBoard<null | RGBColor>) {
		this.wallBoard = wallBoard;
		this.rays = [];
	}
	public getDimensions(): Dimensions {
		const wallBoardDimensions = this.wallBoard.getDimensions();
		return wallBoardDimensions;
	}
	private getHitAtPosition(position: Point): null | RGBColor {
		const roundedPosition: Point = {
			x: Math.round(position.x),
			y: Math.round(position.y),
		};
		const hit = (() => {
			try {
				const hit = this.wallBoard.getCell(roundedPosition);
				return hit;
			} catch {
				return null;
			}
		})();
		return hit;
	}
	public getRays(): readonly Ray<RGBColor>[] {
		return this.rays;
	}
	public getWall(position: Point): null | RGBColor {
		const wall = this.wallBoard.getCell(position);
		return wall;
	}
	private rays: Ray<RGBColor>[];
	public resetRays(rayCount: number, viewAngleRadians: number): void {
		const newRays: Ray<RGBColor>[] = Array(rayCount)
			.fill(null)
			.map((_, index) => {
				const inViewPercentage = index / (rayCount - 1);
				const delta: Point = {
					x: Math.tan(viewAngleRadians * (inViewPercentage - 0.5)),
					y: -1,
				};
				const position: Point = {
					x: this.wallBoard.getDimensions().width / 2,
					y: this.wallBoard.getDimensions().height,
				};
				const ticksPassed = 0;
				const ray: Ray<RGBColor> = {
					delta,
					hit: this.getHitAtPosition(position),
					position,
					ticksPassed,
				};
				return ray;
			});
		this.rays = newRays;
	}
	public tick(deltaTimeSeconds: number, speedMultiplier: number): void {
		this.rays = this.rays.map((ray) => this.tickRay(ray, deltaTimeSeconds, speedMultiplier));
	}
	private tickRay(
		ray: Ray<RGBColor>,
		deltaTimeSeconds: number,
		speedMultiplier: number,
	): Ray<RGBColor> {
		if (ray.hit !== null) {
			return ray;
		}
		const newPosition: Point = {
			x: ray.position.x + ray.delta.x * deltaTimeSeconds * speedMultiplier,
			y: ray.position.y + ray.delta.y * deltaTimeSeconds * speedMultiplier,
		};
		const hit = this.getHitAtPosition(newPosition);
		const newRay: Ray<RGBColor> = {
			delta: ray.delta,
			hit,
			position: newPosition,
			ticksPassed: ray.ticksPassed + deltaTimeSeconds,
		};
		return newRay;
	}
	private readonly wallBoard: MutableBoard<null | RGBColor>;
}
