<template>
  <div class="min-h-screen flex flex-col bg-canvas text-ink">
    <!-- Hand-cut edge for paper strips (.paper-cut). Defined once, referenced by id. -->
    <svg class="pointer-events-none absolute size-0" aria-hidden="true" focusable="false">
      <filter id="paper-wobble" x="-5%" y="-20%" width="110%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.016 0.035" numOctaves="2" seed="7" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
    <SiteHeader />
    <UMain id="konten-utama" class="flex-1">
      <slot />
    </UMain>
    <SiteFooter />
    <FloatingWhatsApp />
  </div>
</template>
