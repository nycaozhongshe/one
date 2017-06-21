<template>
	<div class="musicplayer">
		<div class="title-img-wrap">

			<img v-lazy="items.cover" class="title-img radius" :class="{rotate:!player}" ref="musicimg" />
		</div>
		<div class="player">
			<div class="player-icon icon-font" v-show="!player" @click.stop.prevent="playerstart">&#xe630;</div>
			<div class="player-icon icon-font" v-show="player" @click.stop.prevent="playerend">&#xe6d2;</div>
		</div>
	</div>
</template>

<script>
	import bus from '../bus.js'
	import { mapGetters } from 'vuex'
	import { mapMutations } from 'vuex'
	import { mapState } from 'vuex'
	export default {
		watch: {
			play: {
				handler(val) {
					if(val) {
						this.player = true
					} else {
						this.player = false
					}
				},
				deep: true
			}
		},
		activated() {

		},
		deactivated() {

		},
		created() {
			if(this.items.music_id == this.id) {
				this.player = this.play
			} else {
				this.player = false
			}
		},
		data() {
			return {
				down: false,
				player: false,
			}
		},
		props: ['items', 'id'],
		mounted() {

		},
		methods: {
			playerstart() {
//				this.plays()
				this.player = true
			},
			playerend() {
//				this.playe()
				this.player = false
			},
			info() {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.musicplayer {
		margin-left: -4rem;
		margin-top: -4rem;
	}

	.title-img {
		width: 10rem;
		height: 8rem;
		margin: 0 auto;
		display: block;
		border: 20px solid #fff;
		box-shadow: 0 0 10px 6px #f3f3f3;
	}

	.bg-img {
		position: absolute;
		top: 20%;
		right: 0;
	}

	.xiami {
		position: absolute;
		width: 50px;
		height: 50px;
		border-radius: 20%;
		left: 5%;
		bottom: 37%;
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
		top: 21.1%;
	}

	.radius {
		width: 8rem;
		height: 8rem;
		border-radius: 50%;
		-webkit-animation: change 30s linear infinite;
	}

	.player-icon {
		position: absolute;
		top: 12%;
		left: 6%;
		font-size: 1rem;
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