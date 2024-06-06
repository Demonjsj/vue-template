/*
 * @Author: JSJ 389114820@qq.com
 * @Date: 2024-05-31 15:17:44
 * @Description: 路由
 */
import { createRouter, createWebHistory } from 'vue-router'
import { Layout } from '@/router/constant'
import type { App } from 'vue'
import { createRouterGuards } from './guards'

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/index.vue'),
        name: 'Index',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
]

export const dynamicRoutes = []

// 创建路由
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

// 挂载路由
export function setupRouter(app: App) {
  app.use(router)
  // 创建路由守卫
  createRouterGuards(router)
}

export default router
