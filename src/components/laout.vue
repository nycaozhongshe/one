<template>
	<div class="one-wrap" id='one-wrap' ref="wrap">
		<div class="content">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
		<div class="footer">
			<div class="footer-list clearfix">
				<router-link to='/laout/index'>
					<div class="footer-itme icon-font footer-itme-1">&#xe601;</div>
				</router-link>
				<router-link to='/laout/book'>
					<div class="footer-itme icon-font footer-itme-2">&#xe616;</div>
				</router-link>
				<router-link to='/laout/music'>
					<div class="footer-itme icon-font footer-itme-3">&#xe63d;</div>
				</router-link>
				<router-link to='/laout/video'>
					<div class="footer-itme icon-font footer-itme-4">&#xe652;</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import IsLike from './index/islike.vue'
	import ImgMaskfrom from './index/imgmask.vue'
	import Fun from './fun.vue'
	import MHeader from './head.vue'
	import mMusic from './musicplayer.vue'
	import bMusic from './builtmusic.vue'
	import scroll from './scroll.vue'
	import loading from './loading/loading.vue'
	Vue.component('loading', loading)
	Vue.component('scroll', scroll)
	Vue.component('mMusic', mMusic)
	Vue.component('bMusic', bMusic)
	Vue.component('isLike', IsLike)
	Vue.component('Fun', Fun)
	Vue.component('MHeader', MHeader)
	export default {

	}
</script>

<style lang="scss">
	.one-wrap {
		overflow: hidden;
	}

	.footer {
		width: 100%;
		position: fixed;
		bottom: 0;
		border-top: 1px solid #eee;
		background: #fff;
		.footer-itme {
			height: .9rem;
			line-height: .9rem;
			width: 25%;
			float: left;
			text-align: center;
			vertical-align: middle;
			font-size: .5rem;
		}
		.footer-itme-1 {
			font-weight: 700;
		}
		.footer-itme-2 {
			font-weight: 300;
		}
		.footer-itme-3 {
			line-height: .86rem;
			font-size: .56rem;
		}
		.footer-itme-4 {
			font-size: .36rem;
		}
		.router-link-active {
			color: red;
		}
	}
</style>