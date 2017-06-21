<template>
	<transition name='fadein' leave-active-class="animated  fadeOut" enter-active-class="animated slideInDown">
		<div class="img-mask-wrap" v-show="searchmask" @click="noc">
			<div class="img-mask-content">
				<h1>一个搜索</h1>
				<p>搜索引擎就是把字典塞到硅片里</p>
				<input type="" name="" id="" value="" placeholder="请输入" autofocus="autofocus" @click.stop.prevent="info" />
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		data() {
			return {
				show: false
			}
		},
		props: ['searchmask'],
		methods: {
			noc() {
				//				this.$emit("imgmaskhide")
				this.$emit("searchpass")

			},
			info() {

			}
		},
		mounted() {

		}

	}
</script>

<style scoped lang="scss">
	.img-mask-wrap {
		width: 5.6rem;
		height: 9.96rem;
		background: #fff;
		position: fixed;
		top: 0;
		z-index: 999;
		padding-top: 1rem;
		.img-mask-content {
			border-bottom: 2px solid;
			h1,
			p,
			input {
				display: block;
				margin: 0 auto;
				text-align: center;
			}
			h1 {
				width: 1.2rem;
				font-size: .5rem;
				font-weight: 500;
			}
			p {
				color: #959595;
				font-size: .24rem;
				font-weight: 500;
			}
			input {
				border: none;
				margin-top: 2.8rem;
				width: 300;
				outline: none;
				color: #666666;
				font-weight: 500;
				font-size: .24rem;
			}
		}
	}
</style>