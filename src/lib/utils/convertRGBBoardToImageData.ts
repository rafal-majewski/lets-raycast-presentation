import type {RGBColor} from "./RGBColor.ts";
import type {Board} from "./board/Board.ts";

export function convertRGBBoardToImageData(rgbBoard: Board<RGBColor>): ImageData {
	const rgbBoardDimensions = rgbBoard.getDimensions();
	const dataArray = new Uint8ClampedArray(
		Array(rgbBoardDimensions.height)
			.fill(null)
			.flatMap((_, y) =>
				Array(rgbBoardDimensions.width)
					.fill(null)
					.flatMap((_, x) => {
						const rgbColor = rgbBoard.getCell({x, y});
						const convertRGBColorChannelValueToInt = (channelValue: number): number => {
							const channelValueInt = Math.round(channelValue * 255);
							return channelValueInt;
						};
						const redInt = convertRGBColorChannelValueToInt(rgbColor.red);
						const greenInt = convertRGBColorChannelValueToInt(rgbColor.green);
						const blueInt = convertRGBColorChannelValueToInt(rgbColor.blue);
						const alphaInt = 255;
						const pixelData = [redInt, greenInt, blueInt, alphaInt];
						return pixelData;
					}),
			),
	);
	const imageData = new ImageData(dataArray, rgbBoardDimensions.width, rgbBoardDimensions.height);
	return imageData;
}
