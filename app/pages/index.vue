<script setup lang="ts">
const root = ref<HTMLElement | null>(null)
const { init, cleanup } = useMotion()

onMounted(() => {
  nextTick(() => root.value && init(root.value))
})

onUnmounted(cleanup)
</script>

<template>
  <div id="beranda" ref="root">
    <HomeHero />
    <HomeSubjects />
    <HomePrograms />
    <HomeTeacher />
    <HomeTestimonials />
    <HomeEnrollment />
    <HomeFaq />
    <HomeContact />
  </div>
</template>
