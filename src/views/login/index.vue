<!--
 * @Author: JSJ 389114820@qq.com
 * @Date: 2023-12-25 13:21:00
 * @Description: 登录页
-->
<script setup lang="ts">
import Cookies from 'js-cookie'
import { encrypt, decrypt } from '@/utils/jsencrypt' // js 加解密
import { useUserStore } from '@/stores/modules/user'
import BrowserTipVue from '@/components/BrowserTip.vue' // 建议使用浏览器

const inputStyle = {
    '--n-height': '48px',
    '--n-caret-color-error': '#FF0000',
    '--n-border-error': '1px solid #FF0000',
    '--n-border-focus-error': '1px solid #FF0000',
    '--n-border-hover-error': '1px solid #FF0000',
    '--n-loading-color-error': '#FF0000',
}

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const title = import.meta.env.VITE_APP_TITLE

// 表单引用
const loginRef = ref(null)

// 表单对象
const loginForm = ref({
    username: null, // 账号
    password: null, // 密码
    rememberMe: false, // 是否记住密码
})

// 校验规则
const loginRules = {
    username: [{ required: true, message: '请输入您的账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入您的密码', trigger: 'blur' }],
}

const loading = ref(false) // 是否加载中

const redirect = ref(null) // 重定向的值

// 监听路由
watch(route, (newRoute) => {
    redirect.value = newRoute.query?.redirect
}, { immediate: true })

onBeforeMount(() => {
    getCookie()
})

// 从 Cookie 中获取账号、密码
const getCookie = () => {
    const username = Cookies.get('vt_username')
    const password = Cookies.get('vt_password')
    const rememberMe = Cookies.get('vt_rememberMe')
    loginForm.value = {
        username: username === undefined ? loginForm.value.username : username,
        password: password === undefined ? loginForm.value.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
    }
}

// 处理登录
const handleLogin = () => {
    loginRef.value?.validate((errors: any) => {
        if (!errors) {
            loading.value = true
            // 勾选了需要记住密码设置在 cookie 中设置记住用户名和密码
            if (loginForm.value.rememberMe) {
                Cookies.set('vt_username', loginForm.value.username, { expires: 30 })
                Cookies.set('vt_password', encrypt(loginForm.value.password), { expires: 30 })
                Cookies.set('vt_rememberMe', loginForm.value.rememberMe, { expires: 30 })
            } else {
                // 否则移除
                Cookies.remove('vt_username')
                Cookies.remove('vt_password')
                Cookies.remove('vt_rememberMe')
            }
            // 调用action的登录方法
            userStore.login(loginForm.value).then(() => {
                loading.value = false
                const query = route.query
                const otherQueryParams = Object.keys(query).reduce((acc, cur) => {
                    if (cur !== 'redirect') {
                        acc[cur] = query[cur]
                    }
                    return acc
                }, {})
                router.push({ path: redirect.value || '/', query: otherQueryParams })
            }).catch(() => {
                loading.value = false
            })
        } else {
            console.log(errors)
        }
    })
}
</script>

<template>
    <n-grid :cols="2" class="bg-#E1EDE6 h-vh">
        <n-gi class="flex-center">
            <img src="@/assets/images/logo.svg" alt="" class="w-50%">
        </n-gi>
        <n-gi class="flex-center">
            <n-form class="bg-white rounded-6px w-500px p-40px" ref="loginRef" :model="loginForm" :rules="loginRules"
                :show-require-mark="false">
                <h3 class="font-bold text-24px mb-20px">{{ title }}</h3>
                <div class="mb-20px">
                    <span class="pb-5px text-18px font-bold text-theme-color" b-b="2px solid $theme-color">账号登录</span>
                </div>
                <n-form-item label="账号" path="username">
                    <n-input v-model:value="loginForm.username" @input="loginForm.username = loginForm.username.trim()"
                        placeholder="账号/手机号码" maxlength="20" :style="inputStyle" @keydown.enter="handleLogin">
                        <template #prefix>
                            <svg-icon icon-class="login-user" style="margin-right: 5px" />
                        </template>
                    </n-input>
                </n-form-item>
                <n-form-item label="密码" path="password">
                    <n-input v-model:value="loginForm.password" type="password" show-password-on="click" placeholder="密码"
                        maxlength="20" :style="inputStyle" @keydown.enter="handleLogin">
                        <template #prefix>
                            <svg-icon icon-class="login-pwd" style="margin-right: 5px" />
                        </template>
                    </n-input>
                </n-form-item>
                <n-checkbox v-model:checked="loginForm.rememberMe">记住密码</n-checkbox>
                <n-form-item :show-feedback="false">
                    <n-button class="w-100% h-48px text-16px mb-16px" :loading="loading" type="primary"
                        @click.prevent="handleLogin">
                        登 录
                    </n-button>
                </n-form-item>
                <BrowserTipVue />
            </n-form>
        </n-gi>
    </n-grid>
</template>

<style lang="scss" scoped></style>