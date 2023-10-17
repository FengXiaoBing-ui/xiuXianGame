export default {
    namespaced: true,
    state: {
		npcList:[]
    },
    mutations: {
		SET_NPC_LIST(state,val){
			state.npcList.push(val)
		},
		MODIFY_NPC_LIST(state,val){
			state.npcList[0] = val
		}
    },
    actions: {},
    getters: {}
};
