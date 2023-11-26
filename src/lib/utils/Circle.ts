import type {Point} from "./Point.ts";

export type Circle = Readonly<{
	center: Point;
	radius: number;
}>;
