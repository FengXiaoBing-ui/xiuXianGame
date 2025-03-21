<template>
	<view class="padding-lr-sm">
		<view class="flex justify-between align-center margin-bottom">
			<view class="flex-sub">攻击力</view>
			<input v-model="archive.attackCount" class="flex-treble radius padding-xs" style="border: 1rpx solid gray;height: 50rpx;" type="text" />
		</view>
		<view class="flex justify-between align-center margin-bottom">
			<view class="flex-sub">血量</view>
			<input v-model="archive.healthValue" class="flex-treble radius padding-xs" style="border: 1rpx solid gray;height: 50rpx;" type="text" />
		</view>
		<view class="flex justify-between align-center margin-bottom">
			<view class="flex-sub">灵石</view>
			<input v-model="archive.money" class="flex-treble radius padding-xs" style="border: 1rpx solid gray;height: 50rpx;" type="text" />
		</view>
		<view @click="modify" class="cu-btn bg-red round w100">
			修改
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				archive: uni.getStorageSync('archive').attribute
			}
		},
		methods: {
			...mapMutations(["SET_USERINFO"]),
			modify(){
				let a = uni.getStorageSync('archive')
				a.attribute = this.archive
				uni.setStorageSync('archive',a)
				this.SET_USERINFO(a)
			}
		}
	}
</script>

<style>

</style>
