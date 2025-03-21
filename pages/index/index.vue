<template>
	<view class="content padding-sm" style="width: 100vw;position: relative;">
		<view class="text-bold text-xl text-center">{{ userInfo.nowCity.name }}</view>
		<view class="flex flex-wrap justify-between">
			<view style="width: 46%;height:200rpx" class="flex align-center justify-center">坊市</view>
			<view style="width: 46%;height:200rpx" class="flex align-center justify-center">客栈</view>
			<view style="width: 46%;height:200rpx" class="flex align-center justify-center">拍卖会</view>
			<view style="width: 46%;height:200rpx" class="flex align-center justify-center">任务榜</view>
			<view @click="showWorld" style="width: 46%;height:200rpx" class="flex align-center justify-center">传送阵
			</view>
		</view>


		<view class="npcList" :class="showNearbyPeople ? 'npcList-r' : ''">
			<scroll-view scroll-y="true" class="h100">
				<view v-for="item in npcList" :key="item" class="flex justify-center align-center"
					style="height: 100rpx;position: relative;">{{ item.userName }}</view>
			</scroll-view>
			<view @click="showNearbyPeople = !showNearbyPeople"
				class="btn flex flex-wrap flex-direction text-center justify-center">
				附近的人
			</view>
		</view>
	</view>
</template>

<script>
import {
	mapState,
	mapMutations
} from "vuex"
import { generateName } from "../../static/surnames.js";
import tool from "../../util/tool.js";
import USERSETTING from "@/static/dataJson/uesrSetting.js"
export default {
	data() {
		return {
			title: 'Hello',
			showNearbyPeople: false,
		}
	},
	computed: {
		...mapState(["userInfo", "nowCity"]),
		...mapState("npc", ["npcList"])
	},
	onLoad() {
		if (JSON.stringify(this.userInfo) == '{}') {
			return uni.navigateTo({
				url: "/pages/setUserName/setUserName"
			})
		}


		let list = uni.getStorageSync(this.userInfo.nowCity.id)
		if (!list) {
			const uesrSetting = USERSETTING
			let npcCount = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
			let i = tool.getUserIdIndex(this.userInfo.nowCity.id)
			let npcArr = []

			for (let index = 0; index < npcCount; index++) {
				let player = new this.createNpc({
					createTime: new Date().getTime(),
					userId: i + index,
					userName: generateName(Math.floor(Math.random() * 2)),
					lingen: tool.randomLingen(),
					grade: tool.randomGrade(),
					nowCity: this.userInfo.nowCity.id,
					attribute: null,
				})
				npcArr.push(player)
			}
			uni.setStorageSync(this.userInfo.nowCity.id, JSON.stringify(npcArr))
			this.SET_NPC_LIST(npcArr)
		}else{
			this.SET_NPC_LIST(JSON.parse(list))
		}
	},
	methods: {
		...mapMutations("npc", ["SET_NPC_LIST", "MODIFY_NPC_LIST"]),
		...mapMutations(["SET_USERINFO"]),
		showWorld() {

		}
	}
}
</script>

<style scoped lang="scss">
.npcList {
	position: absolute;
	right: 0;
	top: 0;
	width: 400rpx;
	height: 100vh;
	background: red;
	opacity: 1;
	transition: all 0.3s;

	.btn {
		width: 50rpx;
		height: 200rpx;
		background: green;
		position: absolute;
		left: -50rpx;
		top: 50%;
		transform: translateY(-50%);
	}
}

.npcList-r {
	right: -400rpx;
	background-color: rgba(255, 255, 255, 0);
}
</style>