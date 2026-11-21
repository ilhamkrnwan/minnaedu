<script setup lang="ts">
import {
  CAMPUS_FACTS,
  LEAD_EDUCATOR,
  MINNA_CONTACT,
  TEACHING_SPECIALTIES,
  TESTIMONIALS
} from '~/data/minna'

const sectionRef = ref<HTMLElement | null>(null)
const { gsap } = useGSAP()
let mm: gsap.MatchMedia | null = null

function getParentInitials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase()
}

onMounted(() => {
  if (!sectionRef.value) return

  mm = gsap.matchMedia()
  mm.add(
    { reduceMotion: '(prefers-reduced-motion: reduce)' },
    (context) => {
      const { reduceMotion } = context.conditions as { reduceMotion: boolean }
      if (reduceMotion) return

      gsap.fromTo(
        '.campus-title',
        { y: 80, opacity: 0.1, rotate: 1.5 },
        { y: 0, opacity: 1, rotate: 0, ease: 'none', scrollTrigger: { trigger: '.campus-title', start: 'top 96%', end: 'top 62%', scrub: 0.5 } }
      )

      // Photo is wiped open from the left while the image behind it settles from a hard zoom.
      const showcase = { trigger: '.campus-showcase', start: 'top 92%', end: 'top 30%', scrub: 0.7 }
      gsap.fromTo('.campus-frame', { clipPath: 'inset(0% 100% 0% 0% round 1.5rem)' }, { clipPath: 'inset(0% 0% 0% 0% round 1.5rem)', ease: 'power3.inOut', scrollTrigger: showcase })
      gsap.fromTo('.campus-photo', { scale: 1.45 }, { scale: 1, ease: 'none', scrollTrigger: showcase })
      gsap.fromTo('.campus-fact', { x: 140, opacity: 0.1 }, { x: 0, opacity: 1, ease: 'power3.out', stagger: 0.2, scrollTrigger: showcase })

      gsap.fromTo(
        '.trust-quote',
        { y: 130, rotate: (i: number) => (i - 1) * 5, opacity: 0.1 },
        { y: 0, rotate: 0, opacity: 1, ease: 'power3.out', stagger: 0.18, scrollTrigger: { trigger: '.trust-quotes', start: 'top 94%', end: 'top 40%', scrub: 0.6 } }
      )
    },
    sectionRef.value
  )
})

onUnmounted(() => {
  mm?.revert()
})
</script>

