<template>
	<span class="icon-font foot-heart" :class="{like:isLike}" @click.stop.prevent="clickLike"> &#xe76a;</span>
</template>

<script>
	export default {
		data() {
			return {
				isLike: false
			}
		},
		methods: {
			clickLike() {
				this.isLike = !this.isLike
			}
		}
	}
</script>

<style >

	.foot-heart{
		font-size: .32rem;
			color: #959595;

	}
	.like {
		color: #ff461f;
	}
</style>