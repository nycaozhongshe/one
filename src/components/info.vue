<template>
	<div class="info-wrap" ref='info'>
		<!--:title="contentList.tag_list[0].title"-->
		<info-nav :praisenum="contentList.praisenum" :commentnum="contentList.commentnum" @infopass='backTop' @gotopass="gotohistory"></info-nav>
		<div class="i-warp" v-if="typeIndex!= 4">
			<div class="info">
				<h2 class="info-title">{{contentList.hp_title}}</h2>
				<div class="line"></div>
				<h4 class="info-subtitle">文 / {{contentList.hp_author}}</h4>
				<div class="info-content" v-html="contentList.hp_content"></div>
				<p class="info-editor">{{contentList.hp_author_introduce}} {{contentList.editor_email}}</p>
			</div>
			<div class="info-foot">
				<h4 class="info-subtitle">作者</h4>
				<div class="subline"></div>
				<div class="auther">
					<img :src="contentList.author[0].web_url" class="head" />
					<div class="auther-info">
						<h5>{{contentList.hp_author}}</h5>
						<p>{{contentList.auth_it}}</p>
					</div>
					<div class="botton">
						<focus></focus>
					</div>
				</div>
			</div>
		</div>
		<div class="i-warp" v-if="typeIndex ==4">
			<b-music :items="contentList" :id='mid'></b-music>
			<div class="info">
				<!--{{contentList.title}}-->
				<div class="singer-title">·{{contentList.title}}·</div>
				<div class="singer-title"> {{contentList.author.user_name}}|{{contentList.title}}</div>
				<h2 class="info-title">{{contentList.story_title}}</h2>
				<div class="line"></div>
				<h4 class="info-subtitle">文 / {{contentList.story_author.user_name}}</h4>
				<p class="info-content" v-html="contentList.story"></p>
				<p class="info-editor">{{contentList.charge_edt}} : {{contentList.editor_email}}</p>
			</div>
			<div class="info-foot">
				<h4 class="info-subtitle">作者</h4>
				<div class="subline"></div>
				<div class="auther">
					<img :src="contentList.story_author.web_url" class="head" />
					<div class="auther-info">
						<h5>{{contentList.story_author.user_name}}{{contentList.story_author.wb_name}}</h5>
						<p>{{contentList.story_author.summary}}</p>
					</div>
					<div class="botton">
						<focus></focus>
					</div>
				</div>
			</div>
		</div>
		<!--<div class="recommended">
			<h4 class="info-subtitle">相关推荐</h4>
			<div class="subline"></div>
			<div class="recommended-list">

			</div>
		</div>-->
		<div class="comment">
			<h4 class="info-subtitle">评论列表</h4>
			<div class="subline"></div>
			<div class="recommended-list" v-for="item in commentList">
				<div class="usber-msg">
					<img :src="item.user.web_url" alt="" />
					<span class="usber-name">{{item.user.user_name}} </span>
					<span>{{item.input_date |tratime}}</span>
				</div>
				<div class="usber-content">
					{{item.content}}
				</div>
				<div class="box">
					<m-comment></m-comment>
				</div>

				<div class="usber-foot">
				</div>
			</div>
		</div>
		<div class="loading-wrap" v-show="contentList.length">
			<loading></loading>
		</div>
	</div>

</template>

