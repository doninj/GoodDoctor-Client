<script setup lang="ts">
import { useOneSignal } from '@onesignal/onesignal-vue3'
import { useAuthStore } from '~/store/auth'
const auth = useAuthStore()
const oneSignal = useOneSignal()
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg

useHead({
  title: 'Vitesse',
  meta: [
    { name: 'description', content: 'Opinionated Vite Starter Template' },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
})
onMounted(() => {
  auth.fetchUser()
  oneSignal.showSlidedownPrompt()
  oneSignal.on('permissionPromptDisplay', (e) => {
    console.log('permissionPromptDisplay', e)
  })
  oneSignal.on('subscriptionChange', (e) => {
    console.log('subscriptionChange', e)
  })
  oneSignal.on('notificationDisplay', (e) => {
    console.log('notificationDisplay', e)
  })
  oneSignal.on('notificationDismiss', (e) => {
    console.log('notificationDismiss', e)
  })
})
</script>

<template>
  <Toast />
  <RouterView />
</template>
