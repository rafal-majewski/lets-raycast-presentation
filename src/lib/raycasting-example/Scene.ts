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
	private readonly rays: Ray[];
	private readonly wallBoard: MutableBoard<null | RGBColor>;
}
