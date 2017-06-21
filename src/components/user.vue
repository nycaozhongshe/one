<template>
	<div>
	<!--:enter-active-class="animated fadeOutLeft"-->
	<transition name="usbrtran" enter-active-class="animated slideInLeft" leave-active-class="animated slideOutLeft">
		<div class="usbr-wrap" v-show="usbrarg">
			<div class="usbr-title">
				<span class="back icon-font" @click='show'>&#xe610;</span>
				<img src="../assets/sea.jpg" class="sea" />
				<img src="../assets/vzi.jpg" class="icon" />
				<span class="landing">未登录</span>
			</div>
			<div class="usbr-content">
				<dl>
					<dt>设置</dt>
					<dd><span class="icon-font">&#xe61b;</span> <span class="item">夜间模式</span> <input type="checkbox" /></dd>
					<dd><span class="icon-font">&#xe683;</span> <span class="item">其他设置</span><span class="icon-font row"> &#xe606;</span> </dd>
					<dd><span class="icon-font">&#xe616;</span> <span class="item">用户反馈</span><span class="icon-font row"> &#xe606;</span> </dd>
				</dl>
			</div>
		</div>
	</transition>

	</div>
</template>
<script>
	import bus from '../bus.js'
//	import
	export default {
		props: ['usbrarg', 'bbaa'],
		methods: {
			show() {
				this.$emit('usbrpass')
			}
		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	/*.usbrtran-enter-active {
		animation: slide-in-left .5s;
	}
	.usbrtran-leave-active {
		transition: all .1s
	}*/

	.usbr-wrap {
		width: 5.6rem;
		height: 9.94rem;
		position: fixed;
		top: 0;
		z-index: 999;
		background: #fff;
		font-size: .28rem;
		font-weight: 500;
		.icon-font {
			font-size: .4rem;
			color: #aaa;
		}
		.icon {
			width: 1.3rem;
			height: 1.3rem;
			border-radius: 50%;
			position: absolute;
			top: 7%;
			left: 50%;
			transform: translateX(-50%);
		}
		.sea {
			width: 100%;
			height: 2.8rem;
			display: block;
		}
		.back {
			position: absolute;
			top: 1%;
			color: #fff;
			left: 3%;
			font-size: .36rem;
		}
		.landing {
			position: absolute;
			top: 21%;
			color: #fff;
			left: 50%;
			transform: translateX(-50%);
		}
		.usbr-content {
			input {
				width: .4rem;
				height: .4rem;
				vertical-align: middle;
			}
			dt {
				color: #959595;
				font-size: .22rem;
				height: .7rem;
				background: #eee;
				line-height: .7rem;
				padding-left: .2rem;
			}
			dd {
				padding-left: .2rem;
				height: .9rem;
				border-bottom: 1px solid #eee;
				line-height: .9rem;
				.item {
					padding-left: 4%;
					display: inline-block;
					width: 78%;
				}
			}
			.row {
				font-size: .28rem;
			}
		}
	}


</style>