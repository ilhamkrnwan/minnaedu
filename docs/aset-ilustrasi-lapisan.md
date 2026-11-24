# Aset ilustrasi berlapis (parallax seperti hero)

Setiap ilustrasi section dipecah menjadi 3–4 lapisan PNG transparan. Saat halaman discroll, tiap lapisan bergeser dengan kecepatan berbeda, sama seperti lapisan BA/CA, tokoh, dan daun di hero.

## Aturan untuk semua lapisan

1. **Satu kanvas per scene.** Semua lapisan satu scene punya ukuran kanvas yang **sama persis** (lihat tabel). Setiap elemen sudah berada di posisi akhirnya. Bagian kanvas yang kosong tetap transparan.
2. **Cara paling aman:** generate dulu satu gambar komposisi utuh, lalu pisahkan tiap elemen ke filenya sendiri (hapus elemen lain atau pakai background removal). Dengan begitu posisinya pasti cocok.
3. **Beri jarak.** Elemen di lapisan berbeda jangan saling menempel garisnya. Sisakan jarak sekitar 20 px, karena lapisan akan bergeser hingga ±50 px. Lapisan belakang boleh lebih lebar, supaya tidak muncul celah saat lapisan depan bergeser.
4. **Ekspor PNG transparan.** Saya yang akan mengkonversi ke WebP.
5. **Gaya** (tempelkan di setiap prompt):

> Flat children's-book illustration, bold dark green ink outline (#263522), flat colours with subtle halftone dot shading, palette: leaf green #a0d268 / #7cb342 / #2f5514, pink #ee62a3 / #f9d7e6, cream #fdfbf5, warm wood #b87a4b. Indonesian Muslim kids and teachers, friendly faces. Transparent background, no text, no frame.

## Daftar lapisan

| Scene (section) | Kanvas | File (belakang → depan) | Isi lapisan |
|---|---|---|---|
| **Program** (Belajar & mengaji) | 1400 × 800 | `program-1-latar.png` | Bentuk blob hijau muda dan pink pucat yang lembut, sebagai alas |
| | | `program-2-sempoa.png` | Sempoa kayu hijau dengan manik pink dan hijau |
| | | `program-3-buku.png` | Buku terbuka, pensil, Al-Qur'an di atas rehal kayu |
| | | `program-4-bintang.png` | 2–3 bintang kecil pink dan hijau yang melayang |
| **Testimoni** (Cerita keluarga Minna) | 1420 × 1000 | `testimoni-1-latar.png` | Blob lembut pink pucat di belakang |
| | | `testimoni-2-bangku-tokoh.png` | Bangku taman hijau dengan ibu berkerudung hijau dan anak berkerudung pink yang membaca Al-Qur'an |
| | | `testimoni-3-daun-kiri.png` | Monstera dan bunga sepatu pink di sisi kiri |
| | | `testimoni-4-daun-kanan.png` | Monstera dan bunga sepatu pink di sisi kanan |
| **Cara daftar** | 1100 × 1000 | `daftar-1-latar.png` | Gundukan rumput dan langit lembut |
| | | `daftar-2-rumah.png` | Rumah joglo kayu dengan atap hijau, pintu pink terbuka, dan bendera pink |
| | | `daftar-3-tanaman.png` | Tanaman depan, batu pijakan, semak |
| **Kontak** (Yuk, kenalan) | 1160 × 800 | `kontak-1-pesawat.png` | Pesawat kertas pink dengan jejak titik-titik |
| | | `kontak-2-tokoh.png` | Guru berkerudung pink dan tiga anak dengan laptop dan buku |
| | | `kontak-3-daun.png` | Daun dan semak hijau di depan, bagian bawah |

Contoh prompt (Testimoni, lapisan tokoh):

> Same canvas 1420×1000, transparent background. Only the green park bench with a mother in a green hijab and a daughter in a pink hijab reading the Qur'an together, centred, bottom of bench at y≈880. [gaya di atas]

## Memasang lapisan

1. Taruh PNG di `public/images/scenes/`.
2. Kabari saya. Saya konversi ke WebP, lalu isi `app/data/scenes.ts`, misalnya:

```ts
testimoni: [
  { src: '/images/scenes/testimoni-1-latar.webp', depth: -40 },
  { src: '/images/scenes/testimoni-2-bangku-tokoh.webp', depth: 20 },
  { src: '/images/scenes/testimoni-3-daun-kiri.webp', depth: 70 },
  { src: '/images/scenes/testimoni-4-daun-kanan.webp', depth: 90 }
]
```

Selama lapisan belum ada, tiap section tetap memakai ilustrasi yang sekarang. Ilustrasi itu sudah bergerak parallax sebagai satu lapisan.
