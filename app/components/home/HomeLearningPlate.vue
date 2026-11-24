<script setup lang="ts">
import { CURRICULUM_MODELS } from '~/utils/curriculum-model'
import type { StationSpec } from '~/utils/curriculum-model'
import { MINNA_CONTACT } from '~/data/minna'

// Analogy: one 90-minute session is one plate of food. Three portions, sized by minutes.
const MEALS: Record<StationSpec['id'], { meal: string, note: string, fill: string, chip: string }> = {
  akademik: { meal: 'Nasi', note: 'Porsi terbesar: pelajaran sekolah', fill: '#ffd24c', chip: 'bg-minna-sun-300 text-ink' },
  quran: { meal: 'Lauk', note: 'Bergizi untuk hati: Al-Qur’an', fill: '#a0d268', chip: 'bg-minna-green-300 text-ink' },
  karakter: { meal: 'Penutup', note: 'Menutup sesi dengan segar', fill: '#f59ac3', chip: 'bg-minna-rose-300 text-ink' }
}

const activeJenjangKey = ref<'paud' | 'sd' | 'smp'>('sd')
const activeIdx = ref(0)

const activeModel = computed(() => CURRICULUM_MODELS.find(m => m.key === activeJenjangKey.value) ?? CURRICULUM_MODELS[1]!)
const activeStation = computed(() => activeModel.value.stations[activeIdx.value] ?? activeModel.value.stations[0])

// Plate geometry (viewBox 520 x 400, plate centred at 260,200)
const CX = 260
const CY = 200
const RADIUS = 128
const GAP_DEG = 2.4

function polar(deg: number, r: number) {
  const rad = (deg * Math.PI) / 180
  return [CX + Math.cos(rad) * r, CY + Math.sin(rad) * r] as const
}

const slices = computed(() => {
  const total = activeModel.value.sessionTotalMinutes
  let cursor = -90
  return activeModel.value.stations.map((station) => {
    const sweep = (station.minutes / total) * 360
    const a0 = cursor + GAP_DEG / 2
    const a1 = cursor + sweep - GAP_DEG / 2
    const mid = cursor + sweep / 2
    cursor += sweep
    const [x0, y0] = polar(a0, RADIUS)
    const [x1, y1] = polar(a1, RADIUS)
    const [lx, ly] = polar(mid, RADIUS * 0.64)
    const [dx, dy] = polar(mid, 14)
    return {
      id: station.id,
      d: `M${CX} ${CY}L${x0.toFixed(1)} ${y0.toFixed(1)}A${RADIUS} ${RADIUS} 0 ${sweep > 180 ? 1 : 0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}Z`,
      label: { x: lx, y: ly },
      pull: { x: dx - CX, y: dy - CY },
      minutes: station.minutes
    }
  })
})

const plateLabel = computed(() =>
  `Piring 90 menit jenjang ${activeModel.value.label}: ${activeModel.value.stations
    .map(s => `${MEALS[s.id].meal} ${s.minutes} menit, ${s.shortLabel}`)
    .join('; ')}.`
)

function startOf(station: StationSpec) {
  return station.timeWindow.split(' – ')[0]
}

const endTime = computed(() => activeModel.value.stations[2].timeWindow.split(' – ')[1]?.replace(' WIB', ''))

function selectJenjang(key: 'paud' | 'sd' | 'smp') {
  activeJenjangKey.value = key
}

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
        '.plate-title',
        { y: 90, opacity: 0.1, rotate: 2 },
        { y: 0, opacity: 1, rotate: 0, ease: 'none', scrollTrigger: { trigger: '.plate-title', start: 'top 96%', end: 'top 62%', scrub: 0.5 } }
      )

      const stage = { trigger: '.plate-stage', start: 'top 92%', end: 'top 28%', scrub: 0.7 }
      // The whole plate spins down onto the table; each portion arrives from a different turn.
      gsap.fromTo('.plate-group', { rotation: -200, scale: 0.4, svgOrigin: `${CX} ${CY}` }, { rotation: 0, scale: 1, svgOrigin: `${CX} ${CY}`, ease: 'power3.out', scrollTrigger: stage })
      gsap.fromTo('.plate-slice', { rotation: (i: number) => 120 + i * 90, svgOrigin: `${CX} ${CY}` }, { rotation: 0, svgOrigin: `${CX} ${CY}`, ease: 'power2.out', stagger: 0.12, scrollTrigger: stage })
      gsap.fromTo('.cutlery-fork', { x: -260, rotation: -50 }, { x: 0, rotation: 0, ease: 'power3.out', scrollTrigger: stage })
      gsap.fromTo('.cutlery-spoon', { x: 260, rotation: 50 }, { x: 0, rotation: 0, ease: 'power3.out', scrollTrigger: stage })
      gsap.fromTo('.plate-note', { scale: 0, rotate: -20 }, { scale: 1, rotate: -4, ease: 'back.out(2)', scrollTrigger: { ...stage, start: 'top 60%', end: 'top 35%' } })
      gsap.fromTo('.time-seg', { scaleX: 0 }, { scaleX: 1, transformOrigin: '0% 50%', ease: 'none', stagger: 0.25, scrollTrigger: { trigger: '.time-bar', start: 'top 98%', end: 'top 70%', scrub: 0.5 } })
      gsap.fromTo('.plate-panel', { x: 120, rotate: 2, opacity: 0.2 }, { x: 0, rotate: 0, opacity: 1, ease: 'power3.out', scrollTrigger: { trigger: '.plate-panel', start: 'top 98%', end: 'top 55%', scrub: 0.6 } })
    },
    sectionRef.value
  )
})

