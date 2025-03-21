import store from "@/store/index.js";
import createNpc from "@/util/npc.js"
import uesrSetting from "/static/dataJson/uesrSetting.js"
import grade from "/static/dataJson/grade.js"


export default {
	/**
	 * @param {随机生成npc的ID} key 
	 * @returns 
	 */
	getUserIdIndex(key) {
		const storedData = uni.getStorageSync(key);
		if (!storedData) return 10000;

		// 找到数组的结束位置
		const lastIndex = storedData.lastIndexOf(']');
		if (lastIndex === -1) return null;

		// 找到倒数第二个逗号的位置
		const lastCommaIndex = storedData.lastIndexOf(',{', lastIndex);
		if (lastCommaIndex === -1) {
			// 如果没有逗号，说明数组只有一个元素
			return JSON.parse(storedData.substring(1, lastIndex)).userId + 1;
		}

		// 提取最后一个元素的字符串
		const lastElementStr = storedData.substring(lastCommaIndex + 1, lastIndex);
		return JSON.parse(lastElementStr).userId + 1
	},
	/**
	 * @param {随机获取灵根}  
	 * @returns 
	 */
	randomLingen() {
		const linggen = uesrSetting.linggen
		let count = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

		const result = [];
		const indices = new Set();

		while (indices.size < count && indices.size < linggen.length) {
			const randomIndex = Math.floor(Math.random() * linggen.length);
			indices.add(randomIndex);
		}

		for (const index of indices) {
			result.push(linggen[index]);
		}
		return result
	},
	/**
	 * @param {随机生成等级} level 0：练气期 1：筑基期
	 * @returns 
	 */
	randomGrade(level = 0) {
		const gradeArr = grade
		let i = Math.floor(Math.random() * gradeArr[level].child.length)
		return gradeArr[level].child[i]
	},
	createRole() {
		let id = null
		if (!store.state.npc.npcList.length) {
			id = 2
		} else {
			id = store.state.npc.npcList[store.state.npc.npcList.length - 1].userId + 1
		}

		// uesrSetting.fate
		// uesrSetting.linggen
		// uesrSetting.martialTechnique

		let fate = uesrSetting.fate[Math.floor(Math.random() * uesrSetting.fate.length)]
		let linggen = uesrSetting.linggen[Math.floor(Math.random() * uesrSetting.linggen.length)]

		//给武技随机排序
		let martialTechnique = []
		var set = new Set();
		var numCount = Math.ceil(Math.random() * (uesrSetting.martialTechnique.length - 1));
		while (set.size <= numCount) {
			var randomNum = Math.floor(Math.random() * (uesrSetting.martialTechnique.length - 0 + 1)) + 0;
			set.add(randomNum);
		}
		var array = Array.from(set);
		array.forEach((item, index) => {
			martialTechnique.push(uesrSetting.martialTechnique[item])
		})

		let NPC = new createNpc({
			userId: id,
			userName: "NPC" + id,
			healthValue: 100 + fate.healthValue,
			energy: 100 + fate.energy,
			attackCount: 11 + fate.attackCount,
			defense: 5 + fate.defense,
			talent: 10 + fate.talent,
			linggen,
			martialTechnique,
			fate: fate.name
		})
		store.commit("npc/SET_NPC_LIST", NPC)
	},
}