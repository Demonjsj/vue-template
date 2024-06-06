/*
 * @Author: JSJ 389114820@qq.com
 * @Date: 2024-05-31 15:17:44
 * @Description: vite 配置
 */
import path from 'path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

import AutoImport from 'unplugin-auto-import/vite' // 自动引入 API
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import UnoCSS from 'unocss/vite' // 引入 UnoCSS

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: '/src/typings/auto-imports.d.ts'
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      dts: 'src/typings/components.d.ts',
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹(路径为存放所有svg图标的文件夹)
      iconDirs: [
        path.resolve(process.cwd(), 'src/assets/icons/svg'),
        path.resolve(process.cwd(), 'src/assets/icons/system')
      ],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    }),
    UnoCSS()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/styles/common.scss";'
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 9527,  // 设置端口号
    open: true,
    proxy: {
      '/dev-api': {
        target: 'https://mock.apipark.cn/m1/3377423-745066-default',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/dev-api/, '')
      }
    }
  }
})
