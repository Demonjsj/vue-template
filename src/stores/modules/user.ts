/*
 * @Author: JSJ 389114820@qq.com
 * @Date: 2023-12-26 13:44:45
 * @Description: 用户存储
 */
import { login, logout, getInfo, wxLogin } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { SHA256 } from 'crypto-js'

export const useUserStore = defineStore(
  'user',
  {
    state: () => ({
      token: getToken(),
      id: '', // 用户 id
      name: '', // 用户名称
      dept: null, // 用户部门
      roles: [], // 用户角色
      permissions: [], // 用户权限
    }),
    actions: {
      // 登录
      login(userInfo: any) {
        const data = {
          username: userInfo.username.trim(),
          password: SHA256(userInfo.password).toString()
        }
        return new Promise((resolve, reject) => {
          login(data).then((res: any) => {
            setToken(res.token)
            this.token = res.token
            resolve(true)
          }).catch(error => {
            reject(error)
          })
        })
      },
      // 企业微信自动登录
      wxAutoLogin(params: any) {
        return new Promise((resolve, reject) => {
          wxLogin(params).then((res: any) => {
            setToken(res.token)
            this.token = res.token
            resolve(true)
          }).catch(error => {
            reject(error)
          })
        })
      },
      // 获取用户信息
      getInfo() {
        return new Promise((resolve, reject) => {
          getInfo().then((res: any) => {
            this.id = res.user.userId
            this.name = res.user.nickName
            this.dept = res.user.dept

            // 验证返回的roles是否是一个非空数组
            if (res.roles && res.roles.length > 0) {
              this.roles = res.roles
              this.permissions = res.permissions
            } else {
              this.roles = ['ROLE_DEFAULT']
            }
            resolve(res)
          }).catch(error => {
            reject(error)
          })
        })
      },
      // 退出系统
      logOut() {
        return new Promise((resolve, reject) => {
          logout().then(() => {
            this.token = ''
            this.roles = []
            this.permissions = []
            removeToken()
            resolve(true)
          }).catch(error => {
            reject(error)
          })
        })
      }
    }
  })
