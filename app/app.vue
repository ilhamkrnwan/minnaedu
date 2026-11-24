<script setup lang="ts">
const site = useSiteUrl()
const route = useRoute()
const pageUrl = computed(() => `${site}${route.path === '/' ? '/' : route.path.replace(/\/$/, '')}`)

useSeoMeta({
  title: 'Minna Education — Bimbingan Belajar & Mengaji Anak di Wado, Kedungtuban, Blora',
  ogTitle: 'Minna Education — Bimbingan Belajar & Mengaji Anak di Kedungtuban, Blora',
  description: 'Bimbingan belajar Calistung, mata pelajaran sekolah, Tahfidz Al-Qur’an, dan akhlak untuk anak PAUD, SD/MI, dan SMP/MTs di Wado, Kedungtuban, Blora.',
  ogDescription: 'Bimbingan belajar Calistung, mata pelajaran sekolah, Tahfidz Al-Qur’an, dan akhlak untuk anak PAUD, SD/MI, dan SMP/MTs di Wado, Kedungtuban, Blora.',
  ogImage: `${site}/images/minna.jpg`,
  ogType: 'website',
  ogSiteName: 'Minna Education',
  ogLocale: 'id_ID',
  ogUrl: pageUrl,
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }],
  meta: [
    { name: 'theme-color', content: '#fdfbf5' },
    { name: 'geo.region', content: 'ID-JT' },
    { name: 'geo.placename', content: 'Wado Wetan, Kedungtuban, Blora, Jawa Tengah' }
  ]
})

useJsonLd({
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema(site),
    {
      '@type': 'WebSite',
      '@id': `${site}/#situs`,
      'url': site,
      'name': 'Minna Education',
      'inLanguage': 'id-ID',
      'publisher': { '@id': `${site}/#organisasi` }
    }
  ]
})
</script>

<template>
  <UApp>
    <a
      href="#konten-utama"
      class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-leaf focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
    >
      Langsung ke konten utama
    </a>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
