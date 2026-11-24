<script setup lang="ts">
import { MINNA_CONTACT } from '~/data/minna'

useSeoMeta({
  title: 'Kontak & Lokasi — Minna Education Kedungtuban, Blora',
  description: 'Alamat, jadwal, WhatsApp, dan peta lokasi Minna Education di Wado Wetan, Kedungtuban, Blora.',
  ogTitle: 'Kontak & Lokasi — Minna Education Kedungtuban, Blora',
  ogDescription: 'Alamat, jadwal, WhatsApp, dan peta lokasi Minna Education di Wado Wetan, Kedungtuban, Blora.'
})

const root = useReveal()
const whatsappLink = MINNA_CONTACT.whatsappUrl()
</script>

<template>
  <section ref="root" class="kontak section wrap" aria-labelledby="judul-kontak-halaman">
    <h1 id="judul-kontak-halaman">Kontak &amp; lokasi</h1>

    <div class="kontak-grid">
      <div>
        <dl class="kontak-list" data-reveal>
          <div>
            <dt>Alamat</dt>
            <dd>
              <address>{{ MINNA_CONTACT.address }}</address>
            </dd>
          </div>
          <div>
            <dt>Jadwal</dt>
            <dd>{{ MINNA_CONTACT.scheduleSummary }}</dd>
          </div>
          <div>
            <dt>WhatsApp</dt>
            <dd><a class="text-link" :href="whatsappLink" target="_blank" rel="noopener noreferrer">{{ MINNA_CONTACT.phoneDisplay }}</a></dd>
          </div>
          <div>
            <dt>Sosial media</dt>
            <dd>
              <a class="text-link" :href="MINNA_CONTACT.instagramUrl" target="_blank" rel="noopener noreferrer">Instagram</a>
              &nbsp;·&nbsp;
              <a class="text-link" :href="MINNA_CONTACT.facebookUrl" target="_blank" rel="noopener noreferrer">Facebook</a>
            </dd>
          </div>
        </dl>

        <div class="kontak-actions" data-reveal>
          <a class="button button-primary" :href="whatsappLink" target="_blank" rel="noopener noreferrer">
            Chat WhatsApp <span aria-hidden="true">↗</span>
          </a>
          <a class="button button-outline" :href="MINNA_CONTACT.mapsUrl" target="_blank" rel="noopener noreferrer">
            Buka di Google Maps <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <iframe
        class="kontak-map"
        data-reveal
        title="Peta lokasi Minna Education"
        :src="MINNA_CONTACT.mapsEmbedUrl"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen
      />
    </div>
  </section>
</template>
