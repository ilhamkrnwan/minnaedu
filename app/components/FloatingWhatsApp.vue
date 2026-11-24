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
        class="fixed right-4 z-40 flex h-14 items-center gap-2.5 rounded-full bg-minna-green-700 pr-5 pl-4 text-sm font-bold text-surface shadow-[0_8px_20px_-6px_rgba(31,55,19,0.55)] ring-2 ring-surface transition-colors hover:bg-minna-green-800 sm:right-6 sm:h-16 sm:pr-6 sm:pl-5 sm:text-base"
        style="bottom: max(1rem, env(safe-area-inset-bottom))"
      >
        <span class="fab-ring pointer-events-none absolute inset-0 rounded-full bg-minna-green-500" aria-hidden="true" />
        <UIcon name="i-simple-icons-whatsapp" class="relative size-6 shrink-0 sm:size-7" aria-hidden="true" />
        <span class="relative hidden min-[420px]:inline">Tanya via WhatsApp</span>
      </a>
    </Transition>
  </ClientOnly>
</template>
