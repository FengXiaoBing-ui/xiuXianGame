class createNpc {
	constructor(arg) {
		//npc的属性有 名字，血量，气运，门派，攻击力，护甲，法抗，移动速度，灵根，
		this.userName = "";//名字
		this.healthValue = 100;//血量
		this.energy = 100;//法力值
		this.attack = 10;//攻击力
		this.defense = 10;//防御力
		this.linggen = 10;//灵根
		this.talent  = 10;//悟性
		this.fate = "";//气运
		this.sect = "";//门派
	}

	attack() {

	}
}
export default createNpc;