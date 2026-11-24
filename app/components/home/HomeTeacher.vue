<script setup lang="ts">
import { TEACHERS, TEACHING_SPECIALTIES } from '~/data/minna'
</script>

<template>
  <section id="pengajar" class="teacher section wrap" aria-labelledby="judul-pengajar">
    <div class="teacher-copy">
      <h2 id="judul-pengajar">Kenali<br>pengajarnya.</h2>
      <ul class="topics" aria-label="Bidang pengajaran">
        <li v-for="spec in TEACHING_SPECIALTIES" :key="spec.title">{{ spec.title }}</li>
      </ul>
    </div>

    <ul class="teacher-grid scene" data-parallax>
      <li v-for="(t, i) in TEACHERS" :key="t.name" class="teacher-card">
        <span class="teacher-tile" :data-depth="i % 2 ? -28 : 28" aria-hidden="true">{{ t.initials }}</span>
        <strong class="teacher-card-name">{{ t.name }}</strong>
        <span class="teacher-card-role">{{ t.role }}</span>
      </li>
    </ul>
  </section>
</template>
