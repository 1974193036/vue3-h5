<script setup lang="ts">
const loading = ref(false)
const data = ref<any>({})
function fetchData() {
  loading.value = true
  fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then((json) => {
      data.value = json
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div>
    <van-button :loading="loading" loading-text="加载中..." round block type="success" @click="fetchData">
      点击调接口
    </van-button>
    <pre>
      <code>
        {{ data }}
      </code>
    </pre>
  </div>
</template>

<route lang="json">
{
  "name": "fetchdata",
  "meta": {
    "title": "接口 演示"
  }
}
</route>
