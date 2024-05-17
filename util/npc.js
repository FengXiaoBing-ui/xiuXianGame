import store from "@/store/index.js";
class createNpc {
	constructor(arg) {
		//npc的属性有 名字，血量，气运，门派，攻击力，护甲，法抗，移动速度，灵根，
		this.createTime = arg.createTime
		this.userId = arg.userId;//ID
		this.userName = arg.userName;//名字
		this.qualification = arg.qualification;//资质/修炼速度
		this.fate = arg.fate;//气运
		this.goods = arg.goods;//物品
		
		this.attribute = arg.attribute
		this.lingen = arg.lingen
		this.birth = arg.birth
		this.roleSet = arg.roleSet
		this.grade = arg.grade
		
		this.sect = arg.sect;//门派
		this.martialTechnique = arg.martialTechnique;//武技
	}

	attack(npc) {
		//传入的参数是被攻击的对象
		let index =  Math.ceil(Math.random()*(this.martialTechnique.length-1))
		let attackCount = this.attackCount
		let name = "普通攻击"
		if(this.energy<this.martialTechnique[index].energy){
			attackCount = this.attackCount
			name = "普通攻击"
		}else{
			attackCount = this.martialTechnique[index].attackCount
			this.energy = this.energy - this.martialTechnique[index].energy
			name = this.martialTechnique[index].name
		}
		npc.healthValue = npc.healthValue - (attackCount - npc.defense)
		console.log(this.userName+'消耗了'+this.martialTechnique[index].energy+'点蓝量，剩余'+this.energy+'点蓝量');
		console.log(this.userName+'消耗了'+this.martialTechnique[index].energy+'点蓝量，使用'+name+'攻击了'+npc.userName+';造成了'+(attackCount - npc.defense)+'点伤害');
		console.log(npc.userName+"掉了"+(attackCount - npc.defense)+"点血");
		store.commit("npc/MODIFY_NPC_LIST",npc)
	}
	damage(){
		
	}
}
export default createNpc;