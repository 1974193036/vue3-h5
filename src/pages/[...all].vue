<script setup lang="ts">
const router = useRouter()

function onBack() {
  router.replace('/')
}
</script>

<template>
  <div text="center gray-300">
    <van-icon name="warn-o" size="3em" />
    <div>页面未找到</div>

    <div class="mt-10">
      <button van-haptics-feedback btn m="3 t8" @click="onBack">
        返回
      </button>
    </div>
  </div>
</template>

<route lang="json">
{
  "name": "404",
  "meta": {
    "title": "404"
  }
}
</route>
