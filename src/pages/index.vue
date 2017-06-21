<template>
	<div id="wrap" ref="wrap">
		<m-header :headShow="overflow">一个</m-header>
		<div class="windows">
			<imgmask :imgmask="imgmaskshow" @imgmaskhide="insetHide" :item ="contentList[0]"></imgmask>
			<fun :funs="funShow" @funH="funHide"></fun>
		</div>
		<transition :enter-active-class="nextPageClass">
			<div class="index-warp" v-touch:right="prePage" v-touch:left="nextPage" v-show="nextPageShow">
				<scroll :data="contentList" @scroll="downSroll" ref='scroll'>
					<div class="hook-warp">
						<div class="index-header" id="title" ref='sign'>
							<h1>{{dataWeather.date}}</h1>
							<h3>{{dataWeather.cityName}}</h3>
						</div>
						<div class="index-content">
							<div class="index-content-list" v-for='item in contentList'>
								<div class="content-type-0" v-if="item.content_type == 0">
									<span class="content-type-0-vof">{{item.share_info.title}}</span>
									<img v-bind:src="item.img_url" @click="inset" />
									<h3>{{item.title}} | {{item.pic_info}}</h3>
									<p class="txt-content">{{item.forward}}</p>
									<p class="page-index">{{item.words_info}}</p>
									<div class="content-foot">
										<span class="foot-subtotal"><span class="icon-font">&#xe69d;</span> 小计</span>
										<span class="foot-like">{{item.like_count}}<is-like></is-like></span>
										<span class="icon-font foot-goto" @click.stop.prevent="fun">&#xe600;</span>
										<p></p>
									</div>
								</div>
								<router-link :to="{path:'/info',query: {id:item.item_id ,type:item.content_type,mid:item.audio_url}}" tag='div'>
									<div class="content-type-1" v-if="item.content_type > 0">
										<h4 v-if="item.tag_list[0]">- {{ item.tag_list[0].title}} -</h4>
										<h4 v-if="showTitle(item)">- {{showTitle(item)}} -</h4>
										<h2>{{item.title}}</h2>
										<h3 class="content-type-0-vof" v-if="item.category !=3">文 /{{item.author.user_name}}</h3>
										<h3 class="content-type-0-vof" v-if="item.category ==3">{{item.answerer.user_name}}答</h3>
										<img v-lazy="item.img_url" :class="{radius:item.category ==4}" class="title-img" v-if='item.category !=4' />
										<div class="music-bg" v-if="item.category ==4">
											<m-music :items="item" :id="item.item_id"></m-music>
										</div>
										<h5 class="music-mes" v-if="item.category ==4">{{item.music_name}} · {{item.audio_author}} | {{item.audio_album}}</h5>
										<p class="txt-content">{{item.forward}}</p>
										<p class="page-index" v-if='item.category ==5'>-- 《{{item.subtitle}}》</p>
										<div class="content-foot">
											<span class="foot-subtotal" v-if='!clickDate'>{{item.post_date |getdate}}小时前</span>
											<span class="foot-subtotal" v-if='clickDate'>{{item.post_date |tratime}}</span>
											<span class="foot-like">{{item.like_count}}<is-like></is-like></span>
											<span class="icon-font foot-goto" @click.stop.prevent="fun">&#xe600;</span>
										</div>
									</div>
								</router-link>
							</div>
							<div class="index-footer" @click="nextPage">
								<img src="../components/index/0a8d3830976d4e1973a726b82286c6c7.jpg" />
							</div>
						</div>
					</div>
				</scroll>
			</div>
		</transition>
		<div class="loading-wrap" v-show="contentList.length < 2">
			<loading></loading>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import '../components/filters.vue'
	import ImgMaskfrom from "../components/index/imgmask.vue"
	import Fun from "../components/fun.vue"
	import bus from '../bus.js'
	export default {
		activated() {

		},
		deactivated() {

		},
		components: {
			imgmask: ImgMaskfrom
		},
		data() {
			return {
				scrollHeight: 0,
				userShow: false,
				nextPageClass: 'animated  fadeOutLeft',
				nextPageShow: true,
				funShow: false,
				imgmaskshow: false,
				overflow: false,
				isLike: {
					is: false
				},
				dateList: ' ',
				clickDate: 0,
				dateIndex: 0,
				onList: '',
				oneListInformation: '',
				dataWeather: {
					date: '',
					cityName: ''
				},
				contentList: [{
					content_type: '', //专栏类型  0 插图
					title: '', //标题  插画
					pic_info: '', //作者 shelia liu
					forward: '', //内容
					words_info: '', //插画编号
					like_count: '', //赞的数量
					img_url: '', // 图片地址,
					share_info: {
						title: '', //vof编号
						content: '' //内容
					},
					tag_list: {
						title: '' //
					},
					auther: {
						user_name: '',
						web_url: ''
					},
					answerer: {
						user_name: ''
					}
				}],
				imgMaskList: {
					title: '',
					pic_info: '',
					img_url: '',
					share_info: {
						title: ''
					}
				}
			}
		},
		created() {
			this.onList = 'http://v3.wufazhuce.com:8000/api/onelist/'
			this.oneListInformation = '%20+%20/0?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android'
			let json
			this.$http.get('http://v3.wufazhuce.com:8000/api/onelist/idlist/?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android')
				.then(
					(data) => {
						this.dateList = data.data.data
						this.$http.get(this.onList + this.dateList[this.dateIndex] + this.oneListInformation)
							.then(
								(data) => {
									setTimeout(() => {
										json = data.data.data
										this.contentList = data.data.data.content_list
										this.dataWeather.date = json.weather.date.replace('-', '/').replace('-', '/') // 2017/06/06
										this.dataWeather.cityName = json.weather.climate + ',' + json.weather.city_name // 对流层，地球
										this.imgMaskList.pic_info = this.contentList[0].pic_info
										this.imgMaskList.img_url = this.contentList[0].img_url
										this.imgMaskList.title = this.contentList[0].title
										this.imgMaskList.share_info.title = this.contentList[0].share_info.title
									}, 20)
								},
								(err) => {
									console.log(err)
								})
					},
					(err) => {
						console.log(err)
					})

		},
		mounted() {},
		methods: {
			funHide() {
				this.funShow = false
			},
			fun() {
				this.funShow = true
			},
			insetHide() {
				this.imgmaskshow = false
			},
			inset() {
				this.imgmaskshow = true
			},
			nextPage() {
				this.clickDate++
					if(this.clickDate > 9) {
						this.clickDate = 0
					}
				if(this.dateIndex > 9) {
					this.dateIndex = 0
				}
				this.nextPageClass = 'animated  fadeOutLeft'
				this.nextPageShow = false
				this.dateIndex++
					this.$http.get(this.onList + this.dateList[this.dateIndex] + this.oneListInformation)
					.then(
						(data) => {
							this.contentList = data.data.data.content_list
							this.dataWeather.date = data.data.data.date.split(' ')[0].replace('-', '/').replace('-', '/') // 2017/06/06
							setInterval(() => {
								this.nextPageShow = true
							}, 20)
						},
						(err) => {
							console.log(err)
						})
			},
			prePage() {
				this.$refs.wrap.scrollTop = 0 // 返回顶部
				this.clickDate--
					if(this.clickDate < 0) {
						this.clickDate = 0
					}
				this.dateIndex--
					if(this.dateIndex < 0) {
						this.dateIndex = 0
						bus.$emit('id-selected', true)
					} else {
						this.nextPageClass = 'animated  fadeOutRight'
						this.nextPageShow = false
						this.$http.get(this.onList + this.dateList[this.dateIndex] + this.oneListInformation)
							.then(
								(data) => {
									this.contentList = data.data.data.content_list
									this.dataWeather.date = data.data.data.date.split(' ')[0].replace('-', '/').replace('-', '/') // 2017/06/06
									setInterval(() => {
										this.nextPageShow = true
									}, 20)
								},
								(err) => {
									console.log(err)
								})
					}

			},
			downSroll(pos) {
				let eleHeight = pos.y
				if(eleHeight < -80) {
					this.overflow = true
					this.$emit("dispaly")
				} else if(eleHeight > -80) {
					this.overflow = false
					this.$emit("nonedispaly")
				}
			},
			showTitle(item) {
				if(!item.tag_list[0] && item.category == 1) {
					return '阅读'
				} else if(!item.tag_list[0] && item.category == 2) {
					return '连载'
				} else if(!item.tag_list[0] && item.category == 3) {
					return '问答'
				} else if(!item.tag_list[0] && item.category == 4) {
					return '音乐'
				} else if(!item.tag_list[0] && item.category == 5) {
					return '影视'
				} else {
					return false
				}
			},
			//			...mapMutations([
			//					setMusic: 'setMusic'
			//				]
			//
			//			)
		}

	}
