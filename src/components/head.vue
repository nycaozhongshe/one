<template>
	<div class="header-warp">
	<transition name='fade'>
		<div class="header clearfix" v-show="headShow">
			<div class="header-user icon-font" @click="userShow" >&#xe624;</div>
			<a href="#title">
				<div class="header-title">
					<slot></slot>
				</div>
			</a>
			<div class="header-search icon-font" @click="searchShow">&#xe607;</div>
		</div>
	</transition>
	<usber :usbrarg="show" @usbrpass="userFade"></usber>
	<search :searchmask ="sshow" @searchpass="searchFade"> </search>
	</div>
</template>

<script>
	import Vue from 'vue'
	import usber from './user.vue'
	import search from './search.vue'
	import bus from '../bus.js'
	export default {
		data() {
			return {
				show: false,
				sshow:false
			}
		},
		components: {
			usber,
			search
		},
		props: ['headShow'],
		methods: {
			userShow() {
				this.show = true
			},
			userFade(){
				this.show = false
			},
			searchShow() {
				this.sshow = true
			},
			searchFade(){
				this.sshow = false
			}
		},
		mounted(){
			bus.$on('id-selected',(i)=>{
				this.show = i
			})
//			bus.$on('id-search',(i)=>{
//				this.sshow = i
//			})
		}
	}
</script>

<style scoped lang="scss">

	.header {
		div{
			display: inline-block;
		}
		background: #fff;
		border-bottom: 1px solid #eee;
		background: #fff;
		position: fixed;
		z-index: 99;
		top: 0;
		width: 100%;
		height: .88rem;
		line-height: .88rem;
		padding-left:.3rem;
		.header-search,
		.header-search,
		.header-title {
			text-align: center;
			line-height: .88rem;
			height: .88rem;
		}
		.header-title {
			width: 70%;
			font-size: .24rem;
			font-weight: 700;
		}
		.header-search,
		.header-user {
			width: 12%;
			font-size: .36rem;
		}
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: all 1s ease;
	}

	.fade-enter,
	.fade-leave-active {
		transform: translateY(-.88rem);
	}
</style>