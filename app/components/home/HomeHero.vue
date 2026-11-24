<script setup lang="ts">
const selectedProgram = ref('')

function scrollToProgram() {
  const targetId = selectedProgram.value || 'program'
  const target = document.getElementById(targetId)
  if (!target) return
  target.focus({ preventScroll: true })
  target.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="hero" aria-labelledby="judul-utama">
    <div class="hero-grid wrap">
      <div class="hero-copy">
        <h1 id="judul-utama">
          Bimbel dan <span class="marker">Mengaji</span><br>Bersama Minna
        </h1>
        <p class="intro">
          Kelompok kecil, PAUD/TK sampai SMP/MTs, di Wado Wetan, Blora.
        </p>

        <form class="program-finder" @submit.prevent="scrollToProgram">
          <label class="sr-only" for="hero-level">Jenjang anak</label>
          <select id="hero-level" v-model="selectedProgram">
            <option value="">Pilih jenjang anak</option>
            <option value="program-paud">PAUD / TK</option>
            <option value="program-sd">SD / MI</option>
            <option value="program-smp">SMP / MTs</option>
          </select>
          <button class="button button-primary" type="submit">
            Lihat program
          </button>
        </form>

      </div>

      <a class="hero-discover" href="#cara-daftar">Cara daftar</a>

      <div class="hero-art" data-parallax aria-hidden="true">
        <img class="hero-shapes" data-depth="-60" src="/images/hero-shapes.webp" alt="" fetchpriority="high">
        <span class="hero-type hero-type-back" data-depth="-26">BA</span>
        <span class="hero-type hero-type-front" data-depth="32">CA</span>
        <img class="hero-figures" data-depth="56" src="/images/hero-figures.webp" alt="" fetchpriority="high">
        <img class="hero-botanicals" data-depth="102" src="/images/hero-botanicals.webp" alt="">
      </div>
    </div>
  </section>
</template>
