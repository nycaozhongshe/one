<template>
	<div class="info-nav-wrap">
		<fun :funs="funShow" @funH="funHide"></fun>
		<div class="info-nav-head">
			<!--<router-link class="icon-font back" tag='span' to='/laout/index'>&#xe62c;</router-link>-->
			<span class="icon-font back" tag='span' to='/laout/index' @click='goto'>&#xe62c;</span>
			<span class="title" @click="backInfo">{{title}}</span>
			<span class="icon-font" @click="funS">&#xe600;</span>
		</div>
		<div class="info-nav-foot">
			<div class="icon-wrap">
				<is-like class="aaa"></is-like>
				<tag></tag>
				<m-comment></m-comment>
				<span class="icon-txt">{{praisenum}} 喜欢  · <span>{{commentnum}} 评论</span></span>
				<span class="width100"></span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				funShow: false
			}
		},
		props: ['title', 'commentnum', 'praisenum'],
		methods: {
			goto() {
				this.$emit('gotopass')
			},
			funHide() {
				this.funShow = false
			},
			funS() {
				this.funShow = true
			},
			backInfo() {
				this.$emit('infopass')
			}
		}

	}
</script>

<style lang="scss" scoped>
	.info-nav-wrap {
		.icon-font {
			font-size: .36rem;
			/*color: #959595;*/
		}
		.info-nav-head,
		.info-nav-foot {
			padding-left: .4rem;
			padding-right: .4rem;
			width: 100%;
			height: .9rem;
			line-height: .9rem;
			position: fixed;
			background: #fff;
			border-bottom: 1px solid #eee;
			z-index: 99;
		}
		.info-nav-head {
			top: 0;
			.back {}
			.title {
				width: 3.8rem;
				display: inline-block;
				text-align: center;
				font-size: 28px;
				font-weight: 500;
			}
		}
		.info-nav-foot {
			color: #777;
			bottom: 0;
			padding-left: .4rem;
			.icon-wrap {
				display: inline-block;
				width: 5rem;
				text-align: justify;
				.width100 {
					width: 100%;
					display: inline-block;
				}
				.icon-txt {
					display: inline-block;
					width:2.8rem;
					text-align: center;
					font-size: .24rem;
					font-weight: 500;
				}
			}
		}
	}
</style>