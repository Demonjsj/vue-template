/*
 * @Author: JSJ 389114820@qq.com
 * @Date: 2024-06-04 17:25:52
 * @Description: 
 */
import type { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

/** Setup Vue store plugin pinia */
export function setupStore(app: App) {
    const store = createPinia()

    store.use(piniaPluginPersistedstate)

    app.use(store)
}