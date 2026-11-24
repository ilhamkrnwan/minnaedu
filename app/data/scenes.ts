// Ilustrasi section sebagai lapisan parallax (seperti hero).
// Urutan: belakang -> depan. Semua lapisan satu scene memakai kanvas yang sama
// (ukuran & posisi sudah pas, latar transparan), jadi cukup ditumpuk.
// depth = px pergeseran saat scroll; positif tertinggal, negatif mendahului.
// Spesifikasi aset: docs/aset-ilustrasi-lapisan.md
export interface Layer { src: string, depth: number }

export const SCENES: Record<'program' | 'testimoni' | 'daftar' | 'kontak', Layer[]> = {
  program: [
    { src: '/images/scenes/program-1-latar.webp', depth: -30 },
    { src: '/images/scenes/program-2-sempoa.webp', depth: 30 },
    { src: '/images/scenes/program-3-buku.webp', depth: 70 },
    { src: '/images/scenes/program-4-bintang.webp', depth: 110 }
  ],
  testimoni: [
    { src: '/images/scenes/testimoni-1-latar.webp', depth: -40 },
    { src: '/images/scenes/testimoni-2-bangku-tokoh.webp', depth: 20 },
    { src: '/images/scenes/testimoni-3-daun-kiri.webp', depth: 70 },
    { src: '/images/scenes/testimoni-4-daun-kanan.webp', depth: 90 }
  ],
  daftar: [
    { src: '/images/scenes/daftar-1-latar.webp', depth: -30 },
    { src: '/images/scenes/daftar-2-rumah.webp', depth: 30 },
    { src: '/images/scenes/daftar-3-tanaman.webp', depth: 80 }
  ],
  kontak: [
    { src: '/images/scenes/kontak-1-pesawat.webp', depth: -60 },
    { src: '/images/scenes/kontak-2-tokoh.webp', depth: 20 },
    { src: '/images/scenes/kontak-3-daun.webp', depth: 70 }
  ]
}
