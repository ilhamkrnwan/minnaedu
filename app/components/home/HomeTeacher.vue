<script setup lang="ts">
import { LEAD_EDUCATOR, TEACHING_SPECIALTIES } from '~/data/minna'
</script>

<template>
  <section id="pengajar" class="teacher section wrap" aria-labelledby="judul-pengajar">
    <div class="teacher-art scene" data-parallax aria-hidden="true">
      <span class="teacher-blob" data-depth="-40" />
      <span class="teacher-initials" data-depth="46">{{ LEAD_EDUCATOR.initials }}</span>
    </div>
    <div class="teacher-copy">
      <h2 id="judul-pengajar">Kenali<br>pengajarnya.</h2>
      <p class="teacher-name">
        <strong>{{ LEAD_EDUCATOR.name }}</strong>
        <span>{{ LEAD_EDUCATOR.role }}</span>
      </p>
      <ul class="topics" aria-label="Bidang pengajaran">
        <li v-for="spec in TEACHING_SPECIALTIES" :key="spec.title">{{ spec.title }}</li>
      </ul>
    </div>
  </section>
</template>
