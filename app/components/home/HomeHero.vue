<script setup lang="ts">
import { MINNA_CONTACT } from '~/data/minna'

const heroRef = ref<HTMLElement | null>(null)
const selectedLevel = ref<'PAUD/TK' | 'SD/MI' | 'SMP/MTs'>('SD/MI')
const childName = ref('')

const levelOptions = ['PAUD/TK', 'SD/MI', 'SMP/MTs'] as const

const previewMessage = computed(() => {
  const name = childName.value.trim()
  if (name) {
    return `Assalamualaikum, saya ingin konsultasi les jenjang ${selectedLevel.value} di Minna Education untuk ${name}.`
  }
  return `Assalamualaikum, saya ingin menanyakan jadwal & biaya les jenjang ${selectedLevel.value} di Minna Education.`
})

const whatsappDirect = computed(() => MINNA_CONTACT.whatsappUrl(previewMessage.value))

function openQuickWhatsApp() {
  window.open(whatsappDirect.value, '_blank', 'noopener,noreferrer')
}

const { gsap } = useGSAP()
let mm: gsap.MatchMedia | null = null

onMounted(() => {
  if (!heroRef.value) return

  mm = gsap.matchMedia()
  mm.add(
    {
      wide: '(min-width: 640px)',
      reduceMotion: '(prefers-reduced-motion: reduce)'
    },
    (context) => {
      const { wide, reduceMotion } = context.conditions as { wide: boolean, reduceMotion: boolean }
      if (reduceMotion) return

      // One authored moment on load: headline lands line by line, the marker underline draws,
      // the script word slams in, stickers and frieze get thrown onto the page.
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .from('.hl-in', { yPercent: 80, opacity: 0, rotate: 3, duration: 1.1, stagger: 0.13 })
        .from('.hero-underline .draw', { drawSVG: '0%', duration: 0.7, stagger: 0.12, ease: 'power2.inOut' }, '-=0.6')
        .from('.hero-script', { scale: 0.3, rotate: -16, opacity: 0, duration: 1, ease: 'elastic.out(1, 0.5)' }, '-=1.1')
        .from('.hero-sticker', {
          scale: 0,
          rotate: (i: number) => (i % 2 ? 90 : -90),
          duration: 0.9,
          stagger: 0.08,
          ease: 'back.out(2.2)'
        }, '-=0.9')
        .from('.frieze-piece', {
          y: 160,
          rotate: (i: number) => (i % 2 ? 7 : -7),
          opacity: 0,
          duration: 1,
          stagger: 0.07
        }, '-=0.9')
        .from('.hero-meta, .hero-strip', { y: 32, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.6')

      // Scroll: everything leaves at a different speed and spin. Wrappers move, children keep their intro.
      const k = wide ? 1 : 0.5
      const scrub = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: heroRef.value, start: 'top top', end: 'bottom top', scrub: 0.6 }
      })
      scrub
        .to('.hero-title', { yPercent: -22, scale: 0.86 }, 0)
        .to('.sw-notebook', { y: -340 * k, x: -120 * k, rotate: -75 }, 0)
        .to('.sw-flower', { y: -240 * k, x: 140 * k, rotate: 170 }, 0)
        .to('.sw-pencil', { y: -420 * k, x: 80 * k, rotate: 110 }, 0)
        .to('.fz-1', { x: -240 * k }, 0)
        .to('.fz-2', { y: -90 * k, rotate: -16 }, 0)
        .to('.fz-3', { y: 90 * k, scale: 1.3, rotate: 12 }, 0)
        .to('.fz-4', { y: -140 * k, rotate: 20 }, 0)
        .to('.fz-5', { x: 280 * k }, 0)
        .to('.hero-strip', { y: -60 * k }, 0)
    },
    heroRef.value
  )
})

onUnmounted(() => {
  mm?.revert()
})
</script>

