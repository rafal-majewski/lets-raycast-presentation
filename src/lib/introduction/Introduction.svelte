<script lang="ts" strictEvents>
	import blackAndWhiteCatImageRef from "./assets/black-and-white-cat.jpg";
	import electromagneticSpectrumImageRef from "./assets/electromagnetic-spectrum.png";
	import emissionTheoryImageRef from "./assets/emission-theory.jpg";
	import humanEyePhotoreceptorsImageRef from "./assets/human-eye-photoreceptors.webp";
	import humanEyeRetinalResponsesToLightImageRef from "./assets/human-eye-retinal-responses-to-light.png";
	import pixelMonitorImageRef from "./assets/pixel-monitor.jpg";
	import sheetOfPaperImageRef from "./assets/sheet-of-paper.jpg";
	import streetCircularMirrorImageRef from "./assets/street-circular-mirror.jpg";
	import waterSurfaceImageRef from "./assets/water-surface.jpg";
</script>

<article>
	<h1>Let's Raycast</h1>
	<p>A Simple yet Powerful Method for 3D Graphics Rendering</p>
	<section>
		<h2>What Exactly Is Light?</h2>
		<p>
			Light is
			<br />
			a wave
			<br />
			and a particle
			<br />
			This dual nature is called wave-particle duality.
		</p>
		<section>
			<h3>Attributes of Light</h3>
			<ul>
				<li>Speed: 299,792,458 m/s.</li>
				<li>
					Color.
					<br />
					Light is a part of the electromagnetic spectrum.
					<br />
					<img alt="Electromagnetic Spectrum" src={electromagneticSpectrumImageRef} />
					<br />
					It's the only segment perceptible to the naked eye within the spectrum.
				</li>
				<li>
					When light interacts with objects, it can:
					<ul>
						<li>
							Be absorbed.
							<br />
							If an object appears dark under white light, it indicates significant light absorption.
							<br />
							<img alt="Black and White Cat" src={blackAndWhiteCatImageRef} />
						</li>
						<li>
							Reflect.
							<ul>
								<li>
									Maintain the incident angle.
									<br />
									<img alt="Street Circular Mirror" src={streetCircularMirrorImageRef} />
								</li>
								<li>
									Scatter.
									<p>
										With minor angle variations:
										<br />
										<img alt="Water Surface" src={waterSurfaceImageRef} />
									</p>
									<p>
										With major angle deviations:
										<br />
										<img alt="Sheet of Paper" src={sheetOfPaperImageRef} />
									</p>
								</li>
							</ul>
						</li>
						<li>
							Experience partial absorption and reflection.
							<br />
							<img alt="Orange" />
						</li>
					</ul>
				</li>
			</ul>
		</section>
	</section>
	<section>
		<h2>The Mechanism of Sight</h2>
		<img alt="Human Eye Photoreceptors" src={humanEyePhotoreceptorsImageRef} />
		<p>Rod cells function in low light, while cone cells function in high light conditions.</p>
		<img alt="Human Eye Retinal Responses to Light" src={humanEyeRetinalResponsesToLightImageRef} />
		<section>
			<p>Experiment 1:</p>
			<div class="experiment-1">
				<span class="experiment-1__color experiment-1__color--red"></span>
				<span class="experiment-1__color experiment-1__color--green"></span>
				<span class="experiment-1__color experiment-1__color--blue"></span>
				<span class="experiment-1__color experiment-1__color--yellow"></span>
			</div>
		</section>
		<section>
			<p>
				Experiment 2 (homework): Get yourself a red and a cyan object. Enter a dark room with these
				objects. Compare their appearance.
			</p>
		</section>
		<section>
			<h2>Color Display on Computer Monitors</h2>
			<img alt="Pixel Monitor" src={pixelMonitorImageRef} />
		</section>
	</section>
	<section>
		<h2>Historical Trivia - Emission Theory</h2>
		<img alt="Emission Theory" src={emissionTheoryImageRef} />
	</section>
	<section>
		<h2>Rendering 3D Graphics</h2>
		<p>Fact: It's simpler to model light as a particle than as a wave.</p>
		<p>Explore <a href="/light-simulation">light simulation</a>.</p>
	</section>
</article>

<style lang="scss">
	.experiment-1 {
		display: flex;
		gap: 1rem;
	}
	.experiment-1__color {
		width: 8rem;
		height: 8rem;
		border: 1px solid black;
	}
	.experiment-1__color--red {
		background-color: hsl(0, 100%, 50%);
	}
	.experiment-1__color--green {
		background-color: hsl(120, 100%, 50%);
	}
	.experiment-1__color--blue {
		background-color: hsl(240, 100%, 50%);
	}
	.experiment-1__color--yellow {
		background-color: hsl(60, 100%, 50%);
	}
</style>
