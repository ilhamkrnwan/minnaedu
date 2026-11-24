<script setup lang="ts">
// Remount per article so SplitText never shares a heading Vue is re-rendering.
definePageMeta({ key: route => route.fullPath })

const route = useRoute()
const root = useReveal()

const { data: article } = await useAsyncData(`kabar-${route.path}`, () =>
  queryCollection('kabar').path(route.path).first()
)
if (!article.value) throw createError({ statusCode: 404, statusMessage: 'Tulisan tidak ditemukan', fatal: true })

const { data: others } = await useAsyncData(`kabar-others-${route.path}`, () =>
  queryCollection('kabar')
    .where('path', '<>', route.path)
    .select('path', 'title', 'date', 'category', 'image', 'imageAlt')
    .order('date', 'DESC')
    .limit(3)
    .all()
)

const site = useSiteUrl()
const image = `${site}${article.value.image || '/images/minna.jpg'}`

useSeoMeta({
  title: `${article.value.title} — Minna Education`,
  description: article.value.description,
  ogTitle: article.value.title,
  ogDescription: article.value.description,
  ogImage: image,
  ogType: 'article',
  articlePublishedTime: article.value.date,
  articleSection: article.value.category
})

useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  'headline': article.value.title,
  'description': article.value.description,
  'image': image,
  'datePublished': article.value.date,
  'articleSection': article.value.category,
  'inLanguage': 'id-ID',
  'mainEntityOfPage': `${site}${route.path}`,
  'author': { '@id': `${site}/#organisasi` },
  'publisher': { '@id': `${site}/#organisasi` }
})
</script>

<template>
  <div v-if="article" ref="root">
    <article class="section wrap artikel" aria-labelledby="judul-artikel">
      <NuxtLink class="text-link" to="/kabar">← Semua tulisan</NuxtLink>
      <p class="kabar-category artikel-meta">
        {{ article.category }} · <time :datetime="article.date">{{ formatDate(article.date) }}</time>
      </p>
      <h1 id="judul-artikel" class="page-title">{{ article.title }}</h1>
      <p class="artikel-lead">{{ article.description }}</p>
      <img
        v-if="article.image"
        class="artikel-image"
        data-reveal
        :src="article.image"
        :alt="article.imageAlt || ''"
        width="1200"
        height="896"
      >
      <ContentRenderer :value="article" class="artikel-body" data-reveal />
    </article>

    <section v-if="others?.length" class="wrap artikel-more" aria-labelledby="judul-lainnya">
      <h2 id="judul-lainnya">Tulisan lainnya</h2>
      <ul class="kabar-grid" data-reveal>
        <li v-for="a in others" :key="a.path">
          <KabarCard :article="a" />
        </li>
      </ul>
    </section>
  </div>
</template>
