<script setup lang="ts">
import { MINNA_CONTACT } from '~/data/minna'

const whatsappLink = MINNA_CONTACT.whatsappUrl()
</script>

<template>
  <section id="kontak" class="contact wrap" aria-labelledby="judul-kontak">
    <div class="contact-panel">
      <div>
        <h2 id="judul-kontak">
          Yuk, kenalan dengan Minna.
        </h2>
        <p>{{ MINNA_CONTACT.scheduleSummary }}</p>
        <a
          class="button button-primary"
          :href="whatsappLink"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chat WhatsApp <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div class="contact-art scene" data-parallax aria-hidden="true">
        <img data-depth="-52" src="/images/contact.webp" alt="" loading="lazy" decoding="async">
      </div>
    </div>
  </section>
</template>
