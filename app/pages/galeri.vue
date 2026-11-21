<script setup lang="ts">
import { GALLERY_PHOTOS, MINNA_CONTACT } from '~/data/minna'

useSeoMeta({
  title: 'Galeri Kegiatan — Minna Education Kedungtuban, Blora',
  description: 'Dokumentasi rumah belajar, kegiatan mengaji, Calistung, dan kebersamaan siswa di Minna Education, Wado, Kedungtuban, Blora.'
})
</script>

<template>
  <section class="bg-canvas py-12 sm:py-16 lg:py-20">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-4 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div class="max-w-xl">
          <h1 class="font-display text-3xl font-bold text-ink sm:text-5xl">
            Galeri kegiatan
          </h1>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <UButton
            to="/"
            color="neutral"
            variant="outline"
            size="md"
            icon="i-lucide-arrow-left"
            class="min-h-11 rounded-lg bg-surface text-ink border-line hover:bg-canvas"
          >
            Beranda
          </UButton>
          <UButton
            :to="MINNA_CONTACT.instagramUrl"
            target="_blank"
            rel="noopener noreferrer"
            size="md"
            icon="i-lucide-instagram"
            class="min-h-11 rounded-lg bg-ink px-5 text-surface hover:bg-minna-ink-800"
          >
            Instagram
          </UButton>
        </div>
      </div>

      <div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <figure
          v-for="photo in GALLERY_PHOTOS"
          :key="photo.src"
          class="overflow-hidden rounded-2xl border border-line bg-surface"
        >
          <div class="aspect-[4/3] w-full overflow-hidden bg-canvas">
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
          <figcaption class="flex items-center justify-between gap-3 border-t border-line px-5 py-4">
            <p class="text-base font-bold text-ink">
              {{ photo.caption }}
            </p>
            <span class="rounded-full bg-canvas px-2.5 py-0.5 text-xs font-bold text-ink-muted">
              {{ photo.category }}
            </span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
