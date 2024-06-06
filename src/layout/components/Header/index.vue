<!--
 * @Author: JSJ 389114820@qq.com
 * @Date: 2024-01-26 13:22:32
 * @Description: 系统头部布局
-->
<script lang="ts" setup>
import { useUserStore } from '@/stores/modules/user'

const title = import.meta.env.VITE_APP_TITLE

const userStore = useUserStore()
const router = useRouter()

// 下拉菜单选项
const userOptions = ref([
    {
        label: '退出',
        key: 'logout'
    },
])

// 处理选择事件
const handleSelect = (key: string) => {
    switch (key) {
        case 'logout':
            userStore.logOut().then(() => {
                router.push('/login')
            })
            break
    }
}

</script>

<template>
    <div class="header flex-y-center justify-between h-56px px-20px w-vw z-9 absolute">
        <n-flex align="center">
            <img src="@/assets/images/logo.svg" class="w-65px h-35px">
            <div class="pl-16px" b-l="1px solid theme-border-gray">{{ title }}</div>
        </n-flex>
        <n-flex align="center" class="header-right">
            <n-avatar round :size="32" class="bg-theme-color text-white">
                {{ userStore.name.substring(0, 1) }}
            </n-avatar>
            <n-dropdown trigger="hover" :options="userOptions" @select="handleSelect">
                <n-flex class="cursor-pointer" align="center" :size="5">
                    <div class="user-name">{{ userStore.name }}</div>
                    <svg-icon iconClass="single-arrow" class="rotate-270" />
                </n-flex>
            </n-dropdown>
        </n-flex>
    </div>
</template>

<style lang="scss" scoped>
.header {
    min-width: 1280px;
    box-shadow: 0 4px 6px 1px rgba(0, 0, 0, 0.1);

    .user-name {
        max-width: 68px;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        white-space: nowrap;
    }
}
</style>
