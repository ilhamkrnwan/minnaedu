<script setup lang="ts">
import { SCENES } from '~/data/scenes'
import { MINNA_CONTACT } from '~/data/minna'

const ask = (level: string) =>
  MINNA_CONTACT.whatsappUrl(`Assalamualaikum, saya ingin bertanya tentang program ${level} di Minna Education.`)

const LEVELS = [
  { id: 'program-paud', name: 'PAUD / TK', topics: ['Calistung', 'Mewarnai', 'Iqra'] },
  { id: 'program-sd', name: 'SD / MI', topics: ['Matematika', 'IPA', 'Tahfidz'] },
  { id: 'program-smp', name: 'SMP / MTs', topics: ['Latihan ujian', 'Tahsin', 'Fiqih'] }
]
</script>

<template>
  <section id="program" class="program section wrap" aria-labelledby="judul-program" tabindex="-1">
    <div class="program-heading">
      <div>
        <h2 id="judul-program">Belajar &amp; mengaji<br>dalam satu tempat.</h2>
      </div>
      <div class="program-art scene" data-parallax aria-hidden="true">
        <img v-for="layer in SCENES.program" :key="layer.src" :data-depth="layer.depth" :src="layer.src" alt="" loading="lazy" decoding="async">
      </div>
    </div>

    <div class="program-grid">
      <article v-for="level in LEVELS" :id="level.id" :key="level.id" class="notch" tabindex="-1">
        <h3>{{ level.name }}</h3>
        <ul class="topics" :aria-label="`Topik ${level.name}`">
          <li v-for="t in level.topics" :key="t">{{ t }}</li>
        </ul>
        <span class="socket socket-br">
          <a class="orb" :href="ask(level.name)" target="_blank" rel="noopener noreferrer" :aria-label="`Tanya kelas ${level.name} lewat WhatsApp`">
            <ArrowUpRight />
          </a>
        </span>
      </article>
    </div>
  </section>
</template>
