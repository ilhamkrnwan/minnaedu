<script setup lang="ts">
const manifestoRef = ref<HTMLElement | null>(null)
const { gsap } = useGSAP()
let mm: gsap.MatchMedia | null = null

const before = 'Membantu setiap anak'.split(' ')
const between = 'tumbuh gemar belajar'.split(' ')
const after = 'bukan sekadar menghafal.'.split(' ')

onMounted(() => {
  if (!manifestoRef.value) return

  mm = gsap.matchMedia()
  mm.add(
    { reduceMotion: '(prefers-reduced-motion: reduce)' },
    (context) => {
      const { reduceMotion } = context.conditions as { reduceMotion: boolean }
      if (reduceMotion) return

      // Sentence fills in word by word as you scroll through it.
      gsap.fromTo(
        '.mw',
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.12,
          scrollTrigger: { trigger: '.manifesto-title', start: 'top 88%', end: 'bottom 48%', scrub: 0.4 }
        }
      )

      gsap.fromTo(
        '.manifesto-pill',
        { scale: 0, rotate: -200 },
        {
          scale: 1,
          rotate: 0,
          ease: 'power3.out',
          stagger: 0.5,
          scrollTrigger: { trigger: '.manifesto-title', start: 'top 80%', end: 'bottom 55%', scrub: 0.5 }
        }
      )

      // Stage: shapes are thrown in from the edges while the portrait irises open.
      const stage = { trigger: '.manifesto-stage', start: 'top 92%', end: 'top 38%', scrub: 0.6 }
      gsap.fromTo('.stage-left', { xPercent: -420, rotate: -140, opacity: 0.2 }, { xPercent: 0, rotate: 0, opacity: 1, ease: 'power3.out', scrollTrigger: stage })
      gsap.fromTo('.stage-right', { xPercent: 420, rotate: 140, opacity: 0.2 }, { xPercent: 0, rotate: 0, opacity: 1, ease: 'power3.out', scrollTrigger: stage })
      gsap.fromTo('.stage-center', { clipPath: 'circle(0% at 50% 50%)', scale: 0.55 }, { clipPath: 'circle(72% at 50% 50%)', scale: 1, ease: 'power2.out', scrollTrigger: stage })
      gsap.fromTo('.stage-sticker', { scale: 0, rotate: -120 }, { scale: 1, rotate: 0, ease: 'back.out(2)', stagger: 0.2, scrollTrigger: { ...stage, end: 'top 30%' } })

      gsap.fromTo(
        '.manifesto-chip',
        { scale: 0, y: 20 },
        {
          scale: 1,
          y: 0,
          ease: 'back.out(2.4)',
          stagger: 0.12,
          scrollTrigger: { trigger: '.manifesto-line', start: 'top 90%', end: 'bottom 60%', scrub: 0.5 }
        }
      )
    },
    manifestoRef.value
  )
})

onUnmounted(() => {
  mm?.revert()
})
</script>

<template>
  <section ref="manifestoRef" class="overflow-x-clip bg-surface py-16 sm:py-20 lg:py-28">
    <div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
      <h2 class="manifesto-title font-display text-[clamp(2rem,5.6vw,3.6rem)] leading-[1.2] font-bold text-ink">
        <span v-for="word in before" :key="word" class="mw mr-[0.26em] inline-block">{{ word }}</span>
        <span
          class="manifesto-pill mr-[0.26em] inline-flex size-10 overflow-hidden rounded-full bg-studio-pink align-middle sm:size-14"
          aria-hidden="true"
        >
          <img src="/images/hero-calistung.jpg" alt="" width="800" height="800" loading="lazy" class="h-full w-full object-cover">
        </span>
        <span v-for="word in between" :key="word" class="mw mr-[0.26em] inline-block">{{ word }}</span>
        <span
          class="manifesto-pill mr-[0.26em] inline-flex size-10 overflow-hidden rounded-full bg-studio-gold align-middle sm:size-14"
          aria-hidden="true"
        >
          <img src="/images/hero-tahfidz.jpg" alt="" width="800" height="800" loading="lazy" class="h-full w-full object-cover">
        </span>
        <span v-for="word in after" :key="word" class="mw mr-[0.26em] inline-block">{{ word }}</span>
      </h2>

      <div
        class="manifesto-stage relative mt-14 flex items-center justify-center gap-2 sm:mt-16 sm:gap-3"
        role="img"
        aria-label="Siswi Minna Education berhijab tersenyum antusias memegang pensil"
      >
        <div class="stage-left h-36 w-12 shrink-0 rounded-l-full bg-studio-amber sm:h-48 sm:w-20" aria-hidden="true" />
        <div class="stage-left hidden size-48 shrink-0 rounded-full bg-minna-coral-500 sm:block" aria-hidden="true" />
        <div class="stage-center size-40 shrink-0 overflow-hidden rounded-full bg-studio-amber sm:size-48">
          <img
            src="/images/manifesto-student.jpg"
            alt=""
            width="800"
            height="800"
            loading="lazy"
            class="h-full w-full object-cover"
          >
        </div>
        <div class="stage-right h-36 w-12 shrink-0 rounded-r-full bg-minna-green-500 sm:h-48 sm:w-20" aria-hidden="true" />

        <DecoSticker kind="sparkle" class="stage-sticker pointer-events-none absolute -top-5 left-[18%] size-10 sm:size-14" />
        <DecoSticker kind="flower" class="stage-sticker pointer-events-none absolute right-[14%] -bottom-6 size-14 rotate-12 sm:size-20" />
      </div>

      <p class="manifesto-line mx-auto mt-14 max-w-3xl font-display text-xl leading-[1.9] font-bold text-ink sm:text-2xl">
        Calistung <span class="mr-1 whitespace-nowrap">dini&nbsp;<span class="manifesto-chip inline-flex size-8 items-center justify-center rounded-full bg-minna-sun-300 align-middle text-ink" aria-hidden="true"><UIcon name="i-lucide-pencil-line" class="size-4" /></span>,</span>
        Tahfidz &amp; <span class="mr-1 whitespace-nowrap">Iqra&nbsp;<span class="manifesto-chip inline-flex size-8 items-center justify-center rounded-full bg-minna-green-100 align-middle text-minna-green-800" aria-hidden="true"><UIcon name="i-lucide-book-open" class="size-4" /></span>,</span>
        Matematika &amp; <span class="mr-1 whitespace-nowrap">IPA&nbsp;<span class="manifesto-chip inline-flex size-8 items-center justify-center rounded-full bg-minna-rose-100 align-middle text-minna-rose-700" aria-hidden="true"><UIcon name="i-lucide-calculator" class="size-4" /></span>,</span>
        <span class="mr-1 whitespace-nowrap">komputer&nbsp;<span class="manifesto-chip inline-flex size-8 items-center justify-center rounded-full bg-minna-coral-500 align-middle text-ink" aria-hidden="true"><UIcon name="i-lucide-laptop" class="size-4" /></span>,</span>
        dan <span class="whitespace-nowrap">akhlak&nbsp;<span class="manifesto-chip inline-flex size-8 items-center justify-center rounded-full bg-ink align-middle text-surface" aria-hidden="true"><UIcon name="i-lucide-heart-handshake" class="size-4" /></span>.</span>
      </p>
    </div>
  </section>
</template>
