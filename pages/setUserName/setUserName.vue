<template>
	<view style="width: 100vw;min-height: 100vh;padding-top:100rpx;" class="padding-sm">
		<view v-if="uesrSetting&&current==1" style="height:600rpx">
			<view class="margin-top text-bold text-lg margin-bottom-xs">你的名字</view>
			<input v-model="userName" type="text" maxlength="20" placeholder="少侠,可否告知您的名讳">
			<view class="margin-top text-bold text-lg margin-bottom-xs">角色设定</view>
			<view class="flex flex-wrap">
				<view class="margin-right-sm margin-bottom-sm radius padding-xs"
					:class="roleSet.name==item.name?'bg-orange':''" style="border: 1rpx solid gray;"
					@click="choice('roleSet',item)" v-for="(item,index) in uesrSetting.roleSet" :key="index">
					{{ item.name }} {{ item.talentPoints }}
				</view>
			</view>
		</view>

		<view v-if="current==2" style="height:600rpx">
			<view class="margin-top text-bold text-lg margin-bottom-xs">你的出生</view>
			<view class="flex flex-wrap">
				<view class="margin-right-sm margin-bottom-sm radius padding-xs"
					:class="birth.name==item.name?'bg-orange':''" style="border: 1rpx solid gray;"
					@click="choice('birth',item)" v-for="(item,index) in uesrSetting.birth" :key="index">{{ item.name }}
					{{ item.talentPoints }}
				</view>
			</view>
		</view>
		<view v-if="current==3" style="height:600rpx">
			<view class="margin-top text-bold text-lg margin-bottom-xs">你的资质</view>
			<view class="flex flex-wrap">
				<view class="margin-right-sm margin-bottom-sm radius padding-xs"
					:class="qualification.name==item.name?'bg-orange':''" style="border: 1rpx solid gray;"
					@click="choice('qualification',item)" v-for="(item,index) in uesrSetting.qualification"
					:key="index">{{ item.name }} {{ item.talentPoints }}</view>
			</view>
		</view>
		<view v-if="current==4" style="height:600rpx">
			<view class="margin-top text-bold text-lg margin-bottom-xs">你的灵根</view>
			<view class="flex flex-wrap">
				<view class="margin-right-sm margin-bottom-sm radius padding-xs" :class="item.choice?'bg-orange':''"
					style="border: 1rpx solid gray;" @click="choice('linggen',item,index)"
					v-for="(item,index) in uesrSetting.linggen" :key="index">{{ item.name }}</view>
			</view>
		</view>
		<view v-if="current==5" style="height:600rpx">
			<view class="margin-top text-bold text-lg margin-bottom-xs">先天资质</view>
			<view class="flex flex-wrap">
				<view class="margin-right-sm margin-bottom-sm radius padding-xs"
					:class="fate.name==item.name?'bg-orange':''" style="border: 1rpx solid gray;"
					@click="choice('fate',item)" v-for="(item,index) in uesrSetting.fate" :key="index">{{ item.name }}
					{{ item.talentPoints }}
				</view>
			</view>
		</view>

		<view class="flex justify-around align-center w100">
			<button style="width: 300rpx;" v-if="current>1" @click="back">上一步</button>
			<button style="width: 300rpx;" @click="next">{{ btnText }}</button>
		</view>

		<!-- <button @click="createOk">创建完成</button> -->

		<view class="shadow" style="position: absolute;bottom: 40rpx;left: 0;width: 100%;">
			<view class="text-bold text-center">天赋点{{ talentPoints }}</view>
			<view class="flex flex-wrap margin-top text-sm">
				<view class="margin-xs" v-for="(item,index) in dataList" :key="index">{{ item.name }}{{ userInfo[item.key] + handleCount(item.key) }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	//武器：剑，刀，戟，钟，鼎，珠，扇，匕首，弓箭，斧，环，镜，塔，印
	//防具：法衣，头盔，护甲，护腕/护臂，护腿/战裙，战靴，护身玉佩，灵珠
	//阵法，丹药，符箓
	//造成伤害 = 消耗灵力 + 攻击力 + 功法% - 敌方的防御力
	
	import {
		mapState,
		mapMutations
	} from "vuex"
	import USERSETTING from "@/static/dataJson/uesrSetting.js"
	import GRADE from "/static/dataJson/grade.js"

	const healthValue = 100; //血量
	const energy = 100; //法力值
	const attackCount = 10; //攻击力
	const defense = 5; //防御力
	const wuXing = 5; //悟性
	const money = 5;//灵石
	const consciousness = 5;//神识
	const qualification = 5;//资质/修炼速度
	const gongFa = [];//功法
	export default {
		data() {
			return {
				userName: "",//姓名
				uesrSetting: null,//用户说有属性基础设置
				roleSet: "",//角色设定
				birth: "",//角色出生
				qualification: "",//角色灵根资质
				linggen: "",//角色灵根
				fate: "",//角色先天资质
				btnText: "下一步",
				current: 1,
				lingenArr: [],
				userInfo: {},
				copyUserInfo:{},
				oldKey:"",
				dataList:[
					{
						name:"血量：",
						key:"healthValue"
					},
					{
						name:"灵力：",
						key:"energy"
					},
					{
						name:"攻击力：",
						key:"attackCount"
					},
					{
						name:"防御力：",
						key:"defense"
					},
					{
						name:"神识：",
						key:"consciousness"
					},
					{
						name:"悟性：",
						key:"wuXing"
					},
					{
						name:"灵石：",
						key:"money"
					},
					{
						name:"资质：",
						key:"qualification"
					}
				]
			}
		},
		onLoad() {
			this.uesrSetting = USERSETTING
			this.userInfo = {
				healthValue,
				energy,
				attackCount,
				defense,
				wuXing,
				gongFa,
				consciousness,
				qualification,
				money
			}
			this.copyUserInfo = JSON.parse(JSON.stringify(this.userInfo))
		},
		onShow() {
			this.uesrSetting = USERSETTING
		},
		computed: {
			talentPoints() {
				let talentPoints1 = 0,
					talentPoints2 = 0,
					talentPoints3 = 0,
					talentPoints4 = 0;
				if (this.roleSet) {
					talentPoints1 = this.roleSet.talentPoints
					if (this.birth) {
						talentPoints2 = this.birth.talentPoints
						if (this.qualification) {
							talentPoints3 = this.qualification.talentPoints
							if (this.fate) {
								talentPoints4 = this.fate.talentPoints
								return talentPoints1 - talentPoints2 - talentPoints3 - talentPoints4
							}
							return talentPoints1 - talentPoints2 - talentPoints3
						}
						return talentPoints1 - talentPoints2
					}
					return talentPoints1
				}
				return 0
			}
		},
		methods: {
			...mapMutations(["SET_USERINFO"]),
			handleCount(key,flag = false){
				let c1 = 0,c2 = 0,c3 = 0;
				if(this.birth?.type == key){
					c1 = this.birth?.count
				}
				if(this.qualification?.type == key){
					c2 = this.qualification?.count
				}
				if(this.fate?.type == key){
					c3 = this.fate?.count
				}
				if(flag) return {key,count:c1+c2+c3}
				return c1+c2+c3
			},
			next() {
				if (this.current <= 5 && this.current >= 1) {
					if (this.current == 1) {
						if (this.userName == "") {
							return uni.showToast({
								title: "请输入姓名",
								icon: "none"
							})
						}
						if (this.roleSet == "") {
							return uni.showToast({
								title: "请选择角色设定",
								icon: "none"
							})
						}
					}
					if (this.current == 2) {
						if (this.birth == "") {
							return uni.showToast({
								title: "请选择你的出生",
								icon: "none"
							})
						}
					}
					if (this.current == 3) {
						if (this.qualification == "") {
							return uni.showToast({
								title: "请选择你的资质",
								icon: "none"
							})
						}
					}
					if (this.current >= 4) {
						if (this.linggen == "") {
							return uni.showToast({
								title: "请选择你的灵根",
								icon: "none"
							})
						}
						if (this.qualification.choiceCount != this.lingenArr.length) {
							return uni.showToast({
								title: "您需要选择"+this.qualification.choiceCount+"种灵根",
								icon: "none"
							})
						}
						this.btnText = '完成'
					} else {
						this.btnText = '下一步'
					}
					if (this.current == 5) {
						if (this.fate == "") {
							return uni.showToast({
								title: "请选择你的先天资质",
								icon: "none"
							})
						}
						if(this.talentPoints<0) {
							return uni.showToast({
								title: "天赋点不能低于0",
								icon: "none"
							})
						}
						this.createOk()
						return uni.showToast({
							title:"创建成功"
						})
					}
					this.current++
				}
			},
			back() {
				this.btnText = '下一步'
				if (this.current <= 5 && this.current > 1) {
					this.current--
				}
			},
			choice(key, item, index) {
				this.oldKey = key
				if (key == 'linggen') {
					this.uesrSetting.linggen[index].choice = !this.uesrSetting.linggen[index].choice
					if (this.uesrSetting.linggen[index].choice) {
						if (this.lingenArr.length >= this.qualification.choiceCount) {
							this.lingenArr.shift()
						}
						this.lingenArr.push(index)
					} else {
						this.lingenArr.forEach((i, ind) => {
							if (index == i) {
								this.lingenArr.splice(ind, 1);
							}
						})
					}
					this.uesrSetting.linggen.forEach(e => {
						e.choice = false
					})
					this.lingenArr.forEach(e => {
						this.uesrSetting.linggen[e].choice = true
					})
				}
				if (key == 'qualification') {
					this.lingenArr = []
					this.uesrSetting.linggen.forEach(e => {
						e.choice = false
					})
				}
				this[key] = item
			},
			createOk() {
				let obj = {}
				this.dataList.forEach((item,index) => {
					obj[item.key] = this.userInfo[item.key]+this.handleCount(item.key,true).count
				})
				let lingen = []
				this.uesrSetting.linggen.forEach(item => {
					if(item.choice){
						lingen.push(item)
					}
				})
				let player = new this.createNpc({
					createTime:new Date().getTime(),
					userId: 1,
					userName: this.userName,
					attribute:obj,
					lingen,
					birth:this.birth,
					fate:this.fate,
					qualification:this.qualification,
					roleSet:this.roleSet,
					grade: GRADE[0].child[0]
				})
				console.log(player);
				this.SET_USERINFO(player)
				uni.setStorageSync('archive',player)
				uni.navigateTo({
					url: "/pages/reincarnation/reincarnation"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>