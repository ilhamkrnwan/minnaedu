<script setup lang="ts">
import { MINNA_CONTACT } from '~/data/minna'

const href = MINNA_CONTACT.whatsappUrl()
const shown = ref(false)
const covered = ref(false)
const { gsap } = useGSAP()

let observer: IntersectionObserver | null = null
let timer: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  timer = setTimeout(() => { shown.value = true }, 900)

  // The closing CTA already carries WhatsApp; step aside while it is on screen.
  observer = new IntersectionObserver(
    entries => { covered.value = entries.some(entry => entry.isIntersecting) },
    { threshold: 0.35 }
  )
  const watch = () => {
    const closing = document.getElementById('kontak')
    if (closing) observer?.observe(closing)
  }
  watch()
  // Page can mount before the closing section on client navigation.
  nextTick(watch)
})

onUnmounted(() => {
  clearTimeout(timer)
  observer?.disconnect()
})

function onEnter(el: Element, done: () => void) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return done()
  gsap.fromTo(
    el,
    { scale: 0.2, rotation: -25, y: 40 },
    { scale: 1, rotation: 0, y: 0, duration: 0.7, ease: 'expo.out', onComplete: done }
  )
}

function onLeave(el: Element, done: () => void) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return done()
  gsap.to(el, { scale: 0.4, y: 30, duration: 0.25, ease: 'expo.in', onComplete: done })
}
</script>

<template>
  <ClientOnly>
    <Transition :css="false" @enter="onEnter" @leave="onLeave">
      <a
        v-if="shown && !covered"
        :href="href"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Tanya jadwal dan biaya lewat WhatsApp"
        class="wa-fab"
      >
        <UIcon name="i-simple-icons-whatsapp" class="wa-fab-icon" aria-hidden="true" />
        <span class="wa-fab-label">Tanya via WhatsApp</span>
      </a>
    </Transition>
  </ClientOnly>
</template>
