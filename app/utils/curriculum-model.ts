export interface StationSpec {
  id: 'akademik' | 'quran' | 'karakter'
  shortLabel: string
  title: string
  timeWindow: string
  minutes: number
  summary: string
  topics: string[]
  icon: string
}

export interface JenjangModel {
  key: 'paud' | 'sd' | 'smp'
  label: string
  ageRange: string
  tagline: string
  summary: string
  sessionTotalMinutes: number
  stations: [StationSpec, StationSpec, StationSpec]
}

/** Per-jenjang 90-minute session split: drives the plate chart and the detail panel. */
export const CURRICULUM_MODELS: JenjangModel[] = [
  {
    key: 'paud',
    label: 'PAUD & TK',
    ageRange: 'Usia 4–6 tahun',
    tagline: 'Fondasi membaca, berhitung, dan cinta mengaji sejak dini',
    summary: 'Ritme belajar 90 menit yang ringan dan terstruktur agar anak siap masuk SD dengan gembira tanpa tekanan.',
    sessionTotalMinutes: 90,
    stations: [
      {
        id: 'akademik',
        shortLabel: 'Calistung',
        title: 'Calistung Dasar Bertahap',
        timeWindow: '14.30 – 15.10 WIB',
        minutes: 40,
        summary: 'Pengenalan huruf, membaca suku kata, latihan menulis rapi, dan berhitung awal dengan media visual.',
        topics: ['Membaca suku kata', 'Menulis rapi & motorik halus', 'Berhitung dasar 1–50'],
        icon: 'i-lucide-pencil-line'
      },
      {
        id: 'quran',
        shortLabel: 'Iqra & Doa',
        title: 'Mengaji Iqra & Doa Harian',
        timeWindow: '15.10 – 15.40 WIB',
        minutes: 30,
        summary: 'Belajar huruf hijaiyah dengan makhraj lembut serta hafalan doa harian dan surat-surat pendek.',
        topics: ['Iqra jilid 1–6', 'Hafalan doa harian', 'Surat pendek Juz Amma'],
        icon: 'i-lucide-book-open'
      },
      {
        id: 'karakter',
        shortLabel: 'Adab',
        title: 'Adab & Kebiasaan Baik',
        timeWindow: '15.40 – 16.00 WIB',
        minutes: 20,
        summary: 'Pembiasaan sopan santun, keberanian bercerita, berbagi bersama teman, dan salam penutup.',
        topics: ['Sopan santun & antri', 'Berani bertanya & tampil', 'Catatan perkembangan harian'],
        icon: 'i-lucide-heart-handshake'
      }
    ]
  },
  {
    key: 'sd',
    label: 'SD / MI',
    ageRange: 'Kelas 1–6',
    tagline: 'Pendampingan pelajaran sekolah, Tahfidz, dan pengenalan komputer',
    summary: 'Alokasi 90 menit yang menyeimbangkan penguasaan PR & ulangan harian dengan bimbingan Al-Qur’an yang konsisten.',
    sessionTotalMinutes: 90,
    stations: [
      {
        id: 'akademik',
        shortLabel: 'Mapel Inti',
        title: 'Matematika, IPA & Bahasa Indonesia',
        timeWindow: '14.30 – 15.15 WIB',
        minutes: 45,
        summary: 'Pendampingan PR sekolah, pemahaman konsep matematika & literasi, serta latihan soal PTS/PAS.',
        topics: ['Matematika & berhitung cepat', 'Bahasa Indonesia & literasi', 'IPA & latihan soal ulangan'],
        icon: 'i-lucide-calculator'
      },
      {
        id: 'quran',
        shortLabel: 'Tahfidz',
        title: 'Al-Qur’an, Tahfidz & Fiqih Dasar',
        timeWindow: '15.15 – 15.45 WIB',
        minutes: 30,
        summary: 'Bimbingan tajwid, setoran hafalan surat pilihan, tuntunan wudhu-shalat, dan pembinaan akhlak.',
        topics: ['Tahsin & Tahfidz Juz 30', 'Tuntunan ibadah harian', 'Aqidah & akhlak anak'],
        icon: 'i-lucide-book-open-check'
      },
      {
        id: 'karakter',
        shortLabel: 'Komputer',
        title: 'Pengenalan Komputer & Evaluasi',
        timeWindow: '15.45 – 16.00 WIB',
        minutes: 15,
        summary: 'Dasar mengetik dan literasi komputer aman untuk tugas sekolah, ditutup rangkuman belajar untuk orang tua.',
        topics: ['Dasar mengetik & dokumen', 'Literasi digital aman', 'Ringkasan progres untuk wali'],
        icon: 'i-lucide-laptop'
      }
    ]
  },
  {
    key: 'smp',
    label: 'SMP / MTs',
    ageRange: 'Kelas 7–9',
    tagline: 'Pendalaman materi, strategi ujian, dan penguatan karakter remaja',
    summary: 'Porsi akademik lebih dalam untuk menguatkan nilai raport serta persiapan masuk SMA/SMK pilihan sambil menjaga adab.',
    sessionTotalMinutes: 90,
    stations: [
      {
        id: 'akademik',
        shortLabel: 'Bedah Soal',
        title: 'Matematika, IPA & Strategi Ujian',
        timeWindow: '14.30 – 15.25 WIB',
        minutes: 55,
        summary: 'Bedah konsep inti, kiat pengerjaan soal bertingkat, manajemen waktu ujian, dan target nilai raport.',
        topics: ['Aljabar, geometri & IPA terpadu', 'Kiat & trik pengerjaan soal', 'Simulasi PTS, PAS & seleksi SMA/SMK'],
        icon: 'i-lucide-compass'
      },
      {
        id: 'quran',
        shortLabel: 'Keislaman',
        title: 'Al-Qur’an, Aqidah & Fiqih Remaja',
        timeWindow: '15.25 – 15.45 WIB',
        minutes: 20,
        summary: 'Perbaikan bacaan Al-Qur’an, penguatan pemahaman fiqih remaja, dan penerapan nilai Islam sehari-hari.',
        topics: ['Tahsin bacaan Al-Qur’an', 'Fiqih & etika pergaulan', 'Refleksi akhlakul karimah'],
        icon: 'i-lucide-book-marked'
      },
      {
        id: 'karakter',
        shortLabel: 'Evaluasi',
        title: 'Review Target & Konsultasi Wali',
        timeWindow: '15.45 – 16.00 WIB',
        minutes: 15,
        summary: 'Pemetaan topik yang belum dikuasai siswa dan laporan berkala agar orang tua ikut memantau target.',
        topics: ['Peta kelemahan materi', 'Target belajar pekan depan', 'Laporan berkala ke orang tua'],
        icon: 'i-lucide-target'
      }
    ]
  }
]
