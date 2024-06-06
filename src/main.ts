/*
 * @Author: JSJ 389114820@qq.com
 * @Date: 2024-05-31 15:17:44
 * @Description: 主文件入口
 */
// import './assets/main.css'

import { createApp } from 'vue'
import { setupStore } from '@/stores' // 状态管理
import { setupRouter } from '@/router' // 路由管理

import App from './App.vue'

import 'virtual:svg-icons-register' // 注册脚本
import 'uno.css' // 引入 uno 样式
import '@/assets/styles/index.scss' // global css

import SvgIcon from '@/components/SvgIcon/index.vue' // 全局图标组件
import Pagination from '@/components/Pagination.vue' // 全局分页组件
import CustomInput from '@/components/CustomInput.vue' // 二次封装 n-input 组件

const app = createApp(App)

// 挂载状态管理
setupStore(app)

// 挂载路由
setupRouter(app)

// 全局组件挂载
app.component('svg-icon', SvgIcon)
app.component('pagination', Pagination)
app.component('custom-input', CustomInput)

app.mount('#app')
