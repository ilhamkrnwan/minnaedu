import { queryCollection } from '@nuxt/content/server'

const PAGES = ['/', '/tentang', '/kontak', '/kabar', '/galeri']

export default defineEventHandler(async (event) => {
  const site = (useRuntimeConfig(event).public.siteUrl || getRequestURL(event).origin).replace(/\/$/, '')
  const articles = await queryCollection(event, 'kabar').select('path', 'date').all()

  const urls = [
    ...PAGES.map(path => `<url><loc>${site}${path}</loc></url>`),
    ...articles.map(a => `<url><loc>${site}${a.path}</loc><lastmod>${a.date}</lastmod></url>`)
  ]

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
})
