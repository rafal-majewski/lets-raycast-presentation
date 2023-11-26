import type {Point} from "$lib/utils/Point.ts";
import type {RGBColor} from "$lib/utils/RGBColor.ts";
import {blackRGBColor} from "$lib/utils/blackRGBColor.ts";
import {ArrayMutableBoard} from "$lib/utils/board/ArrayMutableBoard.ts";
import type {Board} from "$lib/utils/board/Board.ts";
import type {Scene} from "./Scene.ts";

export function drawScene(scene: Scene): Board<RGBColor> {
	const sceneDimensions = scene.getDimensions();
	const pixelBoard = new ArrayMutableBoard<RGBColor>(sceneDimensions, blackRGBColor);
	for (let pixelPositionY = 0; pixelPositionY < sceneDimensions.height; ++pixelPositionY) {
		for (let pixelPositionX = 0; pixelPositionX < sceneDimensions.width; ++pixelPositionX) {
			const pixelPosition: Point = {x: pixelPositionX, y: pixelPositionY};
			const wall = scene.getWall(pixelPosition);
			if (wall === null) {
				continue;
			}
			pixelBoard.putCell(pixelPosition, wall);
		}
	}
	return pixelBoard;
}
