<script setup lang="ts">
import router from '@/router'
import { useUserStore } from '@/stores'
import defaultAvatar from '@/assets/images/default-avatar.svg'

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const isLogin = computed(() => !!userInfo.value.uid)

function login() {
  if (isLogin.value)
    return

  router.push({ name: 'login', query: { redirect: 'profile' } })
}
</script>

<template>
  <div>
    <VanCellGroup :inset="true">
      <van-cell center :is-link="!isLogin" @click="login">
        <template #title>
          <van-image :src="userInfo.avatar || defaultAvatar" round class="h-56 w-56" />
        </template>

        <template #value>
          <span v-if="isLogin">{{ userInfo.name }}</span>
          <span v-else>登录</span>
        </template>
      </van-cell>
    </VanCellGroup>

    <VanCellGroup :inset="true" class="!mt-16">
      <van-cell title="设置" icon="setting-o" is-link to="/settings" />
    </VanCellGroup>
  </div>
</template>

<route lang="json">
{
  "name": "profile",
  "meta": {
    "title": "个人中心"
  }
}
</route>
