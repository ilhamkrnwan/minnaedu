<script setup lang="ts">
import { gsap } from 'gsap'
import { FAQ_ITEMS, MINNA_CONTACT } from '~/data/minna'

// Shared by home and /tentang: pass other questions, override the heading via the title slot.
const { items = FAQ_ITEMS } = defineProps<{ items?: readonly { label: string, content: string }[] }>()

// Native <details> keeps keyboard + no-JS behaviour; JS only animates the height.
function toggle(e: MouseEvent) {
  const details = (e.currentTarget as HTMLElement).parentElement as HTMLDetailsElement
  const answer = details.querySelector<HTMLElement>('.faq-answer')
  if (!answer || matchMedia('(prefers-reduced-motion: reduce)').matches) return
  e.preventDefault()
  gsap.killTweensOf(answer)

  if (details.open) {
    details.classList.add('is-closing')
    gsap.to(answer, {
      height: 0,
      opacity: 0,
      duration: 0.32,
      ease: 'power2.inOut',
      onComplete: () => {
        details.open = false
        details.classList.remove('is-closing')
        gsap.set(answer, { clearProps: 'height,opacity' })
      }
    })
  } else {
    details.open = true
    gsap.fromTo(answer,
      { height: 0, opacity: 0 },
      { height: 'auto', opacity: 1, duration: 0.5, ease: 'expo.out', clearProps: 'height,opacity' })
  }
}
</script>

<template>
  <section id="tanya-jawab" class="faq section" aria-labelledby="judul-faq">
    <div class="wrap faq-grid">
      <div class="faq-side">
        <h2 id="judul-faq"><slot name="title">Pertanyaan<br>orang tua</slot></h2>

        <NuxtLink to="/kontak" class="faq-contact notch">
          <span class="faq-contact-title">Masih ada pertanyaan?</span>
          <span class="faq-contact-address">{{ MINNA_CONTACT.address }}</span>
          <span class="faq-contact-rows">
            <span><span>WhatsApp</span><span>{{ MINNA_CONTACT.phoneDisplay }}</span></span>
            <span><span>Jadwal</span><span>{{ MINNA_CONTACT.scheduleSummary }}</span></span>
          </span>
          <span class="socket socket-tr" aria-hidden="true"><span class="orb"><ArrowUpRight /></span></span>
        </NuxtLink>
      </div>

      <div class="faq-list" data-reveal>
        <details v-for="(item, idx) in items" :key="idx" :open="idx === 0">
          <summary @click="toggle">
            <span>{{ item.label }}</span>
            <span class="faq-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 5v14M5 12h14" /></svg>
            </span>
          </summary>
          <div class="faq-answer">
            <p>{{ item.content }}</p>
          </div>
        </details>
      </div>
    </div>
  </section>
</template>
