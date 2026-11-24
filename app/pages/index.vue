<script setup lang="ts">
import { FAQ_ITEMS } from '~/data/minna'

const root = ref<HTMLElement | null>(null)
const { init, cleanup } = useMotion()

onMounted(() => {
  nextTick(() => root.value && init(root.value))
})

onUnmounted(cleanup)

// Same Q&A as the FAQ section, for search and answer engines.
useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': FAQ_ITEMS.map(item => ({
    '@type': 'Question',
    'name': item.label,
    'acceptedAnswer': { '@type': 'Answer', 'text': item.content }
  }))
})
</script>

<template>
  <div id="beranda" ref="root">
    <HomeHero />
    <HomeSubjects />
    <HomePrograms />
    <HomeTeacher />
    <HomeVideos />
    <HomeTestimonials />
    <HomeEnrollment />
    <HomeKabar />
    <HomeFaq />
    <HomeContact />
  </div>
</template>
