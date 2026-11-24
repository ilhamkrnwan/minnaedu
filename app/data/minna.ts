export const MINNA_CONTACT = {
  brand: 'Minna Education',
  tagline: 'Bimbel & Mengaji Anak di Wado, Kedungtuban',
  phoneDisplay: '0877-6484-8768',
  whatsappNumber: '6287764848768',
  whatsappUrl(message = 'Assalamualaikum, saya ingin bertanya tentang program les dan jadwal di Minna Education.') {
    return `https://wa.me/6287764848768?text=${encodeURIComponent(message)}`
  },
  instagramUrl: 'https://www.instagram.com/minnaedu/',
  facebookUrl: 'https://www.facebook.com/minnaedu',
  mapsUrl: 'https://share.google/7ABFgjsFLELTbo5lA',
  // Place id (cid) of the Minna Education listing, from the existing maps.app.goo.gl link
  mapsEmbedUrl: 'https://www.google.com/maps?cid=14803727037849999486&output=embed',
  address: 'Lr. Pandai Besi RT 03/RW 03, Wado Wetan, Kec. Kedungtuban, Blora 58381',
  scheduleSummary: 'Senin – Sabtu · 14.30 – 16.00 WIB'
} as const

export interface Video {
  youtubeId?: string // id dari youtube.com/watch?v=<id>; kosong = placeholder (belum bisa diputar)
  poster: string // dipakai selama belum ada youtubeId
  title: string
  meta: string
}

// PLACEHOLDER: isi youtubeId dan meta begitu video Minna sudah diunggah ke YouTube.
export const VIDEOS: Video[] = [
  { poster: '/images/minna.jpg', title: 'Profil rumah belajar Minna Education', meta: 'Minna Education' },
  { poster: '/images/hero-calistung.jpg', title: 'Belajar calistung kelas PAUD / TK', meta: 'Minna Education' },
  { poster: '/images/gallery-ngaji.jpg', title: 'Mengaji dan Tahfidz sore hari', meta: 'Minna Education' },
  { poster: '/images/gallery-kegiatan.jpg', title: 'Kegiatan bersama siswa Minna', meta: 'Minna Education' }
]

export const CAMPUS_FACTS = [
  { label: 'Jadwal', value: 'Senin – Sabtu, 14.30 – 16.00 WIB' },
  { label: 'Kelas', value: 'Kelompok kecil & pendampingan personal' },
  { label: 'Kunjungan', value: 'Terbuka sebelum mendaftar' },
  { label: 'Alamat', value: 'Lr. Pandai Besi RT 03/RW 03, Wado Wetan,\u00A0Blora' }
] as const

export const LEAD_EDUCATOR = {
  name: 'Sudarmini, S.E.',
  initials: 'Su',
  role: 'Pimpinan & Pengajar Utama',
  credentials: [
    'Sarjana Ekonomi (S.E.)',
    'Pengajar Calistung & Mata Pelajaran Sekolah',
    'Tim pendidik lulusan perguruan tinggi & pesantren'
  ]
} as const

// Empat guru utama. Isi `role` tiap guru bila bidangnya sudah dikonfirmasi.
export const TEACHERS = [
  { name: 'Sudarmini, S.E.', role: 'Pimpinan & Pengajar Utama', portrait: '/images/pengajar/sudarmini.webp' },
  { name: 'Ana', role: 'Pengajar', portrait: '/images/pengajar/ana.webp' },
  { name: 'Ratna', role: 'Pengajar', portrait: '/images/pengajar/ratna.webp' },
  { name: 'Fara', role: 'Pengajar', portrait: '/images/pengajar/fara.webp' }
] as const

// Perjalanan Minna, dari awal sampai sekarang. Tambahkan `year` bila tahunnya sudah pasti.
export const HISTORY = [
  { title: 'Teman kuliah', detail: 'Bertemu di bangku kuliah dan sama-sama senang mengajar anak.' },
  { title: 'Guru les bersama', detail: 'Mulai membuka les bersama untuk anak-anak di sekitar rumah.' },
  { title: 'Guru SDIT Quwattul Ummah', detail: 'Mengajar di SDIT Quwattul Ummah dan membawa pengalaman kelas ke les sore.' },
  { title: 'Minna Education', detail: 'Kini menjadi rumah belajar dan mengaji untuk anak PAUD sampai SMP di Wado Wetan.' }
] as const

