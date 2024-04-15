<template>
	<view class="content padding-sm" style="width: 100vw;height: 100vh;">
		<view>
			<text>转世投胎，选择你的要出生的大陆、国家、城市</text>
		</view>
		<view class="w100 flex flex-wrap" v-show="!nowCountry.length&&!nowCity.length">
			<view @click="choiceSect(item)" v-for="(item,index) in sect" :key="index" class="margin-tb-sm" :style="(index+1)%3==0?'':'margin-right:127rpx'">
				<levelBox :level="item.grade">
					<view class="padding">{{ item.name }}</view>
				</levelBox>
			</view>
		</view>
		<view class="w100 flex flex-wrap" v-show="nowCountry.length&&!nowCity.length">
			<view @click="choiceCountry(item)" v-for="(item,index) in nowCountry" :key="index" class="margin-tb-sm" :style="(index+1)%3==0?'':'margin-right:127rpx'">
				<levelBox :level="item.grade">
					<view class="padding">{{ item.name }}</view>
				</levelBox>
			</view>
		</view>
		<view class="w100 flex flex-wrap" v-show="nowCountry.length&&nowCity.length">
			<view @click="sure(item)" v-for="(item,index) in nowCity" :key="index" class="margin-tb-sm" :style="(index+1)%3==0?'':'margin-right:127rpx'">
				<levelBox :level="item.grade">
					<view class="padding">{{ item.name }}</view>
				</levelBox>
			</view>
		</view>
		<view v-show="nowCountry.length||nowCity.length" @click="back" class="cu-btn bg-red light radius margin-top w100">
			上一步
		</view>
	</view>
</template>

<script>
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
				nowCity:[]
			}
		},
		methods: {
			choiceSect(item){
				let country = this.country.filter(function(c){
					c.grade = item.grade
					return item.childrenCountryuId.indexOf(c.id) != -1
				})
				this.nowCountry = country
			},
			choiceCountry(item){
				let city = this.city.filter(function(c){
					c.grade = item.grade
					return item.cityId.indexOf(c.id) != -1
				})
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
				uni.reLaunch({
					url:"/pages/index/index"
				})
			}
		}
	}
</script>

<style>

</style>
