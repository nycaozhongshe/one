import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);
import creatlogger from 'vuex/dist/logger'

const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
	state: {
		songId: '',
		src_name: "",
		play: false,
		index:-1,
	},
	getters: {
		songId: (state) => {
			return state.songId
		},
		src_name: (state) => {
			return state.src_name
		},
		play: (state) => {
			return state.play
		}
	},
	mutations: {
		startplay(state) {
			state.play = true
		},
		startend(state) {
			state.play = false
		},
		getId(state,id){
			state.songId = id
			state.index++
		}
	},
	action: {

	},
	strict: debug,
	plugins: debug ? [creatlogger] : []
})
export default store