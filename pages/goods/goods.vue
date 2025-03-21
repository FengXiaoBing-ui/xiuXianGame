<template>
	<view>
		<view v-for="item in myGoods" :key="item.id">
			<levelBox :level="item.grade">
				<view class="padding-sm">{{ item.name }} 数量:{{ item.count }}</view>
			</levelBox>
		</view>
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
				allGoods:[...ATTACKTYPE,...DEFENSETYPE,...AUXILIARYTYPE,...PANACEA.breakThrough,...PANACEA.recovered,...PANACEA.magic,...PANACEA.exp],
				goods:[],
				myGoods:[]
			}
		},
		onShow() {
			this.myGoods = []
			this.goods = uni.getStorageSync('archive').goods
			this.goods.forEach(item => {
				let selectItem = this.allGoods.find(element => element.id == item.productId)
				if(selectItem){
					selectItem.count = item.count
					this.myGoods.push(selectItem)
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
