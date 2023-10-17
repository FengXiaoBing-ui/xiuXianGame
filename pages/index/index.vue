<template>
	<view class="content" style="width: 100vw;height: 100vh;">
		<view class="flex flex-wrap bg-white shadow" style="position: absolute;bottom: 0;left: 0;width: 100%;">
			<view class="margin-xs">姓名：{{ userInfo.userName }}</view>
			<view class="margin-xs">血量：{{ userInfo.healthValue }}</view>
			<view class="margin-xs">法力值：{{ userInfo.energy }}</view>
			<view class="margin-xs">攻击力：{{ userInfo.attackCount }}</view>
			<view class="margin-xs">防御力：{{ userInfo.defense }}</view>
			<view class="margin-xs">灵根：{{ userInfo.linggen[0] }}</view>
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
			
			let npc1 = new this.createNpc({
				userName: "NPC1",
				healthValue: 100,
				energy: 100,
				attackCount: 12,
				defense: 10,
				linggen: ['水灵根'],
				talent: 10
			})
			
			this.SET_NPC_LIST(npc1)
			
			this.SET_USERINFO(this.npcList[0].attack(this.userInfo))
		},
		methods: {
			...mapMutations("npc", ["SET_NPC_LIST","MODIFY_NPC_LIST"]),
			...mapMutations(["SET_USERINFO"])
		}
	}
</script>

<style>

</style>