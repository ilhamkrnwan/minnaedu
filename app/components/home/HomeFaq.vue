<script setup lang="ts">
import { FAQ_ITEMS } from '~/data/minna'
</script>

<template>
  <section id="tanya-jawab" class="section family-info" aria-labelledby="judul-faq">
    <div class="wrap family-grid">
      <h2 id="judul-faq">Pertanyaan orang tua</h2>
      <div>
        <details v-for="(item, idx) in FAQ_ITEMS" :key="idx" :open="idx === 0">
          <summary>{{ item.label }}</summary>
          <p>{{ item.content }}</p>
        </details>
      </div>
    </div>
  </section>
</template>
