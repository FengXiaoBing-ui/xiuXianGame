<script>
	import store from "@/store/index.js";
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			uni.getSystemInfo({
				success(res) {
					store.commit("SET_SYSTEM",res)
				}
			})
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "./main.css";
	/*每个页面公共css */
</style>
