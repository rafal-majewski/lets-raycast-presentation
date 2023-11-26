import type {Circle} from "./Circle.ts";
import type {Point} from "./Point.ts";
import {calculateDistance} from "./calculateDistance.ts";

export function checkIsPointInsideCircle(point: Point, circle: Circle): boolean {
	const distanceFromPointToCircleCenter = calculateDistance(point, circle.center);
	const isPointInsideCircle = distanceFromPointToCircleCenter <= circle.radius;

	return isPointInsideCircle;
}
