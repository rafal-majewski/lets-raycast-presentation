import type {Dimensions} from "$lib/utils/Dimensions.ts";
import type {Point} from "$lib/utils/Point.ts";
import type {MutableBoard} from "./MutableBoard.ts";

export class ArrayMutableBoard<BoardElement> implements MutableBoard<BoardElement> {
	private readonly cells: BoardElement[][];
	public constructor(dimensions: Dimensions, initialBoardElement: BoardElement) {
		this.dimensions = dimensions;
		this.cells = Array(dimensions.height)
			.fill(null)
			.map(() => Array<BoardElement>(dimensions.width).fill(initialBoardElement));
	}
	private readonly dimensions: Dimensions;
	public getCell(position: Point): BoardElement {
		const row = this.cells[position.y];
		if (row === undefined) {
			throw new Error(`Invalid row.`);
		}
		const element = row[position.x];
		if (element === undefined) {
			throw new Error(`Invalid column.`);
		}
		return element;
	}
	public getDimensions(): Dimensions {
		return this.dimensions;
	}
	public putCell(position: Point, boardElement: BoardElement): void {
		const row = this.cells[position.y];
		if (row === undefined) {
			throw new Error(`Invalid row.`);
		}
		row[position.x] = boardElement;
	}
}
