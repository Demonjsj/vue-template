/*
 * @Author: JSJ 389114820@qq.com
 * @Date: 2023-12-26 14:00:43
 * @Description: 权限存储
 */
import auth from '@/plugins/auth'
import router, { constantRoutes, dynamicRoutes } from '@/router'
import { getRouters } from '@/api/menu'
import { Layout } from '@/router/constant'
// import ParentView from '@/components/ParentView/index.vue'
// import InnerLink from '@/layout/components/InnerLink/index.vue'

// 匹配views里面所有的.vue文件
const modules = import.meta.glob('./../../views/**/*.vue')

export const usePermissionStore = defineStore(
  'permission',
  {
    state: () => ({
      routes: [], // 总路由数据
      sidebarRouters: [], // 侧边栏路由
    }),
    actions: {
      // 设置总路由
      setRoutes(routes: any) {
        this.routes = constantRoutes.concat(routes) as []
      },
      // 设置侧边栏路由
      setSidebarRouters(routes: any) {
        this.sidebarRouters = routes
      },
      // 生成路由
      generateRoutes() {
        return new Promise(resolve => {
          // 向后端请求路由数据
          getRouters().then(res => {
            const sData = JSON.parse(JSON.stringify(res.data)) // 侧边栏数据
            const rData = JSON.parse(JSON.stringify(res.data)) // 重写数据
            const sidebarRoutes = filterAsyncRouter(sData) // 侧边栏路由
            const rewriteRoutes = filterAsyncRouter(rData, false, true) // 重写路由路径，将 children 中的 path 跟父的 path 拼接起来
            const asyncRoutes = filterDynamicRoutes(dynamicRoutes) // 判断动态路由是否有权限
            asyncRoutes.forEach(route => { router.addRoute(route) }) // 动态添加可访问路由表
            this.setRoutes(rewriteRoutes)
            this.setSidebarRouters(constantRoutes.concat(sidebarRoutes))
            resolve(rewriteRoutes)
          })
        })
      }
    }
  })

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap: any, lastRouter = false, type = false) {
  return asyncRouterMap.filter((route: any) => {
    if (type && route.children) {
      route.children = filterChildren(route.children)
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
        // route.component = ParentView
      } else if (route.component === 'InnerLink') {
        // route.component = InnerLink
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })
}

// 递归，获取 path
function filterChildren(childrenMap: any, lastRouter = false) {
  var children: any = []
  childrenMap.forEach((el: any) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView' && !lastRouter) {
        el.children.forEach((c: any) => {
          c.path = el.path + '/' + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path
      if (el.children && el.children.length) {
        children = children.concat(filterChildren(el.children, el))
        return
      }
    }
    children = children.concat(el)
  })
  return children
}

// 动态路由遍历，验证是否具备权限
export function filterDynamicRoutes(routes: any) {
  const res: any[] = []
  routes.forEach((route: any) => {
    if (route.permissions) {
      if (auth.hasPermiOr(route.permissions)) {
        res.push(route)
      }
    } else if (route.roles) {
      if (auth.hasRoleOr(route.roles)) {
        res.push(route)
      }
    }
  })
  return res
}

// 加载对应布局
export const loadView = (view: any) => {
  let res
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0]
    if (dir === view) {
      res = () => modules[path]()
    }
  }
  return res
}