export const TEACHING_SPECIALTIES = [
  {
    title: 'Calistung & PAUD',
    detail: 'Membaca, menulis, dan berhitung awal.'
  },
  {
    title: 'Mata Pelajaran Sekolah',
    detail: 'PR, Matematika, IPA, Bahasa & latihan ujian.'
  },
  {
    title: 'Al-Qur’an & Akhlak',
    detail: 'Iqra, tahsin, Tahfidz, fiqih & adab harian.'
  }
] as const

export const TESTIMONIALS = [
  {
    quote: 'Nilai akademis anak saya meningkat nyata dan kini lebih rajin belajar di\u00A0rumah.',
    highlight: 'Nilai Meningkat',
    parentName: 'Lilis Suliyanti',
    relation: 'Ibu dari Ananda Asfiya',
    level: 'SD / MI'
  },
  {
    quote: 'Tidak hanya mata pelajaran sekolah, anak saya juga dibiasakan mengaji dan menjaga akhlak.',
    highlight: 'Akademik & Mengaji',
    parentName: 'Rosmary',
    relation: 'Bunda dari Ananda Farhan',
    level: 'SD / MI'
  },
  {
    quote: 'Materi mudah dipahami sehingga anak saya jauh lebih tenang dan percaya diri saat ujian.',
    highlight: 'Siap Hadapi Ujian',
    parentName: 'Sulaiman Rahman',
    relation: 'Ayah dari Ananda Rina',
    level: 'SMP / MTs'
  }
] as const

export interface GalleryPhoto {
  src: string
  alt: string
  caption: string
  category: string
  width: number
  height: number
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    src: '/images/minna.jpg',
    alt: 'Tampak depan rumah belajar kayu Minna Education di Wado Wetan, Kedungtuban, Blora',
    caption: 'Rumah Belajar Wado Wetan',
    category: 'Lokasi',
    width: 680,
    height: 510
  },
  {
    src: '/images/gallery-ngaji.jpg',
    alt: 'Siswa duduk khusyuk mengaji Al-Qur’an di atas rehal kayu',
    caption: 'Bimbingan Mengaji & Tahfidz',
    category: 'Al-Qur’an',
    width: 1200,
    height: 800
  },
  {
    src: '/images/hero-calistung.jpg',
    alt: 'Potret siswi PAUD/SD tersenyum memegang buku latihan membaca dan pensil',
    caption: 'Calistung & Membaca Dini',
    category: 'Calistung',
    width: 800,
    height: 800
  },
  {
    src: '/images/hero-tahfidz.jpg',
    alt: 'Potret siswa Muslim berpeci tersenyum sambil memegang buku Iqra',
    caption: 'Iqra, Doa & Adab',
    category: 'Akhlak',
    width: 800,
    height: 800
  }
]

export const ENROLLMENT_STEPS = [
  {
    step: '01',
    title: 'Hubungi via WhatsApp',
    description: 'Kirim jenjang anak untuk info jadwal & biaya.'
  },
  {
    step: '02',
    title: 'Kunjungi Lokasi',
    description: 'Lihat ruang belajar & kenalan dengan pengajar.'
  },
  {
    step: '03',
    title: 'Daftar & Mulai',
    description: 'Lengkapi data singkat lalu ikuti sesi sore.'
  }
] as const

export const FAQ_ITEMS = [
  {
    label: 'Program apa saja yang tersedia?',
    content: 'PAUD/TK, SD/MI, dan SMP/MTs: pelajaran sekolah, Calistung, mengaji, dan Tahfidz.'
  },
  {
    label: 'Kapan jadwal belajarnya?',
    content: 'Senin – Sabtu, 14.30 – 16.00 WIB.'
  },
  {
    label: 'Boleh berkunjung dulu?',
    content: 'Boleh. Hubungi WhatsApp, lalu datang langsung ke lokasi.'
  },
  {
    label: 'Siapa pengajarnya?',
    content: 'Dipimpin Ibu Sudarmini, S.E., bersama Bu Ana, Bu Ratna, dan Bu Fara.'
  },
  {
    label: 'Apakah ada laporan perkembangan anak?',
    content: 'Ada. Orang tua bisa berkonsultasi langsung atau lewat WhatsApp.'
  }
]
