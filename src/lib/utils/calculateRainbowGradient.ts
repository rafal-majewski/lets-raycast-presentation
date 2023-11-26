import type {RGBColor} from "$lib/utils/RGBColor.ts";

export function calculateRainbowGradient(percentage: number): RGBColor {
	const normalizedPercentage = ((percentage % 1) + 1) % 1;
	const red =
		normalizedPercentage < 1 / 6
			? 1
			: normalizedPercentage < 2 / 6
			  ? 1 - (normalizedPercentage - 1 / 6) / (1 / 6)
			  : normalizedPercentage < 4 / 6
			    ? 0
			    : normalizedPercentage < 5 / 6
			      ? (normalizedPercentage - 4 / 6) / (1 / 6)
			      : 1;
	const green =
		normalizedPercentage < 1 / 6
			? normalizedPercentage / (1 / 6)
			: normalizedPercentage < 3 / 6
			  ? 1
			  : normalizedPercentage < 4 / 6
			    ? 1 - (normalizedPercentage - 3 / 6) / (1 / 6)
			    : 0;
	const blue =
		normalizedPercentage < 2 / 6
			? 0
			: normalizedPercentage < 3 / 6
			  ? normalizedPercentage / (1 / 6)
			  : normalizedPercentage < 5 / 6
			    ? 1
			    : normalizedPercentage < 6 / 6
			      ? 1 - (normalizedPercentage - 5 / 6) / (1 / 6)
			      : 0;
	const rainbowGradient: RGBColor = {
		blue,
		green,
		red,
	};
	return rainbowGradient;
}
