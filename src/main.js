// 项目的JS入口文件
console.log('ok')

import app from './App.vue'
import 'mint-ui/lib/style.css'
import './css/lib/mui/css/mui.css'
import './css/lib/mui/css/icons-extra.css'
// import './css/lib/mui/js/mui.js'    //mui.js中用到了‘caller’等，在webpack打包好的bundle.js中，默认开启严格模式
                                    // 而‘caller’这些在严格模式下无法使用，所以这两者冲突了
// 解决方案：1，把mui.js中的非严格模式的代码改掉（无法实现）
//          2，把webpack打包时候的严格模式禁用掉

import Vue from 'vue'
import MintUI from 'mint-ui'
Vue.use(MintUI)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 引入mui.js文件
// import mui from '../../css/lib/mui/js/mui.js'
import mui from './css/lib/mui/js/mui.js'
Vue.prototype.mui=mui;
import './css/lib/mui/js/webviewGroup.js'

// 导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root='http://www.liulongbin.top:3005/'
// 全局设置post时候表单数据格式阻止形式
Vue.http.options.emulateJSON=true

// 导入自己的router.js 路由模块
import router from './router.js'

import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 导入格式化时间的插件moment
import moment from 'moment'
// 定义全局过滤器
Vue.filter('dateForm',function(dataStr,pattern = "YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})

var vm = new Vue({
    el:'#app',
    render:c=>c(app),
    router  //挂载路由对象到VM实例上

})