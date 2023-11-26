import type {Point} from "$lib/utils/Point.ts";

export type Ray = Readonly<{
	delta: Point;
	position: Point;
	ticksPassed: number;
}>;
