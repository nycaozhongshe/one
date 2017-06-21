import Vue from 'vue'
import Vuex from 'vuex'
import VRouter from 'vue-router'
import VResource from 'vue-resource'
import store from './store'
import Laout from './components/laout.vue'
import index from './pages/index.vue'
import book from './pages/book.vue'
import music from './pages/music.vue'
import video from './pages/video.vue'
import VueTouch from 'vue-directive-touch'
import FastClick from 'fastclick'
import info from './components/info.vue'
import app from './app.vue'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
	preLoad: 1.3,
	error: '../img/timg.jpg',
	loading: '../img/timg.gif',
	attempt: 1,
	listenEvents: ['scroll']
})
//import MuseUI from 'muse-ui'
//import 'muse-ui/dist/muse-ui.css'
//Vue.use(MuseUI)
FastClick.attach(document.body)
Vue.use(VRouter)
Vue.use(VResource)
Vue.use(VueTouch, {
	name: 'v-touch'
})


let router = new VRouter({
	mode: 'history',
	hashbang: false,
	history: true,
	saveScrollPosition: true,
	suppressTransitionError: true,
	routes: [{
			path: '/',
			redirect: '/laout/index'
		},
		{
			path: '/laout',
			component: Laout,
			children: [{
					path: '/laout/index',
					component: index,

				},
				{
					path: '/laout/book',
					component: book
				},
				{
					path: '/laout/music',
					component: music
				},
				{
					path: '/laout/video',
					component: video
				}
			]
		},

		{
			path: '/info',
			name: info,
			component: info
		}
	]
})

new Vue({
	el: '#app',
	router,
	render: h => h(app),
	store,
})