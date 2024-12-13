<script setup lang="ts">
import useRouteCache from '@/stores/modules/routeCache'

useHead({
  title: '首页',
  meta: [
    {
      name: 'description',
      content: 'H5平台',
    },
    {
      name: 'theme-color',
      content: '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.svg',
    },
  ],
})

const keepAliveRouteNames = computed(() => {
  return useRouteCache().routeCaches as string[]
})
</script>

<template>
  <VanConfigProvider>
    <NavBar />
    <router-view v-slot="{ Component, route }">
      <section class="app-wrapper">
        <keep-alive :include="keepAliveRouteNames">
          <component :is="Component" :key="route.name" />
        </keep-alive>
      </section>
    </router-view>
    <TabBar />
  </VanConfigProvider>
</template>

<style scoped>
.app-wrapper {
  width: 100%;
  position: relative;
  padding: 16px;
}
</style>
