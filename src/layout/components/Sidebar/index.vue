<!--
 * @Author: JSJ 389114820@qq.com
 * @Date: 2023-12-29 10:45:34
 * @Description: 侧边栏
-->
<script setup lang="ts">
import { usePermissionStore } from '@/stores/modules/permission'
import type { MenuOption } from 'naive-ui'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { useMenuStore } from '@/stores/modules/menu'

const route = useRoute()
const router = useRouter()
const menuStore = useMenuStore()
const permissionStore = usePermissionStore()

// 处理菜单数据
const filterData = (data) => {
  return data.filter(node => {
    // 判断当前节点是否匹配筛选条件
    node.show = !node?.hidden
    node.label = node?.meta?.title
    // 如果只有一个 children 默认展示 children
    if (!node.hidden && node.children?.length === 1) {
      node.component = node.children[0].component
      node.meta = node.children[0].meta
      node.name = node.children[0].name
      node.path = node.children[0].path
      node.show = node.children[0].show
      delete node.children
      node.label = node?.meta?.title
    }
    // 配置 path
    if (!node.hidden && node.children) {
      for (let item of node.children) {
        item.path = node.path + '/' + item.path
        item.label = item?.meta?.title
      }
    }
    // 递归过滤子节点
    if (node.children && node.children.length) {
      node.children = filterData(node.children)
      return true
    }
    return true
  })
}

const sidebarRouters = ref([])
sidebarRouters.value = filterData(JSON.parse(JSON.stringify(permissionStore.sidebarRouters)))

console.log('sidebarRouters = ', sidebarRouters)

const activeMenu = ref(route.path)

watch(route, value => {
  if (value.meta?.activeMenu) {
    activeMenu.value = value.meta.activeMenu as string
    return
  }
  activeMenu.value = value.path
}, { immediate: true })

// 菜单点击事件
const clickMenuItem = (key: string, item: MenuOption) => {
  console.log('点击左侧菜单栏 key = ', key)
  router.push(key)
}

// 菜单图标渲染
const renderMenuIcon = (option: MenuOption) => {
  return h(
    SvgIcon,
    {
      iconClass: option?.meta?.icon,
      style: 'width: 16px; height: 16px; display: flex; align-items: center;'
    }
  )
}

</script>

<template>
  <div style="height: calc(100vh - 96px)">
    <n-scrollbar>
      <n-menu v-model:value="activeMenu" :collapsed="menuStore.collapsed" :collapsed-icon-size="16" :icon-size="16"
        :collapsed-width="64" :options="sidebarRouters" @update:value="clickMenuItem" key-field="path"
        children-field="children" :render-icon="renderMenuIcon" :root-indent="26" :indent="10" />
    </n-scrollbar>
  </div>
</template>
