import { MINNA_CONTACT, TEACHERS, TEACHING_SPECIALTIES } from '~/data/minna'

// Absolute site origin: NUXT_PUBLIC_SITE_URL in production, else the request origin.
export function useSiteUrl() {
  const configured = useRuntimeConfig().public.siteUrl
  return (configured || useRequestURL().origin).replace(/\/$/, '')
}

// One JSON-LD block per call; read by search and answer engines.
export function useJsonLd(data: Record<string, unknown>) {
  useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(data) }] })
}

export function organizationSchema(site: string) {
  return {
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    '@id': `${site}/#organisasi`,
    'name': MINNA_CONTACT.brand,
    'description': 'Bimbingan belajar dan mengaji untuk anak PAUD/TK, SD/MI, dan SMP/MTs di Wado Wetan, Kedungtuban, Blora: Calistung, mata pelajaran sekolah, Al-Qur’an, Tahfidz, dan akhlak.',
    'url': site,
    'logo': `${site}/minnaedu.png`,
    'image': `${site}/images/minna.jpg`,
    'telephone': `+${MINNA_CONTACT.whatsappNumber}`,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Lr. Pandai Besi RT 03/RW 03, Wado Wetan',
      'addressLocality': 'Kedungtuban',
      'addressRegion': 'Jawa Tengah',
      'postalCode': '58381',
      'addressCountry': 'ID'
    },
    'areaServed': ['Kedungtuban', 'Kabupaten Blora'],
    'hasMap': MINNA_CONTACT.mapsUrl,
    'openingHoursSpecification': [{
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      'opens': '14:30',
      'closes': '16:00'
    }],
    'sameAs': [MINNA_CONTACT.instagramUrl, MINNA_CONTACT.facebookUrl],
    'employee': TEACHERS.map(t => ({ '@type': 'Person', 'name': t.name, 'jobTitle': t.role })),
    'knowsAbout': [...TEACHING_SPECIALTIES.map(s => s.title), 'Tahfidz Al-Qur’an', 'Bimbingan belajar SD', 'Bimbingan belajar SMP']
  }
}
