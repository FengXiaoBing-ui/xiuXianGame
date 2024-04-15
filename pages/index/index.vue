<template>
	<view class="content padding-sm" style="width: 100vw;position: relative;padding-top: 80rpx;">
		<view class="text-bold text-xl text-center">{{ userInfo.nowCity?.name }}</view>
		<view class="text-bold text-df text-center" v-if="userInfo.nowCity?.capital">首都：{{ userInfo.nowCity.capital }}</view>
		<view v-if="userInfo.nowCity" class="flex flex-wrap">
			<view v-for="item in list" :key="item.name" @click="openFunction(item)">
				<view v-if="isShow(item)" style="width: 350rpx;height:200rpx" class="flex align-center justify-center">
					{{ item.name }}
				</view>
			</view>
			<view @click="showWorld" style="width: 46%;height:200rpx" class="flex align-center justify-center">传送阵</view>
		</view>
		
		<view class="" :class="showNearbyPeople?'npcList':'npcList npcList-r'">
			<scroll-view scroll-y="true" class="h100">
				<view v-for="item in 100" :key="item" class="flex justify-center align-center" style="height: 100rpx;position: relative;">{{ item }}</view>
			</scroll-view>
			<view @click="showNearbyPeople = !showNearbyPeople" class="btn flex flex-wrap flex-direction text-center justify-center">
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
	export default {
		data() {
			return {
				title: 'Hello',
				showNearbyPeople:false,
				list:[
					{
						name:"坊市",
						keyName:"market",
						path:"/pages/index/market"
					},
					{
						name:"客栈",
						keyName:"Inn",
						path:""
					},
					{
						name:"拍卖会",
						keyName:"auction",
						path:""
					},
					{
						name:"任务榜",
						keyName:"task",
						path:""
					},
					{
						name:"藏经阁",
						keyName:"CangJingGe",
						path:""
					},
					{
						name:"主殿",
						keyName:"ZhuDian",
						path:""
					},
					{
						name:"宗门任务",
						keyName:"ZongMenTask",
						path:""
					},
					{
						name:"炼丹房",
						keyName:"LianDanFang",
						path:""
					},
					{
						name:"炼器阁",
						keyName:"LianQiGe",
						path:""
					},
					{
						name:"我的洞府",
						keyName:"WoDeDongFu",
						path:""
					},
					{
						name:"申请入宗",
						keyName:"sect",
						path:""
					}
				]
			}
		},
		computed: {
			...mapState(["userInfo"]),
			...mapState("npc",["npcList"])
		},
		onLoad() {
			
		},
		onShow() {
			if (JSON.stringify(this.userInfo)=='{}') {
				return uni.navigateTo({
					url: "/pages/setUserName/setUserName"
				})
			}
		},
		methods: {
			...mapMutations("npc", ["SET_NPC_LIST","MODIFY_NPC_LIST"]),
			...mapMutations(["SET_USERINFO"]),
			isShow(item){
				if(item.keyName=='WoDeDongFu') return this.userInfo.userId==this.userInfo.nowCity.userId
				if(item.keyName=='sect') return this.userInfo.nowCity.type=='sect'&&this.userInfo.userId!=this.userInfo.nowCity.userId
				return this.userInfo.nowCity[item.keyName]
			},
			openFunction(item){
				uni.navigateTo({
					url:item.path
				})
			},
			showWorld(){
				uni.navigateTo({
					url:"/pages/index/transfer"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.npcList{
		position: absolute;
		right: 0;
		top: 0;
		width: 400rpx;
		height: 100vh;
		background: red;
		opacity: 1;
		transition:  all 0.3s;
		.btn{
			width: 50rpx;
			height: 200rpx;
			background: green;
			position: absolute;
			left: -50rpx;
			top: 50%;
			transform: translateY(-50%);
		}
	}
	.npcList-r{
		right: -400rpx;
		background-color: rgba(255, 255, 255, 0);
	}
</style>