<script setup lang="ts">
const menuItems = computed(() => ([
  { title: 'Unocss 示例', route: 'unocss' },
  { title: '持久化 Pinia 状态', route: 'counter' },
  { title: 'KeepAlive 演示', route: 'keepalive' },
  { title: '404页面 演示', route: 'unknown' },
]))
</script>

<template>
  <VanCellGroup title="示例组件" :border="false" :inset="true">
    <template v-for="item in menuItems" :key="item.route">
      <VanCell :title="item.title" :to="item.route" is-link />
    </template>
  </VanCellGroup>
</template>

<route lang="json">
{
  "name": "home",
  "meta": {
    "title": "主页"
  }
}
</route>
