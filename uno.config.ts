/*
 * @Author: JSJ 389114820@qq.com
 * @Date: 2024-05-31 16:16:28
 * @Description: UnoCSS 配置
 */
import { defineConfig } from 'unocss'
import presetAttributify from '@unocss/preset-attributify'
import presetUno from '@unocss/preset-uno'
import customPreset from '@vt/uno-preset'

export default defineConfig({
  theme: {
    colors: {
      'theme-color': '#218374', // 主题色
      'theme-border-color': '#E8ECF1', // 边框线条颜色
      'theme-border-gray': '#E6E8EB', // 分割线颜色
      'theme-text-color': '#001333', // 文本字体颜色
      'theme-text-color60': '#7F8898', // 文本提示字体颜色
    }
  },
  // https://unocss.nodejs.cn/presets/
  presets: [ // 预设
    presetUno(), // 默认预设
    presetAttributify(), // 为其他规则启用属性化模式
    customPreset
  ],
  // https://unocss.nodejs.cn/config/#blocklist
  blocklist: ['container', 'table'], // 排除设计系统选择器的规则（以缩小可能性）
})