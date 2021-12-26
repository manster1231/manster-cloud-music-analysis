import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
//引入全局样式
import './assets/css/golbal.less'
//请求基准路径
axios.defaults.baseURL = 'http://127.0.0.1:8082/api/'
Vue.prototype.$http = axios
Vue.prototype.$echarts = window.echarts

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
