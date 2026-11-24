// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-11-21',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/content'],
  css: ['~/assets/css/main.css'],
  content: {
    // Node >= 22.5 ships SQLite; no native better-sqlite3 build needed.
    experimental: { sqliteConnector: 'native' }
  },
  ui: {
    colorMode: false
  },
  runtimeConfig: {
    // Set NUXT_PUBLIC_SITE_URL (e.g. https://domain-anda.id) in production for canonical, OG, and sitemap URLs.
    public: { siteUrl: '' }
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
