<script setup lang="ts">
import { MINNA_CONTACT } from '~/data/minna'
</script>

<template>
  <FooterHouseSketch />
  <footer class="site-footer wrap">
    <div>
      <NuxtLink class="wordmark" to="/#beranda">
        <img src="/minnaedu.png" alt="Minna Education" width="500" height="500" loading="lazy">
        <span><strong>Minna</strong> Education</span>
      </NuxtLink>
      <address>{{ MINNA_CONTACT.address }}</address>
    </div>
    <div>
      <NuxtLink class="text-link" to="/tentang">Tentang kami</NuxtLink>
      &nbsp;·&nbsp;
      <NuxtLink class="text-link" to="/kontak">Kontak &amp; lokasi</NuxtLink>
      &nbsp;·&nbsp;
      <NuxtLink class="text-link" to="/kabar">Kabar</NuxtLink>
      &nbsp;·&nbsp;
      <NuxtLink class="text-link" to="/galeri">Galeri Foto</NuxtLink>
      &nbsp;·&nbsp;
      <a class="text-link" :href="MINNA_CONTACT.instagramUrl" target="_blank" rel="noopener noreferrer">Instagram</a>
      &nbsp;·&nbsp;
      <a class="text-link" :href="MINNA_CONTACT.facebookUrl" target="_blank" rel="noopener noreferrer">Facebook</a>
    </div>
  </footer>
</template>