<script>
	import Vue from 'vue'
	import infoNav from '../components/infonav.vue'
	Vue.component('infoNav', infoNav)
	import tag from '../components/tag.vue'
	Vue.component('tag', tag)
	import mComment from '../components/comment.vue'
	Vue.component('mComment', mComment)
	import focus from '../components/focus.vue'
	Vue.component('focus', focus)
	import '../components/filters.vue'
	//	import { mapGetters } from 'vuex'
	export default {
		watch: {

		},
		activated() {
			this.typeIndex = this.$route.query.type
			if(this.$route.query.type != 4) {
				this.getoneapi()
				this.getonecomment()
			} else {
				this.getfourapi()
				this.getfourcomment()
			}

		},
		data() {
			return {
				contentList: {},
				commentList: [],
				typeIndex: 1,
				id: '',
				mid: '',
			}
		},
		created() {
			this.typeIndex = this.$route.query.type
			this.mid = this.$route.query.mid
			if(this.$route.query.type != 4) {
				this.getoneapi()
				this.getonecomment()
			} else {
				this.getfourapi()
				this.getfourcomment()
			}
		},
		mounted() {
			$('img').css('width', '5rem')
		},
		methods: {
			gotohistory() {
				window.history.go(-1)
			},
			backTop() {
				console.log(this.$refs.info.scrollTop)
				this.$refs.info.scrollTop = 0
			},
			getoneapi() {
				const api = 'http://v3.wufazhuce.com:8000/api/essay/'
				const msg = '?channel=wdj&source=channel_reading&source_id=9264&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android'
				this.$http.get(api + this.$route.query.id + msg)
					.then(
						(data) => {
							this.contentList = data.data.data
						},
						(err) => {
							console.log(err)
						})
			},
			getonecomment() {
				const api = 'http://v3.wufazhuce.com:8000/api/comment/praiseandtime/essay/'
				const msg = '/0?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android'
				this.$http.get(api + this.$route.query.id + msg)
					.then(
						(data) => {
							this.commentList = data.data.data.data
						},
						(err) => {
							console.log(err)
						})
			},
			getfourapi() {
				const api = 'http://v3.wufazhuce.com:8000/api/music/detail/'
				const msg = '?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android'
				this.$http.get(api + this.$route.query.id + msg)
					.then(
						(data) => {
							this.contentList = data.data.data
							//							console.log(this.id)
						},
						(err) => {
							console.log(err)
						})
			},
			getfourcomment() {
				const api = 'http://v3.wufazhuce.com:8000/api/comment/praiseandtime/music/'
				const msg = '/0?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android'
				this.$http.get(api + this.$route.query.id + msg)
					.then(
						(data) => {
							this.commentList = data.data.data.data
						},
						(err) => {
							console.log(err)
						})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.loading-wrap {
		position: fixed;
		top: 0;
		background: #eee;
		width: 5.6rem;
		height: 9rem;
	}

	.fr-fil {
		width: 5rem;
	}

	img {
		width: 5rem;
		display: block;
	}

	.info-wrap {
		width: 5.6rem;
		margin-top: 1.3rem;
		overflow: hidden;
		.subline {
			width: 1.6rem;
			height: .06rem;
			background: #000;
			margin-top: .2rem;
			margin-bottom: .2rem;
		}
		.info-subtitle {
			font-size: .28rem;
			font-weight: 500;
		}
		.info {
			padding-left: .4rem;
			padding-right: .4rem;
			margin-top: .6rem;
			.singer-title {
				text-align: center;
				color: #959595;
				font-size: .24rem;
				font-weight: 500;
				margin-bottom: .5rem;
				margin-top: -.5rem;
			}
			.info-title {
				font-size: .44rem;
				font-weight: 500;
				margin: 0;
				margin-bottom: .4rem;
			}
			.line {
				width: 1.6rem;
				height: .1rem;
				background: #000;
				margin-bottom: .4rem;
			}
			.info-subtitle {
				font-size: .3rem;
				font-weight: 500;
				margin-bottom: .6rem;
			}
			.info-content {
				font-size: .3rem;
				font-weight: 500;
				margin-bottom: .6rem;
			}
			.info-editor {
				font-size: .2rem;
				font-weight: 500;
				color: #aaa;
				margin-bottom: .6rem;
			}
		}
		.botton {
			width: 18%;
			display: inline-block;
			vertical-align: top;
			margin-top: .2rem;
			margin-left: .2rem;
			height: .58rem;
			line-height: .58rem;
			font-weight: 500;
			text-align: center;
		}
		.info-foot {
			padding-left: .4rem;
			padding-right: .4rem;
			font-size: .24rem;
			margin-bottom: 1rem;
			.auther {
				img {
					width: 20%;
					border-radius: 50%;
					vertical-align: top;
				}
			}
			.auther-info {
				width: 50%;
				display: inline-block;
				padding-left: 4%;
				padding-right: 4%;
			}
			p {
				width: 2rem;
				font-size: .2rem;
				color: #999;
				font-weight: 500;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			h5 {
				font-size: .24rem;
				font-weight: 500;
			}
		}
		.comment {
			padding-left: .4rem;
			padding-right: .4rem;
			font-size: .26rem;
			font-weight: 500;
			.usber-msg {
				padding-left: .4rem;
				padding-right: .4rem;
				img {
					width: .4rem;
					height: .4rem;
					border-radius: 50%;
					vertical-align: middle;
				}
				.usber-name {
					padding-left: 2%;
					width: 52%;
					display: inline-block
				}
			}
			.usber-content {
				margin-top: .16rem;
				padding-left: .5rem;
				color: #000;
				padding-left: .4rem;
				padding-right: .4rem;
			}
			.recommended-list {
				width: 100%;
				position: relative;
				.usber-foot {
					width: 5.6rem;
					background: #f9f9f9;
					height: .2rem;
					transform: translateX(-.4rem);
				}
			}
			.box {
				text-align: right;
				display: block;
				color: #959595;
				margin-top: .1rem;
				margin-bottom: .1rem;
				padding-left: .4rem;
				padding-right: .4rem;
			}
		}
	}
</style>