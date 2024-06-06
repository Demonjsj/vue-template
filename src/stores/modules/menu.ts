/*
 * @Author: JSJ 389114820@qq.com
 * @Date: 2023-12-25 14:54:40
 * @Description: 
 */
import { defineStore } from "pinia";
export const useMenuStore = defineStore({
    id: "menu",
    state: () => ({
        currentMenuKey: function() {
            const key = sessionStorage.getItem('ck')
            if(key && typeof key === 'string') {
                return key
            } else {
                return 'home'
            }
        }(),
        collapsed: false,
        isLargeWindowSize: true, // 当前窗口是否大尺寸
    }),
    getters: {},
    actions: {
        updateCurrentMenuKey(key: string) {
            console.log('更新 current key', key)
            this.currentMenuKey = key
            sessionStorage.setItem('ck', key)
        },
        updateCollapsedStatus(status: boolean) {
            this.collapsed = status
        },
        updateLargeWindowSize(value: boolean) {
            this.isLargeWindowSize = value
        }
    },
})