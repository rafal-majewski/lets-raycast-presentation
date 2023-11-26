import type {Dimensions} from "$lib/utils/Dimensions.ts";
import type {Point} from "$lib/utils/Point.ts";

export interface Board<BoardElement> {
	getCell(position: Point): BoardElement;
	getDimensions(): Dimensions;
}
