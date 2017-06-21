<template>
	<div class="loading">
		<img width="24" height="24" src="./loading.gif">
		<p class="desc">{{title}}</p>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
		props: {
			title: {
				type: String,
				default: '正在载入...'
			}
		}
	}
</script>
<style scoped lang="scss">
	.loading {
		width: 100%;
		text-align: center;
		height: 10rem;
		line-height: 10rem;
	}

	.desc {
		line-height: 20px;
		font-size: 20px;
		color: #959595;
	}
</style>