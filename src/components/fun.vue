<template>
	<transition leave-active-class="animated fadeOut" enter-active-class="animated fadeInUp">
		<div class="img-mask-wrap" v-show="funs" @click.self="noc">
			<div class="fun-icon">
				<div class="icon-font" @click.stop="tou">&#xe706;</div>
				<div class="icon-font" @click.stop="tou">&#xe658;</div>
				<div class="icon-font" @click.stop="tou">&#xe698;</div>
				<div class="icon-font">&#xe64b;</div>
				<div class="icon-font">&#xe678;</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props: ['funs'],
		methods: {
			noc() {
				this.$emit("funH")
			},
			tou(){

			}
		}

	}
</script>

<style scoped lang="scss">

	.img-mask-wrap {
		width: 5.6rem;
		height: 9.64rem;
		position: fixed;
		top: 0;
		z-index: 9999;
		background: #eee;
		.fun-icon{
			width: 2rem;
			margin: .82rem auto;
		}
		.fun-icon>div{
			width: 100%;
			height: 2rem;
			text-align: center;
			line-height: 2rem;
			font-size: .5rem;
		}
	}
</style>