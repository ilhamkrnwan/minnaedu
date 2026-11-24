<script setup lang="ts">
useSeoMeta({
  title: 'Kabar & Tulisan — Minna Education',
  description: 'Tips belajar dan mengaji untuk orang tua, serta kabar kegiatan Minna Education di Wado, Kedungtuban, Blora.',
  ogTitle: 'Kabar & Tulisan — Minna Education',
  ogDescription: 'Tips belajar dan mengaji untuk orang tua, serta kabar kegiatan Minna Education di Wado, Kedungtuban, Blora.'
})

const root = useReveal()

const { data: articles } = await useAsyncData('kabar-list', () =>
  queryCollection('kabar')
    .select('path', 'title', 'date', 'category', 'image', 'imageAlt')
    .order('date', 'DESC')
    .all()
)
</script>

<template>
  <div ref="root">
    <PageHero
      id="judul-kabar-halaman"
      lead="Tips belajar dan mengaji di rumah, juga kabar kegiatan anak-anak di Minna."
      icon="i-lucide-newspaper"
    >
      <template #title>Cerita dan <span class="marker">tips</span><br>untuk orang tua.</template>
    </PageHero>

    <section class="section wrap" aria-label="Daftar tulisan">
      <ul class="kabar-grid" data-reveal>
        <li v-for="a in articles" :key="a.path">
          <KabarCard :article="a" />
        </li>
      </ul>
    </section>
  </div>
</template>