<template>
  <section ref="heroRef" class="overflow-x-clip bg-canvas pt-6 pb-14 sm:pt-10 sm:pb-20">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <!-- Headline lockup with stickers -->
      <div class="relative pt-20 text-center sm:pt-6 lg:pt-4">
        <div class="sw-notebook absolute top-0 left-0 sm:top-2 sm:left-[3%] lg:left-[6%]" aria-hidden="true">
          <DecoSticker kind="notebook" class="hero-sticker size-20 -rotate-12 sm:size-28 lg:size-36" />
        </div>
        <div class="sw-flower absolute top-0 right-1 sm:top-4 sm:right-[4%] lg:right-[7%]" aria-hidden="true">
          <DecoSticker kind="flower" class="hero-sticker size-20 rotate-12 sm:size-24 lg:size-32" />
        </div>

        <h1 class="hero-title font-display leading-[0.98] text-ink">
          <span class="block">
            <span class="hl-in block text-[clamp(2.9rem,10vw,6rem)] font-extrabold">Tumbuhkan</span>
          </span>
          <span class="block">
            <span class="hl-in block text-[clamp(2.4rem,8.4vw,5rem)] font-medium">
              <span class="relative inline-block">
                potensi
                <span class="hero-underline" aria-hidden="true">
                  <DecoSticker kind="underline" class="absolute -bottom-2 left-0 h-3 w-full text-minna-coral-500 sm:h-4" />
                </span>
              </span>
              &amp; akhlak
            </span>
          </span>
          <span class="block">
            <span class="hl-in block">
              <span class="hero-script inline-block -rotate-2 font-script text-[clamp(3.4rem,13vw,7.5rem)] leading-[1.05] text-minna-coral-500">
                bersama Minna
              </span>
            </span>
          </span>
        </h1>

        <div class="sw-pencil pointer-events-none absolute right-[6%] bottom-2 hidden sm:block lg:right-[12%] lg:bottom-6" aria-hidden="true">
          <DecoSticker kind="pencil" class="hero-sticker size-20 lg:size-28" />
        </div>

        <div class="hero-meta mx-auto mt-6 flex max-w-xl flex-col items-center gap-4 sm:mt-8">
          <p class="text-base leading-relaxed text-ink-muted sm:text-lg">
            Bimbel &amp; mengaji untuk PAUD/TK, SD/MI, dan SMP/MTs di Wado, Kedungtuban, Blora.
          </p>
          <NuxtLink
            to="/#program"
            class="group inline-flex min-h-12 items-center gap-3 text-sm font-bold text-ink"
          >
            <span class="flex size-11 items-center justify-center rounded-full bg-minna-coral-500 text-ink transition-transform duration-200 group-hover:translate-y-1">
              <UIcon name="i-lucide-arrow-down" class="size-5" aria-hidden="true" />
            </span>
            <span class="underline decoration-2 underline-offset-4 group-hover:decoration-minna-coral-500">Lihat program</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Bauhaus frieze, sized from one fluid unit so nothing clips between 640 and 1100px -->
      <div
        class="mt-10 flex items-center justify-between gap-1 [--u:27vw] sm:mt-14 sm:gap-1.5 sm:[--u:clamp(6rem,17vw,15rem)]"
        role="img"
        aria-label="Potret siswa Minna Education di antara bentuk geometris"
      >
        <div class="fz fz-1 flex shrink-0 gap-1">
          <div class="frieze-piece h-[var(--u)] w-[calc(var(--u)*0.26)] rounded-l-full bg-minna-sun-400 sm:w-[calc(var(--u)*0.3)]" />
          <div class="frieze-piece hidden h-[var(--u)] w-[calc(var(--u)*0.3)] rounded-l-full bg-studio-gold sm:block" />
        </div>

        <div class="fz fz-2 shrink-0">
          <div class="frieze-piece size-[var(--u)] overflow-hidden rounded-full bg-studio-pink">
            <img
              src="/images/hero-calistung.jpg"
              alt=""
              width="800"
              height="800"
              fetchpriority="high"
              class="h-full w-full object-cover"
            >
          </div>
        </div>

        <div class="fz fz-3 hidden shrink-0 sm:block">
          <div class="frieze-piece h-[var(--u)] w-[calc(var(--u)*0.9)] rounded-l-full rounded-tr-full bg-minna-coral-500" />
        </div>

        <div class="fz fz-4 shrink-0">
          <div class="frieze-piece size-[var(--u)] overflow-hidden rounded-full bg-studio-gold">
            <img
              src="/images/hero-tahfidz.jpg"
              alt=""
              width="800"
              height="800"
              fetchpriority="high"
              class="h-full w-full object-cover"
            >
          </div>
        </div>

        <div class="fz fz-5 shrink-0">
          <div class="frieze-piece h-[var(--u)] w-[calc(var(--u)*0.55)] rounded-tr-full bg-studio-pink sm:w-[calc(var(--u)*0.7)]" />
        </div>
      </div>

      <!-- Conversion strip: hand-cut paper, starburst badge, form -->
      <CtaStrip class="hero-strip mt-14 sm:mt-20">
        <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div class="max-w-xs">
            <p class="font-display text-xl font-bold text-ink sm:text-2xl">
              Tanya jadwal &amp; biaya
            </p>
            <p class="mt-1 text-sm text-ink-muted tabular-nums">
              Senin – Sabtu, 14.30 – 16.00 WIB. Pilih jenjang anak, lanjut ngobrol di WhatsApp.
            </p>
          </div>

          <form class="w-full lg:max-w-md" @submit.prevent="openQuickWhatsApp">
            <div class="mb-2.5 flex flex-wrap items-center gap-1.5" role="group" aria-label="Pilih jenjang anak">
              <button
                v-for="level in levelOptions"
                :key="level"
                type="button"
                :aria-pressed="selectedLevel === level"
                :class="[
                  'min-h-11 cursor-pointer rounded-full px-4 text-xs font-bold transition-colors',
                  selectedLevel === level
                    ? 'bg-ink text-surface'
                    : 'bg-surface text-ink-muted hover:text-ink'
                ]"
                @click="selectedLevel = level"
              >
                {{ level }}
              </button>
            </div>

            <div class="flex items-center gap-2 border-b-2 border-ink/80 pb-1.5">
              <label for="quick-wa-name" class="sr-only">Nama anak (opsional)</label>
              <input
                id="quick-wa-name"
                v-model="childName"
                type="text"
                placeholder="Nama anak (opsional)"
                class="min-h-11 w-full flex-1 bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none"
              >
              <button
                type="submit"
                aria-label="Kirim pertanyaan ke WhatsApp"
                class="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-ink text-surface transition-transform hover:translate-x-0.5 hover:-translate-y-0.5"
              >
                <UIcon name="i-lucide-arrow-up-right" class="size-5" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </CtaStrip>
    </div>
  </section>
</template>
