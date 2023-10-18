import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import store from "@/store/index.js";
import createNpc from "@/util/npc.js"
import tool from "@/util/tool.js"

export function createApp() {
  const app = createSSRApp(App)
  
  app.config.globalProperties.store = store
  app.config.globalProperties.createNpc = createNpc
  app.config.globalProperties.tool = tool
  
  app.use(store)
  
  return {
    app
  }
}
// #endif