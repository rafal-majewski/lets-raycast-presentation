<script lang="ts" strictEvents>
	import Article from "$lib/utils/Article.svelte";
	import Raycasting3DCheckerboardImageRef from "./assets/3d-raycasting-checkerboard.png";
	import Raycasting3DIslandsImageRef from "./assets/3d-raycasting-islands.png";
	import quadtreeImageRef from "./assets/quadtree.png";
	import raytracingBallReflectionImageRef from "./assets/raytracing-ball-reflection.png";
	import raytracingExampleImageRef from "./assets/raytracing-example.png";
	import realPhotoImageRef from "./assets/real-photo.jpg";
</script>

<Article>
	<h1>What Is Next?</h1>
	<br /><br /><br />
	<section>
		<h2>Quadtree</h2>
		<img alt="Quadtree" src={quadtreeImageRef} />
	</section>
	<br /><br /><br /><br /><br /><br />
	<section>
		<h2>Full 3D Raycasting</h2>
		<iframe
			height="632px"
			scrolling="yes"
			src="https://www.geogebra.org/material/iframe/id/exaay44p/width/1360/height/632/border/888888/sfsb/true/smb/false/stb/false/stbh/false/ai/false/asb/false/sri/false/rc/false/ld/false/sdz/false/ctl/false"
			style:--border="0px"
			title="raycasting"
			width="1360px"
		>
		</iframe>
		<br /><br /><br /><br /><br />
		<div>
			<img alt="Full 3D Raycasting Checkberboard" src={Raycasting3DCheckerboardImageRef} />
			<img alt="Full 3D Raycasting Islands" src={Raycasting3DIslandsImageRef} />
		</div>
	</section>
	<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br
	/><br /><br />
	<section>
		<h2>Raytracing</h2>

		<div class="raytracing-image-test">
			<img alt="Raytracing Example" src={raytracingExampleImageRef} />
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img alt="Real Photo" src={realPhotoImageRef} />
		</div>
		<span>Which one is the real photo?</span>
		<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br
		/><br />
		<img alt="Raytracing Ball Reflection" src={raytracingBallReflectionImageRef} />
	</section>
</Article>

<style lang="scss">
	.raytracing-image-test {
		display: flex;
		flex-direction: row;
		width: 35rem;
		> img {
			flex: 1;
		}
	}
</style>
