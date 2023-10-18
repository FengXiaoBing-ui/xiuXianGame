import store from "@/store/index.js";
import createNpc from "@/util/npc.js"
import uesrSetting from "/static/dataJson/uesrSetting.js"

export default {
	createRole(){
		let id = null
		if(!store.state.npc.npcList.length){
			id = 2
		}else{
			id = store.state.npc.npcList[store.state.npc.npcList.length-1].userId+1
		}
		
		// uesrSetting.fate
		// uesrSetting.linggen
		// uesrSetting.martialTechnique
		
		let fate = uesrSetting.fate[Math.floor(Math.random()*uesrSetting.fate.length)]
		let linggen = uesrSetting.linggen[Math.floor(Math.random()*uesrSetting.linggen.length)]
		
		let martialTechnique = []
		var set = new Set();
		var numCount = Math.ceil(Math.random()*(uesrSetting.martialTechnique.length-1));
		while (set.size <= numCount) {
		  var randomNum = Math.floor(Math.random() * (uesrSetting.martialTechnique.length - 0 + 1)) + 0;
		  set.add(randomNum);
		}
		var array = Array.from(set);
		array.forEach((item,index) => {
			martialTechnique.push(uesrSetting.martialTechnique[item])
		})
		
		let NPC = new createNpc({
			userId:id,
			userName: "NPC"+id,
			healthValue: 100 + fate.healthValue,
			energy: 100 + fate.energy,
			attackCount: 11 + fate.attackCount,
			defense: 5 + fate.defense,
			talent: 10 + fate.talent,
			linggen,
			martialTechnique,
			fate:fate.name
		})
		store.commit("npc/SET_NPC_LIST",NPC)
	}
}