<!--
 * @Author: JSJ 389114820@qq.com
 * @Date: 2024-01-17 11:43:18
 * @Description: 布局
-->
<script setup lang="ts">
import Header from './components/Header/index.vue'
import { useMenuStore } from '@/stores/modules/menu'
import Sidebar from './components/Sidebar/index.vue'

const menuStore = useMenuStore()

onBeforeMount(() => {
    nextTick(() => {
        reportWindowSize()
    })
})

onMounted(() => {
    window.addEventListener('resize', reportWindowSize)
})

onUnmounted(() => {
    window.removeEventListener('resize', reportWindowSize)
})

// 监听窗口大小
const reportWindowSize = () => {
    menuStore.updateLargeWindowSize(window.innerWidth > 1600)
    if (!menuStore.isLargeWindowSize) {
        menuStore.updateCollapsedStatus(true)
    }
}

// 菜单隐藏 or 展开
const collapsedChange = () => {
    menuStore.updateCollapsedStatus(!menuStore.collapsed)
}

</script>

<template>
    <n-layout style="height: 100vh;">
        <!-- 头部 -->
        <n-layout-header style="height: 56px;">
            <Header />
        </n-layout-header>
        <n-layout has-sider style="height: calc(100vh - 56px);">
            <!-- 侧边栏 -->
            <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="180"
                :collapsed="menuStore.collapsed" @collapse="menuStore.collapsed = true"
                @expand="menuStore.collapsed = false">
                <sidebar />
                <div class="collapsed-box flex-center" :class="{ 'collapsed-box-collapsed': menuStore.collapsed }"
                    @click="collapsedChange">
                    <svg-icon iconClass="collapsed" class="icon" />
                    <span v-if="!menuStore.collapsed">隐藏</span>
                </div>
            </n-layout-sider>
            <!-- 内容 -->
            <n-layout-content ref="contentRef" id="contentId" style="background-color: #F7F7F9;"
                content-style="height: calc(100vh - 56px); width: calc(max(1280px, 100vw) - 180px)"
                :native-scrollbar="false">
                <router-view v-slot="{ Component }">
                    <transition>
                        <keep-alive>
                            <component :is="Component" />
                        </keep-alive>
                    </transition>
                </router-view>
            </n-layout-content>
        </n-layout>
    </n-layout>
</template>

<style lang="scss" scoped>
:deep(.n-menu) {
    .n-menu-item {
        margin-top: 10px;
    }
}

.collapsed-box {
    height: 40px;
    width: 180px;
    background-color: #FFF;
    z-index: 1;
    border-top: 1px solid #EFEFF5;
    border-right: 1px solid #EFEFF5;
    position: absolute;
    left: 0;
    bottom: 0;
    column-gap: 8px;
    transition: all .2s linear;

    .icon {
        transform: rotate(0deg);
        transition: all .2s linear;
    }

    &:hover {
        color: $theme-color;
        cursor: pointer;
    }
}

.collapsed-box-collapsed {
    width: 64px;

    .icon {
        transform: rotate(180deg);
    }
}
</style>
