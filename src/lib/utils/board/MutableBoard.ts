import type {Point} from "$lib/utils/Point.ts";
import type {Board} from "./Board.ts";

export interface MutableBoard<BoardElement> extends Board<BoardElement> {
	putCell(position: Point, boardElement: BoardElement): void;
}
