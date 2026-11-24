<script setup lang="ts">
import { HISTORY, MINNA_CONTACT, TEACHERS } from '~/data/minna'

const description = 'Minna Education dirintis oleh teman kuliah yang menjadi guru les bersama dan kini mengajar di SDIT Quwattul Ummah. Rumah belajar dan mengaji anak PAUD–SMP di Wado Wetan, Kedungtuban, Blora.'

useSeoMeta({
  title: 'Tentang Kami — Minna Education Kedungtuban, Blora',
  description,
  ogTitle: 'Tentang Minna Education',
  ogDescription: description
})

const root = useReveal()

const VALUES = [
  { icon: 'i-lucide-users-round', title: 'Kelompok kecil', detail: 'Tiap anak dikenali dan didampingi.' },
  { icon: 'i-lucide-sprout', title: 'Ilmu & adab', detail: 'Pelajaran sekolah berjalan bersama mengaji.' },
  { icon: 'i-lucide-message-circle-heart', title: 'Dekat orang tua', detail: 'Perkembangan anak dikabarkan rutin.' }
]

const SUBJECTS = [
  { icon: 'i-lucide-pencil-line', title: 'Calistung & PAUD', detail: 'Membaca, menulis, dan berhitung awal dengan cara yang menyenangkan.' },
  { icon: 'i-lucide-book-open-text', title: 'Pelajaran sekolah', detail: 'Pendampingan PR, Matematika, IPA, dan Bahasa sesuai kelasnya.' },
  { icon: 'i-lucide-clipboard-check', title: 'Latihan ujian', detail: 'Latihan soal sebelum ulangan dan ujian sekolah, tanpa panik.' },
  { icon: 'i-lucide-book-open', title: 'Iqra & tahsin', detail: 'Belajar membaca Al-Qur’an dari Iqra sampai lancar dan bertajwid.' },
  { icon: 'i-lucide-repeat', title: 'Tahfidz', detail: 'Menghafal surat pendek, lalu mengulangnya agar hafalan terjaga.' },
  { icon: 'i-lucide-heart-handshake', title: 'Fiqih & adab', detail: 'Tata cara ibadah harian dan akhlak baik di rumah maupun sekolah.' }
]

// Short, answer-first Q&A: read by people and by answer engines (FAQPage schema below).
const QA = [
  {
    label: 'Bagaimana Minna Education bermula?',
    content: 'Dari teman kuliah yang sama-sama senang mengajar, lalu membuka les bersama, dan kini juga menjadi guru di SDIT Quwattul Ummah.'
  },
  {
    label: 'Siapa pengajar di Minna Education?',
    content: `Dipimpin Ibu Sudarmini, S.E., bersama Bu Ana, Bu Ratna, dan Bu Fara.`
  },
  {
    label: 'Di mana lokasi Minna Education?',
    content: `${MINNA_CONTACT.address}. Belajar ${MINNA_CONTACT.scheduleSummary}.`
  }
]

const site = useSiteUrl()
useJsonLd({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${site}/tentang#halaman`,
      'url': `${site}/tentang`,
      'name': 'Tentang Minna Education',
      'description': description,
      'inLanguage': 'id-ID',
      'about': { '@id': `${site}/#organisasi` }
    },
    {
      '@type': 'FAQPage',
      'mainEntity': QA.map(item => ({
        '@type': 'Question',
        'name': item.label,
        'acceptedAnswer': { '@type': 'Answer', 'text': item.content }
      }))
    }
  ]
})
</script>

<template>
  <div ref="root" class="tentang">
    <PageHero
      id="judul-tentang"
      lead="Menemani anak PAUD sampai SMP belajar, mengaji, dan tumbuh dengan adab yang baik."
    >
      <template #title>Rumah belajar<br>di <span class="marker">Wado Wetan</span>.</template>
      <template #media>
        <figure class="tentang-photo">
          <img
            src="/images/minna.jpg"
            alt="Rumah belajar Minna Education di Wado Wetan, Kedungtuban"
            width="680"
            height="510"
          >
        </figure>
      </template>
    </PageHero>

    <section class="section wrap tentang-about" aria-label="Sekilas Minna Education">
      <p class="about-text" data-scrub-words>
        Minna Education adalah <em>rumah belajar dan mengaji</em> di Wado Wetan, Kedungtuban, Blora.
        Setiap Senin sampai Sabtu sore, kami menemani anak <em>PAUD hingga SMP</em> membaca, menulis,
        berhitung, mengerjakan PR, dan mengaji Al-Qur’an. Kelasnya kecil dan suasananya hangat, sehingga
        setiap anak dikenali pengajarnya. Bagi kami, <em>ilmu dan adab</em> tumbuh bersama.
      </p>
    </section>

    <section class="tentang-sejarah" aria-labelledby="judul-sejarah">
      <div class="section wrap">
        <h2 id="judul-sejarah">Berawal dari<br>teman kuliah.</h2>
        <ol class="sejarah" data-reveal>
          <li v-for="(item, i) in HISTORY" :key="item.title">
            <span class="sejarah-dot" aria-hidden="true">{{ i + 1 }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.detail }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="section wrap" aria-labelledby="judul-nilai">
      <h2 id="judul-nilai" class="tentang-h2">Yang kami<br>pegang.</h2>
      <ul class="nilai-notes" data-reveal>
        <li v-for="value in VALUES" :key="value.title">
          <!-- Tilt lives on the inner note: GSAP owns the li's transform for the reveal -->
          <div class="nilai-note">
            <UIcon :name="value.icon" class="nilai-icon" aria-hidden="true" />
            <h3>{{ value.title }}</h3>
            <p>{{ value.detail }}</p>
          </div>
        </li>
      </ul>
    </section>

    <section class="section wrap" aria-labelledby="judul-bidang">
      <h2 id="judul-bidang" class="tentang-h2">Yang kami<br>ajarkan.</h2>
      <ul class="tentang-cards" data-reveal>
        <li v-for="item in SUBJECTS" :key="item.title">
          <UIcon :name="item.icon" class="tentang-card-icon" aria-hidden="true" />
          <h3>{{ item.title }}</h3>
          <p>{{ item.detail }}</p>
        </li>
      </ul>
    </section>

    <section class="section wrap" aria-labelledby="judul-pengajar">
      <h2 id="judul-pengajar" class="tentang-h2">Kenali<br>pengajarnya.</h2>
      <p class="teacher-caption">Potret ilustratif.</p>
      <ul class="teacher-grid" data-reveal>
        <li v-for="teacher in TEACHERS" :key="teacher.name" class="teacher-card">
          <img
            class="teacher-tile"
            :src="teacher.portrait"
            alt=""
            width="480"
            height="480"
            loading="lazy"
            decoding="async"
          >
          <span class="teacher-card-name">{{ teacher.name }}</span>
          <span class="teacher-card-role">{{ teacher.role }}</span>
        </li>
      </ul>
    </section>

    <HomeFaq :items="QA">
      <template #title>Sering<br>ditanyakan</template>
    </HomeFaq>

    <ContactCta heading-id="judul-ajak">
      <template #title>Mampir ke<br>rumah belajar.</template>
    </ContactCta>
  </div>
</template>
