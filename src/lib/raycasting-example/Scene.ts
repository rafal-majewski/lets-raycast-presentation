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
	public getRays(): readonly Ray[] {
		return this.rays;
	}
	public getWall(position: Point): null | RGBColor {
		const wall = this.wallBoard.getCell(position);
		return wall;
	}
	private rays: Ray[];
	public resetRays(rayCount: number, viewAngleRadians: number): void {
		const newRays: Ray[] = Array(rayCount)
			.fill(null)
			.map((_, index) => {
				const inViewPercentage = index / (rayCount - 1);
				const delta: Point = {
					x: Math.tan(viewAngleRadians * (inViewPercentage - 0.5)),
					y: -1,
				};
				const position: Point = {
					x: this.wallBoard.getDimensions().width / 2,
					y: this.wallBoard.getDimensions().height / 2,
				};
				const ticksPassed = 0;
				const ray: Ray = {
					delta,
					position,
					ticksPassed,
				};
				return ray;
			});
		this.rays = newRays;
	}
	private readonly wallBoard: MutableBoard<null | RGBColor>;
}
