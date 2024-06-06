<!--
 * @Author: JSJ 389114820@qq.com
 * @Date: 2023-11-06 18:29:14
 * @Description: 分页组件
-->
<script setup lang="ts">

// 分页大小选项
const pageSizesOptions = [
    {
        label: '10条',
        value: 10
    },
    {
        label: '20条',
        value: 20
    },
    {
        label: '50条',
        value: 50
    },
    {
        label: '100条',
        value: 100
    },
]

// 定义属性
const props = defineProps({
    pageData: {
        type: Object
    }
})

const { pageData } = props

// 总页数
const pageCount = computed(() => {
    return Math.ceil(pageData.totalCount / pageData.pageSize)
})

// 定义事件
const emits = defineEmits(['handlePageChange'])

// 当前页发生改变时的回调函数
const changePage = () => {
    emits('handlePageChange', pageData.pageNum, pageData.pageSize)
}

// 当前分页大小发生改变时的回调函数
const changePageSize = () => {
    emits('handlePageChange', 1, pageData.pageSize)
}

</script>

<template>
    <div>
        <n-pagination v-model:page="pageData.pageNum" size="small" show-quick-jumper class="pagination-wrap"
            :page-count="pageCount" @update:page="changePage">
            <template #prefix="{ itemCount, startIndex }">
                <div>每页显示</div>
                <n-select v-model:value="pageData.pageSize" :options="pageSizesOptions" :show-checkmark="false" size="tiny"
                    style="width: 76px;margin: 0 10px;" @update:value="changePageSize" />
                <div>共 {{ pageData.totalCount }} 条</div>
            </template>

            <template #goto>
                跳至
            </template>

            <template #suffix="{ endIndex }">
                页
            </template>
        </n-pagination>
    </div>
</template>

<style lang="scss" scoped>
.pagination-wrap {
    height: 40px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid $theme-border-gray;
}
</style>