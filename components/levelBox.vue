<template>
	<view :class="{'normal-box':level==1,'rare-box':level==2,'epic-box':level==3,'legend-box':level==4,'god-box':level==5}">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props:{
			level:{
				type:String | Number,
				default:1
			}
		},
		name:"levelBox",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.normal-box{
	border: 2rpx solid #999999;
}
.rare-box{
	border: 2rpx solid #3e85c7;
}
.epic-box{
	border: 2rpx solid #993099;
}
.legend-box{
	border: 2rpx solid #f3ae00;
}
.god-box{
	border: 2rpx solid #c50003;
}
</style>