<script setup lang="ts">
import { MINNA_CONTACT } from '~/data/minna'

const whatsappPaud = computed(() =>
  MINNA_CONTACT.whatsappUrl('Assalamualaikum, saya ingin bertanya tentang program PAUD / TK di Minna Education.')
)

const whatsappSd = computed(() =>
  MINNA_CONTACT.whatsappUrl('Assalamualaikum, saya ingin bertanya tentang program SD / MI di Minna Education.')
)

const whatsappSmp = computed(() =>
  MINNA_CONTACT.whatsappUrl('Assalamualaikum, saya ingin bertanya tentang program SMP / MTs di Minna Education.')
)
</script>

<template>
  <section id="program" class="program section wrap" aria-labelledby="judul-program" tabindex="-1">
    <div class="program-heading">
      <div>
        <h2 id="judul-program">Belajar &amp; mengaji<br>dalam satu tempat.</h2>
      </div>
      <div class="program-art scene" data-parallax aria-hidden="true">
        <img data-depth="64" src="/images/programs.webp" alt="" loading="lazy" decoding="async">
      </div>
    </div>

    <div class="program-grid">
      <article id="program-paud" tabindex="-1">
        <h3>PAUD / TK</h3>
        <ul class="topics" aria-label="Topik PAUD dan TK">
          <li>Calistung</li>
          <li>Mewarnai</li>
          <li>Iqra</li>
        </ul>
        <a class="level-link" :href="whatsappPaud" target="_blank" rel="noopener noreferrer">
          Tanya kelas PAUD/TK ↗
        </a>
      </article>

      <article id="program-sd" tabindex="-1">
        <h3>SD / MI</h3>
        <ul class="topics" aria-label="Topik SD dan MI">
          <li>Matematika</li>
          <li>IPA</li>
          <li>Tahfidz</li>
        </ul>
        <a class="level-link" :href="whatsappSd" target="_blank" rel="noopener noreferrer">
          Tanya kelas SD/MI ↗
        </a>
      </article>

      <article id="program-smp" tabindex="-1">
        <h3>SMP / MTs</h3>
        <ul class="topics" aria-label="Topik SMP dan MTs">
          <li>Latihan ujian</li>
          <li>Tahsin</li>
          <li>Fiqih</li>
        </ul>
        <a class="level-link" :href="whatsappSmp" target="_blank" rel="noopener noreferrer">
          Tanya kelas SMP/MTs ↗
        </a>
      </article>
    </div>
  </section>
</template>
