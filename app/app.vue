<script setup lang="ts">
useSeoMeta({
  title: 'Minna Education — Bimbingan Belajar & Mengaji Anak di Wado, Kedungtuban, Blora',
  ogTitle: 'Minna Education — Bimbingan Belajar & Mengaji Anak di Kedungtuban, Blora',
  description: 'Bimbingan belajar Calistung, mata pelajaran sekolah, Tahfidz Al-Qur’an, dan akhlak untuk anak PAUD, SD/MI, dan SMP/MTs di Wado, Kedungtuban, Blora.',
  ogDescription: 'Bimbingan belajar Calistung, mata pelajaran sekolah, Tahfidz Al-Qur’an, dan akhlak untuk anak PAUD, SD/MI, dan SMP/MTs di Wado, Kedungtuban, Blora.',
  ogImage: '/images/minna.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image'
})

useHead({
  meta: [
    { name: 'theme-color', content: '#fbf5e8' },
    { name: 'geo.placename', content: 'Kedungtuban, Blora, Jawa Tengah' }
  ]
})
</script>

<template>
  <UApp>
    <a
      href="#konten-utama"
      class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-minna-green-700 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-surface"
    >
      Langsung ke konten utama
    </a>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
