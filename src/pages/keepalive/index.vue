<script setup lang="ts">
defineOptions({
  name: 'KeepAlive',
})

const value = ref(1)
</script>

<template>
  <p>当前组件将会被缓存</p>
  <van-stepper v-model="value" />
</template>

<route lang="json">
{
  "name": "KeepAlive",
  "meta": {
    "title": "KeepAlive",
    "keepAlive": true
  }
}
</route>
