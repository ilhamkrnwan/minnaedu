<script setup lang="ts">
defineProps<{ atStart: boolean, atEnd: boolean }>()
defineEmits<{ prev: [], next: [] }>()
</script>

<template>
  <!-- Nothing to scroll (all cards fit): no buttons -->
  <div v-if="!(atStart && atEnd)" class="rail-buttons">
    <button type="button" class="rail-btn" :disabled="atStart" aria-label="Sebelumnya" @click="$emit('prev')">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
    </button>
    <button type="button" class="rail-btn" :disabled="atEnd" aria-label="Berikutnya" @click="$emit('next')">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    </button>
  </div>
</template>
