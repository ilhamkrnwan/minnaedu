<script setup lang="ts">
const { track, atStart, atEnd, prev, next } = useRail()

const { data: articles } = await useAsyncData('kabar-home', () =>
  queryCollection('kabar')
    .select('path', 'title', 'date', 'category', 'image', 'imageAlt')
    .order('date', 'DESC')
    .limit(8)
    .all()
)
</script>

<template>
  <section v-if="articles?.length" id="kabar" class="kabar section" aria-labelledby="judul-kabar">
    <div class="wrap rail-head">
      <div>
        <h2 id="judul-kabar">Kabar &amp; tulisan</h2>
        <NuxtLink class="text-link kabar-all" to="/kabar">Semua tulisan</NuxtLink>
      </div>
      <RailButtons :at-start="atStart" :at-end="atEnd" @prev="prev" @next="next" />
    </div>
    <ul ref="track" class="rail-track" tabindex="0" aria-label="Kabar dan tulisan">
      <li v-for="(a, i) in articles" :key="a.path" class="kabar-item">
        <KabarCard :article="a" :accent="i === 0 && !a.image" />
      </li>
    </ul>
  </section>
</template>
