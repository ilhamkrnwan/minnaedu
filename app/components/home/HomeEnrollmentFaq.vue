<script setup lang="ts">
import { ENROLLMENT_STEPS, FAQ_ITEMS, MINNA_CONTACT } from '~/data/minna'

const whatsappUrl = MINNA_CONTACT.whatsappUrl(
  'Assalamualaikum, saya ingin menanyakan jadwal, rincian biaya, dan pendaftaran di Minna Education.'
)

const stepBadgeClass = [
  'bg-minna-sun-300 text-ink',
  'bg-minna-rose-300 text-ink',
  'bg-minna-green-300 text-ink'
]

const sectionRef = ref<HTMLElement | null>(null)
const { gsap } = useGSAP()
let mm: gsap.MatchMedia | null = null

onMounted(() => {
  if (!sectionRef.value) return

  mm = gsap.matchMedia()
  mm.add(
    { reduceMotion: '(prefers-reduced-motion: reduce)' },
    (context) => {
      const { reduceMotion } = context.conditions as { reduceMotion: boolean }
      if (reduceMotion) return

      gsap.fromTo(
        '.step',
        { y: 100, rotate: (i: number) => (i - 1) * 4, opacity: 0.1 },
        { y: 0, rotate: 0, opacity: 1, ease: 'power3.out', stagger: 0.2, scrollTrigger: { trigger: '.steps', start: 'top 96%', end: 'top 55%', scrub: 0.6 } }
      )

      gsap.fromTo(
        '.faq-box',
        { x: 140, opacity: 0.1 },
        { x: 0, opacity: 1, ease: 'power3.out', scrollTrigger: { trigger: '.faq-box', start: 'top 98%', end: 'top 55%', scrub: 0.6 } }
      )

      // Closing strip: slapped on from below, badge spins into place, stickers fly in from the corners.
      const closing = { trigger: '.closing', start: 'top 98%', end: 'top 45%', scrub: 0.7 }
      gsap.fromTo('.closing-strip', { y: 160, scale: 0.78, rotate: -5 }, { y: 0, scale: 1, rotate: 0, ease: 'power3.out', scrollTrigger: closing })
      gsap.fromTo('.cta-burst', { rotation: -300, scale: 0 }, { rotation: 0, scale: 1, ease: 'back.out(1.8)', scrollTrigger: closing })
      gsap.fromTo('.closing-sticker', { x: (i: number) => (i % 2 ? 260 : -260), y: -140, rotate: (i: number) => (i % 2 ? 200 : -200), scale: 0.3 }, { x: 0, y: 0, rotate: 0, scale: 1, ease: 'power3.out', stagger: 0.12, scrollTrigger: closing })
    },
    sectionRef.value
  )
})

onUnmounted(() => {
  mm?.revert()
})
</script>

<template>
  <section id="faqs" ref="sectionRef" class="scroll-mt-20 overflow-x-clip bg-canvas py-16 sm:py-20 lg:py-28">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div>
        <h2 class="font-display text-3xl font-bold text-ink sm:text-4xl">
          Cara mendaftar
        </h2>

        <ol class="steps mt-8 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          <li
            v-for="(item, idx) in ENROLLMENT_STEPS"
            :key="item.step"
            class="step flex items-start gap-4"
          >
            <span
              :class="[
                'flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-ink font-display text-base font-bold tabular-nums',
                stepBadgeClass[idx]
              ]"
            >
              {{ item.step }}
            </span>
            <div>
              <h3 class="font-display text-lg leading-snug font-bold text-ink">
                {{ item.title }}
              </h3>
              <p class="mt-1 text-sm text-ink-muted">
                {{ item.description }}
              </p>
            </div>
          </li>
        </ol>
      </div>

      <div class="mt-16 grid grid-cols-1 gap-8 border-t-2 border-line pt-12 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-4">
          <h2 class="font-display text-3xl leading-tight font-bold text-ink sm:text-4xl">
            Pertanyaan umum
          </h2>
        </div>

        <div class="lg:col-span-8">
          <div class="faq-box rounded-3xl bg-surface px-5 py-2 ring-2 ring-ink sm:px-7">
            <UAccordion
              :items="FAQ_ITEMS"
              type="single"
              collapsible
              default-value="0"
              :ui="{
                item: 'border-b border-line last:border-b-0',
                trigger: 'py-4 text-left text-base font-bold text-ink hover:text-minna-rose-700 cursor-pointer',
                body: 'pb-4 max-w-[66ch] text-sm leading-relaxed text-ink-muted sm:text-base'
              }"
            />
          </div>
        </div>
      </div>

      <!-- Closing conversion strip. The floating button hides while this is in view. -->
      <div id="cta-penutup" class="closing relative mt-24 sm:mt-28 lg:mt-32">
        <DecoSticker kind="pencil" class="closing-sticker pointer-events-none absolute -top-12 right-4 z-10 size-20 sm:right-10 sm:size-28" />
        <DecoSticker kind="book" class="closing-sticker pointer-events-none absolute -bottom-10 left-[38%] z-10 hidden size-24 -rotate-6 sm:block" />

        <CtaStrip class="closing-strip">
          <div class="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:py-3">
            <div class="max-w-xl">
              <h2 class="font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.05] font-bold text-ink">
                Tanya jadwal &amp; biaya les?
              </h2>
              <p class="mt-2 -rotate-1 font-script text-3xl leading-tight text-minna-coral-600 sm:text-4xl">
                konsultasi WhatsApp gratis
              </p>
              <p class="mt-3 text-sm text-ink-muted tabular-nums sm:text-base">
                Senin – Sabtu, 14.30 – 16.00 WIB · Wado, Kedungtuban, Blora
              </p>
            </div>

            <div class="flex shrink-0 flex-wrap items-center gap-3">
              <UButton
                :to="whatsappUrl"
                target="_blank"
                rel="noopener noreferrer"
                size="xl"
                icon="i-simple-icons-whatsapp"
                class="min-h-14 rounded-full bg-ink px-7 font-bold text-surface hover:bg-minna-ink-800"
              >
                Chat WhatsApp
              </UButton>
              <UButton
                :to="MINNA_CONTACT.mapsUrl"
                target="_blank"
                rel="noopener noreferrer"
                size="xl"
                variant="outline"
                icon="i-lucide-map-pin"
                class="min-h-14 rounded-full border-2 border-ink bg-surface px-6 font-bold text-ink hover:bg-minna-sun-100"
              >
                Google Maps
              </UButton>
            </div>
          </div>
        </CtaStrip>
      </div>
    </div>
  </section>
</template>
