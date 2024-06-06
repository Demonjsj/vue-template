/*
 * @Author: JSJ 389114820@qq.com
 * @Date: 2023-12-25 11:19:52
 * @Description: 
 */
export const useColorStore = defineStore({
    id: 'color',
    state: () => ({
        themeColor: '#218374',
        themeTextColor: '#001333',
        disabledColor: '#E6E8EB',
        themeTextColor60: '#7F8898',
    })
})