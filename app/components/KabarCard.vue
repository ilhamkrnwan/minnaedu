<script setup lang="ts">
import type { KabarCollectionItem } from '@nuxt/content'

defineProps<{
  article: Pick<KabarCollectionItem, 'path' | 'title' | 'date' | 'category' | 'image' | 'imageAlt'>
  accent?: boolean
}>()
</script>

<template>
  <NuxtLink :to="article.path" class="kabar-card" :class="{ 'is-accent': accent, 'has-image': article.image }">
    <div class="kabar-media">
      <img
        v-if="article.image"
        class="kabar-image"
        :src="article.image"
        :alt="article.imageAlt || ''"
        width="1200"
        height="896"
        loading="lazy"
        decoding="async"
      >
      <!-- No illustration yet: the category stands in, set large -->
      <span v-else class="kabar-tile" aria-hidden="true">{{ article.category }}</span>
    </div>
    <div class="kabar-content">
      <span class="kabar-body">
        <span class="kabar-category">{{ article.category }}</span>
        <span class="kabar-title">{{ article.title }}</span>
      </span>
      <span class="kabar-foot">
        <time :datetime="article.date">{{ formatDate(article.date) }}</time>
        <span class="kabar-btn" aria-hidden="true">
          <ArrowUpRight />
        </span>
      </span>
    </div>
  </NuxtLink>
</template>
