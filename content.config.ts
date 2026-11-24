import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // Artikel Kabar: content/kabar/*.md -> /kabar/<nama-file>
    kabar: defineCollection({
      type: 'page',
      source: 'kabar/*.md',
      schema: z.object({
        date: z.string(), // yyyy-mm-dd
        category: z.string(),
        // Gambar opsional: tanpa gambar, kartu menampilkan tile kategori.
        image: z.string().optional(),
        imageAlt: z.string().optional()
      })
    })
  }
})
