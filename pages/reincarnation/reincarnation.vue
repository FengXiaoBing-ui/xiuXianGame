<template>
	<view class="content padding-sm" style="width: 100vw;height: 100vh;">
		<view>
			<text>转世投胎，选择你要出生的城市</text>
		</view>
		<view class="tips text-sm">
			<view class="margin-top-sm">1级城市属于初级城市，这里的修士都处于练气、筑基等修为，偶尔会有结丹修士路过</view>
			<view class="margin-top-sm">2级城市属于中级城市，这里的修士都处于结丹、元婴等修为</view>
			<view class="margin-top-sm">3级城市属于高级城市，这里的修士都处于化神、炼虚等修为</view>
			<view class="margin-top-sm">4级城市属于传奇级城市，这里的修士都处于合体、大乘等修为</view>
			<view class="margin-top-sm">5级城市属于神级城市，这里的修士都处于渡劫，登仙等修为</view>
		</view>
		<view class="w100 flex flex-wrap margin-top">
			<view @click="sure(item)" v-for="(item,index) in nowCity" :key="index" class="margin-xs">
				<levelBox :level="item.grade">
					<view class="padding-sm">
						<view>{{ item.gf }}-{{ item.f }}</view>
						<view class="text-center text-bold">{{ item.name }}</view>
						<view class="text-sm text-gray text-center">{{ item.grade }}级</view>
					</view>
				</levelBox>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
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
				nowCity:[]
			}
		},
		computed:{
			...mapState(["userInfo"])
		},
		onLoad() {
			let city,country,sect = ''
			city = this.city.filter((ct) => {
				country = this.country.filter((cy) => {
					sect = this.sect.filter((s) => {
						return s.childrenCountryuId.indexOf(cy.id) != -1
					})
					cy.grade = sect[0]?.grade
					cy.gf = sect[0]?.name
					return cy.cityId.indexOf(ct.id) != -1
				})
				ct.f = country[0]?.name
				ct.gf = country[0]?.gf
				ct.grade = country[0]?.grade
				return true
			})
			city.sort((a,b)=> {return a.grade - b.grade;})
			this.nowCity = city
		},
		methods: {
			...mapMutations(["SET_USERINFO"]),
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
				archive.nowCity.userId = this.userInfo
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
