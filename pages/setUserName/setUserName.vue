<template>
	<view style="width: 100vw;height: 100vh;" class="flex flex-direction justify-center align-center">
		<input v-model="userName" type="text" placeholder="少侠,可否告知您的名讳">
		<button @click="createOk">创建完成</button>
	</view>
</template>

<script>
	import { mapState,mapMutations } from "vuex"
	import uesrSetting from "/static/dataJson/uesrSetting.js"
	export default {
		data() {
			return {
				userName:""
			}
		},
		computed:{
			...mapState(["system"])
		},
		onLoad() {
			console.log(uesrSetting.family);
		},
		methods: {
			...mapMutations(["SET_USERINFO"]),
			createOk(){
				this.SET_USERINFO({
					userName:this.userName
				})
				uni.redirectTo({
					url:"/pages/index/index"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
