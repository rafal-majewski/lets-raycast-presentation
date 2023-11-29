<div class="article-wrapper">
	<article class="article">
		<slot />
	</article>
</div>

<style lang="scss">
	.article-wrapper {
		display: flex;
		justify-content: center;
		padding: 4rem;
	}
	.article {
		max-width: 80rem;
	}
</style>
