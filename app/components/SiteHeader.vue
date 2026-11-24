<script setup lang="ts">
import { MINNA_CONTACT } from '~/data/minna'

const whatsappLink = MINNA_CONTACT.whatsappUrl()
</script>

<template>
  <header class="site-header wrap">
    <NuxtLink class="wordmark" to="/#beranda">
      <img src="/minnaedu.png" alt="Minna Education" width="500" height="500">
      <span><strong>Minna</strong> Education</span>
    </NuxtLink>

    <nav aria-label="Navigasi utama">
      <a href="/#program">Program</a>
      <a href="/#testimoni">Testimoni</a>
      <a href="/#cara-daftar">Cara Daftar</a>
      <NuxtLink to="/tentang">Tentang</NuxtLink>
      <NuxtLink to="/kabar">Kabar</NuxtLink>
      <NuxtLink to="/galeri">Galeri</NuxtLink>
    </nav>

    <a
      class="button button-outline"
      :href="whatsappLink"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span><span class="header-cta-prefix">Chat </span>WhatsApp</span>
      <span aria-hidden="true">↗</span>
    </a>
  </header>
</template>
