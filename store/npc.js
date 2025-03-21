export default {
    namespaced: true,
    state: {
		npcList:[]
    },
    mutations: {
		SET_NPC_LIST(state,val){
			state.npcList = val
		},
		MODIFY_NPC_LIST(state,val){
			state.npcList.forEach((item,index) => {
				if(item.userId==val.userId){
					state.npcList[index] = val
				}
			})
		}
    },
    actions: {},
    getters: {}
};
