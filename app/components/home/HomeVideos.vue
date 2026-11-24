<script setup lang="ts">
import { VIDEOS } from '~/data/minna'

const { track, atStart, atEnd, prev, next } = useRail()
const playing = ref<string | null>(null)
</script>

<template>
  <section id="video" class="videos section" aria-labelledby="judul-video">
    <div class="wrap rail-head">
      <h2 id="judul-video">Suasana belajar<br>di Minna.</h2>
      <RailButtons :at-start="atStart" :at-end="atEnd" @prev="prev" @next="next" />
    </div>

    <ul ref="track" class="rail-track" tabindex="0" aria-label="Video Minna Education">
      <li v-for="v in VIDEOS" :key="v.youtubeId || v.title" class="video-card">
        <div class="video-frame">
          <template v-if="v.youtubeId">
            <iframe
              v-if="playing === v.youtubeId"
              :src="`https://www.youtube-nocookie.com/embed/${v.youtubeId}?autoplay=1&rel=0`"
              :title="v.title"
              allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowfullscreen
            />
            <a
              v-else
              class="video-poster"
              :href="`https://www.youtube.com/watch?v=${v.youtubeId}`"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`Putar video: ${v.title}`"
              @click.exact.prevent="playing = v.youtubeId!"
            >
              <img :src="`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`" alt="" width="480" height="360" loading="lazy">
              <span class="video-play" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M8 5.5v13l11-6.5z" /></svg>
              </span>
            </a>
          </template>

          <!-- Placeholder until the real video is uploaded: local photo, play disc, no link -->
          <div v-else class="video-poster is-placeholder">
            <img :src="v.poster" alt="" loading="lazy">
            <span class="video-play" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M8 5.5v13l11-6.5z" /></svg>
            </span>
            <span class="video-soon">Segera tayang</span>
          </div>
        </div>
        <p class="video-title">{{ v.title }}</p>
        <p class="video-meta">{{ v.meta }}</p>
      </li>
    </ul>
  </section>
</template>
