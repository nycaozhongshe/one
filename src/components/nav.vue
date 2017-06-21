<template>
	<div class="icon-font footer-itme footer-itme-3" :class="{fontnoc:isLike}" @click="clickLike">
		<slot></slot>
	</div>
</template>

<script>
	export default{
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
<style scoped lang="scss">

</style>