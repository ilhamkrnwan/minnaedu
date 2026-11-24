<script setup lang="ts">
// Two crossed paper tapes. They move only while the page scrolls, so there is no autoplay to pause.
const WORDS = ['Belajar', 'Mengaji', 'Berakhlak', 'Tumbuh']
const rowOne = [...WORDS, ...WORDS, ...WORDS]
const rowTwo = [...WORDS].reverse().concat([...WORDS].reverse(), [...WORDS].reverse())

const rootRef = ref<HTMLElement | null>(null)
const { gsap } = useGSAP()
let mm: gsap.MatchMedia | null = null

onMounted(() => {
  if (!rootRef.value) return
  mm = gsap.matchMedia()
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const scrollTrigger = { trigger: rootRef.value, start: 'top bottom', end: 'bottom top', scrub: 0.5 }
    gsap.fromTo('.tape-1', { xPercent: 0 }, { xPercent: -42, ease: 'none', scrollTrigger })
    gsap.fromTo('.tape-2', { xPercent: -42 }, { xPercent: 0, ease: 'none', scrollTrigger })
  }, rootRef.value)
})

onUnmounted(() => {
  mm?.revert()
})
</script>

<template>
  <div ref="rootRef" class="overflow-x-clip bg-canvas py-12 sm:py-16" aria-hidden="true">
    <div class="-rotate-2 bg-minna-coral-500 py-3 text-ink">
      <div class="tape-1 flex w-max items-center gap-8 pr-8 font-display text-[clamp(2.25rem,7vw,5rem)] leading-none font-extrabold whitespace-nowrap uppercase">
        <template v-for="(word, i) in rowOne" :key="`a-${i}`">
          <span>{{ word }}</span>
          <svg viewBox="0 0 100 100" class="size-[0.6em] shrink-0"><path fill="currentColor" d="M50 4c4 26 20 42 46 46-26 4-42 20-46 46-4-26-20-42-46-46 26-4 42-20 46-46Z" /></svg>
        </template>
      </div>
    </div>
    <div class="-mt-6 rotate-[1.5deg] bg-ink py-3 text-canvas sm:-mt-8">
      <div class="tape-2 flex w-max items-center gap-8 pr-8 font-display text-[clamp(2.25rem,7vw,5rem)] leading-none font-extrabold whitespace-nowrap uppercase">
        <template v-for="(word, i) in rowTwo" :key="`b-${i}`">
          <span>{{ word }}</span>
          <svg viewBox="0 0 100 100" class="size-[0.6em] shrink-0 text-minna-sun-300"><path fill="currentColor" d="M50 4c4 26 20 42 46 46-26 4-42 20-46 46-4-26-20-42-46-46 26-4 42-20 46-46Z" /></svg>
        </template>
      </div>
    </div>
  </div>
</template>
