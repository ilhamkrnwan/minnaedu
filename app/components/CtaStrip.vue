<script setup lang="ts">
// Hand-cut paper strip with a starburst badge. Content goes in the default slot.
withDefaults(defineProps<{ badge?: boolean }>(), { badge: true })
</script>

<template>
  <div class="cta-strip relative isolate">
    <div class="paper-cut absolute inset-0 -z-10 rounded-[2.25rem] bg-paper" aria-hidden="true" />
    <DecoSticker
      v-if="badge"
      kind="burst"
      class="cta-burst absolute -top-7 left-4 z-10 size-20 -rotate-12 sm:-top-8 sm:left-6 sm:size-24"
    />
    <div class="px-5 pt-16 pb-6 sm:px-8 sm:pb-7 lg:py-7 lg:pl-36">
      <slot />
    </div>
  </div>
</template>
