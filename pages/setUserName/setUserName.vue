<template>
	<view style="width: 100vw;min-height: 100vh;" class="padding-sm">
		
		<view class="flex flex-wrap">
			<view class="margin-right-sm margin-bottom-sm radius padding-xs" :class="fate==item.name?'bg-orange':''" style="border: 1rpx solid gray;"
				@click="fate = item.name" v-for="(item,index) in uesrSetting.fate" :key="index">{{ item.name }}</view>
		</view>
		
		<view class="flex flex-wrap">
			<view class="margin-right-sm margin-bottom-sm radius padding-xs" :class="sect==item.name?'bg-orange':''" style="border: 1rpx solid gray;"
				@click="sect = item.name" v-for="(item,index) in uesrSetting.sect" :key="index">{{ item.name }}</view>
		</view>
		
		<input v-model="userName" type="text" placeholder="少侠,可否告知您的名讳">
		<button @click="createOk">创建完成</button>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	import uesrSetting from "/static/dataJson/uesrSetting.js"
	export default {
		data() {
			return {
				userName: "",
				uesrSetting: null,
				fate:"",
				sect:"",
			}
		},
		computed: {
			...mapState(["system"])
		},
		onLoad() {
			this.uesrSetting = uesrSetting
			this.fate = uesrSetting.fate[0].name
			this.sect = uesrSetting.sect[0].name
			console.log(uesrSetting);
		},
		methods: {
			...mapMutations(["SET_USERINFO"]),
			createOk() {
				this.SET_USERINFO({
					userName:this.userName,
					fate:this.fate,
					sect:this.sect
				})
				uni.redirectTo({
					url: "/pages/index/index"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>