<template>
	<view class="content padding-sm" style="width: 100vw;height: 100vh;">
		<view class="flex justify-between h100">
			<view class="flex flex-direction flex-sub h100" style="overflow-y: auto;">
				<view @click="choiceSect(item,index)" v-for="(item,index) in sect" :key="index" class="margin-tb-sm text-center">
					<levelBox :level="item.grade">
						<view class="padding">{{ item.name }}</view>
						<view v-show="sectIndex==index" class="round" style="border:4rpx solid red;width: 20rpx;height: 20rpx;position: absolute;bottom: 10rpx;right: 10rpx;"></view>
					</levelBox>
					<view v-show="sectIndex==index" @click="sure(item)" class="bg-red">
					<view class="text-sm">消耗{{ item.transferTerms.money }}灵石</view>
						传送 > </view>
				</view>
			</view>
			<view class="flex flex-direction flex-sub margin-lr-sm h100" style="overflow-y: auto;">
				<view @click="choiceCountry(item,index)" v-for="(item,index) in nowCountry" :key="index" class="margin-tb-sm text-center">
					<levelBox :level="item.grade">
						<view class="padding">{{ item.name }}</view>
						<view v-show="countryIndex==index" class="round" style="border:4rpx solid red;width: 20rpx;height: 20rpx;position: absolute;bottom: 10rpx;right: 10rpx;"></view>
					</levelBox>
					<view v-show="countryIndex==index" @click="sure(item)" class="bg-red"><view class="text-sm">消耗{{ item.transferTerms.money }}灵石</view>灵石传送 > </view>
				</view>
			</view>
			<view class="flex flex-direction flex-sub h100" style="overflow-y: auto;">
				<view v-show="nowCountry.length&&nowCity.length" v-for="(item,index) in nowCity" :key="index" class="margin-tb-sm text-center">
					<levelBox :level="item.grade">
						<view class="padding">{{ item.name }}</view>
					</levelBox>
					<view class="bg-red" @click="sure(item)"><view class="text-sm">消耗{{ item.transferTerms.money }}灵石</view>灵石传送 > </view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from "vuex"
	import SECT from "@/static/dataJson/sect.js"
	import COUNTRY from "@/static/dataJson/country.js"
	import CITY from "@/static/dataJson/city.js"
	export default {
		data() {
			return {
				sect:SECT,
				country:COUNTRY,
				city:CITY,
				nowCountry:[],
				nowCity:[],
				sectIndex:null,
				countryIndex:null
			}
		},
		methods: {
			...mapMutations(["SET_USERINFO"]),
			choiceSect(item,index){
				let country = this.country.filter(function(c){
					c.grade = item.grade
					return item.childrenCountryuId.indexOf(c.id) != -1
				})
				this.sectIndex = index
				this.countryIndex = null
				this.nowCountry = country
				this.nowCity = []
			},
			choiceCountry(item,index){
				let city = this.city.filter(function(c){
					c.grade = item.grade
					return item.cityId.indexOf(c.id) != -1
				})
				this.countryIndex = index
				this.nowCity = city
			},
			back(){
				if(this.nowCity.length) return this.nowCity = [];
				if(this.nowCountry.length) return this.nowCountry = [];
			},
			sure(item){
				let archive = uni.getStorageSync('archive')
				archive.nowCity = item
				uni.setStorageSync('archive',archive)
				this.SET_USERINFO(archive)
				uni.reLaunch({
					url:"/pages/index/index"
				})
			}
		}
	}
</script>

<style>

</style>
