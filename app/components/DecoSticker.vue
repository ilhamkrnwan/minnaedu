<script setup lang="ts">
// Die-cut paper stickers + hand-drawn marker strokes. Crisp vector geometry, one ink colour, one outline recipe.
type Kind = 'notebook' | 'pencil' | 'flower' | 'book' | 'burst' | 'sparkle' | 'underline' | 'loop' | 'arrow'

const props = defineProps<{ kind: Kind }>()

const uid = useId()
const filterId = `sticker-${uid}`

const isStroke = computed(() => ['underline', 'loop', 'arrow'].includes(props.kind))
const viewBox = computed(() => {
  if (props.kind === 'underline') return '0 0 240 28'
  if (props.kind === 'loop') return '0 0 260 110'
  if (props.kind === 'arrow') return '0 0 120 80'
  return '0 0 100 100'
})

// 12-point starburst
const burstPoints = Array.from({ length: 24 }, (_, i) => {
  const r = i % 2 === 0 ? 46 : 36
  const a = (i / 24) * Math.PI * 2 - Math.PI / 2
  return `${(50 + Math.cos(a) * r).toFixed(1)},${(50 + Math.sin(a) * r).toFixed(1)}`
}).join(' ')

const petals = [0, 72, 144, 216, 288]
</script>

<template>
  <svg
    :viewBox="viewBox"
    :preserveAspectRatio="isStroke ? 'none' : 'xMidYMid meet'"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    class="overflow-visible"
  >
    <defs v-if="!isStroke">
      <filter :id="filterId" x="-30%" y="-30%" width="160%" height="170%">
        <feMorphology in="SourceAlpha" operator="dilate" radius="3.6" result="grow" />
        <feFlood flood-color="#fffdf7" result="paper" />
        <feComposite in="paper" in2="grow" operator="in" result="cut" />
        <feOffset in="grow" dy="2.6" result="drop" />
        <feGaussianBlur in="drop" stdDeviation="2.2" result="soft" />
        <feFlood flood-color="#2a1c15" flood-opacity="0.22" />
        <feComposite in2="soft" operator="in" result="shadow" />
        <feMerge>
          <feMergeNode in="shadow" />
          <feMergeNode in="cut" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <!-- Spiral notebook -->
    <g v-if="kind === 'notebook'" :filter="`url(#${filterId})`" stroke="#2a1c15" stroke-width="3">
      <rect x="24" y="12" width="54" height="76" rx="7" fill="#fffdf7" />
      <path d="M24 19a7 7 0 0 1 7-7h40a7 7 0 0 1 7 7v11H24Z" fill="#f4452d" />
      <path d="M40 46h26M40 58h26M40 70h16" stroke-width="2.6" />
      <path d="M16 24h18M16 38h18M16 52h18M16 66h18M16 80h18" stroke-width="3.4" />
    </g>

    <!-- Pencil -->
    <g v-else-if="kind === 'pencil'" :filter="`url(#${filterId})`" stroke="#2a1c15" stroke-width="3" transform="rotate(38 50 50)">
      <rect x="39" y="8" width="22" height="62" rx="3" fill="#ffd24c" />
      <rect x="39" y="8" width="22" height="12" rx="3" fill="#f59ac3" />
      <path d="M39 24h22" />
      <path d="M39 70h22l-11 22Z" fill="#f0e6d0" />
      <path d="M45.5 82h9L50 92Z" fill="#2a1c15" />
    </g>

    <!-- Hibiscus (brand flower) -->
    <g v-else-if="kind === 'flower'" :filter="`url(#${filterId})`" stroke="#2a1c15" stroke-width="3">
      <ellipse
        v-for="deg in petals"
        :key="deg"
        cx="50"
        cy="27"
        rx="14"
        ry="20"
        fill="#f59ac3"
        :transform="`rotate(${deg} 50 50)`"
      />
      <circle cx="50" cy="50" r="9" fill="#ffd24c" />
      <path d="M50 50 62 30M50 50 66 40" stroke-width="2.6" />
      <circle cx="62" cy="30" r="2.4" fill="#2a1c15" />
      <circle cx="66" cy="40" r="2.4" fill="#2a1c15" />
    </g>

    <!-- Open Qur'an on a rehal -->
    <g v-else-if="kind === 'book'" :filter="`url(#${filterId})`" stroke="#2a1c15" stroke-width="3">
      <path d="M50 76 22 86M50 76l28 10" />
      <path d="M12 30c14-5 28-3 38 4v38c-10-7-24-9-38-4Z" fill="#fffdf7" />
      <path d="M88 30c-14-5-28-3-38 4v38c10-7 24-9 38-4Z" fill="#fffdf7" />
      <path d="M12 68V30M88 68V30" stroke="#3d6d16" stroke-width="5" />
      <path d="M22 42c7-1 14 0 21 3M22 52c7-1 14 0 21 3M57 45c7-3 14-4 21-3M57 55c7-3 14-4 21-3" stroke-width="2.4" />
    </g>

    <!-- Starburst badge with chat bubble -->
    <g v-else-if="kind === 'burst'" :filter="`url(#${filterId})`" stroke="#2a1c15" stroke-width="3">
      <polygon :points="burstPoints" fill="#f4452d" />
      <path d="M34 38a5 5 0 0 1 5-5h22a5 5 0 0 1 5 5v14a5 5 0 0 1-5 5H48l-9 8v-8h0a5 5 0 0 1-5-5Z" fill="#fffdf7" />
      <path d="M42 42h16M42 48h10" stroke-width="2.6" />
    </g>

    <!-- Four-point sparkle -->
    <g v-else-if="kind === 'sparkle'" :filter="`url(#${filterId})`" stroke="#2a1c15" stroke-width="3">
      <path d="M50 8c4 24 18 38 42 42-24 4-38 18-42 42-4-24-18-38-42-42 24-4 38-18 42-42Z" fill="#ffd24c" />
    </g>

    <!-- Marker underline (wobbly, draws on) -->
    <g v-else-if="kind === 'underline'" stroke="currentColor" stroke-width="7">
      <path class="draw" d="M6 17C40 7 74 21 112 12s70 6 122-3" vector-effect="non-scaling-stroke" />
      <path class="draw" d="M30 25c40-6 90-3 168-8" stroke-width="4" vector-effect="non-scaling-stroke" />
    </g>

    <!-- Marker loop around a word -->
    <g v-else-if="kind === 'loop'" stroke="currentColor" stroke-width="5">
      <path class="draw" d="M236 24C200 6 110 -2 52 18 8 34 2 70 40 88c52 22 140 18 190-6 26-12 32-42-4-60-30-15-92-20-132-8" vector-effect="non-scaling-stroke" />
    </g>

    <!-- Hand arrow -->
    <g v-else stroke="currentColor" stroke-width="5">
      <path class="draw" d="M8 14C40 4 84 14 92 50c3 12-2 20-8 26" vector-effect="non-scaling-stroke" />
      <path class="draw" d="M70 62 84 76l16-14" vector-effect="non-scaling-stroke" />
    </g>
  </svg>
</template>
