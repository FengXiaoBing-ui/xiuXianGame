<template>
	<view class="content" style="width: 100vw;height: 100vh;">
		<view class="" style="position: absolute;right: 0;top: 0;">
			<scroll-view scroll-y="true" style="height: 80vh;width: 40vw;">
				<view class="padding-lr-sm padding-tb-xs text-center" style="border-bottom: 1rpx solid #444;" v-for="item in npcList" :key="item.userId">
					<view class="text-sm">姓名:{{ item.userName }} 血量:{{ item.healthValue }}</view>
					<view class="text-sm">防御力:{{ item.defense }} 攻击力:{{ item.attackCount }}</view>
					<view @click="attack(item)" class="text-right text-red">攻击</view>
				</view>
			</scroll-view>
		</view>
		<view class="flex flex-wrap bg-white shadow" style="position: absolute;bottom: 0;left: 0;width: 100%;">
			<view class="margin-xs">姓名：{{ userInfo.userName }}</view>
			<view class="margin-xs">血量：{{ userInfo.healthValue }}</view>
			<view class="margin-xs">法力值：{{ userInfo.energy }}</view>
			<view class="margin-xs">攻击力：{{ userInfo.attackCount }}</view>
			<view class="margin-xs">防御力：{{ userInfo.defense }}</view>
			<!-- <view class="margin-xs">灵根：{{ userInfo.linggen[0] }}</view> -->
			<view class="margin-xs">悟性：{{ userInfo.talent }}</view>
			<view class="margin-xs">气运：{{ userInfo.fate.name }}</view>
			<view class="margin-xs">门派：{{ userInfo.sect.name }}</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		computed: {
			...mapState(["userInfo"]),
			...mapState("npc",["npcList"])
		},
		onLoad() {
			if (JSON.stringify(this.userInfo)=='{}') {
				return uni.navigateTo({
					url: "/pages/setUserName/setUserName"
				})
			}
			for (var i = 0; i < 10; i++) {
				this.tool.createRole()
			}
		},
		methods: {
			...mapMutations("npc", ["SET_NPC_LIST","MODIFY_NPC_LIST"]),
			...mapMutations(["SET_USERINFO"]),
			attack(item){
				let count = 0
				while(item.healthValue>0&&this.userInfo.healthValue>0){
					if(count%2==0){
						this.userInfo.attack(item)
					}else{
						item.attack(this.userInfo)
					}
					count++
				}
			}
		}
	}
</script>

<style>

</style>