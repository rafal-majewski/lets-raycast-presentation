import type {Circle} from "$lib/utils/Circle.ts";
import type {Point} from "$lib/utils/Point.ts";
import type {MutableBoard} from "$lib/utils/board/MutableBoard.ts";
import {checkIsPointInsideCircle} from "$lib/utils/checkIsPointInsideCircle.ts";

export function paintCircleInMutableBoard<BoardElement>(
	mutableBoard: MutableBoard<BoardElement>,
	circle: Circle,
	paint: (position: Point) => BoardElement,
): void {
	const leftRightCorner: Point = {
		x: Math.round(circle.center.x - circle.radius),
		y: Math.round(circle.center.y - circle.radius),
	};
	const rightLeftCorner: Point = {
		x: Math.round(circle.center.x + circle.radius),
		y: Math.round(circle.center.y + circle.radius),
	};
	for (let currentY = leftRightCorner.y; currentY <= rightLeftCorner.y; ++currentY) {
		for (let currentX = leftRightCorner.x; currentX <= rightLeftCorner.x; ++currentX) {
			const currentPosition: Point = {x: currentX, y: currentY};
			if (checkIsPointInsideCircle(currentPosition, circle)) {
				const paintResult = paint(currentPosition);
				mutableBoard.putCell(currentPosition, paintResult);
			}
		}
	}
}
