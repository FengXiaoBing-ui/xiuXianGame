import Vuex from "vuex";

const store = new Vuex.Store({
	modules:{
		
	},
	state:{
		userInfo:null,
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