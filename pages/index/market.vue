<template>
	<view class="padding">
		<view class="flex flex-wrap justify-between w100" v-show="type==null">
			<view @click="choice(item.type)" v-for="item in list" :key="item" class="flex align-center justify-center" style="width: 46%;height: 200rpx;">{{ item.name }}</view>
		</view>
		<view v-show="type!=null" @click="type=null">离开</view>
		<view v-show="type==1">
			<view class="text-bold text-xl">丹药阁</view>
			<view class="text-bold text-lg">突破类</view>
			<view v-for="item in panacea.breakThrough" :key="item.id" class="flex flex-wrap justify-between">
				<goodsBox :level="item.grade" :name="item.name"></goodsBox>
			</view>
			<view class="text-bold text-lg">回血类</view>
			<view class="flex flex-wrap">
				<view v-for="item in panacea.recovered" :key="item.id" class="margin-right-xs">
					<goodsBox :level="item.grade" :name="item.name"></goodsBox>
				</view>
			</view>
			<view class="text-bold text-lg">回灵类</view>
			<view class="flex flex-wrap">
				<view v-for="item in panacea.magic" :key="item.id" class="margin-right-xs">
					<goodsBox :level="item.grade" :name="item.name"></goodsBox>
				</view>
			</view>
			<view class="text-bold text-lg">提升修为类</view>
			<view class="flex flex-wrap">
				<view v-for="item in panacea.exp" :key="item.id" class="margin-right-xs">
					<goodsBox :level="item.grade" :name="item.name"></goodsBox>
				</view>
			</view>
		</view>
		<view v-show="type==2">
			<view class="text-bold text-xl">宝器楼</view>
			<view class="text-bold text-lg">攻击类</view>
			<view v-for="item in equip.attackType" :key="item.id">
				<levelBox :level="item.grade">
					<view class="padding-sm">{{ item.name }}</view>
				</levelBox>
			</view>
			<view class="text-bold text-lg">防鱼类</view>
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
		<view v-show="type==3"></view>
	</view>
</template>

<script>
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
				type:null
			}
		},
		methods: {
			choice(type){
				this.type = type
			},
		}
	}
</script>

<style>

</style>
