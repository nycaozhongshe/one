<template>
	<div id="title">
		<m-header :headShow="true">一个影视</m-header>
		<fun :funs="funShow" @funH="funHide"></fun>
		<scroll :data='contentList' @scrollToEnd="refresh" :callbackTop='2'>
			<div class="index-content" id="sss">
				<div class="index-content-list" v-for='(item,index) in contentList'>
					<router-link :to="{path:'/info',query: {id:item.item_id ,type:item.content_type,mid:item.audio_url}}" tag='div'>
						<div class="content-type-1" v-if="item.content_type > 0">
							<a :href="item.share_info.url">
								<h4 v-if="item.tag_list[0]">- {{ item.tag_list[0].title}} -</h4>
								<h4 v-if="showTitle(item)">- {{showTitle(item)}} -</h4>
								<h2>{{item.title}}</h2>
								<h3 class="content-type-0-vof" v-if="item.category !=3">文 /{{item.author.user_name}}</h3>
								<h3 class="content-type-0-vof" v-if="item.category ==3">{{item.answerer.user_name}}答</h3>
								<img v-lazy="item.img_url" class="title-img" v-if="item.category !=4" />
								<div class="music-bg" v-if="item.category ==4">
									<div class="top-line"></div>
									<img v-lazy="item.img_url" class="title-img radius" />
									<img src="http://tc-html5dw-com.b0.upaiyun.com/b9a83/b9a833f0da14be3bd036fa42874738fe.png" class="bg-img" />
									<div class="btoom-line"></div>
									<img src="http://tc-html5dw-com.b0.upaiyun.com/c0811/c08116281076014b18dff8dfa162760a.jpg" alt="" class="xiami" />
								</div>
								<h5 class="music-mes" v-if="item.category ==4">{{item.music_name}} · {{item.audio_author}} | {{item.audio_album}}</h5>
								<p class="txt-content">{{item.forward}}</p>
								<p class="page-index" v-if='item.category ==5'>-- 《{{item.subtitle}}》</p>
								<div class="content-foot">
									<span class="foot-subtotal">{{item.post_date |tratime}}</span>
									<span class="foot-like">{{item.like_count}}<is-like></is-like></span>
									<span class="icon-font foot-goto" @click.stop.prevent="fun">&#xe600;</span>
								</div>
							</a>
						</div>
					</router-link>
				</div>
				<a href="#title">
					<div class="index-footer" @click="refresh">
						<img src="http://tc-html5dw-com.b0.upaiyun.com/0a8d3/0a8d3830976d4e1973a726b82286c6c7.jpg" />
						<div class="end"></div>
					</div>
				</a>
			</div>
		</scroll>
	</div>
</template>

<script>
	import Vue from 'vue'
	import '../components/filters.vue'
	export default {
		data() {
			return {
				funShow: false,
				isLike: {
					is: false
				},
				dateList: ' ',
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
				}]
			}
		},
		created() {
			this.$http.get('http://v3.wufazhuce.com:8000/api/channel/movie/more/0?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android')
				.then(
					(data) => {
						this.contentList = data.data.data
						this.dateIndex = this.contentList[this.contentList.length - 1].id
					},
					(err) => {
						console.log(err)
					})
		},
		methods: {
			funHide() {
				this.funShow = false
			},
			fun() {
				this.funShow = true
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
			nextPage() {

			},
			refresh() {
				this.onList = 'http://v3.wufazhuce.com:8000/api/channel/movie/more/'
				this.oneListInformation = '?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android'
				this.$http.get(this.onList + this.dateIndex + this.oneListInformation)
					.then(
						(data) => {
							this.contentList = this.contentList.concat(data.data.data)
							this.dateIndex = this.contentList[this.contentList.length - 1].id
						},
						(err) => {
							console.log(err)
						})
			}
		},
		watch: {
			dateIndex: {
				handler() {

				},
				deep: true
			}
		}

	}
</script>

<style scoped lang='scss'>
	.header {
		background: #fff;
		border-bottom: 1px solid #eee;
		background: #fff;
		position: fixed;
		z-index: 99;
		top: 0;
		width: 100%;
		.header-search,
		.header-user,
		.header-title {
			float: left;
			text-align: center;
			line-height: .88rem;
			height: .88rem;
		}
		.header-title {
			width: 76%;
			font-size: 24px;
			font-weight: 600;
		}
		.header-search,
		.header-user {
			width: 12%;
			font-size: .36rem;
		}
		,
		.header-search {
			float: right;
		}
	}

	.index-content {
		padding-top: .88rem;
		padding-bottom: .88rem;
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
			height: 3.6rem;
			margin: 0 auto;
			display: block;
			position: relative;
		}
		.bg-img {
			position: absolute;
			top: 4%;
			right: 0;
		}
		.music-bg {
			position: relative;
			height: 4.3rem;
			width: 100%;
		}
		.xiami {
			position: absolute;
			width: 50px;
			height: 50px;
			border-radius: 20%;
			left: 5%;
			bottom: 10%;
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
			top: 0;
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
				width: 60%;
				display: inline-block;
				padding-left: .3rem;
			}
			.foot-like {
				width: 20%;
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
		height: 5.41rem;
		margin-bottom: .9rem;
		img {
			width: 100%;
		}
		.end {
			width: 100%;
			height: 4px;
			background: #888e7e;
		}
	}
</style>