import Vuex from "vuex";
import npc from "./npc.js"

const store = new Vuex.Store({
	modules:{
		npc
	},
	state:{
		userInfo:{},
		system:null
	},
	mutations:{
		SET_SYSTEM(state,val){
			state.system = val
		},
		SET_USERINFO(state,val){
			state.userInfo = val
		},
	},
	actions:{
		
	}
})

export default store;