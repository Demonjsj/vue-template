<!--
 * @Author: JSJ 389114820@qq.com
 * @Date: 2023-12-18 10:24:27
 * @Description: 建议使用浏览器
-->

<script lang="ts" setup>
const openUrl = (url: string) => {
    window.open(url)
}
</script>

<template>
    <div class="tips">
        <div class="text">建议使用以下浏览器（最新版）</div>
        <div class="img">
            <n-popover trigger="hover">
                <template #trigger>
                    <img src="@/assets/images/chrome.svg" alt="谷歌"
                        @click="openUrl('https://www.google.cn/intl/zh-CN/chrome/')" />
                </template>
                谷歌浏览器
            </n-popover>
            <n-popover trigger="hover">
                <template #trigger>
                    <img src="@/assets/images/edge.svg" alt="Edge"
                        @click="openUrl('https://www.microsoft.com/zh-cn/edge')" />
                </template>
                Edge浏览器
            </n-popover>
            <n-popover trigger="hover">
                <template #trigger>
                    <img src="@/assets/images/firefox.svg" alt="火狐" @click="openUrl('https://www.firefox.com.cn/')" />
                </template>
                火狐浏览器
            </n-popover>
            <n-popover trigger="hover">
                <template #trigger>
                    <img src="@/assets/images/internet_explorer.svg" alt="360" style="margin:0px;"
                        @click="openUrl('https://browser.360.cn/se/')" />
                </template>
                360浏览器
            </n-popover>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.tips {
    display: flex;
    align-items: center;

    .text {
        color: #d4d4d9;
        font-size: 12px;
        margin-right: 11px;
    }

    .img {
        img {
            margin-right: 16px;
            cursor: pointer;
            transition: all .4s ease;

            &:hover {
                transform: scale(1.1);
            }
        }
    }
}
</style>