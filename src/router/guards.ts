/*
 * @Author: JSJ 389114820@qq.com
 * @Date: 2023-12-25 11:36:27
 * @Description: 路由守卫
 */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken, removeToken } from '@/utils/auth'
import { isReLogin } from '@/utils/request' // 是否重新登录
import { useUserStore } from '@/stores/modules/user'
import { usePermissionStore } from '@/stores/modules/permission'
import type { Router } from 'vue-router'

NProgress.configure({ showSpinner: false })

// 白名单列表
const whiteList = ['/login', '/register', '/HtmlToPdf']

export function createRouterGuards(router: Router) {
  router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    const permissionStore = usePermissionStore()
    NProgress.start()
    // 有 token
    if (getToken()) {
      // 如果有 token 的情况下，去登录，默认跳转首页
      if (to.path === '/login') {
        console.log('to.path = ', to.path)
        next({ path: '/' })
        NProgress.done()
      } else if (whiteList.indexOf(to.path) !== -1) {
        // 如果在白名单里，直接进入
        next()
      } else {
        // 如果角色为空
        if (userStore.roles.length === 0) {
          isReLogin.show = true
          // 判断当前用户是否已拉取完user_info信息
          userStore.getInfo().then(() => {
            isReLogin.show = false
            // 获取路由
            permissionStore.generateRoutes().then((accessRoutes: any) => {
              // 根据roles权限生成可访问的路由表
              accessRoutes.forEach((route: any) => {
                router.addRoute(route) // 动态添加可访问路由表
              })
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
            })
          }).catch(() => {
            userStore.logOut().then(() => {
              next({ path: '/login' })
            })
          })
        } else {
          // 如果没有权限，不让进入
          if (userStore.roles.includes('ROLE_DEFAULT')) {
            userStore.logOut().then(() => {
              window.$message.error('该账号没有权限！')
              next({ path: '/login' })
            })
          } else {
            next()
          }
        }
      }
    } else {
      // 没有 token
      if (whiteList.indexOf(to.path) !== -1) {
        // 在免登录白名单，直接进入
        next()
      } else {
        next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
        // next(`/login`) // 否则全部重定向到登录页
        NProgress.done()
      }
    }
  })

  router.afterEach(() => {
    NProgress.done()
  })

  router.onError((error: any) => {
    console.log(error, '路由错误')
  })
}
