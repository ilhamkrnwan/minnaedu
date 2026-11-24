<script setup lang="ts">
import { GALLERY_PHOTOS, MINNA_CONTACT } from '~/data/minna'

useSeoMeta({
  title: 'Galeri Kegiatan — Minna Education Kedungtuban, Blora',
  description: 'Dokumentasi rumah belajar, kegiatan mengaji, Calistung, dan kebersamaan siswa di Minna Education, Wado, Kedungtuban, Blora.',
  ogTitle: 'Galeri Kegiatan — Minna Education Kedungtuban, Blora',
  ogDescription: 'Dokumentasi rumah belajar, kegiatan mengaji, Calistung, dan kebersamaan siswa di Minna Education, Wado, Kedungtuban, Blora.'
})

const root = useReveal()
</script>

<template>
  <div ref="root">
    <PageHero
      id="judul-galeri"
      lead="Suasana rumah belajar, mengaji, dan kegiatan anak-anak di Minna."
      icon="i-lucide-camera"
    >
      <template #title>Momen belajar<br>di <span class="marker">Minna</span>.</template>
      <template #actions>
        <NuxtLink class="button button-outline" to="/">← Beranda</NuxtLink>
        <a class="button button-primary" :href="MINNA_CONTACT.instagramUrl" target="_blank" rel="noopener noreferrer">
          Instagram <span aria-hidden="true">↗</span>
        </a>
      </template>
    </PageHero>

    <section class="section wrap" aria-label="Foto kegiatan">
      <div data-reveal class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <figure
          v-for="photo in GALLERY_PHOTOS"
          :key="photo.src"
        >
          <div class="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-canvas">
            <img
              :src="photo.src"
              :alt="photo.alt"
              :width="photo.width"
              :height="photo.height"
              loading="lazy"
              :class="[
                'h-full w-full object-cover',
                photo.src === '/images/minna.jpg' ? 'brightness-[1.12] contrast-[1.04] saturate-[1.06]' : '',
                photo.src.startsWith('/images/hero-') ? 'object-[50%_20%]' : ''
              ]"
            >
          </div>
          <figcaption class="flex items-center justify-between gap-3 px-1 pt-4">
            <p class="text-base font-bold text-ink">
              {{ photo.caption }}
            </p>
            <span class="rounded-full bg-leaf-wash px-2.5 py-0.5 text-xs font-bold text-leaf-deep">
              {{ photo.category }}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  </div>
</template>
