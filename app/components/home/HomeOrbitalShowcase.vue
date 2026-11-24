<script setup lang="ts">
import { MINNA_CONTACT } from '~/data/minna'

interface OrbitCard {
  id: string
  angle: number
  tilt: number
  kind: 'photo' | 'type'
  src?: string
  alt?: string
  photoClass?: string
  bgClass?: string
  headline?: string
  subline?: string
  caption?: string
}

const ORBIT_RADIUS = 252
const STAGE_CENTER = 325

const orbitCards: OrbitCard[] = [
  { id: 'calistung', angle: 0, tilt: -4, kind: 'photo', src: '/images/hero-calistung.jpg', alt: 'Siswi Calistung Minna Education tersenyum memegang buku dan pensil', bgClass: 'bg-studio-pink' },
  { id: 'jadwal', angle: 45, tilt: 3, kind: 'type', bgClass: 'bg-minna-sun-300 text-ink', headline: '14.30', subline: '– 16.00 WIB', caption: 'Sesi Sore' },
  { id: 'ngaji', angle: 90, tilt: -2, kind: 'photo', src: '/images/gallery-ngaji.jpg', alt: 'Siswa khusyuk mengaji Al-Qur’an di atas rehal kayu', bgClass: 'bg-minna-ink-800' },
  { id: 'tahfidz', angle: 135, tilt: 5, kind: 'type', bgClass: 'bg-studio-pink text-ink', headline: 'Tahfidz', subline: '& Iqra', caption: 'Bimbingan Harian' },
  { id: 'siswa', angle: 180, tilt: -3, kind: 'photo', src: '/images/manifesto-student.jpg', alt: 'Siswi Muslim Minna Education tersenyum penuh antusiasme belajar', bgClass: 'bg-studio-amber' },
  { id: 'jenjang', angle: 225, tilt: 2, kind: 'type', bgClass: 'bg-surface text-ink', headline: '3 Jenjang', subline: 'PAUD · SD · SMP', caption: 'Minna Education' },
  { id: 'rumah', angle: 270, tilt: -5, kind: 'photo', src: '/images/minna.jpg', alt: 'Tampak depan rumah belajar kayu Minna Education di Wado Wetan', photoClass: 'brightness-[1.14] contrast-[1.04] saturate-[1.06]', bgClass: 'bg-minna-ink-800' },
  { id: 'lokasi', angle: 315, tilt: 3, kind: 'type', bgClass: 'bg-minna-green-200 text-ink', headline: 'Wado', subline: 'Kedungtuban', caption: 'Blora, Jateng' }
]

const mobilePhotos = orbitCards.filter(card => card.kind === 'photo')

function cardPositionStyle(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180
  return {
    left: `${Math.round(STAGE_CENTER + ORBIT_RADIUS * Math.cos(rad))}px`,
    top: `${Math.round(STAGE_CENTER + ORBIT_RADIUS * Math.sin(rad))}px`
  }
}

const sectionRef = ref<HTMLElement | null>(null)
const { gsap } = useGSAP()
let mm: gsap.MatchMedia | null = null

onMounted(() => {
  if (!sectionRef.value) return

  mm = gsap.matchMedia()
  mm.add(
    {
      desktop: '(min-width: 1024px)',
      reduceMotion: '(prefers-reduced-motion: reduce)'
    },
    (context) => {
      const { desktop, reduceMotion } = context.conditions as { desktop: boolean, reduceMotion: boolean }
      if (reduceMotion) return

      if (desktop) {
        // The ring is driven by the scrollbar, not a clock: it turns exactly as far as the visitor scrolls
        // and stops when they stop. The stage is pinned while one full revolution plays.
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: '.orbital-stage',
            start: 'center center',
            end: '+=2600',
            pin: true,
            scrub: 0.6,
            anticipatePin: 1
          }
        })

        tl.fromTo('.orbit-ring', { rotation: 0, transformOrigin: '50% 50%' }, { rotation: 360, transformOrigin: '50% 50%', duration: 1.2 }, 0)
        tl.fromTo(
          '.orbit-card-inner',
          { rotation: (i: number) => orbitCards[i]!.tilt },
          { rotation: (i: number) => -360 + orbitCards[i]!.tilt, duration: 1.2 },
          0
        )
        // Cards burst out of the centre in the first quarter of the scroll.
        tl.fromTo(
          '.orbit-card-shell',
          {
            x: (i: number) => -ORBIT_RADIUS * Math.cos((orbitCards[i]!.angle * Math.PI) / 180),
            y: (i: number) => -ORBIT_RADIUS * Math.sin((orbitCards[i]!.angle * Math.PI) / 180),
            scale: 0.2
          },
          { x: 0, y: 0, scale: 1, duration: 0.3, ease: 'power3.out', stagger: 0.025 },
          0
        )
        tl.fromTo('.orbital-copy-desktop', { scale: 0.5, rotate: -10, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 0.25, ease: 'back.out(1.7)' }, 0.1)
        tl.to({}, { duration: 0.15 }, 1.2)
      } else {
        gsap.fromTo(
          '.m-photo',
          { rotate: (i: number) => (i % 2 ? 10 : -10), y: 110, scale: 0.7 },
          {
            rotate: (i: number) => [-2, 2, -1.5, 1.5][i % 4]!,
            y: 0,
            scale: 1,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: { trigger: '.m-grid', start: 'top 94%', end: 'top 38%', scrub: 0.6 }
          }
        )
      }
    },
    sectionRef.value
  )
})

