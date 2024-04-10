<template>
	<view style="width: 100vw;min-height: 100vh;padding-top:100rpx;" class="padding-sm">
		<view class="margin-top text-bold text-lg margin-bottom-xs">你的名字</view>
		<input v-model="userName" type="text" maxlength="20" placeholder="少侠,可否告知您的名讳">
		<view class="margin-top text-bold text-lg margin-bottom-xs">角色设定</view>
		<view class="flex flex-wrap" v-if="uesrSetting">
			<view class="margin-right-sm margin-bottom-sm radius padding-xs" :class="roleSet.name==item.name?'bg-orange':''" style="border: 1rpx solid gray;"
				@click="roleSet = item" v-for="(item,index) in uesrSetting.roleSet" :key="index">{{ item.name }}</view>
		</view>
		<view class="margin-top text-bold text-lg margin-bottom-xs">你的出生</view>
		<view class="flex flex-wrap" v-if="uesrSetting">
			<view class="margin-right-sm margin-bottom-sm radius padding-xs" :class="birth.name==item.name?'bg-orange':''" style="border: 1rpx solid gray;"
				@click="birth = item" v-for="(item,index) in uesrSetting.birth" :key="index">{{ item.name }}</view>
		</view>
		<view class="margin-top text-bold text-lg margin-bottom-xs">你的资质</view>
		<view class="flex flex-wrap" v-if="uesrSetting">
			<view class="margin-right-sm margin-bottom-sm radius padding-xs" :class="qualification.name==item.name?'bg-orange':''" style="border: 1rpx solid gray;"
				@click="qualification = item" v-for="(item,index) in uesrSetting.qualification" :key="index">{{ item.name }}</view>
		</view>
		<view class="margin-top text-bold text-lg margin-bottom-xs">你的灵根</view>
		<view class="flex flex-wrap" v-if="uesrSetting">
			<view class="margin-right-sm margin-bottom-sm radius padding-xs" :class="linggen.name==item.name?'bg-orange':''" style="border: 1rpx solid gray;"
				@click="linggen = item" v-for="(item,index) in uesrSetting.linggen" :key="index">{{ item.name }}</view>
		</view>
		<view class="margin-top text-bold text-lg margin-bottom-xs">先天资质</view>
		<view class="flex flex-wrap" v-if="uesrSetting">
			<view class="margin-right-sm margin-bottom-sm radius padding-xs" :class="fate.name==item.name?'bg-orange':''" style="border: 1rpx solid gray;"
				@click="fate = item" v-for="(item,index) in uesrSetting.fate" :key="index">{{ item.name }}</view>
		</view>
		
<!-- 		<button @click="createOk">创建完成</button>
		
		<view class="flex flex-wrap bg-white shadow" style="position: absolute;bottom: 0;left: 0;width: 100%;">
			<view class="margin-xs">血量：{{ userInfo.healthValue }}</view>
			<view class="margin-xs">法力值：{{ userInfo.energy }}</view>
			<view class="margin-xs">攻击力：{{ userInfo.attackCount }}</view>
			<view class="margin-xs">防御力：{{ userInfo.defense }}</view>
			<view class="margin-xs">灵根：{{ userInfo.linggen }}</view>
			<view class="margin-xs">悟性：{{ userInfo.talent }}</view>
			<view class="margin-xs">气运：{{ userInfo.fate?.name }}</view>
			<view class="margin-xs">灵石：{{ userInfo.fate?.money }}</view>
		</view> -->
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	import USERSETTING from "@/static/dataJson/uesrSetting.js"
	
	const healthValue = 100;//血量
	const energy = 100;//法力值
	const attackCount = 10;//攻击力
	const defense = 5;//防御力
	const talent = 10;//悟性
	
	export default {
		data() {
			return {
				userName: "",
				uesrSetting: null,
				roleSet:"",
				birth:"",
				qualification:"",
				linggen:"",
				fate:""
			}
		},
		computed: {
			...mapState(["userInfo"])
		},
		onLoad() {
		},
		onShow(){
			this.uesrSetting = USERSETTING
		},
		methods: {
			...mapMutations(["SET_USERINFO"]),
			createOk() {
				let martialTechnique = []
				for (var i = 0; i < Math.ceil(Math.random()*USERSETTING.martialTechnique.length); i++) {
					martialTechnique.push(USERSETTING.martialTechnique[i])
				}
				let player = new this.createNpc({
					userId:1,
					userName:this.userName,
					healthValue:healthValue+this.fate.healthValue,
					energy:energy+this.fate.energy,
					attackCount:attackCount+this.fate.attackCount,
					defense:defense+this.fate.defense,
					linggen:['天灵根'],
					talent:talent+this.fate.talent,
					fate:this.fate,
					sect:this.sect,
					martialTechnique,
					relationship:[],
					grade:{
						name:"练气一层",
						healthValue:20,
						energy:20,
						attackCount:20,
						defense:20
					}
				})
				console.log(player);
				this.SET_USERINFO(player)
				uni.redirectTo({
					url: "/pages/index/index"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>