<template>
	<view class="content" style="width: 100vw;height: 100vh;">
		
		<view class="flex flex-wrap bg-white shadow" style="position: absolute;bottom: 0;left: 0;width: 100%;">
			<view class="margin-xs">姓名：{{ userInfo?.userName }}</view>
			<view class="margin-xs">血量：{{ userInfo.attribute?.healthValue }}</view>
			<view class="margin-xs">法力值：{{ userInfo.attribute?.energy }}</view>
			<view class="margin-xs">攻击力：{{ userInfo.attribute?.attackCount }}</view>
			<view class="margin-xs">防御力：{{ userInfo.attribute?.defense }}</view>
			<view class="margin-xs">灵根：<text v-for="(item,index) in userInfo?.lingen" :key="index">{{ item.name }}</text></view>
			<view class="margin-xs">悟性：{{ userInfo.attribute?.wuXing }}</view>
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
		},
		onLoad() {
		},
		methods: {
		}
	}
</script>

<style>

</style>