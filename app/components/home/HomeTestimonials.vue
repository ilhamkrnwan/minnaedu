<script setup lang="ts">
import { SCENES } from '~/data/scenes'
import { TESTIMONIALS } from '~/data/minna'
</script>

<template>
  <section id="testimoni" class="parents section" aria-labelledby="judul-testimoni">
    <div class="wrap parents-grid">
      <div class="parents-intro">
        <h2 id="judul-testimoni">
          Cerita dari<br>keluarga Minna.
        </h2>
        <div class="parents-art scene" data-parallax aria-hidden="true">
          <img v-for="layer in SCENES.testimoni" :key="layer.src" :data-depth="layer.depth" :src="layer.src" alt="" loading="lazy" decoding="async">
        </div>
      </div>
      <div class="quotes">
        <figure v-for="t in TESTIMONIALS" :key="t.parentName">
          <blockquote>
            <p>{{ t.quote }}</p>
          </blockquote>
          <figcaption>
            <strong>{{ t.parentName }}</strong> · {{ t.relation }}
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
