// '2026-11-24' -> '24 November 2026'
export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
