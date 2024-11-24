<script setup lang="ts">
import { type RouteMap, useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import logo from '~/images/logo.svg'
import vw from '@/utils/inline-px-to-vw'

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)

const postData = reactive({
  email: '',
  password: '',
})

const rules = reactive({
  email: [
    { required: true, message: '请输入邮箱' },
  ],
  password: [
    { required: true, message: '请输入密码' },
  ],
})

async function login(values: any) {
  try {
    loading.value = true
    await userStore.login({ ...postData, ...values })
    const { redirect, ...othersQuery } = router.currentRoute.value.query
    router.push({
      name: (redirect as keyof RouteMap) || 'home',
      query: {
        ...othersQuery,
      },
    })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="m-x-a w-7xl text-center">
    <div class="mb-32 mt-20">
      <van-image :src="logo" class="h-120 w-120" alt="brand logo" />
    </div>

    <van-form validate-trigger="onSubmit" @submit="login">
      <div class="overflow-hidden rounded-3xl">
        <van-field
          v-model="postData.email"
          :rules="rules.email"
          name="email"
          placeholder="邮箱"
        />
      </div>

      <div class="mt-16 overflow-hidden rounded-3xl">
        <van-field
          v-model="postData.password"
          type="password"
          :rules="rules.password"
          name="password"
          placeholder="密码"
        />
      </div>

      <div class="mt-16">
        <van-button
          :loading="loading"
          type="primary"
          native-type="submit"
          round block
        >
          登录
        </van-button>
      </div>
    </van-form>

    <GhostButton block to="register" :style="{ 'margin-top': vw(18) }">
      还没有账号？点击注册
    </GhostButton>

    <GhostButton block to="forgot-password">
      忘记密码？
    </GhostButton>
  </div>
</template>

<route lang="json">
{
  "name": "login",
  "meta": {
    "title": "登录"
  }
}
</route>
