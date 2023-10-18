<template>
	<view style="width: 100vw;min-height: 100vh;" class="padding-sm">
		
		<view class="flex flex-wrap">
			<view class="margin-right-sm margin-bottom-sm radius padding-xs" :class="fate.name==item.name?'bg-orange':''" style="border: 1rpx solid gray;"
				@click="fate = item" v-for="(item,index) in uesrSetting.fate" :key="index">{{ item.name }}</view>
		</view>
		
		<view class="flex flex-wrap">
			<view class="margin-right-sm margin-bottom-sm radius padding-xs" :class="sect.name==item.name?'bg-orange':''" style="border: 1rpx solid gray;"
				@click="sect = item" v-for="(item,index) in uesrSetting.sect" :key="index">{{ item.name }}</view>
		</view>
		
		<input v-model="userName" type="text" placeholder="少侠,可否告知您的名讳">
		<button @click="createOk">创建完成</button>
		
		<view class="flex flex-wrap bg-white shadow" style="position: absolute;bottom: 0;left: 0;width: 100%;">
			<view class="margin-xs">血量：{{ userInfo.healthValue }}</view>
			<view class="margin-xs">法力值：{{ userInfo.energy }}</view>
			<view class="margin-xs">攻击力：{{ userInfo.attackCount }}</view>
			<view class="margin-xs">防御力：{{ userInfo.defense }}</view>
			<!-- <view class="margin-xs">灵根：{{ userInfo.linggen }}</view> -->
			<view class="margin-xs">悟性：{{ userInfo.talent }}</view>
			<view class="margin-xs">气运：{{ userInfo.fate?.name }}</view>
			<view class="margin-xs">门派：{{ userInfo.sect?.name }}</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	import uesrSetting from "/static/dataJson/uesrSetting.js"
	
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
				fate:null,
				sect:null,
				linggen:null,
				martialTechnique:null
			}
		},
		computed: {
			...mapState(["userInfo"])
		},
		onLoad() {
			this.uesrSetting = uesrSetting
			this.fate = uesrSetting.fate[0]
			this.sect = uesrSetting.sect[0]
			this.linggen = uesrSetting.linggen
			this.SET_USERINFO({healthValue,energy,attackCount,defense,talent,fate:this.fate,sect:this.sect})
			console.log(uesrSetting);
		},
		methods: {
			...mapMutations(["SET_USERINFO"]),
			createOk() {
				let martialTechnique = []
				for (var i = 0; i < Math.ceil(Math.random()*uesrSetting.martialTechnique.length); i++) {
					martialTechnique.push(uesrSetting.martialTechnique[i])
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
					martialTechnique
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