onUnmounted(() => {
  mm?.revert()
})
</script>

<template>
  <section
    id="galeri"
    ref="sectionRef"
    class="on-dark relative scroll-mt-20 overflow-x-clip bg-orbital py-16 text-surface sm:py-20 lg:py-24"
  >
    <DecoSticker kind="sparkle" class="pointer-events-none absolute top-10 left-[6%] hidden size-14 rotate-12 sm:block lg:size-20" />
    <DecoSticker kind="book" class="pointer-events-none absolute top-16 right-[6%] hidden size-20 -rotate-6 sm:block lg:size-28" />

    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <!-- Desktop: pinned ring, scroll-driven -->
      <div class="orbital-stage relative mx-auto hidden h-[650px] w-[650px] lg:block">
        <div class="orbit-ring absolute inset-0">
          <div
            v-for="card in orbitCards"
            :key="card.id"
            class="orbit-card-shell absolute -translate-x-1/2 -translate-y-1/2"
            :style="cardPositionStyle(card.angle)"
          >
            <div
              :class="[
                'orbit-card-inner h-36 w-32 overflow-hidden rounded-lg border-4 border-surface shadow-lg shadow-minna-ink-950/40',
                card.bgClass
              ]"
            >
              <img
                v-if="card.kind === 'photo' && card.src"
                :src="card.src"
                :alt="card.alt ?? ''"
                width="800"
                height="800"
                loading="lazy"
                :class="['h-full w-full object-cover', card.photoClass]"
              >
              <div v-else class="flex h-full flex-col justify-between p-3 text-left">
                <div>
                  <p class="font-display text-xl leading-tight font-bold tabular-nums">
                    {{ card.headline }}
                  </p>
                  <p class="mt-0.5 text-xs leading-snug font-bold tabular-nums">
                    {{ card.subline }}
                  </p>
                </div>
                <p class="text-[11px] font-bold tracking-[0.06em] uppercase">
                  {{ card.caption }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="orbital-copy-desktop absolute inset-0 z-10 flex flex-col items-center justify-center px-12 text-center">
          <div class="max-w-[270px]">
            <h2 class="font-display text-4xl leading-[1.05] font-bold text-surface">
              Tumbuh bersama di
              <span class="mt-1 block -rotate-3 font-script text-[3.4rem] leading-none text-minna-coral-400">Minna Education</span>
            </h2>
            <div class="mt-6 flex justify-center">
              <UButton
                to="/galeri"
                size="lg"
                trailing-icon="i-lucide-arrow-right"
                class="min-h-12 rounded-full bg-surface px-6 text-ink hover:bg-minna-sun-300"
              >
                Buka Galeri
              </UButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile and tablet: pasted-photo wall -->
      <div class="lg:hidden">
        <div class="mx-auto max-w-md text-center">
          <h2 class="font-display text-3xl leading-[1.1] font-bold text-surface sm:text-4xl">
            Tumbuh bersama di
            <span class="mt-1 block -rotate-2 font-script text-5xl leading-none text-minna-coral-400 sm:text-6xl">Minna Education</span>
          </h2>
          <div class="mt-6 flex justify-center">
            <UButton
              to="/galeri"
              size="lg"
              trailing-icon="i-lucide-arrow-right"
              class="min-h-12 rounded-full bg-surface px-6 text-ink hover:bg-minna-sun-300"
            >
              Buka Galeri
            </UButton>
          </div>
        </div>

        <div class="m-grid mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div
            v-for="photo in mobilePhotos"
            :key="photo.id"
            :class="['m-photo aspect-square overflow-hidden rounded-lg border-4 border-surface shadow-lg shadow-minna-ink-950/40', photo.bgClass]"
          >
            <img
              :src="photo.src"
              :alt="photo.alt ?? ''"
              width="800"
              height="800"
              loading="lazy"
              :class="['h-full w-full object-cover', photo.photoClass]"
            >
          </div>
        </div>
      </div>

      <div class="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-surface/20 pt-6 text-sm">
        <a
          :href="MINNA_CONTACT.instagramUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex min-h-11 items-center gap-2 font-semibold text-surface hover:text-minna-sun-300"
        >
          <UIcon name="i-lucide-instagram" class="size-4" aria-hidden="true" />
          <span>Ikuti keseharian @minnaedu</span>
        </a>

        <NuxtLink
          to="/galeri"
          class="inline-flex min-h-11 items-center gap-1.5 font-semibold text-surface hover:text-minna-sun-300"
        >
          <span>Semua Foto</span>
          <UIcon name="i-lucide-arrow-up-right" class="size-4" aria-hidden="true" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
