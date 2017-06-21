import Vue from 'vue'
import VRouter from 'vue-router'
Vue.use(VRouter)
	let router = new VRouter({
	mode: 'history',
	routes: [{
			path: '/index',
			component: index
		},
		{
			path: '/book',
			component: book
		},
		{
			path: '/music',
			component: music
		},
		{
			path: '/video',
			component: video
		}
	]
})
