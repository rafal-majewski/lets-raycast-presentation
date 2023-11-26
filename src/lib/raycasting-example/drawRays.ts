import type {RGBColor} from "$lib/utils/RGBColor.ts";
import {blackRGBColor} from "$lib/utils/blackRGBColor.ts";
import {ArrayMutableBoard} from "$lib/utils/board/ArrayMutableBoard.ts";
import type {Board} from "$lib/utils/board/Board.ts";
import type {Ray} from "./Ray.ts";

export function drawRays(
	rays: readonly Ray<RGBColor>[],
	height: number,
	simulatedVerticalViewAngleRadians: number,
	wallHeight: number,
): Board<RGBColor> {
	const pixelBoard = new ArrayMutableBoard<RGBColor>(
		{
			height,
			width: rays.length,
		},
		blackRGBColor,
	);
	for (const [rayIndex, ray] of rays.entries()) {
		if (ray.hit === null) {
			continue;
		}
		const lineHeight =
			(wallHeight / ray.ticksPassed) * Math.cos(simulatedVerticalViewAngleRadians / 2);
		const lineTop = Math.round((height - lineHeight) / 2);
		const lineBottom = Math.round(height - (height - lineHeight) / 2);
		for (let pixelPositionY = lineTop; pixelPositionY <= lineBottom; ++pixelPositionY) {
			try {
				pixelBoard.putCell({x: rayIndex, y: pixelPositionY}, ray.hit);
			} catch {
				// Ignore.
			}
		}
	}
	return pixelBoard;
}
