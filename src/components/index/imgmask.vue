<template>
	<transition name='fadein' leave-active-class="animated  fadeOut" enter-active-class="animated fadeInDown">
		<div class="img-mask-wrap" v-show="imgmask" @click="noc">
			<div class="img-mask-content">
				<h3>{{item.volume}}</h3>
				<img :src="item.img_url" alt="" />
				<p>{{item.title}}|{{item.pic_info}}</p>
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
		props: ['imgmask','item'],
		methods: {
			noc() {
				this.$emit("imgmaskhide")
			}
		},
		mounted() {
			console.log(this.item)
		}
	}
</script>

<style scoped lang="scss">
	.img-mask-wrap {
		width: 5.6rem;
		height: 10rem;
		background: rgba(50, 50, 50, .9);
		position: fixed;
		top: 0;
		z-index: 999;
		padding-top: 1rem;
		.img-mask-content {
			width:88%;
			margin: 0 auto;
			h3,
			p {
				color: #fff;
				font-size: .24rem;
				font-weight: 500;
				padding-left: .1rem;
				margin-bottom: .2rem;
			}
			img {
				width: 100%;
				margin-bottom: .2rem;
			}
		}
	}
</style>