export function putImageDataInCanvas(canvasElement: HTMLCanvasElement, imageData: ImageData) {
	const canvasContext = canvasElement.getContext("2d");
	if (canvasContext === null) {
		return;
	}
	canvasContext.putImageData(imageData, 0, 0);
}
