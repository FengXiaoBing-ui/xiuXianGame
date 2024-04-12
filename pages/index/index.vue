<template>
	<view class="content padding-sm" style="width: 100vw;height: 100vh;">
		
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		computed: {
			...mapState(["userInfo"]),
			...mapState("npc",["npcList"])
		},
		onLoad() {
			if (JSON.stringify(this.userInfo)=='{}') {
				return uni.navigateTo({
					url: "/pages/setUserName/setUserName"
				})
			}
		},
		methods: {
			...mapMutations("npc", ["SET_NPC_LIST","MODIFY_NPC_LIST"]),
			...mapMutations(["SET_USERINFO"]),
			attack(item){
				let count = 0
				while(item.healthValue>0&&this.userInfo.healthValue>0){
					if(count%2==0){
						this.userInfo.attack(item)
					}else{
						item.attack(this.userInfo)
					}
					count++
				}
			}
		}
	}
</script>

<style>

</style>