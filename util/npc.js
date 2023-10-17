class createNpc {
	constructor(arg) {
		//npc的属性有 名字，血量，气运，门派，攻击力，护甲，法抗，移动速度，灵根，
		this.userName = arg.userName;//名字
		this.healthValue = arg.healthValue;//血量
		this.energy = arg.energy;//法力值
		this.attackCount = arg.attackCount;//攻击力
		this.defense = arg.defense;//防御力
		this.linggen = arg.linggen;//灵根
		this.talent  = arg.talent;//悟性
		this.fate = arg.fate;//气运
		this.sect = arg.sect;//门派
	}

	attack(npc) {
		npc.healthValue = npc.healthValue - (this.attackCount - npc.defense)
		console.log(777,npc);
		return npc
	}
}
export default createNpc;