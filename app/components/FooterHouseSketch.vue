<script setup lang="ts">
// The real learning house in Wado Wetan: timber gable, porch roof, green sign, picket fence,
// shrubs, a banana tree. Ink line + flat colour, drawn on as the footer scrolls into view.
const INK = '#2a1c15'
const PLANK = '#e8c9a0'
const WOOD = '#b87a4b'
const WOOD_DARK = '#7a4a2e'
const GLOW = '#f3dfa6'
const LEAF_1 = '#a0d268'
const LEAF_2 = '#7cb342'
const LEAF_3 = '#5d9425'

const GROUND_Y = 252

// Gable boards: vertical lines clipped to the roof triangle
const gableTop = (x: number) => (x <= 600 ? 152 - (x - 380) * 0.4818 : 152 - (820 - x) * 0.4818)
const planks = Array.from({ length: 27 }, (_, i) => 392 + i * 16).map(x => `M${x} ${(gableTop(x) + 5).toFixed(1)}V152`)

const picketsLeft = Array.from({ length: 10 }, (_, i) => 398 + i * 12)
const picketsRight = Array.from({ length: 18 }, (_, i) => 592 + i * 12)
const picket = (x: number) => `M${x} ${GROUND_Y}V237L${x + 3} 231L${x + 6} 237V${GROUND_Y}Z`

const bananaLeaves = [-165, -128, -92, -56, -18].map((deg) => {
  const rad = (deg * Math.PI) / 180
  return {
    cx: 895 + Math.cos(rad) * 46,
    cy: 150 + Math.sin(rad) * 46,
    deg,
    mid: `M${(895 + Math.cos(rad) * 4).toFixed(1)} ${(150 + Math.sin(rad) * 4).toFixed(1)}L${(895 + Math.cos(rad) * 88).toFixed(1)} ${(150 + Math.sin(rad) * 88).toFixed(1)}`
  }
})

const balloons = [
  { x: 486, y: 212, c: '#f59ac3' },
  { x: 499, y: 206, c: '#ffd24c' },
  { x: 495, y: 222, c: '#a0d268' },
  { x: 483, y: 228, c: '#ff6a4d' }
]

const svgRef = ref<SVGSVGElement | null>(null)
const { gsap } = useGSAP()
let mm: gsap.MatchMedia | null = null

onMounted(() => {
  if (!svgRef.value) return
  mm = gsap.matchMedia()
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const shapes = gsap.utils.toArray<SVGElement>('.hs-svg path, .hs-svg rect, .hs-svg circle, .hs-svg ellipse, .hs-svg polygon')
    gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: svgRef.value, start: 'top 100%', end: 'bottom 92%', scrub: 0.6 }
    })
      .fromTo(shapes, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.5, stagger: { each: 0.008 } }, 0)
      .fromTo(shapes, { fillOpacity: 0 }, { fillOpacity: 1, duration: 0.4, stagger: { each: 0.006 } }, 0.35)
  }, svgRef.value)
})

onUnmounted(() => {
  mm?.revert()
})
</script>

