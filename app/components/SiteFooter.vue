<script setup lang="ts">
import { MINNA_CONTACT } from '~/data/minna'

const currentYear = new Date().getFullYear()
const whatsappLink = MINNA_CONTACT.whatsappUrl()
</script>

<template>
  <footer class="border-t border-line bg-surface text-ink-muted">
    <div class="mx-auto max-w-6xl px-4 pt-14 pb-24 sm:px-6 lg:px-8 lg:pt-16">
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div class="space-y-4 lg:col-span-5">
          <NuxtLink to="/" class="inline-flex">
            <AppLogo />
          </NuxtLink>
          <p class="max-w-xs text-sm leading-relaxed text-ink-muted">
            Bimbel PAUD/TK, SD/MI, SMP/MTs &amp; mengaji di Wado, Blora.
          </p>
          <div class="flex items-center gap-3 pt-2">
            <UButton
              :to="whatsappLink"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hubungi Minna Education melalui WhatsApp"
              color="neutral"
              variant="outline"
              icon="i-lucide-message-circle"
              class="size-11 justify-center rounded-full border-line bg-canvas text-ink hover:bg-minna-green-100"
            />
            <UButton
              :to="MINNA_CONTACT.instagramUrl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram resmi Minna Education"
              color="neutral"
              variant="outline"
              icon="i-lucide-instagram"
              class="size-11 justify-center rounded-full border-line bg-canvas text-ink hover:bg-minna-rose-100"
            />
            <UButton
              :to="MINNA_CONTACT.facebookUrl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook resmi Minna Education"
              color="neutral"
              variant="outline"
              icon="i-lucide-facebook"
              class="size-11 justify-center rounded-full border-line bg-canvas text-ink hover:bg-minna-sun-100"
            />
          </div>
        </div>

        <div class="lg:col-span-3">
          <h2 class="mb-4 text-sm font-bold text-ink">
            Navigasi
          </h2>
          <ul class="space-y-1">
            <li>
              <NuxtLink to="/#program" class="inline-flex min-h-11 items-center text-sm text-ink-muted hover:text-ink">
                Program
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/#galeri" class="inline-flex min-h-11 items-center text-sm text-ink-muted hover:text-ink">
                Galeri
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/#lokasi" class="inline-flex min-h-11 items-center text-sm text-ink-muted hover:text-ink">
                Lokasi
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/#pengajar" class="inline-flex min-h-11 items-center text-sm text-ink-muted hover:text-ink">
                Pengajar
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/#faqs" class="inline-flex min-h-11 items-center text-sm text-ink-muted hover:text-ink">
                FAQ
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="space-y-4 lg:col-span-4">
          <h2 class="text-sm font-bold text-ink">
            Lokasi &amp; Kontak
          </h2>
          <div class="space-y-3 text-sm text-ink-muted">
            <a
              :href="MINNA_CONTACT.mapsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-start gap-2.5 leading-relaxed hover:text-ink"
            >
              <UIcon name="i-lucide-map-pin" class="mt-1 size-4 shrink-0 text-minna-green-700" aria-hidden="true" />
              <span>{{ MINNA_CONTACT.address }}</span>
            </a>
            <a
              :href="whatsappLink"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex min-h-11 items-center gap-2.5 font-bold text-ink hover:text-minna-green-700 tabular-nums"
            >
              <UIcon name="i-lucide-phone" class="size-4 shrink-0 text-minna-green-700" aria-hidden="true" />
              <span>{{ MINNA_CONTACT.phoneDisplay }} (WhatsApp)</span>
            </a>
            <p class="flex items-start gap-2.5 text-ink-muted">
              <UIcon name="i-lucide-clock" class="mt-0.5 size-4 shrink-0 text-minna-rose-600" aria-hidden="true" />
              <span>{{ MINNA_CONTACT.scheduleSummary }}</span>
            </p>
          </div>
        </div>
      </div>

      <FooterHouseSketch />

      <div class="mt-8 flex flex-col gap-2 border-t border-line pt-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {{ currentYear }} Minna Education, Kedungtuban&nbsp;Blora.</p>
        <p>Kecerdasan akademik &amp; akhlakul&nbsp;karimah.</p>
      </div>
    </div>
  </footer>
</template>
