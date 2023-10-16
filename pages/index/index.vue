<template>
	<view class="content">
		
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		computed:{
			...mapState(["userInfo"])
		},
		onLoad() {
			if(!this.userInfo){
				uni.navigateTo({
					url:"/pages/setUserName/setUserName"
				})
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
