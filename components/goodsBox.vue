<template>
	<view>
		<view style="width: 100rpx;height: 100rpx;"
			:class="{'normal-box':level==1,'rare-box':level==2,'epic-box':level==3,'legend-box':level==4,'god-box':level==5}"
			class="flex align-center justify-center text-sm">
			{{ name }}
		</view>
		<view class="flex align-center justify-between" style="width: 100rpx;">
			<view @click="reduce" class="round flex align-center justify-center"
				style="width: 30rpx;height: 30rpx;border: 2rpx solid black;">-</view>
			<input style="width: 40rpx;" class="text-center" maxlength="2" v-model="count" type="number" />
			<view @click="add" class="round flex align-center justify-center"
				style="width: 30rpx;height: 30rpx;border: 2rpx solid black;">+</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
				default: ""
			},
			level: {
				type: Number,
				default: 1
			},
			productId: {
				type: String
			}
		},
		name: "goodsBox",
		data() {
			return {
				count: 0
			};
		},
		watch:{
			count(){
				this.$emit('productNum',{count:this.count,productId:this.productId})
			}
		},
		methods: {
			add() {
				this.count++
			},
			reduce() {
				if (this.count <= 1) return;
				this.count--
			}
		}
	}
</script>

<style lang="scss" scoped>
	.normal-box {
		border: 4rpx solid #999999;
		color: #999999;
	}

	.rare-box {
		border: 4rpx solid #3e85c7;
		color: #3e85c7;
	}

	.epic-box {
		border: 4rpx solid #993099;
		color: #993099;
	}

	.legend-box {
		border: 4rpx solid #f3ae00;
		color: #f3ae00;
	}

	.god-box {
		border: 4rpx solid #c50003;
		color: #c50003;
	}
</style>