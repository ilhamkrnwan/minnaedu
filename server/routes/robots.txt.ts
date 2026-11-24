// Allow everyone, including AI crawlers, so answer engines can cite the site.
export default defineEventHandler((event) => {
  const site = (useRuntimeConfig(event).public.siteUrl || getRequestURL(event).origin).replace(/\/$/, '')
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`
})