<template>
  <div class="mt-12 border-t-2 border-line pt-8">
    <p class="font-display text-lg font-bold text-ink">
      Rumah belajar kami di Wado Wetan
    </p>

    <div class="mt-4 overflow-hidden rounded-3xl bg-canvas px-2 pt-4 sm:px-6 sm:pt-6">
      <svg
        ref="svgRef"
        viewBox="0 0 1200 268"
        class="hs-svg block h-auto w-full"
        role="img"
        aria-label="Gambar garis rumah belajar kayu Minna Education: atap pelana papan, teras beratap, pintu, jendela, papan nama hijau, pagar kayu, semak, dan pohon pisang"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        :stroke="INK"
        stroke-width="3"
      >
        <!-- Back trees -->
        <path :fill="LEAF_3" d="M990 254C992 200 986 150 998 100L1014 102C1006 150 1016 200 1014 254Z" />
        <circle cx="960" cy="84" r="40" :fill="LEAF_3" />
        <circle cx="1060" cy="88" r="40" :fill="LEAF_3" />
        <circle cx="1010" cy="58" r="46" :fill="LEAF_3" />
        <circle cx="1010" cy="112" r="38" :fill="LEAF_3" />

        <!-- Banana tree -->
        <path :fill="LEAF_1" d="M884 254L888 150H902L906 254Z" />
        <g v-for="leaf in bananaLeaves" :key="leaf.deg">
          <ellipse :cx="leaf.cx" :cy="leaf.cy" rx="46" ry="13" :transform="`rotate(${leaf.deg} ${leaf.cx} ${leaf.cy})`" :fill="LEAF_1" />
          <path :d="leaf.mid" stroke-width="1.6" />
        </g>

        <!-- House: gable, walls, porch roof -->
        <rect x="392" y="152" width="416" height="100" :fill="WOOD" />
        <polygon points="380,152 600,46 820,152" :fill="PLANK" />
        <path v-for="d in planks" :key="d" :d="d" stroke-width="1.4" stroke-opacity="0.45" />
        <path d="M362 160L600 38L838 160" stroke-width="5" />
        <polygon points="372,150 828,150 850,178 350,178" :fill="WOOD_DARK" />
        <path d="M366 164H834" stroke-width="1.4" stroke-opacity="0.5" />

        <!-- Posts -->
        <rect x="384" y="178" width="9" height="74" :fill="WOOD" stroke-width="2.5" />
        <rect x="806" y="178" width="9" height="74" :fill="WOOD" stroke-width="2.5" />

        <!-- Window, balloons, door, lamps -->
        <rect x="420" y="196" width="52" height="40" :fill="GLOW" />
        <path d="M446 196V236M420 216H472" stroke-width="2" />
        <g v-for="b in balloons" :key="b.c">
          <path :d="`M${b.x} ${b.y + 7}Q${b.x + 4} 240 492 244`" stroke-width="1.2" />
          <circle :cx="b.x" :cy="b.y" r="7" :fill="b.c" stroke-width="2.2" />
        </g>
        <rect x="524" y="190" width="58" height="62" :fill="WOOD_DARK" />
        <rect x="534" y="198" width="38" height="30" :fill="GLOW" stroke-width="2.2" />
        <circle cx="574" cy="230" r="2.6" fill="#ffd24c" stroke-width="1.8" />
        <circle cx="470" cy="185" r="5" fill="#fff4cc" stroke-width="2" />
        <circle cx="600" cy="185" r="5" fill="#fff4cc" stroke-width="2" />

        <!-- Green sign -->
        <rect x="628" y="188" width="150" height="52" rx="4" :fill="LEAF_3" />
        <path d="M642 204H764M642 216H752M642 228H730" stroke="#fffdf7" stroke-width="3" />

        <!-- Picket fence -->
        <path v-for="x in picketsLeft" :key="`l${x}`" :d="picket(x)" :fill="PLANK" stroke-width="2" />
        <path d="M398 241H516M398 248H516" stroke-width="2" />
        <path v-for="x in picketsRight" :key="`r${x}`" :d="picket(x)" :fill="PLANK" stroke-width="2" />
        <path d="M592 241H808M592 248H808" stroke-width="2" />

        <!-- Front shrubs + hibiscus -->
        <circle cx="305" cy="236" r="26" :fill="LEAF_2" />
        <circle cx="362" cy="238" r="24" :fill="LEAF_2" />
        <circle cx="334" cy="224" r="30" :fill="LEAF_2" />
        <path d="M316 232q6-10 14-6M346 236q6-10 14-4M330 244q4-8 12-6" stroke-width="1.6" />
        <g>
          <circle v-for="a in [0, 72, 144, 216, 288]" :key="a" :cx="334 + Math.cos((a * Math.PI) / 180) * 8" :cy="206 + Math.sin((a * Math.PI) / 180) * 8" r="6" fill="#f59ac3" stroke-width="2" />
          <circle cx="334" cy="206" r="4" fill="#ffd24c" stroke-width="2" />
        </g>
        <circle cx="1090" cy="238" r="24" :fill="LEAF_2" />
        <circle cx="1160" cy="240" r="22" :fill="LEAF_2" />
        <circle cx="1125" cy="228" r="28" :fill="LEAF_2" />
        <circle cx="842" cy="240" r="18" :fill="LEAF_2" />

        <!-- Left tree, in front -->
        <path :fill="WOOD" d="M222 254C228 190 218 130 238 56L256 60C240 130 252 190 250 254Z" />
        <circle cx="200" cy="74" r="42" :fill="LEAF_2" />
        <circle cx="300" cy="80" r="38" :fill="LEAF_2" />
        <circle cx="258" cy="44" r="46" :fill="LEAF_2" />
        <circle cx="232" cy="106" r="34" :fill="LEAF_2" />

        <!-- Ground -->
        <path d="M20 254C200 249 400 257 600 252S1000 256 1180 252" stroke-width="3.4" />
      </svg>
    </div>
  </div>
</template>
