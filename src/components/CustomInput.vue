<!--
 * @Author: JSJ 389114820@qq.com
 * @Date: 2024-04-28 10:29:51
 * @Description: 在 n-input 基础上封装该组件，用于控制空格的输入
-->
<script setup lang="ts">
const value = defineModel<string>('value')

defineProps({
    clearable: {
        type: Boolean,
        default: true,
    },
})

// 输入框在用户输入时触发
const handleInput = (val) => {
    // 替换输入内容中的空格
    value.value = val.trim()
}

</script>

<template>
    <n-input v-model:value="value" v-bind="$attrs" @input="handleInput" :clearable="clearable">
        <template #[slotName]="slotProps" v-for="(slot, slotName) in $slots">
            <slot :name="slotName" v-bind="slotProps" />
        </template>
    </n-input>
</template>

<style scoped></style>