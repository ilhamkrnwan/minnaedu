<script setup lang="ts">
import { SCENES } from '~/data/scenes'
import { MINNA_CONTACT } from '~/data/minna'

const whatsappLink = MINNA_CONTACT.whatsappUrl()

// Soft glow follows the pointer across the panel (CSS reads --mx/--my).
function onMove(e: PointerEvent) {
  const el = e.currentTarget as HTMLElement
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}
</script>

<template>
  <section id="kontak" class="contact wrap" aria-labelledby="judul-kontak">
    <div class="cta" @pointermove="onMove">
      <div class="cta-copy">
        <h2 id="judul-kontak">Yuk, kenalan<br>dengan Minna.</h2>
        <p>{{ MINNA_CONTACT.scheduleSummary }}. Boleh berkunjung dulu sebelum mendaftar.</p>
        <div class="cta-actions">
          <a class="button cta-primary" :href="whatsappLink" target="_blank" rel="noopener noreferrer">
            Chat WhatsApp <ArrowUpRight />
          </a>
          <NuxtLink class="button cta-secondary" to="/kontak">Lihat lokasi</NuxtLink>
        </div>
      </div>
      <div class="contact-art scene" data-parallax aria-hidden="true">
        <img v-for="layer in SCENES.kontak" :key="layer.src" :data-depth="layer.depth" :src="layer.src" alt="" loading="lazy" decoding="async">
      </div>
    </div>
  </section>
</template>