<template>
  <!-- Act 5 — True Reference 4 Architectural Campus Split + Compact Educator & Editorial Parent Quotes -->
  <section
    id="lokasi"
    ref="sectionRef"
    class="scroll-mt-20 overflow-x-clip bg-surface py-16 sm:py-20 lg:py-24"
  >
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <!-- Ref 4 top split: crisp left display headline + right essential CTA -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-7">
          <h2 class="campus-title font-display text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.08] text-ink">
            Rumah belajar yang akrab &amp; tenang di&nbsp;Wado
          </h2>
        </div>

        <div class="lg:col-span-5">
          <p class="text-base leading-relaxed text-ink-muted">
            Orang tua terbuka berkunjung langsung melihat ruang belajar sebelum mendaftar.
          </p>
          <div class="mt-4">
            <UButton
              :to="MINNA_CONTACT.mapsUrl"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              trailing-icon="i-lucide-arrow-up-right"
              class="min-h-11 rounded-full bg-ink px-6 text-surface hover:bg-minna-ink-800"
            >
              Lihat di Google Maps
            </UButton>
          </div>
        </div>
      </div>

      <!-- Art-directed architectural showcase sized cleanly near minna.jpg's 680x510 native sharpness -->
      <div class="campus-showcase mt-10 grid grid-cols-1 gap-8 lg:mt-12 lg:grid-cols-12 lg:items-center">
        <div class="campus-frame lg:col-span-7 overflow-hidden rounded-3xl bg-canvas ring-2 ring-ink">
          <img
            src="/images/minna.jpg"
            alt="Tampak depan rumah belajar kayu Minna Education di Wado Wetan, Kedungtuban, Blora"
            width="680"
            height="510"
            loading="lazy"
            class="campus-photo aspect-[4/3] w-full object-cover brightness-[1.12] contrast-[1.04] saturate-[1.06]"
          >
        </div>

        <dl class="lg:col-span-5 divide-y divide-line border-y border-line">
          <div
            v-for="fact in CAMPUS_FACTS"
            :key="fact.label"
            class="campus-fact py-4"
          >
            <dt class="text-xs font-bold uppercase tracking-[0.08em] text-ink-muted">
              {{ fact.label }}
            </dt>
            <dd class="mt-1 text-base font-bold leading-snug text-ink tabular-nums">
              {{ fact.value }}
            </dd>
          </div>
        </dl>
      </div>

      <!-- Compact Pimpinan & Bidang Bimbingan (zero bio wall) -->
      <div
        id="pengajar"
        class="scroll-mt-24 mt-16 border-t border-line pt-14 lg:mt-20 lg:pt-16"
      >
        <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <div class="lg:col-span-6">
            <h3 class="font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
              Dipimpin pengajar berpengalaman
            </h3>

            <div class="mt-6 flex items-center gap-4">
              <div
                class="flex size-14 shrink-0 items-center justify-center rounded-full bg-minna-sun-100 font-display text-lg font-bold text-ink"
                aria-hidden="true"
              >
                {{ LEAD_EDUCATOR.initials }}
              </div>
              <div>
                <p class="font-display text-xl font-bold text-ink">
                  {{ LEAD_EDUCATOR.name }}
                </p>
                <p class="text-sm font-semibold text-minna-green-700">
                  {{ LEAD_EDUCATOR.role }}
                </p>
              </div>
            </div>

            <ul class="mt-5 space-y-2 border-t border-line pt-4">
              <li
                v-for="credential in LEAD_EDUCATOR.credentials"
                :key="credential"
                class="flex items-start gap-2.5 text-sm font-semibold text-ink"
              >
                <UIcon name="i-lucide-check" class="mt-0.5 size-4 shrink-0 text-minna-green-700" aria-hidden="true" />
                <span>{{ credential }}</span>
              </li>
            </ul>
          </div>

          <div class="lg:col-span-6">
            <ol class="divide-y divide-line border-y border-line">
              <li
                v-for="(item, idx) in TEACHING_SPECIALTIES"
                :key="item.title"
                class="flex items-start gap-4 py-4"
              >
                <span class="font-display text-sm font-bold text-minna-rose-700 tabular-nums pt-0.5">
                  0{{ idx + 1 }}
                </span>
                <div>
                  <h4 class="font-display text-lg font-bold text-ink">
                    {{ item.title }}
                  </h4>
                  <p class="mt-0.5 text-sm text-ink-muted">
                    {{ item.detail }}
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <!-- 3 Editorial Parent Quotes -->
      <div
        id="testimonial"
        class="trust-quotes mt-16 border-t border-line pt-14 lg:mt-20 lg:pt-16"
      >
        <h3 class="font-display text-2xl font-bold text-ink sm:text-3xl">
          Kata orang tua
        </h3>

        <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
          <article
            v-for="item in TESTIMONIALS"
            :key="item.parentName"
            class="trust-quote flex flex-col justify-between md:px-7 first:md:pl-0 last:md:pr-0"
          >
            <div>
              <div class="flex items-center justify-between gap-3">
                <p class="text-sm font-bold text-minna-green-700">
                  {{ item.highlight }}
                </p>
                <span class="rounded-full bg-canvas px-2.5 py-1 text-xs font-bold text-ink-muted">
                  {{ item.level }}
                </span>
              </div>
              <blockquote class="mt-3 text-sm leading-relaxed text-ink sm:text-base">
                “{{ item.quote }}”
              </blockquote>
            </div>

            <div class="mt-6 flex items-center gap-3 border-t border-line/80 pt-4">
              <div
                class="flex size-10 shrink-0 items-center justify-center rounded-full bg-canvas text-xs font-bold text-ink"
                aria-hidden="true"
              >
                {{ getParentInitials(item.parentName) }}
              </div>
              <div>
                <p class="text-sm font-bold text-ink">
                  {{ item.parentName }}
                </p>
                <p class="text-xs text-ink-muted">
                  {{ item.relation }}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