</script>
<style scoped lang='scss'>
	#wrap {
		background: #eee;
	}

	.header-title {
		width: 2rem;
		font-size: 24px;
		font-weight: 600;
		text-align: center;
		line-height: .88rem;
		height: .88rem;
		position: fixed;
		z-index: 100;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	.index-header {
		background: #fff;
		text-align: center;
		height: 1.2rem;
		padding-top: 10px;
		h1 {
			font-size: .38rem;
			font-weight: 500;
			margin: 0;
		}
		h3 {
			font-size: .24rem;
			font-weight: 500;
			margin: 0;
			line-height: .24rem;
		}
	}

	.content-type-0 {
		background: #fff;
		position: relative;
		font-weight: 500;
		margin-bottom: .2rem;
		.content-type-0-vof {
			position: absolute;
			left: 14px;
			font-size: 18px;
			color: #f3f2ef;
		}
		img {
			width: 5.6rem;
			margin: 0 auto;
			display: block;
		}
		h3 {
			margin-top: .24rem;
			line-height: .22rem;
			text-align: center;
			font-size: .22rem;
			color: #959595;
		}
		.txt-content {
			font-size: .26rem;
			line-height: 2em;
			width: 4rem;
			margin: .4rem auto 0 auto;
		}
		.page-index {
			font-size: .22rem;
			text-align: center;
			margin-top: .58rem;
			line-height: .2rem;
			color: #959595;
		}
		.content-foot {
			margin-top: .54rem;
			font-size: .22rem;
			color: #959595;
			.icon-font {
				font-size: .34rem;
			}
			.foot-heart {
				z-index: 99;
			}
			.foot-subtotal {
				width: 50%;
				display: inline-block;
				padding-left: .3rem;
			}
			.foot-like {
				text-align: right;
				width: 30%;
				display: inline-block;
			}
			.foot-goto {
				width: 16%;
				display: inline-block;
				padding-left: 4%;
				z-index: 10;
			}
		}
	}

	.content-type-1 {
		background: #fff;
		position: relative;
		font-weight: 500;
		margin-bottom: .2rem;
		position: relative;
		h2 {
			font-size: .38rem;
			padding-left: .4rem;
			padding-right: .4rem;
			margin: 0;
			line-height: .38rem;
			font-weight: 500;
		}
		h4 {
			height: .8rem;
			line-height: .8rem;
			text-align: center;
			color: #959595;
			font-size: 22px;
		}
		.title-img {
			width: 4.9rem;
			height: 4rem;
			margin: 0 auto;
			display: block;
		}
		.bg-img {
			position: absolute;
			top: 28%;
			right: 0;
		}
		.xiami {
			position: absolute;
			width: .5rem;
			height: .5rem;
			border-radius: 20%;
			left: 5%;
			bottom: 34%;
		}
		.top-line,
		.btoom-line {
			position: absolute;
			width: 46%;
			height: 1px;
			background: #eee;
			left: 4%;
		}
		.top-line {
			top: 27.1%;
		}
		.radius {
			width: 4rem;
			height: 4rem;
			border-radius: 50%;
		}
		h3 {
			height: 1.1rem;
			line-height: 1.1rem;
			padding-left: .4rem;
			font-size: .26rem;
			color: #959595;
			font-weight: 500;
		}
		.music-mes {
			padding-left: .36rem;
			font-size: .22rem;
			color: #bbb;
			margin-top: .2rem;
			font-weight: 500;
		}
		.txt-content {
			font-size: .26rem;
			line-height: 2em;
			width: 4.9rem;
			margin: .3rem auto 0 auto;
			color: #959595;
		}
		.page-index {
			font-size: .26rem;
			text-align: right;
			line-height: .26rem;
			color: #959595;
		}
		.content-foot {
			margin-top: .54rem;
			font-size: .22rem;
			color: #959595;
			.icon-font {
				font-size: .34rem;
			}
			.foot-heart {
				z-index: 99;
			}
			.foot-subtotal {
				width: 50%;
				display: inline-block;
				padding-left: .3rem;
			}
			.foot-like {
				text-align: right;
				width: 30%;
				display: inline-block;
			}
			.foot-goto {
				width: 16%;
				display: inline-block;
				padding-left: 4%;
				z-index: 10;
			}
		}
	}

	.index-footer {
		padding-bottom: .88rem;
		img {
			height: 5.6rem;
			width: 100%;
			box-shadow: 0 2rem .5rem .2rem #959595;
		}
	}
	.loading-wrap {
		position: fixed;
		top: 0;
		background: #eee;
		width: 5.6rem;
		height: 9rem;
	}
</style>