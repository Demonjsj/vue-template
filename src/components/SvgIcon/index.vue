<!--
 * @Author: JSJ 389114820@qq.com
 * @Date: 2024-01-03 18:03:00
 * @Description: svg-cion 组件
-->
<script setup lang="ts">

defineOptions({
  name: 'SvgIcon'
})

interface Props {
  iconClass: string; // 图标名称
  color?: string; // 图标颜色
  size?: number; // 图标大小
}

const props = withDefaults(defineProps<Props>(), {
  size: 14
})

const iconName = computed(() => {
  return `#icon-${props.iconClass}`
})

</script>

<template>
  <svg class="fill-current cursor-pointer" aria-hidden="true" :width="size" :height="size">
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>

<style scoped lang="scss"></style>