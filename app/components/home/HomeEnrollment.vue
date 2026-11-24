<script setup lang="ts">
import { SCENES } from '~/data/scenes'
import { ENROLLMENT_STEPS } from '~/data/minna'
</script>

<template>
  <section id="cara-daftar" class="enrollment section wrap" aria-labelledby="judul-daftar">
    <div class="enrollment-art scene" data-parallax aria-hidden="true">
      <img v-for="layer in SCENES.daftar" :key="layer.src" :data-depth="layer.depth" :src="layer.src" alt="" loading="lazy" decoding="async">
    </div>
    <div class="enrollment-copy">
      <h2 id="judul-daftar">
        Daftar dalam<br>tiga langkah.
      </h2>
      <ol class="steps">
        <li v-for="step in ENROLLMENT_STEPS" :key="step.step">
          <div>
            <h3>{{ step.title }}</h3>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
