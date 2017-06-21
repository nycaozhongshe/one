<template>
	<div class="app-wrap">
		<!--<audio :src="imgsrc" ref="audios" loop="false" id="audios"></audio>-->
		<div class="music-info" @click.stop.prevent="info" v-if='show'>
			<div class="disc">
				<div class="dot">
				</div>
			</div>
			<div class="disc-warp">
				<img src="./assets/musicbanner.jpg" :class="{transition:play}" v-show="play" />
			</div>
		</div>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
	import Vue from 'vue'
	import bus from './bus.js'
	import { mapGetters } from 'vuex'

	export default {
//		computed: {
//			...mapGetters([
//				'songId',
//				'play'
//			])
//		},
//		watch: {
//			play: {
//				handler(val) {
//					if(val) {
//						this.$refs.audios.play()
//						this.show = true
//					} else {
//						this.$refs.audios.pause()
//						this.show = true
//					}
//				},
//				deep: true
//			}
//		},
		data() {
			return {
				show: false,
//				imgsrc: '../img/m.mp3',
				down: false,
				index: 0,
			}
		},
		created() {
			function setRem(pw, pr) {
				var html = document.getElementsByTagName("html")[0];
				var ww = document.body.clientWidth || document.documentElement.clientWidth;
				html.style.fontSize = ww * pr / pw + "px";
			}
			setRem(560, 100)
		},
		mounted() {
//			this.$refs.audios.addEventListener("canplay", () => {
//
//			});
//			this.$refs.audios.addEventListener("ended", () => {
//
//			});
		},
		methods: {
			startplay() {
				this.$refs.audios.play()
			}
		}
	}
</script>

<style lang="scss">
	@import url("cormalize.css");
	.fade-enter-active,
	.fade-leave-active {
		transition: all .5s ease;
	}

	.fade-enter,
	.fade-leave-active {
		transform: translateY(-.88rem);
	}

	html {
		font-size: 100px;
		font-family: "楷体", "楷体_GB2312";
		/*font-family:   sans-serifHelvetica, 'Hiragino Sans GB', 'Microsoft Yahei','微软雅黑',Arial;*/
		/*		word-spacing:.1em;*/
		letter-spacing: .1rem;
		/*overflow: hidden;*/
	}

	::-webkit-scrollbar {
		/*padding-left: 1px;*/
		/*border-left: 1px solid #d5d5d5;*/
		background-color: #fafafa;
		overflow: visible;
		width: 0px;
	}

	::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, .2);
		background-clip: padding-box;
		/*border: 1px solid transparent;*/
		/*border-left-width: 2px;*/
		min-height: 15px;
		box-shadow: inset 1px 1px 0 rgba(0, 0, 0, .1), inset 0 -1px 0 rgba(0, 0, 0, .07);
	}

	::-webkit-scrollbar-thumb:vertical:hover {
		background-color: rgba(0, 0, 0, .3);
	}

	::-webkit-scrollbar-thumb:vertical:active {
		background-color: rgba(0, 0, 0, .5);
	}

	::-webkit-scrollbar-button {
		height: 0;
		width: 0;
	}

	::-webkit-scrollbar-track {
		background-clip: padding-box;
		border: solid transparent;
		border-width: 0 0 0 4px;
	}

	::-webkit-scrollbar-corner {
		background: transparent;
	}

	body {
		font-size: 16px;
		/*background: #eee;*/
	}

	@font-face {
		font-family: 'iconfont';
		/* project id 329754 */
		src: url('https://at.alicdn.com/t/font_j2vi820ata7fd2t9.eot');
		src: url('https://at.alicdn.com/t/font_j2vi820ata7fd2t9.eot?#iefix') format('embedded-opentype'), url('https://at.alicdn.com/t/font_j2vi820ata7fd2t9.woff') format('woff'), url('https://at.alicdn.com/t/font_j2vi820ata7fd2t9.ttf') format('truetype'), url('https://at.alicdn.com/t/font_j2vi820ata7fd2t9.svg#iconfont') format('svg');
	}

	.icon-font {
		font-family: 'iconfont';
	}

	.music-info {
		position: fixed;
		z-index: 999;
		top: 24%;
		right: 0;
		.disc {
			width: .4rem;
			height: .4rem;
			background: #000000;
			border: 4px solid #fff;
			border-radius: 50%;
			position: absolute;
			z-index: 9999;
			left: -.2rem;
			.dot {
				width: .04rem;
				height: .04rem;
				background: #fff;
				position: absolute;
				left: 50%;
				bottom: 50%;
				border-radius: 50%;
				transform: translate(-50%, 50%);
			}
		}
		.disc-warp {
			width: .54rem;
			height: .38rem;
			background: #a3a3a3;
			overflow: hidden;
			img {
				width: 2rem;
				height: .38rem;
				transform: translateX(-1rem);
				margin-left: -1rem;
			}
		}
	}

	.transition {
		-webkit-animation: tran 1s linear infinite;
	}

	@-webkit-keyframes tran {
		0% {
			-webkit-transform: translatex(0);
		}
		/*50% {
			-webkit-transform:  translatex(-.7rem);
		}*/
		100% {
			-webkit-transform: translatex(-.2rem);
		}
	}

	.icon-font {
		font-family: 'iconfont';
	}
</style>