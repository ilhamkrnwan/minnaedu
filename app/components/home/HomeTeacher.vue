<script setup lang="ts">
import { TEACHERS, TEACHING_SPECIALTIES } from '~/data/minna'
</script>

<template>
  <section id="pengajar" class="teacher section wrap" aria-labelledby="judul-pengajar">
    <div class="teacher-copy">
      <h2 id="judul-pengajar">Kenali<br>pengajarnya.</h2>
      <p class="teacher-caption">Potret ilustratif.</p>
      <ul class="topics" aria-label="Bidang pengajaran">
        <li v-for="spec in TEACHING_SPECIALTIES" :key="spec.title">{{ spec.title }}</li>
      </ul>
    </div>

    <ul class="teacher-grid scene" data-parallax>
      <li v-for="(t, i) in TEACHERS" :key="t.name" class="teacher-card">
        <img
          class="teacher-tile"
          :src="t.portrait"
          :data-depth="i % 2 ? -28 : 28"
          alt=""
          width="480"
          height="480"
          loading="lazy"
          decoding="async"
        >
        <strong class="teacher-card-name">{{ t.name }}</strong>
        <span class="teacher-card-role">{{ t.role }}</span>
      </li>
    </ul>
  </section>
</template>
