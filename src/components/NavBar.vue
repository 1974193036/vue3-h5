<script setup lang="ts">
import { routeWhiteList } from '@/config/routes'

const route = useRoute()
const router = useRouter()

function onBack() {
  if (window.history.state.back)
    history.back()
  else
    router.replace('/')
}

const title = computed(() => {
  if (!route.meta)
    return ''

  return route.meta.title || ''
})

const showLeftArrow = computed(() => route.name && routeWhiteList.includes(route.name))
</script>

<template>
  <VanNavBar
    :title="title"
    :fixed="true"
    :clickable="true"
    :placeholder="true"
    safe-area-inset-top
    :left-arrow="!showLeftArrow"
    @click-left="onBack"
  />
</template>
