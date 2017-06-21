<template>
	<span class="icon-font foot-heart" :class="{like:isLike}" @click="clickLike">&#xe61e;</span>
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

<style>
	/*.like {
		color: #ff461f;
	}*/
</style>