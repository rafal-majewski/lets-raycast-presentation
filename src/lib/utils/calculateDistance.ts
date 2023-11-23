import type {Point} from "./Point.ts";

export function calculateDistance(point1: Point, point2: Point): number {
	const differenceX = point1.x - point2.x;
	const differenceY = point1.y - point2.y;
	const distance = Math.sqrt(differenceX * differenceX + differenceY * differenceY);

	return distance;
}