onUnmounted(() => {
  mm?.revert()
})
</script>

<template>
  <section id="program" ref="sectionRef" class="scroll-mt-20 overflow-x-clip bg-canvas py-16 sm:py-20 lg:py-28">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div class="plate-title max-w-2xl">
          <h2 class="font-display text-[clamp(2rem,5.4vw,3.6rem)] leading-[1.08] font-bold text-ink">
            Satu sesi sore, ibarat sepiring makan
            <span class="relative inline-block">
              bergizi
              <DecoSticker kind="underline" class="absolute -bottom-2 left-0 h-3 w-full text-minna-coral-500 sm:h-4" />
            </span>
          </h2>
          <p class="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Anak tidak cukup diberi nasi saja. Tiap sesi 90 menit kami bagi menjadi tiga porsi: pelajaran sekolah, Al-Qur’an, dan penutup. Besarnya porsi menyesuaikan jenjang.
          </p>
        </div>

        <div class="flex w-fit flex-wrap gap-1.5" role="group" aria-label="Pilih jenjang pendidikan">
          <button
            v-for="model in CURRICULUM_MODELS"
            :key="model.key"
            type="button"
            :aria-pressed="activeJenjangKey === model.key"
            :class="[
              'min-h-11 cursor-pointer rounded-full border-2 border-ink px-5 text-sm font-bold transition-colors',
              activeJenjangKey === model.key ? 'bg-ink text-surface' : 'bg-surface text-ink hover:bg-minna-sun-100'
            ]"
            @click="selectJenjang(model.key)"
          >
            {{ model.label }}
          </button>
        </div>
      </div>

      <div class="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
        <!-- The plate -->
        <div class="lg:col-span-7">
          <div class="plate-stage relative">
            <svg
              :viewBox="`0 0 520 400`"
              role="img"
              :aria-label="plateLabel"
              class="w-full drop-shadow-[0_14px_16px_rgba(42,28,21,0.16)]"
            >
              <!-- Fork -->
              <g class="cutlery-fork">
                <g transform="translate(44 70)" stroke="#2a1c15" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="#fffdf7">
                  <path d="M-14 0v36c0 14 28 14 28 0V0M0 0v44" fill="none" />
                  <rect x="-5.5" y="46" width="11" height="210" rx="5.5" />
                </g>
              </g>
              <!-- Spoon -->
              <g class="cutlery-spoon">
                <g transform="translate(476 70)" stroke="#2a1c15" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="#fffdf7">
                  <ellipse cx="0" cy="28" rx="16" ry="27" />
                  <rect x="-5.5" y="52" width="11" height="204" rx="5.5" />
                </g>
              </g>

              <g class="plate-group">
                <circle :cx="CX" :cy="CY" r="188" fill="#fffdf7" stroke="#2a1c15" stroke-width="3.5" />
                <circle :cx="CX" :cy="CY" r="158" fill="none" stroke="#2a1c15" stroke-opacity="0.18" stroke-width="2" />

                <g
                  v-for="(slice, idx) in slices"
                  :key="slice.id"
                  class="plate-slice cursor-pointer"
                  @click="activeIdx = idx"
                >
                  <g
                    class="slice-pull"
                    :style="{ transform: activeIdx === idx ? `translate(${slice.pull.x}px, ${slice.pull.y}px)` : 'translate(0px, 0px)' }"
                  >
                    <path
                      :d="slice.d"
                      :fill="MEALS[slice.id].fill"
                      stroke="#2a1c15"
                      stroke-width="3"
                      stroke-linejoin="round"
                    />
                    <text
                      :x="slice.label.x"
                      :y="slice.label.y"
                      text-anchor="middle"
                      dominant-baseline="central"
                      font-family="Fraunces, Georgia, serif"
                      font-weight="800"
                      font-size="30"
                      fill="#2a1c15"
                    >
                      {{ slice.minutes }}'
                    </text>
                  </g>
                </g>

                <circle :cx="CX" :cy="CY" r="30" fill="#fffdf7" stroke="#2a1c15" stroke-width="3" />
                <text :x="CX" :y="CY - 3" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="800" font-size="24" fill="#2a1c15">90</text>
                <text :x="CX" :y="CY + 15" text-anchor="middle" font-family="Mulish, sans-serif" font-weight="800" font-size="10" fill="#67564b">MENIT</text>
              </g>
            </svg>

            <p class="plate-note pointer-events-none absolute top-0 right-0 hidden w-40 -rotate-[4deg] font-script text-2xl leading-tight text-minna-coral-600 sm:block lg:right-2">
              gizi seimbang, bukan cuma nasi
              <DecoSticker kind="arrow" class="mt-1 ml-6 h-12 w-16 rotate-[20deg] text-minna-coral-500" />
            </p>
          </div>

          <!-- 14.30 to 16.00, drawn to the same proportions as the plate -->
          <div class="time-bar relative mt-6 pt-5" role="presentation">
            <div class="flex gap-1">
              <div
                v-for="(station, idx) in activeModel.stations"
                :key="station.id"
                class="min-w-0"
                :style="{ flex: `${station.minutes} 1 0` }"
              >
                <button
                  type="button"
                  tabindex="-1"
                  aria-hidden="true"
                  :class="['time-seg block h-5 w-full cursor-pointer rounded-full border-2 border-ink', MEALS[station.id].chip.split(' ')[0]]"
                  @click="activeIdx = idx"
                />
                <p class="mt-2 text-xs font-bold text-ink-muted tabular-nums">
                  {{ startOf(station) }}
                </p>
              </div>
            </div>
            <p class="absolute top-0 right-0 text-xs font-bold text-ink-muted tabular-nums">
              {{ endTime }}
            </p>
          </div>
        </div>

        <!-- Detail panel -->
        <div class="plate-panel lg:col-span-5">
          <div class="rounded-3xl bg-surface p-6 ring-2 ring-ink sm:p-7">
            <div class="flex flex-wrap items-start justify-between gap-3 border-b-2 border-line pb-4">
              <div>
                <h3 class="font-display text-2xl font-bold text-ink">
                  {{ activeModel.label }}
                </h3>
                <p class="mt-0.5 text-sm font-semibold text-ink-muted">
                  {{ activeModel.ageRange }} · {{ activeModel.sessionTotalMinutes }} menit per sesi
                </p>
              </div>
              <span class="rounded-full bg-minna-sun-100 px-3 py-1.5 text-xs font-bold text-ink tabular-nums">
                14.30 – 16.00 WIB
              </span>
            </div>

            <div class="mt-4 grid grid-cols-3 gap-2" role="group" aria-label="Pilih porsi belajar">
              <button
                v-for="(station, idx) in activeModel.stations"
                :key="station.id"
                type="button"
                :aria-pressed="activeIdx === idx"
                :class="[
                  'flex cursor-pointer flex-col items-start rounded-2xl border-2 p-3 text-left transition-colors',
                  activeIdx === idx ? 'border-ink bg-ink text-surface' : 'border-line bg-canvas text-ink hover:border-ink'
                ]"
                @click="activeIdx = idx"
              >
                <span class="font-display text-base font-bold">{{ MEALS[station.id].meal }}</span>
                <span class="mt-0.5 text-xs font-bold leading-snug">{{ station.shortLabel }}</span>
                <span :class="['mt-1 text-xs font-semibold tabular-nums', activeIdx === idx ? 'text-minna-sun-300' : 'text-ink-muted']">
                  {{ station.minutes }} menit
                </span>
              </button>
            </div>

            <div class="mt-5 border-t-2 border-line pt-5" aria-live="polite">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <span :class="['inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold', MEALS[activeStation.id].chip]">
                  <UIcon :name="activeStation.icon" class="size-3.5" aria-hidden="true" />
                  <span>{{ activeStation.timeWindow }}</span>
                </span>
                <span class="text-xs font-bold text-ink tabular-nums">
                  {{ Math.round((activeStation.minutes / activeModel.sessionTotalMinutes) * 100) }}% dari sesi
                </span>
              </div>

              <h4 class="mt-3 font-display text-xl font-bold text-ink">
                {{ activeStation.title }}
              </h4>
              <p class="mt-1 text-sm text-ink-muted">
                {{ MEALS[activeStation.id].note }}
              </p>

              <ul class="mt-4 space-y-2">
                <li v-for="topic in activeStation.topics" :key="topic" class="flex items-start gap-2 text-sm text-ink">
                  <UIcon name="i-lucide-check" class="mt-0.5 size-4 shrink-0 text-minna-green-700" aria-hidden="true" />
                  <span>{{ topic }}</span>
                </li>
              </ul>
            </div>

            <UButton
              :to="MINNA_CONTACT.whatsappUrl(`Assalamualaikum, saya ingin menanyakan jadwal & biaya program ${activeModel.label} (${activeModel.ageRange}) di Minna Education.`)"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              block
              trailing-icon="i-lucide-arrow-up-right"
              class="mt-6 min-h-12 rounded-full bg-ink text-surface hover:bg-minna-ink-800"
            >
              Tanya Jadwal &amp; Biaya {{ activeModel.label }}
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.slice-pull {
  transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

@media (prefers-reduced-motion: reduce) {
  .slice-pull {
    transition: none;
  }
}
</style>
