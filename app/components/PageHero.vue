<script setup lang="ts">
// Shared title block for inner pages (tentang, kabar, galeri).
// Title goes in #title (wrap one word in <span class="marker"> for the pink underline),
// buttons in #actions, a photo in #media; without #media an icon tile stands in.
// Decorations drift with scroll via data-depth (useReveal); depth sits on the wrapper,
// pop/twinkle on the inner svg, so GSAP and CSS never fight over the same transform.
defineProps<{ id: string, lead?: string, icon?: string }>()
</script>

<template>
  <section class="page-hero section wrap" :class="{ 'has-media': $slots.media }" :aria-labelledby="id">
    <div class="page-hero-copy">
      <h1 :id="id"><slot name="title" /></h1>
      <p v-if="lead" class="page-hero-lead" data-reveal>{{ lead }}</p>
      <div v-if="$slots.actions" class="page-hero-actions" data-reveal>
        <slot name="actions" />
      </div>
    </div>

    <div class="page-hero-art">
      <span class="ph-deco ph-blob" data-depth="-24" aria-hidden="true">
        <svg viewBox="0 0 100 100"><path d="M44-2C70-6 98 18 96 46 94 76 70 100 42 96 14 92-4 70 2 42 6 18 22 0 44-2Z" /></svg>
      </span>
      <span class="ph-deco ph-dots" data-depth="30" aria-hidden="true"><span /></span>

      <slot name="media">
        <span class="ph-tile" aria-hidden="true"><UIcon :name="icon || 'i-lucide-sparkles'" /></span>
      </slot>

      <span class="ph-deco ph-spark" data-depth="-60" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M12 0C13 8 16 11 24 12 16 13 13 16 12 24 11 16 8 13 0 12 8 11 11 8 12 0Z" /></svg>
      </span>
      <span class="ph-deco ph-spark ph-spark-sm" data-depth="50" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M12 0C13 8 16 11 24 12 16 13 13 16 12 24 11 16 8 13 0 12 8 11 11 8 12 0Z" /></svg>
      </span>
      <span class="ph-deco ph-ring" data-depth="-36" aria-hidden="true">
        <svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="17" /></svg>
      </span>
      <span class="ph-deco ph-squiggle" data-depth="40" aria-hidden="true">
        <svg viewBox="0 0 76 28"><path d="M2 14C10 2 18 26 26 14S42 2 50 14 66 26 74 14" /></svg>
      </span>
    </div>
  </section>
</template>
