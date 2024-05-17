<template>
	<view class="padding">
		<view class="flex flex-wrap justify-between w100" v-show="type==null">
			<view @click="choice(item.type)" v-for="item in list" :key="item" class="flex align-center justify-center" style="width: 46%;height: 200rpx;">{{ item.name }}</view>
		</view>
		<view v-show="type!=null" @click="getOut">离开</view>
		<view v-if="type==1">
			<view class="text-bold text-xl">丹药阁</view>
			<view class="text-bold text-lg">突破类</view>
			<view v-for="item in panacea.breakThrough" :key="item.id" class="flex flex-wrap justify-between">
				<goodsBox :level="item.grade" :name="item.name" :productId="item.id" @productNum="productNum"></goodsBox>
			</view>
			<view class="text-bold text-lg">回血类</view>
			<view class="flex flex-wrap">
				<view v-for="item in panacea.recovered" :key="item.id" class="margin-right-xs">
					<goodsBox :level="item.grade" :name="item.name" :productId="item.id" @productNum="productNum"></goodsBox>
				</view>
			</view>
			<view class="text-bold text-lg">回灵类</view>
			<view class="flex flex-wrap">
				<view v-for="item in panacea.magic" :key="item.id" class="margin-right-xs">
					<goodsBox :level="item.grade" :name="item.name" :productId="item.id" @productNum="productNum"></goodsBox>
				</view>
			</view>
			<view class="text-bold text-lg">提升修为类</view>
			<view class="flex flex-wrap">
				<view v-for="item in panacea.exp" :key="item.id" class="margin-right-xs">
					<goodsBox :level="item.grade" :name="item.name" :productId="item.id" @productNum="productNum"></goodsBox>
				</view>
			</view>
		</view>
		<view v-if="type==2">
			<view class="text-bold text-xl">宝器楼</view>
			<view class="text-bold text-lg">攻击类</view>
			<view v-for="item in equip.attackType" :key="item.id">
				<levelBox :level="item.grade">
					<view class="padding-sm">{{ item.name }}</view>
				</levelBox>
			</view>
			<view class="text-bold text-lg">防御类</view>
			<view v-for="item in equip.defenseType" :key="item.id">
				<levelBox :level="item.grade">
					<view class="padding-sm">{{ item.name }}</view>
				</levelBox>
			</view>
			<view class="text-bold text-lg">辅助类</view>
			<view v-for="item in equip.auxiliaryType" :key="item.id">
				<levelBox :level="item.grade">
					<view class="padding-sm">{{ item.name }}</view>
				</levelBox>
			</view>
		</view>
		<view v-if="type==3"></view>
		<button v-show="type!=null&&price" @click="buy" :disabled="handleDisabled" class="cu-btn margin-top w100 flex align-center justify-center bg-red round">花费{{ price }}灵石 购买</button>
		<view>当前灵石：{{ archive.attribute.money }}</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from "vuex"
	
	import PANACEA from "@/static/dataJson/panacea.js"
	
	import ATTACKTYPE from "@/static/dataJson/equip/attackType.js"
	import DEFENSETYPE from "@/static/dataJson/equip/defenseType.js"
	import AUXILIARYTYPE from "@/static/dataJson/equip/auxiliaryType.js"
	
	export default {
		data() {
			return {
				panacea:PANACEA,
				equip:{
					attackType:ATTACKTYPE,
					defenseType:DEFENSETYPE,
					auxiliaryType:AUXILIARYTYPE
				},
				list:[
					{
						name:"丹药阁",
						type:1
					},
					{
						name:"宝器楼",
						type:2
					},
					{
						name:"灵植堂",
						type:3
					}
				],
				type:null,
				productList:[],
				price:0,
				archive: uni.getStorageSync('archive'),
				disabled:false,
				goodsList:[]
			}
		},
		computed:{
			handleDisabled(){
				let flag = false
				if(this.price > this.archive.attribute.money) flag = true
				return flag||this.disabled
			}
		},
		methods: {
			...mapMutations(["SET_USERINFO"]),
			choice(type){
				this.type = type
			},
			getOut(){
				this.type = null
				this.price = 0
			},
			productNum(e){
				//某个元素满足特定条件就修改它，否则就添加这个元素到数组中
				if(this.productList.length){
					let existingItem = this.productList.find(element => element.productId == e.productId);
					if(existingItem){
						existingItem.count = e.count
					}else{
						this.productList.push(e)
					}
				}else{
					this.productList.push(e)
				}
				this.handPrice()
			},
			handPrice(){
				let price = 0
				for (let keyName in this.panacea) {
					this.panacea[keyName].forEach(item => {
						let existingItem = this.productList.find(element => element.productId == item.id)
						if(existingItem){
							price += (item.price*existingItem.count)
						}
					})
				}
				this.price = price
			},
			buy(){
				this.disabled = true
				this.archive.attribute.money -= this.price
				
					if(this.archive.goods.length){
						this.productList.forEach(item => {
							let existingItem = this.archive.goods.find(element => element.productId == item.productId);
							if(existingItem){
								existingItem.count += item.count
							}else{
								this.archive.goods.push(item)
							}
						})
					}else{
						this.archive.goods = this.productList
					}
				uni.setStorageSync('archive',this.archive)
				this.SET_USERINFO(this.archive)
				this.disabled = false
				this.productList = []
				this.type = null
			}
		}
	}
</script>

<style>

</style>
