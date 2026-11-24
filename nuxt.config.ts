// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-11-21',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  ui: {
    colorMode: false
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'id'
      },
      script: [
        {
          // Hide hero pre-hydration only when motion is allowed; fail-safe removes it after 3s.
          innerHTML: "if(matchMedia('(prefers-reduced-motion: no-preference)').matches){var e=document.documentElement;e.classList.add('motion');setTimeout(function(){e.classList.remove('motion')},3000)}",
          tagPosition: 'head'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/minnaedu.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..800;1,9..40,400..800&family=Lora:ital,wght@0,400..700;1,400..700&display=swap'
        }
      ]
    }
  }
})
