import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
//引入公共样式
import '@/assets/less/public.less';
import "@/router/guard.js"


//导入ui组件与样式
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入echarts 图表
import 'echarts'
import ECharts from 'vue-echarts'

//引自定义axios
import service from '@/utils/service';
//自定义axios挂载原型
Vue.prototype.service=service
//引入qs模块
import qs from 'qs'     
Vue.prototype.$qs = qs


// 全局注册组件（也可以使用局部注册）
Vue.component('ECharts', ECharts)

//注册ui
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
