import type {Point} from "$lib/utils/Point.ts";

export type Ray<Hit> = Readonly<{
	delta: Point;
	hit: Hit | null;
	position: Point;
	ticksPassed: number;
}>;
