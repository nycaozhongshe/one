<template>
	<div ref="wrapper" class="better-scroll-warp">
		<slot></slot>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll'

	export default {
		props: {
			probeType: {
				type: Number,
				default: 3
			},
			click: {
				type: Boolean,
				default: true
			},
			listenScroll: {
				type: Boolean,
				default: true
			},
			data: {
				type: Array,
				default: null
			},
			pullup: {
				type: Boolean,
				default: true
			},
			beforeScroll: {
				type: Boolean,
				default: false
			},
			refreshDelay: {
				type: Number,
				default: 20
			},
			callbackTop: {
				type: Number,
				default: 1
			}
		},
		mounted() {
			setTimeout(() => {
				this._initScroll()
			}, 20)
		},
		methods: {
			_initScroll() {
				if(!this.$refs.wrapper) {
					return
				}
				this.scroll = new BScroll(this.$refs.wrapper, {
					probeType: this.probeType,
					click: this.click,
				})

				if(this.listenScroll) {
					let me = this
					this.scroll.on('scroll', (pos) => {
						me.$emit('scroll', pos)
					})
				}

				if(this.pullup) {
					this.scroll.on('scrollEnd', () => {
						this.index++
							if(this.scroll.y <= (this.scroll.maxScrollY + 200 )&& !(this.index % 2)) {
								this.$emit('scrollToEnd')
							}
					})

				}

				if(this.beforeScroll) {
					this.scroll.on('beforeScrollStart', () => {
						this.$emit('beforeScroll')
					})
				}
			},
			disable() {
				this.scroll && this.scroll.disable()
			},
			enable() {
				this.scroll && this.scroll.enable()
			},
			refresh() {
				if(this.callbackTop == 1) {
					this.scrollTo(0, 0)
				}
				setTimeout(() => {
					this.scroll && this.scroll.refresh()
				}, 20)
				this.$emit('scroll', {
					y: 0
				})
			},
			scrollTo() {
				this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
			},
			scrollToElement() {
				this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
			}
		},
		watch: {
			data() {
				setTimeout(() => {
					this.refresh()
				}, this.refreshDelay)
			}
		},
		data() {
			return {
				index: 0
			}
		}
	}
</script>

<style scoped>
	.better-scroll-warp {
		height: 9rem;
		overflow: hidden;
	}
</style>