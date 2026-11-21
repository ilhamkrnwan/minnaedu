<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { MINNA_CONTACT } from '~/data/minna'

const navItems = computed<NavigationMenuItem[]>(() => [
  { label: 'Program', to: '/#program' },
  { label: 'Galeri', to: '/#galeri' },
  { label: 'Lokasi', to: '/#lokasi' },
  { label: 'Pengajar', to: '/#pengajar' },
  { label: 'FAQ', to: '/#faqs' }
])

const whatsappLink = MINNA_CONTACT.whatsappUrl()
</script>

<template>
  <UHeader
    to="/"
    :ui="{
      root: 'bg-canvas border-b border-line/80',
      container: 'max-w-6xl'
    }"
  >
    <template #title>
      <AppLogo />
    </template>

    <!-- Reference 1 airy desktop nav without competing top-right CTA box -->
    <template #right>
      <UNavigationMenu
        :items="navItems"
        color="neutral"
        variant="link"
        class="hidden lg:flex"
        :ui="{
          link: 'text-sm font-semibold text-ink-muted hover:text-ink px-3.5 py-2.5'
        }"
      />
      <UButton
        :to="whatsappLink"
        target="_blank"
        rel="noopener noreferrer"
        size="lg"
        icon="i-simple-icons-whatsapp"
        class="hidden min-h-11 rounded-full whitespace-nowrap bg-ink px-5 text-surface hover:bg-minna-ink-800 lg:inline-flex"
      >
        Chat WhatsApp
      </UButton>
    </template>

    <template #body>
      <div class="flex flex-col gap-6 py-2">
        <UNavigationMenu
          :items="navItems"
          orientation="vertical"
          color="neutral"
          variant="link"
          :ui="{
            link: 'text-base font-semibold text-ink py-3'
          }"
        />
        <div class="border-t border-line pt-5 flex flex-col gap-3">
          <UButton
            :to="whatsappLink"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            block
            icon="i-lucide-message-circle"
            class="min-h-12 rounded-lg bg-ink text-surface hover:bg-minna-ink-800"
          >
            Konsultasi via WhatsApp
          </UButton>
          <UButton
            :to="MINNA_CONTACT.mapsUrl"
            target="_blank"
            rel="noopener noreferrer"
            color="neutral"
            variant="outline"
            size="lg"
            block
            icon="i-lucide-map-pin"
            class="min-h-12 rounded-lg bg-surface text-ink border-line"
          >
            Lihat Lokasi di Google Maps
          </UButton>
        </div>
      </div>
    </template>
  </UHeader>
</template>
