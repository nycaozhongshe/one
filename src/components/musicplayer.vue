<template>
	<div class="musicplayer" v-if="items.category ==4">
		<div class="top-line"></div>
		<img v-lazy="items.img_url" class="title-img radius" :class="{rotate:!player}" ref="musicimg" />
		<img src="http://tc-html5dw-com.b0.upaiyun.com/b9a83/b9a833f0da14be3bd036fa42874738fe.png" class="bg-img" />
		<div class="btoom-line"></div>
		<img src="http://tc-html5dw-com.b0.upaiyun.com/c0811/c08116281076014b18dff8dfa162760a.jpg" alt="" class="xiami" />
		<div class="player">
			<div class="player-icon icon-font" v-show="!player" @click.stop.prevent="playerstart">&#xe630;</div>
			<div class="player-icon icon-font" v-show="player" @click.stop.prevent="playerend">&#xe6d2;</div>
		</div>
	</div>
</template>

<script>
	import bus from '../bus.js'
	import { mapMutations } from 'vuex'
	import { mapGetters } from 'vuex'

	export default {
		computed: {},
//		watch: {
//			play: {
//				handler(val) {
//					if(val) {
//						this.player = true
//					} else {
//						this.player = false
//					}
//				},
//				deep: true
//			}
//		},
		data() {
			return {
				down: false,
				player: false
			}
		},
		props: ['items', 'id'],
		created(){
			this.$nextTick(()=>{
//				this.getId(this.items.audio_url)
			})
		},
		mounted() {

		},
		methods: {
			playerstart() {
//				this.plays()
				this.player =true
			},
			playerend() {
//				this.playe()
				this.player =false
			},
			info() {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.musicplayer {
		width: 5.6rem;
		height: 4rem;
		position: relative;
	}

	.title-img {
		height: 4rem;
		margin: 0 auto;
		display: block;
	}

	.bg-img {
		width: .68rem;
		height: 4rem;
		position: absolute;
		top: 0;
		right: 0;
	}

	.xiami {
		position: absolute;
		width: .5rem;
		height: .5rem;
		border-radius: 20%;
		left: 5%;
		bottom: 6%;
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
		-webkit-animation: change 30s linear infinite;
	}

	.player-icon {
		position: absolute;
		top: 50%;
		left: 50%;
		font-size: 1rem;
		transform: translate(-50%, -50%);
	}

	.rotate {
		animation-play-state: paused
	}

	@-webkit-keyframes change {
		0% {
			-webkit-transform: rotate(0deg);
		}
		50% {
			-webkit-transform: rotate(180deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
		}
	}
</style>