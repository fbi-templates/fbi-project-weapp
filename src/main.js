import Vue from 'vue'
import App from './App'
import weui from 'weui-wxss'
import 'weui-wxss/dist/app.wxss'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(weui)
const app = new Vue(App)
app.$mount()
